import { site, whatsappUrl } from './config.js';

const motion = matchMedia('(prefers-reduced-motion: reduce)');
const mobile = matchMedia('(max-width: 900px)');
const easing = 'cubic-bezier(.22,1,.36,1)';

document.querySelectorAll('[data-whatsapp]').forEach(link => {
  link.href = whatsappUrl(link.dataset.whatsapp, link.dataset.topic);
});
document.querySelectorAll('[data-directions]').forEach(link => {
  link.href = `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(site.address)}`;
});
document.querySelectorAll('[data-year]').forEach(element => { element.textContent = new Date().getFullYear(); });

function initMenu() {
  const header = document.querySelector('.site-header');
  const toggle = document.querySelector('.menu-toggle');
  const nav = document.querySelector('.site-nav');
  const main = document.querySelector('main');
  const footer = document.querySelector('footer');
  const floating = document.querySelector('.floating-whatsapp');
  const menuLinks = () => [...nav.querySelectorAll('a:not([hidden])')];
  let opened = false;
  function close(returnFocus = false) {
    opened = false;
    toggle.setAttribute('aria-expanded', 'false');
    nav.classList.remove('is-open');
    nav.inert = mobile.matches;
    document.body.classList.remove('menu-open');
    [main, footer, floating].forEach(element => { element.inert = false; });
    if (returnFocus) toggle.focus();
  }
  function open() {
    opened = true;
    toggle.setAttribute('aria-expanded', 'true');
    nav.inert = false;
    nav.classList.add('is-open');
    document.body.classList.add('menu-open');
    [main, footer, floating].forEach(element => { element.inert = true; });
    menuLinks()[0]?.focus();
  }
  toggle.addEventListener('click', () => opened ? close(true) : open());
  nav.addEventListener('click', event => {
    const link = event.target.closest('a');
    if (!link || !opened) return;
    close();
    if (link.hash && !link.dataset.whatsapp) {
      const target = document.querySelector(link.hash);
      if (target) {
        target.setAttribute('tabindex', '-1');
        target.focus({ preventScroll: true });
      }
    } else toggle.focus();
  });
  header.addEventListener('keydown', event => {
    if (!opened) return;
    if (event.key === 'Escape') { event.preventDefault(); close(true); }
    if (event.key === 'Tab') {
      const items = [toggle, ...menuLinks()];
      const first = items[0];
      const last = items.at(-1);
      if (event.shiftKey && document.activeElement === first) { event.preventDefault(); last.focus(); }
      else if (!event.shiftKey && document.activeElement === last) { event.preventDefault(); first.focus(); }
    }
  });
  mobile.addEventListener('change', () => {
    const focusWasInside = nav.contains(document.activeElement);
    close(mobile.matches && focusWasInside);
  });
  toggle.hidden = false;
  header.classList.add('nav-enhanced');
  nav.inert = mobile.matches;
  const updateHeader = () => header.classList.toggle('scrolled', scrollY > 20);
  addEventListener('scroll', updateHeader, { passive: true });
  updateHeader();
}

function initServices() {
  document.querySelectorAll('.service').forEach(details => {
    const summary = details.querySelector('summary');
    const content = details.querySelector('.service-body');
    let animation;
    let targetOpen = details.open;
    summary.setAttribute('aria-expanded', String(details.open));
    summary.addEventListener('click', event => {
      event.preventDefault();
      const fromHeight = content.getBoundingClientRect().height;
      const fromOpacity = fromHeight ? getComputedStyle(content).opacity : 0;
      const fromPadding = fromHeight ? getComputedStyle(content).paddingBottom : '0px';
      targetOpen = !targetOpen;
      animation?.cancel();
      summary.setAttribute('aria-expanded', String(targetOpen));
      content.inert = !targetOpen;
      if (targetOpen) details.open = true;
      const toHeight = targetOpen ? content.getBoundingClientRect().height : 0;
      const toPadding = targetOpen ? getComputedStyle(content).paddingBottom : '0px';
      if (motion.matches || typeof content.animate !== 'function') { details.open = targetOpen; return; }
      animation = content.animate([
        { height: `${fromHeight}px`, opacity: fromOpacity, paddingBottom: fromPadding },
        { height: `${toHeight}px`, opacity: targetOpen ? 1 : 0, paddingBottom: toPadding },
      ], { duration: 320, easing });
      animation.onfinish = () => { details.open = targetOpen; animation = null; };
    });
    motion.addEventListener('change', () => {
      animation?.cancel();
      details.open = targetOpen;
    });
  });
}

function initCourses() {
  const tablist = document.querySelector('.course-tabs');
  const tabs = [...tablist.querySelectorAll('a')];
  const panels = tabs.map(tab => document.querySelector(tab.hash));
  const indicator = document.createElement('span');
  indicator.className = 'course-selection';
  indicator.setAttribute('aria-hidden', 'true');
  tablist.append(indicator);
  let selected = 0;
  let animation;
  function positionIndicator() {
    indicator.style.height = `${tabs[selected].offsetHeight}px`;
    indicator.style.transform = `translateY(${tabs[selected].offsetTop}px)`;
  }
  function select(index, animate = true) {
    animation?.cancel();
    selected = index;
    tabs.forEach((tab, i) => {
      tab.setAttribute('aria-selected', String(i === index));
      tab.tabIndex = i === index ? 0 : -1;
      panels[i].hidden = i !== index;
    });
    positionIndicator();
    if (animate && !motion.matches && typeof panels[index].animate === 'function') {
      animation = panels[index].animate([{ opacity: 0, transform: 'translateY(5px)' }, { opacity: 1, transform: 'none' }], { duration: 250, easing });
    }
  }
  tablist.setAttribute('role', 'tablist');
  tablist.setAttribute('aria-orientation', 'vertical');
  tabs.forEach((tab, index) => {
    tab.setAttribute('role', 'tab');
    tab.setAttribute('aria-controls', panels[index].id);
    panels[index].setAttribute('role', 'tabpanel');
    panels[index].setAttribute('aria-labelledby', tab.id);
    panels[index].tabIndex = 0;
    tab.addEventListener('click', event => { event.preventDefault(); select(index); });
    tab.addEventListener('keydown', event => {
      let next;
      if (event.key === 'ArrowDown') next = (index + 1) % tabs.length;
      else if (event.key === 'ArrowUp') next = (index - 1 + tabs.length) % tabs.length;
      else if (event.key === 'Home') next = 0;
      else if (event.key === 'End') next = tabs.length - 1;
      else if (event.key === ' ') { event.preventDefault(); select(index); return; }
      else return;
      event.preventDefault();
      select(next);
      tabs[next].focus();
    });
  });
  document.querySelector('.course-layout').classList.add('courses-enhanced');
  const initial = panels.findIndex(panel => `#${panel.id}` === location.hash);
  select(initial < 0 ? 0 : initial, false);
  addEventListener('hashchange', () => {
    const index = panels.findIndex(panel => `#${panel.id}` === location.hash);
    if (index >= 0) select(index);
  });
  if ('ResizeObserver' in window) new ResizeObserver(positionIndicator).observe(tablist);
  else addEventListener('resize', positionIndicator, { passive: true });
  motion.addEventListener('change', () => { if (motion.matches) animation?.cancel(); });
}

export function initPortfolio(items = site.portfolio) {
  if (!items.length) return;
  const section = document.querySelector('.portfolio');
  const filters = section.querySelector('.portfolio-filters');
  const grid = section.querySelector('.portfolio-grid');
  const dialog = document.querySelector('.lightbox');
  const image = dialog.querySelector('img');
  const caption = dialog.querySelector('#lightbox-caption');
  const count = dialog.querySelector('.lightbox-count');
  let visible = items;
  let selected = 0;
  let trigger;
  function showImage(index) {
    selected = (index + visible.length) % visible.length;
    const item = visible[selected];
    image.src = item.image;
    image.alt = item.alt;
    caption.textContent = item.caption;
    count.textContent = `${selected + 1} / ${visible.length}`;
    if (!motion.matches && typeof image.animate === 'function') image.animate([{ opacity: .3 }, { opacity: 1 }], { duration: 200 });
  }
  function open(index, button) {
    trigger = button;
    showImage(index);
    dialog.showModal();
    document.body.classList.add('dialog-open');
    dialog.querySelector('.lightbox-close').focus();
  }
  function render(category) {
    visible = category === 'Todos' ? items : items.filter(item => item.category === category);
    grid.replaceChildren();
    filters.querySelectorAll('button').forEach(button => button.setAttribute('aria-pressed', String(button.textContent === category)));
    visible.forEach((item, index) => {
      const button = document.createElement('button');
      button.type = 'button';
      button.className = 'portfolio-item';
      button.setAttribute('aria-label', `Abrir trabalho: ${item.caption}`);
      const thumbnail = document.createElement('img');
      thumbnail.src = item.image;
      thumbnail.alt = item.alt;
      thumbnail.loading = 'lazy';
      thumbnail.width = item.width || 800;
      thumbnail.height = item.height || 1000;
      const label = document.createElement('span');
      label.textContent = item.caption;
      button.append(thumbnail, label);
      button.addEventListener('click', () => open(index, button));
      grid.append(button);
    });
    if (!motion.matches && typeof grid.animate === 'function') grid.animate([{ opacity: .25 }, { opacity: 1 }], { duration: 220 });
  }
  ['Todos', ...site.portfolioCategories.filter(category => items.some(item => item.category === category))].forEach(category => {
    const button = document.createElement('button');
    button.type = 'button';
    button.textContent = category;
    button.addEventListener('click', () => render(category));
    filters.append(button);
  });
  dialog.querySelector('.lightbox-close').addEventListener('click', () => dialog.close());
  dialog.querySelector('[data-lightbox-prev]').addEventListener('click', () => showImage(selected - 1));
  dialog.querySelector('[data-lightbox-next]').addEventListener('click', () => showImage(selected + 1));
  dialog.addEventListener('keydown', event => {
    if (event.key === 'ArrowLeft') { event.preventDefault(); showImage(selected - 1); }
    else if (event.key === 'ArrowRight') { event.preventDefault(); showImage(selected + 1); }
    else if (event.key === 'Tab') {
      const first = dialog.querySelector('.lightbox-close');
      const last = dialog.querySelector('[data-lightbox-next]');
      if (event.shiftKey && document.activeElement === first) { event.preventDefault(); last.focus(); }
      else if (!event.shiftKey && document.activeElement === last) { event.preventDefault(); first.focus(); }
    }
  });
  dialog.addEventListener('click', event => {
    const rect = dialog.getBoundingClientRect();
    if (event.target === dialog && (event.clientX < rect.left || event.clientX > rect.right || event.clientY < rect.top || event.clientY > rect.bottom)) dialog.close();
  });
  dialog.addEventListener('close', () => { document.body.classList.remove('dialog-open'); trigger?.focus(); });
  section.hidden = false;
  document.querySelectorAll('[data-portfolio-nav]').forEach(link => { link.hidden = false; });
  render('Todos');
}

function initMotion() {
  if (!('IntersectionObserver' in window)) return;
  let observer;
  const targets = [...document.querySelectorAll('[data-reveal]')];
  function revealAll() {
    observer?.disconnect();
    targets.forEach(element => element.classList.remove('reveal-pending'));
    document.documentElement.classList.remove('motion-ready');
  }
  function setup() {
    if (motion.matches) { revealAll(); return; }
    try {
      observer = new IntersectionObserver(entries => {
        entries.forEach(entry => {
          if (entry.isIntersecting) {
            entry.target.classList.add('is-visible');
            observer.unobserve(entry.target);
          }
        });
      }, { threshold: 0.03, rootMargin: '0px 0px -20px 0px' });
      targets.forEach(element => { observer.observe(element); element.classList.add('reveal-pending'); });
      document.documentElement.classList.add('motion-ready');
      document.addEventListener('focusin', event => {
        const pending = event.target.closest('.reveal-pending');
        if (pending) { pending.classList.add('is-visible'); observer.unobserve(pending); }
      });
    } catch { revealAll(); }
  }
  setup();
  motion.addEventListener('change', () => { if (motion.matches) revealAll(); });
  addEventListener('beforeprint', revealAll);
  const navLinks = [...document.querySelectorAll('.site-nav>a[href^="#"]')].filter(link => !link.hidden);
  const activeObserver = new IntersectionObserver(entries => {
    entries.forEach(entry => {
      if (!entry.isIntersecting) return;
      navLinks.forEach(link => {
        if (link.hash === `#${entry.target.id}`) link.setAttribute('aria-current', 'location');
        else link.removeAttribute('aria-current');
      });
    });
  }, { rootMargin: '-20% 0px -60% 0px' });
  navLinks.forEach(link => { const target = document.querySelector(link.hash); if (target) activeObserver.observe(target); });
}

function initFloatingContact() {
  const floating = document.querySelector('.floating-whatsapp');
  let scheduled = false;
  function update() {
    scheduled = false;
    if (floating === document.activeElement) return;
    const rect = floating.getBoundingClientRect();
    // Yield to underlying text and controls; the section's own contact stays available.
    const points = [[rect.left + 6, rect.top + 6], [rect.right - 6, rect.top + 6], [rect.left + 6, rect.bottom - 6], [rect.right - 6, rect.bottom - 6], [rect.left + rect.width / 2, rect.top + rect.height / 2]];
    const obstructing = points.some(([x, y]) => document.elementsFromPoint(x, y).some(element => !floating.contains(element) && element.matches('p,h1,h2,h3,img,summary,a,button,li,figcaption,dt,dd,address')));
    floating.classList.toggle('is-obstructing', obstructing);
  }
  function schedule() {
    if (scheduled) return;
    scheduled = true;
    requestAnimationFrame(update);
  }
  addEventListener('scroll', schedule, { passive: true });
  addEventListener('resize', schedule, { passive: true });
  floating.addEventListener('blur', schedule);
  update();
}

// Each enhancement fails independently; the semantic HTML stays usable.
for (const initialize of [initMenu, initServices, initCourses, initPortfolio, initMotion, initFloatingContact]) {
  try { initialize(); } catch (error) { console.error('Cantinho VIP enhancement failed:', error); }
}
