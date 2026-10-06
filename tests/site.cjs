/* Browser checks exercise the built site at the actual GitHub project path. */
const assert = require('node:assert/strict');
const fs = require('node:fs');
const path = require('node:path');
const http = require('node:http');
const { chromium } = require('playwright');

const root = path.resolve(__dirname, '..');
const artifact = path.join(root, '.site-build');
const output = path.join(root, 'test-results');
fs.mkdirSync(output, { recursive: true });
assert.ok(fs.existsSync(path.join(artifact, 'index.html')), 'Run python3 scripts/build.py first');
const mime = { '.html': 'text/html', '.css': 'text/css', '.js': 'text/javascript', '.webp': 'image/webp', '.png': 'image/png', '.woff2': 'font/woff2', '.txt': 'text/plain' };
const server = http.createServer((req, res) => {
  const pathname = decodeURIComponent(new URL(req.url, 'http://localhost').pathname);
  if (!pathname.startsWith('/SITE-GELISE/')) { res.writeHead(404).end(); return; }
  const relative = pathname.slice('/SITE-GELISE/'.length) || 'index.html';
  const file = path.resolve(artifact, relative);
  if (!file.startsWith(artifact + path.sep) || !fs.existsSync(file) || !fs.statSync(file).isFile()) { res.writeHead(404).end(); return; }
  res.writeHead(200, { 'Content-Type': mime[path.extname(file)] || 'application/octet-stream' });
  fs.createReadStream(file).pipe(res);
});
const results = [];
let browser;
function passed(name) { results.push({ name, status: 'passed' }); console.log(`PASS ${name}`); }
async function settle(page) {
  await page.evaluate(() => document.fonts.ready);
  await page.waitForFunction(() => document.getAnimations().every(a => a.playState !== 'running'));
}
async function revealPage(page) {
  for (const element of await page.locator('[data-reveal]').all()) {
    await element.scrollIntoViewIfNeeded();
    await page.waitForFunction(el => !el.classList.contains('reveal-pending') || el.classList.contains('is-visible'), await element.elementHandle());
  }
  await settle(page);
  await page.evaluate(() => scrollTo({ top: 0, behavior: 'instant' }));
}

(async () => {
  await new Promise(resolve => server.listen(0, '127.0.0.1', resolve));
  const url = `http://127.0.0.1:${server.address().port}/SITE-GELISE/`;
  browser = await chromium.launch({ executablePath: process.env.CHROMIUM_PATH || '/usr/bin/chromium', args: ['--no-sandbox'] });
  const context = await browser.newContext({ viewport: { width: 1440, height: 1000 } });
  const page = await context.newPage();
  const errors = [];
  const failedResources = [];
  page.on('pageerror', error => errors.push(error.message));
  page.on('console', message => { if (message.type() === 'error') errors.push(message.text()); });
  page.on('response', response => { if (response.status() >= 400) failedResources.push(`${response.status()} ${response.url()}`); });
  page.on('requestfailed', request => failedResources.push(request.url()));
  await page.goto(url, { waitUntil: 'networkidle' });
  await settle(page);
  assert.equal(await page.locator('h1').count(), 1);
  assert.match(await page.title(), /Gelise Beck Ferreira/);
  assert.equal(await page.locator('html').getAttribute('lang'), 'pt-BR');
  assert.ok(await page.locator('.portfolio').isHidden());
  assert.ok(await page.locator('[data-portfolio-nav]').isHidden());
  passed('Semantic entry, project path and empty portfolio hidden');

  const expectedTopics = {
    cabelos: 'cabelos', unhas: 'unhas', olhar: 'design de sobrancelhas e extensão de cílios', beleza: 'maquiagem e penteados', depilacao: 'depilação',
    cilios: 'extensão de cílios / lash design', nail: 'nail design', manicure: 'manicure e pedicure', maquiagem: 'maquiagem',
  };
  const links = await page.locator('[data-whatsapp]').evaluateAll(elements => elements.map(el => ({ href: el.href, kind: el.dataset.whatsapp, topic: el.dataset.topic, rel: el.rel, target: el.target })));
  assert.equal(links.filter(link => link.kind === 'service').length, 5);
  assert.equal(links.filter(link => link.kind === 'course').length, 5);
  for (const link of links) {
    const parsed = new URL(link.href);
    assert.equal(parsed.hostname, 'wa.me');
    assert.equal(parsed.pathname, '/5551986552232');
    assert.equal(link.target, '_blank');
    assert.ok(link.rel.includes('noopener'));
    const message = parsed.searchParams.get('text');
    assert.ok(message && !message.includes('undefined'));
    if (link.kind === 'service') assert.equal(message, `Olá, Gelise! Vim pelo seu site e gostaria de saber mais sobre ${expectedTopics[link.topic]} e consultar a disponibilidade.`);
    if (link.kind === 'course') assert.equal(message, `Olá, Gelise! Tenho interesse no curso de ${expectedTopics[link.topic]}. Pode me passar mais informações?`);
    if (link.kind === 'princess') assert.equal(message, 'Olá, Gelise! Gostaria de conhecer os detalhes do Dia de Princesa completo.');
    if (link.kind === 'general') assert.equal(message, 'Olá, Gelise! Vim pelo seu site e gostaria de informações sobre os atendimentos.');
  }
  const map = new URL(await page.locator('[data-directions]').getAttribute('href'));
  assert.equal(map.searchParams.get('query'), 'Avenida Mariluz, 630 — Imbé/RS');
  assert.equal(await page.locator('.phone-link').getAttribute('href'), 'tel:+5551986552232');
  passed('All contextual WhatsApp messages, telephone and address search');

  for (const summary of await page.locator('.service summary').all()) {
    const details = summary.locator('..');
    if (await details.getAttribute('open') !== null) {
      await summary.click();
      await page.waitForFunction(id => !document.getElementById(id).parentElement.open, await summary.getAttribute('id'));
    }
    await summary.focus();
    await page.keyboard.press('Enter');
    await settle(page);
    assert.equal(await details.getAttribute('open'), '');
    assert.equal(await summary.getAttribute('aria-expanded'), 'true');
    assert.ok(await details.locator('.service-body ul').isVisible());
    await page.keyboard.press('Space');
    await settle(page);
    assert.equal(await details.getAttribute('open'), null);
  }
  passed('Five service accordions open/close with keyboard and reveal their actual catalog');

  const tabs = page.getByRole('tab');
  assert.equal(await tabs.count(), 5);
  for (let i = 0; i < 5; i++) {
    await tabs.nth(i).click();
    assert.equal(await tabs.nth(i).getAttribute('aria-selected'), 'true');
    assert.equal(await page.locator('.course-panel:not([hidden])').count(), 1);
    assert.ok(await page.locator('.course-panel:not([hidden]) [data-whatsapp]').isVisible());
  }
  await tabs.nth(4).focus();
  await page.keyboard.press('Home');
  assert.equal(await tabs.nth(0).getAttribute('aria-selected'), 'true');
  await page.keyboard.press('ArrowDown');
  assert.equal(await tabs.nth(1).getAttribute('aria-selected'), 'true');
  await page.keyboard.press('End');
  assert.equal(await tabs.nth(4).getAttribute('aria-selected'), 'true');
  passed('Five course panels, selected state and arrow/Home/End navigation');

  for (const width of [360, 390, 768, 1024, 1440]) {
    await page.setViewportSize({ width, height: width < 700 ? 844 : 1000 });
    await page.evaluate(() => scrollTo({ top: 0, behavior: 'instant' }));
    await revealPage(page);
    assert.ok(await page.evaluate(() => document.documentElement.scrollWidth <= innerWidth), `Horizontal overflow at ${width}px`);
    assert.ok(await page.locator('img[src]').evaluateAll(images => images.filter(img => !img.closest('dialog')).every(img => img.complete && img.naturalWidth > 0)), `Broken image at ${width}px`);
    assert.ok(await page.locator('.hero-portrait img').evaluate(img => Math.abs(img.clientWidth / img.clientHeight - img.naturalWidth / img.naturalHeight) < .01), 'Portrait aspect ratio preserved');
    await page.screenshot({ path: path.join(output, `layout-${width}.png`), fullPage: true });
    if (width === 390 || width === 1440) {
      await page.screenshot({ path: path.join(output, `hero-${width}.png`) });
      const style = '.site-header,.skip-link,.floating-whatsapp{visibility:hidden!important}';
      await page.locator('.services').screenshot({ path: path.join(output, `services-${width}.png`), style });
      await page.locator('.courses').screenshot({ path: path.join(output, `courses-${width}.png`), style });
    }
    passed(`Responsive layout, image loading and portrait framing at ${width}px`);
  }

  await page.setViewportSize({ width: 390, height: 844 });
  await page.locator('.menu-toggle').click();
  assert.equal(await page.locator('.menu-toggle').getAttribute('aria-expanded'), 'true');
  assert.equal(await page.evaluate(() => document.activeElement.getAttribute('href')), '#sobre');
  assert.equal(await page.locator('main').evaluate(el => el.inert), true);
  await page.locator('.site-nav .nav-cta').focus();
  await page.keyboard.press('Tab');
  assert.equal(await page.evaluate(() => document.activeElement.className), 'menu-toggle');
  await page.keyboard.press('Escape');
  assert.equal(await page.locator('.menu-toggle').getAttribute('aria-expanded'), 'false');
  assert.ok(await page.locator('.menu-toggle').evaluate(el => el === document.activeElement));
  await page.locator('.menu-toggle').click();
  await page.locator('.site-nav a[href="#cursos"]').click();
  assert.equal(await page.locator('.menu-toggle').getAttribute('aria-expanded'), 'false');
  assert.equal(await page.locator('main').evaluate(el => el.inert), false);
  assert.equal(await page.evaluate(() => document.activeElement.id), 'cursos');
  await page.locator('.menu-toggle').click();
  await page.setViewportSize({ width: 1440, height: 1000 });
  assert.equal(await page.locator('main').evaluate(el => el.inert), false);
  assert.equal(await page.locator('.site-nav').evaluate(el => el.inert), false);
  passed('Mobile menu focus, trap, Escape, navigation and desktop resize');

  await page.emulateMedia({ reducedMotion: 'reduce' });
  await tabs.nth(2).click();
  assert.equal(await page.evaluate(() => document.getAnimations().filter(a => a.playState === 'running').length), 0);
  assert.ok(await page.locator('[data-reveal]:not([data-reveal="curve"])').evaluateAll(elements => elements.every(el => getComputedStyle(el).opacity === '1')));
  assert.ok(await page.locator('[data-reveal="curve"]').evaluate(el => Number(getComputedStyle(el).opacity) > 0));
  assert.equal(await page.locator('html').evaluate(el => getComputedStyle(el).scrollBehavior), 'auto');
  passed('Reduced motion: visible content, no running animations and no smooth scrolling');

  let AxeBuilder;
  try { AxeBuilder = require(process.env.GELISE_AXE_PATH || '@axe-core/playwright').default; } catch {}
  if (AxeBuilder) {
    await revealPage(page);
    const audit = await new AxeBuilder({ page }).withTags(['wcag2a', 'wcag2aa', 'wcag21a', 'wcag21aa']).analyze();
    fs.writeFileSync(path.join(output, 'accessibility.json'), JSON.stringify(audit, null, 2));
    assert.deepEqual(audit.violations.map(v => ({ id: v.id, description: v.description, nodes: v.nodes.map(n => n.target) })), []);
    passed('axe WCAG A/AA automated audit: no violations');
  } else { results.push({ name: 'axe accessibility audit', status: 'unrun', reason: 'Optional @axe-core/playwright unavailable' }); }

  // Test-only fixture: never written into the public gallery or site config.
  await page.evaluate(async () => {
    const { initPortfolio } = await import('./assets/js/main.js');
    const image = 'data:image/svg+xml,' + encodeURIComponent('<svg xmlns="http://www.w3.org/2000/svg" width="800" height="1000"><rect width="800" height="1000" fill="#35101f"/></svg>');
    initPortfolio([{ image, alt: 'Fixture apenas de teste A', category: 'Unhas', caption: 'Teste A' }, { image, alt: 'Fixture apenas de teste B', category: 'Cabelos', caption: 'Teste B' }]);
  });
  assert.ok(await page.locator('.portfolio').isVisible());
  await page.getByRole('button', { name: 'Unhas', exact: true }).click();
  assert.equal(await page.locator('.portfolio-item').count(), 1);
  await page.getByRole('button', { name: 'Todos', exact: true }).click();
  const trigger = page.locator('.portfolio-item').first();
  await trigger.click();
  assert.ok(await page.locator('dialog').isVisible());
  await page.keyboard.press('ArrowRight');
  assert.equal(await page.locator('#lightbox-caption').innerText(), 'Teste B');
  await page.keyboard.press('ArrowLeft');
  assert.equal(await page.locator('#lightbox-caption').innerText(), 'Teste A');
  await page.locator('[data-lightbox-next]').focus();
  await page.keyboard.press('Tab');
  assert.ok(await page.locator('.lightbox-close').evaluate(el => el === document.activeElement));
  await page.keyboard.press('Shift+Tab');
  assert.ok(await page.locator('[data-lightbox-next]').evaluate(el => el === document.activeElement));
  await page.keyboard.press('Escape');
  assert.ok(await page.locator('dialog').isHidden());
  assert.ok(await trigger.evaluate(el => el === document.activeElement));
  passed('Future gallery: filters, lightbox arrows, focus trap, Escape and restored focus');

  const noJs = await browser.newContext({ javaScriptEnabled: false, viewport: { width: 390, height: 844 } });
  const fallback = await noJs.newPage();
  await fallback.goto(url, { waitUntil: 'networkidle' });
  assert.ok(await fallback.locator('h1').isVisible());
  assert.equal(await fallback.locator('.course-panel:visible').count(), 5);
  await fallback.locator('#service-unhas').click();
  assert.ok(await fallback.locator('#panel-unhas').isVisible());
  assert.equal(await fallback.locator('.site-nav a[href="#cursos"]').isVisible(), true);
  assert.ok(await fallback.evaluate(() => document.documentElement.scrollWidth <= innerWidth));
  const fallbackLinks = await fallback.locator('[data-whatsapp]').evaluateAll(elements => elements.map(el => new URL(el.href).searchParams.get('text')));
  assert.ok(fallbackLinks.every(message => message && !message.includes('undefined')));
  passed('No JavaScript: native services, five courses, usable navigation and WhatsApp links');
  await noJs.close();
  assert.deepEqual(errors, []);
  assert.deepEqual(failedResources, []);
  assert.ok(!fs.existsSync(path.join(artifact, 'assets/originals')));
  assert.ok(!fs.existsSync(path.join(artifact, 'README.md')));
  passed('No console/resource errors; originals and documentation excluded from deploy');
  fs.writeFileSync(path.join(output, 'results.json'), JSON.stringify(results, null, 2));
  console.log(`${results.filter(r => r.status === 'passed').length} checks passed.`);
})().catch(error => {
  results.push({ name: 'Browser validation', status: 'failed', error: error.stack });
  fs.writeFileSync(path.join(output, 'results.json'), JSON.stringify(results, null, 2));
  console.error(error);
  process.exitCode = 1;
}).finally(async () => {
  await browser?.close();
  server.close();
});
