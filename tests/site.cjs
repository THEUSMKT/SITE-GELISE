/* Testes de navegador sobre o artefato servido no caminho real do GitHub Pages (/SITE-GELISE/).
   Uso: python3 scripts/build.py && node tests/site.cjs */
const assert = require('node:assert/strict');
const fs = require('node:fs');
const path = require('node:path');
const http = require('node:http');
const { chromium } = require('playwright');

const root = path.resolve(__dirname, '..');
const artifact = path.join(root, '.site-build');
const output = path.join(root, 'test-results');
fs.mkdirSync(output, { recursive: true });
assert.ok(fs.existsSync(path.join(artifact, 'index.html')), 'Rode python3 scripts/build.py antes');

const mime = { '.html': 'text/html', '.css': 'text/css', '.js': 'text/javascript', '.webp': 'image/webp', '.png': 'image/png', '.jpg': 'image/jpeg' };
const server = http.createServer((req, res) => {
  const pathname = decodeURIComponent(new URL(req.url, 'http://localhost').pathname);
  if (!pathname.startsWith('/SITE-GELISE/')) { res.writeHead(404).end(); return; }
  const file = path.resolve(artifact, pathname.slice('/SITE-GELISE/'.length) || 'index.html');
  if (!file.startsWith(artifact + path.sep) || !fs.existsSync(file) || !fs.statSync(file).isFile()) { res.writeHead(404).end(); return; }
  res.writeHead(200, { 'Content-Type': mime[path.extname(file)] || 'application/octet-stream' });
  fs.createReadStream(file).pipe(res);
});

let browser;
const passed = (name) => console.log(`PASS ${name}`);

async function open(options = {}, { firstVisit = false } = {}) {
  const context = await browser.newContext({ viewport: { width: 1280, height: 900 }, ...options });
  if (!firstVisit) await context.addInitScript(() => { try { localStorage.setItem('cv-intro-vista', '1'); } catch (e) {} });
  const page = await context.newPage();
  const errors = [];
  page.on('pageerror', (e) => errors.push(e.message));
  page.on('console', (m) => { if (m.type() === 'error' || m.type() === 'warning') errors.push(m.text()); });
  page.on('response', (r) => { if (r.status() >= 400) errors.push(`${r.status()} ${r.url()}`); });
  // Google Fonts fica fora do teste (rede externa); o site usa fallbacks se a fonte não carregar.
  await page.route(/fonts\.(googleapis|gstatic)\.com/, (route) => route.fulfill({ status: 200, contentType: 'text/css', body: '' }));
  await page.goto(url, { waitUntil: 'networkidle' });
  return { context, page, errors };
}

let url;
(async () => {
  await new Promise((resolve) => server.listen(0, '127.0.0.1', resolve));
  url = `http://127.0.0.1:${server.address().port}/SITE-GELISE/`;
  browser = await chromium.launch({ executablePath: process.env.CHROMIUM_PATH || undefined, args: ['--no-sandbox'] });

  /* 1. Estrutura, SEO e seções opcionais */
  {
    const { context, page, errors } = await open();
    assert.equal(await page.title(), 'Cantinho Vip | Estética e Beleza — Gelise');
    assert.equal(await page.locator('html').getAttribute('lang'), 'pt-BR');
    assert.equal(await page.locator('h1').count(), 1);
    assert.equal(await page.locator('meta[name=theme-color]').getAttribute('content'), '#2B0B25');
    assert.equal(await page.locator('.service-card').count(), 12);
    assert.ok(await page.locator('#galeria').isHidden(), 'galeria vazia deve ficar oculta');
    assert.ok(await page.locator('#cursos').isVisible());
    assert.equal(await page.locator('#contact-grid > li').count(), 2, 'só endereço e WhatsApp estão preenchidos');
    assert.equal(await page.locator('#wa-float').getAttribute('href'), 'https://wa.me/5551986552232?text=' + encodeURIComponent('Olá, Gelise! ✨ Vim pelo site do Cantinho Vip.'));
    const absolute = await page.evaluate(() => [...document.querySelectorAll('[src],[href],[srcset]')]
      .flatMap((el) => [el.getAttribute('src'), el.getAttribute('href'), el.getAttribute('srcset')])
      .filter((v) => v && v.startsWith('/')));
    assert.deepEqual(absolute, [], 'nenhum caminho absoluto');
    assert.deepEqual(errors, []);
    passed('Estrutura, SEO, seções opcionais e caminhos relativos');
    await context.close();
  }

  /* 2. Sem rolagem horizontal em 375 / 768 / 1280 */
  for (const width of [375, 768, 1280]) {
    const { context, page, errors } = await open({ viewport: { width, height: 850 } });
    const height = await page.evaluate(() => document.body.scrollHeight);
    for (let y = 0; y < height; y += 500) await page.evaluate((v) => scrollTo(0, v), y);
    await page.waitForTimeout(900);
    const [sw, iw] = await page.evaluate(() => [document.documentElement.scrollWidth, innerWidth]);
    assert.equal(sw, iw, `rolagem horizontal em ${width}px`);
    const broken = await page.evaluate(() => [...document.images].filter((i) => i.complete && i.naturalWidth === 0 && i.currentSrc).map((i) => i.currentSrc));
    assert.deepEqual(broken, []);
    await page.screenshot({ path: path.join(output, `full-${width}.png`), fullPage: true });
    assert.deepEqual(errors, []);
    await context.close();
  }
  passed('Sem rolagem horizontal e sem imagens quebradas em 375, 768 e 1280 px');

  /* 2b. Selos do hero nunca cobrem o rosto da Gelise */
  // Rosto na imagem original gelise-unhas (1086 × 1448): x 520–1010, y 180–660.
  for (const width of [375, 390, 768, 1024, 1280]) {
    const { context, page } = await open({ viewport: { width, height: 860 } });
    await page.waitForTimeout(1600); // fim das animações de entrada
    const result = await page.evaluate(() => {
      const img = document.querySelector('.arch-hero img');
      const box = img.getBoundingClientRect();
      const [nw, nh] = [1086, 1448];
      const scale = Math.max(box.width / nw, box.height / nh); // object-fit: cover
      const [px, py] = getComputedStyle(img).objectPosition.split(' ').map((v) => parseFloat(v) / 100);
      const ox = box.left + (box.width - nw * scale) * px;
      const oy = box.top + (box.height - nh * scale) * py;
      const face = {
        left: Math.max(box.left, ox + 520 * scale), right: Math.min(box.right, ox + 1010 * scale),
        top: Math.max(box.top, oy + 180 * scale), bottom: Math.min(box.bottom, oy + 660 * scale),
      };
      const hits = [...document.querySelectorAll('.badge')].filter((b) => {
        const r = b.getBoundingClientRect();
        return r.left < face.right && r.right > face.left && r.top < face.bottom && r.bottom > face.top;
      }).map((b) => b.textContent.trim());
      const hero = document.querySelector('.hero').getBoundingClientRect();
      const clipped = [...document.querySelectorAll('.badge')].filter((b) => {
        const r = b.getBoundingClientRect();
        return r.left < hero.left || r.right > hero.right;
      }).map((b) => b.textContent.trim());
      return { hits, clipped };
    });
    assert.deepEqual(result.hits, [], `selo sobre o rosto em ${width}px`);
    assert.deepEqual(result.clipped, [], `selo cortado na lateral em ${width}px`);
    await page.locator('.hero-visual').screenshot({ path: path.join(output, `hero-${width}.png`) });
    await context.close();
  }
  passed('Selos do hero longe do rosto e inteiros em 375, 390, 768, 1024 e 1280 px');

  /* 2c. Foto do "Sobre": imagem nova, inteira (sem zoom), com moldura animada */
  {
    const { context, page } = await open();
    await page.locator('#sobre').scrollIntoViewIfNeeded();
    await page.waitForTimeout(900);
    const info = await page.locator('.gold-frame img').evaluate((img) => ({
      src: img.currentSrc, natural: img.naturalWidth / img.naturalHeight, shown: img.clientWidth / img.clientHeight,
      anim: getComputedStyle(img.closest('.gold-frame'), '::before').animationName,
    }));
    assert.match(info.src, /assets\/gelise-sobre\.(webp|jpg)$/);
    assert.ok(Math.abs(info.natural - info.shown) < 0.01, 'foto exibida inteira, na proporção original');
    assert.equal(info.anim, 'frame-light');
    await context.close();
  }
  passed('Foto do Sobre: imagem nova, sem corte e com luz dourada animada na borda');

  /* 3. Card de serviço pré-seleciona no formulário */
  {
    const { context, page } = await open();
    await page.locator('.service-card[data-service="cilios"]').click();
    await page.waitForTimeout(900);
    assert.ok(await page.locator('input[name=services][value=cilios]').isChecked());
    assert.equal((await page.locator('[data-sum=services]').textContent()).trim(), 'Extensão de cílios');
    const top = await page.locator('#agendar').evaluate((el) => el.getBoundingClientRect().top);
    assert.ok(Math.abs(top) < 120, 'rolou até o formulário');
    passed('Card de serviço pré-seleciona e rola até o formulário');
    await context.close();
  }

  /* 4. Wizard completo + mensagem do WhatsApp */
  {
    const { context, page, errors } = await open({ viewport: { width: 390, height: 844 } });
    context.on('page', (p) => p.close()); // não abrir o WhatsApp de verdade
    await page.locator('#agendar').scrollIntoViewIfNeeded();
    const next = page.locator('#wz-next');

    await next.click();
    assert.match(await page.locator('#err-name').textContent(), /nome/);
    await page.fill('#f-name', 'Maria Clara');
    await page.press('#f-name', 'Enter');
    assert.ok(await page.locator('[data-step="2"]').isVisible());
    assert.equal(await page.locator('#wz-step-label').textContent(), 'Etapa 2 de 5');
    assert.match(await page.locator('[data-step="2"] legend').textContent(), /Prazer, Maria! ✨ O que vamos fazer\?/);

    await next.click();
    assert.match(await page.locator('#err-services').textContent(), /pelo menos um/);
    await page.locator('label.choice:has(input[value=manicure])').click();
    await page.locator('label.choice:has(input[value=pedicure])').click();
    await page.locator('label.choice:has(input[value=outro])').click();
    await next.click();
    assert.match(await page.locator('#err-services').textContent(), /outro serviço/);
    await page.fill('#f-service-other', 'Spa dos pés');
    await next.click();

    assert.ok(await page.locator('[data-step="3"]').isVisible());
    await page.locator('label.chip:has(input[value=casamento])').click();
    await next.click();

    assert.ok(await page.locator('#event-tip').isVisible(), 'dica de evento');
    await next.click();
    assert.match(await page.locator('#err-date').textContent(), /data/);
    assert.match(await page.locator('#err-period').textContent(), /período/);
    const min = await page.locator('#f-date').getAttribute('min');
    assert.match(min, /^\d{4}-\d{2}-\d{2}$/);
    const [y, m, d] = min.split('-').map(Number);
    const future = new Date(y, m - 1, d + 30);
    const iso = `${future.getFullYear()}-${String(future.getMonth() + 1).padStart(2, '0')}-${String(future.getDate()).padStart(2, '0')}`;
    await page.fill('#f-date', iso);
    await page.locator('label.chip:has(input[value=Tarde])').click();
    await page.fill('#f-notes', 'Francesinha nude, por favor & obrigada');
    await next.click();

    assert.ok(await page.locator('[data-step="5"]').isVisible());
    assert.ok(await next.isHidden());
    const br = `${iso.slice(8, 10)}/${iso.slice(5, 7)}/${iso.slice(0, 4)}`;
    const expected = [
      'Olá, Gelise! ✨ Vim pelo site do Cantinho Vip e gostaria de agendar.',
      '',
      '👤 *Nome:* Maria Clara',
      '💅 *Serviços:* Manicure, Pedicure, Outro: Spa dos pés',
      '🎉 *Ocasião:* Casamento',
      `📅 *Data desejada:* ${br}`,
      '⏰ *Período:* Tarde',
      '📝 *Observações:* Francesinha nude, por favor & obrigada',
      '',
      'Aguardo seu retorno! 💖',
    ].join('\n');
    const href = await page.locator('#send-whatsapp').getAttribute('href');
    assert.ok(href.startsWith('https://wa.me/5551986552232?text='));
    assert.equal(decodeURIComponent(href.split('?text=')[1]), expected);
    assert.equal(await page.locator('#send-whatsapp').getAttribute('target'), '_blank');
    assert.equal(await page.locator('#send-whatsapp').evaluate((el) => el.tagName), 'A');
    await page.screenshot({ path: path.join(output, 'wizard-review-390.png') });

    // "Editar" volta para a etapa certa e o link continua ao vivo
    await page.locator('.review-edit[data-goto="1"]').click();
    assert.ok(await page.locator('[data-step="1"]').isVisible());
    await page.fill('#f-name', 'Ana');
    for (let i = 0; i < 4; i++) await next.click();
    assert.match(decodeURIComponent(await page.locator('#send-whatsapp').getAttribute('href')), /\*Nome:\* Ana\n/);

    await page.locator('#send-whatsapp').click();
    await page.waitForTimeout(500);
    assert.ok(await page.locator('#wz-thanks').isVisible());
    assert.match(await page.locator('#wz-thanks').textContent(), /Quase lá, Ana!/);
    assert.equal(await page.locator('#reopen-whatsapp').getAttribute('href'), await page.locator('#send-whatsapp').getAttribute('href'));
    await page.locator('#wz-restart').click();
    assert.ok(await page.locator('[data-step="1"]').isVisible());
    assert.equal(await page.inputValue('#f-name'), '');
    assert.deepEqual(errors, []);
    passed('Formulário em 5 etapas: validação, saudação, revisão, edição, envio e mensagem exata');
    await context.close();
  }

  /* 5. Data opcional fora de eventos */
  {
    const { context, page } = await open();
    await page.fill('#f-name', 'Bia');
    await page.click('#wz-next');
    await page.locator('label.choice:has(input[value=maquiagem])').click();
    await page.click('#wz-next');
    await page.locator('label.chip:has(input[value=dia-a-dia])').click();
    await page.click('#wz-next');
    assert.ok(await page.locator('#event-tip').isHidden());
    await page.locator('label.chip:has(input[value="Tenho flexibilidade"])').click();
    await page.click('#wz-next');
    const msg = decodeURIComponent((await page.locator('#send-whatsapp').getAttribute('href')).split('?text=')[1]);
    assert.match(msg, /📅 \*Data desejada:\* A combinar/);
    assert.doesNotMatch(msg, /Observações/);
    passed('Data opcional fora de eventos e observações omitidas quando vazias');
    await context.close();
  }

  /* 6. Menu mobile */
  {
    const { context, page } = await open({ viewport: { width: 375, height: 800 } });
    const toggle = page.locator('.menu-toggle');
    await toggle.click();
    assert.equal(await toggle.getAttribute('aria-expanded'), 'true');
    await page.waitForTimeout(500);
    assert.ok(await page.locator('#site-nav a[href="#sobre"]').isVisible());
    await page.keyboard.press('Escape');
    assert.equal(await toggle.getAttribute('aria-expanded'), 'false');
    await toggle.click();
    await page.locator('#site-nav a[href="#servicos"]').click();
    assert.equal(await toggle.getAttribute('aria-expanded'), 'false');
    passed('Menu mobile: abre, fecha com Escape e ao navegar');
    await context.close();
  }

  /* 7. Intro na primeira visita, depois some */
  {
    const { context, page } = await open({}, { firstVisit: true });
    await page.waitForTimeout(1800);
    assert.equal(await page.locator('.intro').count(), 0, 'intro removida');
    assert.equal(await page.evaluate(() => localStorage.getItem('cv-intro-vista')), '1');
    passed('Intro aparece só na 1ª visita e é removida em até ~1,2 s');
    await context.close();
  }

  /* 8. Movimento reduzido */
  {
    const { context, page, errors } = await open({ reducedMotion: 'reduce' }, { firstVisit: true });
    assert.ok(await page.locator('.intro').isHidden());
    const canvasDrawn = await page.locator('.hero-particles').evaluate((c) => c.width > 0 && getComputedStyle(c).display !== 'none');
    assert.equal(canvasDrawn, false, 'partículas desligadas');
    assert.equal(await page.locator('.marquee-track').evaluate((el) => getComputedStyle(el).animationName), 'none');
    assert.equal(await page.locator('.gold-frame').evaluate((el) => getComputedStyle(el, '::before').display), 'none', 'luz da moldura parada');
    await page.locator('#contato').scrollIntoViewIfNeeded();
    await page.waitForTimeout(600);
    assert.equal(await page.locator('#contato .section-head').evaluate((el) => getComputedStyle(el).opacity), '1');
    assert.deepEqual(errors, []);
    passed('Movimento reduzido: sem intro, partículas e marquee; conteúdo visível');
    await context.close();
  }

  /* 9. Sem JavaScript o conteúdo principal continua legível */
  {
    const { context, page } = await open({ javaScriptEnabled: false });
    assert.equal(await page.locator('.hero-title').evaluate((el) => getComputedStyle(el.querySelector('.word')).opacity), '1');
    assert.ok(await page.locator('noscript').count() > 0);
    passed('Sem JavaScript: hero visível e alternativa de contato');
    await context.close();
  }
})().then(async () => {
  await browser.close();
  server.close();
  console.log('Todos os testes passaram.');
}, async (error) => {
  console.error(error);
  if (browser) await browser.close();
  server.close();
  process.exit(1);
});
