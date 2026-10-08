/* ==========================================================================
   Cantinho Vip · Estética e Beleza — Gelise
   JavaScript puro, sem bibliotecas. Tudo que você pode querer editar está
   no objeto CONFIG logo abaixo.
   ========================================================================== */

const CONFIG = {
  // DDI + DDD + número, só dígitos. (Número tirado do site anterior.)
  WHATSAPP_NUMBER: "5551986552232",
  INSTAGRAM_URL: "https://www.instagram.com/cantinhovip_ge/", // vazio = oculto (botão flutuante e card de contato)
  ADDRESS: "Avenida Mariluz, 630 — Imbé/RS", // vazio = oculto
  OPENING_HOURS: "",          // ex.: "Seg. a sáb., das 9h às 19h" (vazio = oculto)

  // Serviços: aparecem nos cards da seção "Serviços" e na etapa 2 do formulário.
  // id: identificador único · name: nome exibido e enviado no WhatsApp
  // desc: 1 linha para o card · icon: chave de ICONS (mais abaixo)
  SERVICES: [
    { id: "manicure",     name: "Manicure",               desc: "Mãos impecáveis, com acabamento caprichado.", icon: "polish" },
    { id: "pedicure",     name: "Pedicure",               desc: "Pés bem cuidados para se sentir leve.",        icon: "foot" },
    { id: "maos-pes",     name: "Mãos + Pés",             desc: "O combo completo de cuidado.",                 icon: "heart" },
    { id: "nail-design",  name: "Nail design",            desc: "Unhas decoradas e nail art com a sua cara.",   icon: "brush" },
    { id: "cilios",       name: "Extensão de cílios",     desc: "Lash design para valorizar o seu olhar.",      icon: "lashes" },
    { id: "sobrancelhas", name: "Design de sobrancelhas", desc: "Desenho que harmoniza o seu rosto.",           icon: "brow" },
    { id: "maquiagem",    name: "Maquiagem",              desc: "Do dia a dia aos momentos de brilhar.",        icon: "lipstick" },
    { id: "penteados",    name: "Penteados",              desc: "O toque final para a sua ocasião.",            icon: "comb" },
    { id: "cabelos",      name: "Cabelos",                desc: "Cortes e químicas em geral.",                  icon: "scissors" },
    { id: "depilacao",    name: "Depilação",              desc: "Um momento de cuidado com a sua pele.",        icon: "drop" },
    { id: "princesa",     name: "Dia de Princesa",        desc: "Um momento inteirinho dedicado a você.",       icon: "crown" },
    { id: "outro",        name: "Outro serviço",          desc: "Conte o que você procura.",                    icon: "sparkle" },
  ],

  // Ocasiões da etapa 3. event: true deixa a data obrigatória e mostra a dica de agenda.
  OCCASIONS: [
    { id: "dia-a-dia",   name: "Dia a dia / cuidado pessoal" },
    { id: "aniversario", name: "Aniversário",          event: true },
    { id: "casamento",   name: "Casamento",            event: true },
    { id: "noiva",       name: "Noiva / Madrinha",     event: true },
    { id: "formatura",   name: "Formatura",            event: true },
    { id: "festa",       name: "Festa / Balada",       event: true },
    { id: "ensaio",      name: "Ensaio fotográfico",   event: true },
    { id: "corporativo", name: "Evento corporativo",   event: true },
    { id: "outro",       name: "Outro" },
  ],

  PERIODS: ["Manhã", "Tarde", "Noite", "Tenho flexibilidade"],

  // Cursos profissionalizantes (do site anterior). Vazio = seção oculta.
  COURSES: ["Depilação", "Extensão de cílios / lash design", "Nail design", "Manicure e pedicure", "Maquiagem"],

  // Fotos reais de trabalhos. Vazio = seção oculta. Exemplo:
  // { src: "assets/galeria/unhas-1.jpg", alt: "Unhas vinho com detalhe dourado", width: 800, height: 800 }
  GALLERY_IMAGES: [],
};

/* Ícones lineares (24×24) usados nos cards e no formulário. */
const ICONS = {
  polish:   '<path d="M10 2.5h4v4h-4z"/><path d="M9 6.5h6l1.2 3V19a2.5 2.5 0 0 1-2.5 2.5h-3.4A2.5 2.5 0 0 1 7.8 19V9.5z"/><path d="M8 13h8"/>',
  foot:     '<path d="M9.5 21.5c-2.6 0-3.9-1.9-3.4-4.6.5-2.6 1.1-4.6.7-7.2-.3-2.2.9-3.6 2.7-3.3 2 .3 2.8 2.2 2.7 4.5-.1 2.5.5 4 1.4 5.6 1.3 2.6-.4 5-4.1 5z"/><circle cx="11" cy="3" r="1.3"/><circle cx="14" cy="4" r="1"/><circle cx="16.2" cy="5.8" r=".85"/><circle cx="17.6" cy="8.2" r=".75"/>',
  heart:    '<path d="M12 20s-7.5-4.6-7.5-10.2A4.2 4.2 0 0 1 12 7.2a4.2 4.2 0 0 1 7.5 2.6C19.5 15.4 12 20 12 20z"/><path d="M18.5 2.5v3M17 4h3"/>',
  brush:    '<path d="M20 3.5 10.2 13.3"/><path d="M10.2 13.3c-2-.4-3.8 1-3.8 3 0 1.5-.9 2.4-2.9 3 3 1.6 7.7 1 8.6-2 .4-1.5-.2-3.3-1.9-4z"/><path d="M14 9.5l1 1"/>',
  lashes:   '<path d="M3 10c2.6 3.3 5.6 5 9 5s6.4-1.7 9-5"/><path d="M5.5 12.6 4 15M8.6 14.2l-.8 2.7M12 15v2.8M15.4 14.2l.8 2.7M18.5 12.6 20 15"/>',
  brow:     '<path d="M3.5 9.2c3.2-3 7.6-3.9 11.8-3 2.2.5 3.8 1.4 5.2 2.6"/><path d="M4 15.5c2.2-2.4 5-3.6 8-3.6s5.8 1.2 8 3.6c-2.2 2.4-5 3.6-8 3.6s-5.8-1.2-8-3.6z"/><circle cx="12" cy="15.5" r="1.8"/>',
  lipstick: '<path d="M9 21.5h6V12H9z"/><path d="M10 12V7.5l4-3.5V12"/><path d="M7.5 21.5h9"/>',
  comb:     '<path d="M3.5 7.5h17v4h-17z"/><path d="M5.5 11.5v6M8.5 11.5v6M11.5 11.5v6M14.5 11.5v6M17.5 11.5v6"/>',
  scissors: '<circle cx="6" cy="6" r="2.8"/><circle cx="6" cy="18" r="2.8"/><path d="M8.4 7.6 20 17.5M8.4 16.4 20 6.5"/>',
  drop:     '<path d="M12 2.8c3.6 4.3 6 7.6 6 11.2a6 6 0 0 1-12 0c0-3.6 2.4-6.9 6-11.2z"/><path d="M9.4 15a2.6 2.6 0 0 0 2.6 2.6"/>',
  crown:    '<path d="M3 8l4.5 4L12 5l4.5 7L21 8l-2 10H5z"/><path d="M5 21h14"/>',
  sparkle:  '<path d="M11 3c.6 4.4 2.8 6.6 7.2 7.2-4.4.6-6.6 2.8-7.2 7.2-.6-4.4-2.8-6.6-7.2-7.2C8.2 9.6 10.4 7.4 11 3z"/><path d="M19 15v5M16.5 17.5h5"/>',
};

(() => {
  "use strict";

  /* ---------- Utilidades ---------- */
  const $ = (sel, root = document) => root.querySelector(sel);
  const $$ = (sel, root = document) => Array.from(root.querySelectorAll(sel));
  const media = (q) => window.matchMedia(q);
  const reducedMotion = media("(prefers-reduced-motion: reduce)");
  const finePointer = media("(hover: hover) and (pointer: fine)");
  const escapeHtml = (s) => String(s).replace(/[&<>"']/g, (c) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" }[c]));
  const icon = (key) => `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">${ICONS[key] || ICONS.sparkle}</svg>`;
  const store = {
    get(k) { try { return localStorage.getItem(k); } catch (e) { return null; } },
    set(k, v) { try { localStorage.setItem(k, v); } catch (e) { /* armazenamento indisponível */ } },
  };

  const waNumber = String(CONFIG.WHATSAPP_NUMBER || "").replace(/\D/g, "");
  if (!/^\d{10,15}$/.test(waNumber) || /X/i.test(CONFIG.WHATSAPP_NUMBER)) {
    console.warn("[Cantinho Vip] CONFIG.WHATSAPP_NUMBER ainda é um placeholder. Preencha com DDI+DDD+número (só dígitos) em js/script.js.");
  }
  /** Monta o link do WhatsApp com a mensagem já codificada. */
  const waLink = (text) => `https://wa.me/${waNumber}${text ? `?text=${encodeURIComponent(text)}` : ""}`;

  /* ---------- Intro (1ª visita) ---------- */
  function initIntro() {
    const root = document.documentElement;
    if (!root.classList.contains("show-intro")) return;
    store.set("cv-intro-vista", "1");
    const finish = () => {
      if (root.classList.contains("intro-done")) return;
      root.classList.add("intro-done");
      setTimeout(() => $(".intro")?.remove(), 500);
    };
    setTimeout(finish, 1150);
    ["pointerdown", "keydown", "wheel", "touchstart"].forEach((ev) => window.addEventListener(ev, finish, { once: true, passive: true }));
  }

  /* ---------- Header + menu ---------- */
  function initHeader() {
    const header = $(".site-header");
    const toggle = $(".menu-toggle");
    const nav = $("#site-nav");
    const root = document.documentElement;
    const desktop = media("(min-width: 960px)");

    const onScroll = () => header.classList.toggle("is-scrolled", window.scrollY > 24);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });

    const focusables = () => [toggle, ...$$("a", nav)];
    const setOpen = (open) => {
      root.classList.toggle("menu-open", open);
      toggle.setAttribute("aria-expanded", String(open));
      toggle.setAttribute("aria-label", open ? "Fechar menu" : "Abrir menu");
      if (open) setTimeout(() => $("a", nav)?.focus(), 80);
    };
    toggle.addEventListener("click", () => setOpen(!root.classList.contains("menu-open")));
    nav.addEventListener("click", (e) => { if (e.target.closest("a")) setOpen(false); });
    document.addEventListener("keydown", (e) => {
      if (!root.classList.contains("menu-open")) return;
      if (e.key === "Escape") { setOpen(false); toggle.focus(); }
      if (e.key === "Tab") { // foco preso dentro do menu
        const items = focusables();
        const first = items[0], last = items[items.length - 1];
        if (e.shiftKey && document.activeElement === first) { e.preventDefault(); last.focus(); }
        else if (!e.shiftKey && document.activeElement === last) { e.preventDefault(); first.focus(); }
      }
    });
    desktop.addEventListener("change", () => setOpen(false));

    // Link ativo conforme a seção visível
    const links = $$("ul a", nav);
    const sections = links.map((a) => $(a.getAttribute("href"))).filter(Boolean);
    if ("IntersectionObserver" in window) {
      const io = new IntersectionObserver((entries) => {
        entries.forEach((en) => {
          if (!en.isIntersecting) return;
          links.forEach((a) => a.classList.toggle("is-active", a.getAttribute("href") === `#${en.target.id}`));
        });
      }, { rootMargin: "-45% 0px -50% 0px" });
      sections.forEach((s) => io.observe(s));
    }
  }

  /* ---------- Serviços (cards) ---------- */
  function renderServices(onPick) {
    const grid = $("#services-grid");
    grid.innerHTML = CONFIG.SERVICES.map((s) => `
      <button class="service-card" type="button" data-service="${escapeHtml(s.id)}" data-reveal>
        <span class="service-icon">${icon(s.icon)}</span>
        <span class="service-name">${escapeHtml(s.name)}</span>
        <span class="service-desc">${escapeHtml(s.desc)}</span>
        <span class="service-cta">Agendar <svg aria-hidden="true"><use href="#i-arrow"/></svg></span>
      </button>`).join("");
    grid.addEventListener("click", (e) => {
      const card = e.target.closest(".service-card");
      if (card) onPick(card.dataset.service);
    });
  }

  /* ---------- Cursos ---------- */
  function renderCourses() {
    const list = CONFIG.COURSES || [];
    if (!list.length) return;
    $("#course-list").innerHTML = list.map((c) => `<li>${escapeHtml(c)}</li>`).join("");
    $("#courses-cta").href = waLink("Olá, Gelise! ✨ Vim pelo site do Cantinho Vip e tenho interesse nos cursos profissionalizantes. Pode me passar mais informações?");
    $("#cursos").hidden = false;
  }

  /* ---------- Contato ---------- */
  function renderContact() {
    const items = [];
    const phone = waNumber.replace(/^55(\d{2})(\d{4,5})(\d{4})$/, "($1) $2-$3");
    if (CONFIG.ADDRESS) {
      items.push({ icon: "i-pin", title: "Endereço", text: CONFIG.ADDRESS, cta: "Como chegar", href: `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(CONFIG.ADDRESS)}` });
    }
    if (waNumber) items.push({ icon: "i-whatsapp", title: "WhatsApp", text: phone, cta: "Chamar no WhatsApp", href: waLink("Olá, Gelise! ✨ Vim pelo site do Cantinho Vip.") });
    if (CONFIG.OPENING_HOURS) items.push({ icon: "i-clock", title: "Horário de atendimento", text: CONFIG.OPENING_HOURS });
    if (CONFIG.INSTAGRAM_URL) {
      const handle = CONFIG.INSTAGRAM_URL.replace(/^https?:\/\/(www\.)?instagram\.com\//i, "@").replace(/\/+$/, "");
      items.push({ icon: "i-instagram", title: "Instagram", text: handle, cta: "Seguir no Instagram", href: CONFIG.INSTAGRAM_URL });
    }
    $("#contact-grid").innerHTML = items.map((it) => `
      <li data-reveal>
        <div class="contact-card">
          <span class="contact-icon"><svg aria-hidden="true"><use href="#${it.icon}"/></svg></span>
          <h3>${escapeHtml(it.title)}</h3>
          <p>${escapeHtml(it.text)}</p>
          ${it.href ? `<a class="btn btn-outline btn-sm" href="${escapeHtml(it.href)}" target="_blank" rel="noopener"><span>${escapeHtml(it.cta)}</span></a>` : ""}
        </div>
      </li>`).join("");
  }

  /* ---------- Galeria + lightbox ---------- */
  function renderGallery() {
    const imgs = CONFIG.GALLERY_IMAGES || [];
    if (!imgs.length) return;
    $("#galeria").hidden = false;
    const grid = $("#gallery-grid");
    grid.innerHTML = imgs.map((im, i) => `
      <li data-reveal><button type="button" data-index="${i}" aria-label="Ampliar: ${escapeHtml(im.alt || "foto")}">
        <img src="${escapeHtml(im.src)}" alt="${escapeHtml(im.alt || "")}" width="${im.width || 600}" height="${im.height || 600}" loading="lazy" decoding="async">
      </button></li>`).join("");

    const dlg = $("#lightbox");
    const img = $(".lb-img", dlg);
    let index = 0, opener = null;
    const show = (i) => {
      index = (i + imgs.length) % imgs.length;
      img.src = imgs[index].src;
      img.alt = imgs[index].alt || "";
    };
    grid.addEventListener("click", (e) => {
      const b = e.target.closest("button[data-index]");
      if (!b) return;
      opener = b;
      show(Number(b.dataset.index));
      dlg.showModal();
    });
    $(".lb-close", dlg).addEventListener("click", () => dlg.close());
    $(".lb-prev", dlg).addEventListener("click", () => show(index - 1));
    $(".lb-next", dlg).addEventListener("click", () => show(index + 1));
    dlg.addEventListener("keydown", (e) => {
      if (e.key === "ArrowLeft") show(index - 1);
      if (e.key === "ArrowRight") show(index + 1);
    });
    dlg.addEventListener("click", (e) => { if (e.target === dlg) dlg.close(); });
    dlg.addEventListener("close", () => opener?.focus());
    const single = imgs.length < 2;
    $$(".lb-nav", dlg).forEach((b) => { b.hidden = single; });
  }

  /* ======================================================================
     FORMULÁRIO DE AGENDAMENTO (wizard em 5 etapas)
     ====================================================================== */
  function initWizard() {
    const TOTAL = 5;
    const form = $("#booking-form");
    const steps = $$(".wz-step", form);
    const backBtn = $("#wz-back");
    const nextBtn = $("#wz-next");
    const sendBtn = $("#send-whatsapp");
    const reopenBtn = $("#reopen-whatsapp");
    const live = $("#wz-live");
    const wizard = $("#wizard");
    const thanks = $("#wz-thanks");

    const state = { name: "", services: new Set(), serviceOther: "", occasion: "", occasionOther: "", date: "", period: "", notes: "" };
    let current = 1;

    const serviceById = (id) => CONFIG.SERVICES.find((s) => s.id === id);
    const occasionById = (id) => CONFIG.OCCASIONS.find((o) => o.id === id);
    const firstName = () => state.name.trim().split(/\s+/)[0] || "";
    const isEvent = () => Boolean(occasionById(state.occasion)?.event);

    // --- Renderiza as opções a partir do CONFIG ---
    $("#service-choices").innerHTML = CONFIG.SERVICES.map((s) => `
      <label class="choice">
        <input type="checkbox" name="services" value="${escapeHtml(s.id)}">
        <span class="choice-body">
          <span class="choice-icon">${icon(s.icon)}</span>
          <span class="choice-label">${escapeHtml(s.name)}</span>
          <span class="choice-check"><svg aria-hidden="true"><use href="#i-check"/></svg></span>
        </span>
      </label>`).join("");
    $("#occasion-choices").innerHTML = CONFIG.OCCASIONS.map((o) => `
      <label class="chip"><input type="radio" name="occasion" value="${escapeHtml(o.id)}"><span>${escapeHtml(o.name)}</span></label>`).join("");
    $("#period-choices").innerHTML = CONFIG.PERIODS.map((p) => `
      <label class="chip"><input type="radio" name="period" value="${escapeHtml(p)}" aria-describedby="err-period"><span>${escapeHtml(p)}</span></label>`).join("");

    // Data mínima = hoje (fuso local)
    const today = new Date();
    const pad = (n) => String(n).padStart(2, "0");
    const todayISO = `${today.getFullYear()}-${pad(today.getMonth() + 1)}-${pad(today.getDate())}`;
    $("#f-date").min = todayISO;
    const formatDate = (iso) => { const [y, m, d] = iso.split("-"); return `${d}/${m}/${y}`; };

    // --- Textos derivados do estado ---
    const servicesText = () => CONFIG.SERVICES
      .filter((s) => state.services.has(s.id))
      .map((s) => (s.id === "outro" ? (state.serviceOther.trim() ? `Outro: ${state.serviceOther.trim()}` : "Outro serviço") : s.name))
      .join(", ");
    const occasionText = () => {
      const o = occasionById(state.occasion);
      if (!o) return "";
      return o.id === "outro" ? (state.occasionOther.trim() ? `Outro: ${state.occasionOther.trim()}` : "Outro") : o.name;
    };
    const dateText = () => (state.date ? formatDate(state.date) : "A combinar");

    /** Mensagem final enviada ao WhatsApp. */
    function buildMessage() {
      const lines = [
        "Olá, Gelise! ✨ Vim pelo site do Cantinho Vip e gostaria de agendar.",
        "",
        `👤 *Nome:* ${state.name.trim().replace(/\s+/g, " ")}`,
        `💅 *Serviços:* ${servicesText()}`,
        `🎉 *Ocasião:* ${occasionText()}`,
        `📅 *Data desejada:* ${dateText()}`,
        `⏰ *Período:* ${state.period}`,
      ];
      if (state.notes.trim()) lines.push(`📝 *Observações:* ${state.notes.trim()}`);
      lines.push("", "Aguardo seu retorno! 💖");
      return lines.join("\n");
    }

    // --- Resumo ao vivo + link do botão final (sempre atualizado) ---
    const summaryRows = [
      ["name", "Nome", () => state.name.trim()],
      ["services", "Serviços", servicesText],
      ["occasion", "Ocasião", occasionText],
      ["date", "Data", () => (state.date ? formatDate(state.date) : "")],
      ["period", "Período", () => state.period],
      ["notes", "Observações", () => state.notes.trim()],
    ];
    const summaryList = $("#summary-list");
    summaryList.innerHTML = summaryRows.map(([key, label]) => `<div class="summary-row"><dt>${label}</dt><dd data-sum="${key}" class="is-empty">—</dd></div>`).join("");
    const lastSummary = {};

    function refresh() {
      summaryRows.forEach(([key, , get]) => {
        const val = get();
        if (lastSummary[key] === val) return;
        lastSummary[key] = val;
        const dd = $(`[data-sum="${key}"]`, summaryList);
        dd.textContent = val || "—";
        dd.classList.toggle("is-empty", !val);
        dd.classList.remove("flash"); void dd.offsetWidth; dd.classList.add("flash");
      });
      const href = waLink(buildMessage());
      sendBtn.href = href;
      reopenBtn.href = href;
      // Saudação pelo nome
      const n = firstName();
      $$("[data-greet]").forEach((el) => { el.textContent = n ? el.dataset.greet.replace("{nome}", n) : ""; });
      $$("[data-name-slot]").forEach((el) => { el.textContent = n || "linda"; });
      // Campos condicionais
      $("#service-other-wrap").hidden = !state.services.has("outro");
      $("#occasion-other-wrap").hidden = state.occasion !== "outro";
      $("#event-tip").hidden = !isEvent();
      $("#date-optional").hidden = isEvent();
      $("#f-date").required = isEvent();
    }

    // --- Validação por etapa ---
    const setError = (id, msg, field) => {
      const el = $(`#${id}`);
      el.textContent = msg || "";
      if (field) field.setAttribute("aria-invalid", msg ? "true" : "false");
    };
    function validate(step) {
      if (step === 1) {
        const f = $("#f-name");
        if (state.name.trim().length < 2) { setError("err-name", "Me conta seu nome, por favor (pelo menos 2 letras) 💛", f); return f; }
        setError("err-name", "", f);
      }
      if (step === 2) {
        const other = $("#f-service-other");
        if (!state.services.size) { setError("err-services", "Escolha pelo menos um serviço para continuar."); return $("input[name=services]", form); }
        if (state.services.has("outro") && state.serviceOther.trim().length < 2) { setError("err-services", "Conte rapidinho qual é o outro serviço.", other); return other; }
        setError("err-services", "", other);
      }
      if (step === 3) {
        const other = $("#f-occasion-other");
        if (!state.occasion) { setError("err-occasion", "Escolha a ocasião. Se não tiver uma especial, é só marcar “Dia a dia”."); return $("input[name=occasion]", form); }
        if (state.occasion === "outro" && state.occasionOther.trim().length < 2) { setError("err-occasion", "Conte qual é a ocasião.", other); return other; }
        setError("err-occasion", "", other);
      }
      if (step === 4) {
        const date = $("#f-date");
        let bad = null;
        if (isEvent() && !state.date) { setError("err-date", "Para eventos, informe a data desejada.", date); bad = date; }
        else if (state.date && state.date < todayISO) { setError("err-date", "Escolha uma data a partir de hoje.", date); bad = date; }
        else setError("err-date", "", date);
        if (!state.period) { setError("err-period", "Escolha o período que fica melhor para você."); bad = bad || $("input[name=period]", form); }
        else setError("err-period", "");
        if (bad) return bad;
      }
      return null;
    }

    // --- Navegação entre etapas ---
    function focusStep(stepEl) {
      const n = Number(stepEl.dataset.step);
      const target = n === TOTAL ? sendBtn : n === 1 ? $("#f-name") : n === 4 ? $("#f-date") : ($("input:checked", stepEl) || $("input", stepEl));
      target?.focus({ preventScroll: true });
      // Garante que o topo do cartão esteja visível (principalmente no celular)
      const rect = wizard.getBoundingClientRect();
      if (rect.top < 60 || rect.top > window.innerHeight * .5) {
        window.scrollTo({ top: window.scrollY + rect.top - 84, behavior: reducedMotion.matches ? "auto" : "smooth" });
      }
    }

    function go(step, { focus = true } = {}) {
      const dir = step > current ? "enter-next" : "enter-prev";
      current = Math.max(1, Math.min(TOTAL, step));
      steps.forEach((s) => {
        const active = Number(s.dataset.step) === current;
        s.hidden = !active;
        s.classList.remove("enter-next", "enter-prev");
        if (active && focus) { void s.offsetWidth; s.classList.add(dir); }
      });
      const stepEl = steps[current - 1];
      $("#wz-step-label").textContent = `Etapa ${current} de ${TOTAL}`;
      $("#wz-step-name").textContent = stepEl.dataset.name;
      $(".wz-track").setAttribute("aria-valuenow", String(current));
      $(".wz-fill").style.transform = `scaleX(${current / TOTAL})`;
      backBtn.hidden = current === 1;
      nextBtn.hidden = current === TOTAL;
      if (current === TOTAL) renderReview();
      if (focus) {
        live.textContent = `Etapa ${current} de ${TOTAL}: ${stepEl.querySelector("legend").textContent.trim()}`;
        focusStep(stepEl);
      }
    }

    function next() {
      const bad = validate(current);
      if (bad) { bad.focus(); return; }
      go(current + 1);
    }

    function renderReview() {
      const rows = [
        ["Nome", state.name.trim(), 1],
        ["Serviços", servicesText(), 2],
        ["Ocasião", occasionText(), 3],
        ["Data desejada", dateText(), 4],
        ["Período", state.period, 4],
      ];
      if (state.notes.trim()) rows.push(["Observações", state.notes.trim(), 4]);
      $("#review-list").innerHTML = rows.map(([label, val, step]) => `
        <div class="review-row"><dt>${label}</dt><dd>${escapeHtml(val)}</dd>
        <button class="review-edit" type="button" data-goto="${step}" aria-label="Editar ${label.toLowerCase()}">Editar</button></div>`).join("");
    }

    // --- Eventos dos campos ---
    form.addEventListener("input", (e) => {
      const t = e.target;
      if (t.id === "f-name") state.name = t.value;
      if (t.id === "f-service-other") state.serviceOther = t.value;
      if (t.id === "f-occasion-other") state.occasionOther = t.value;
      if (t.id === "f-date") state.date = t.value;
      if (t.id === "f-notes") state.notes = t.value;
      refresh();
    });
    form.addEventListener("change", (e) => {
      const t = e.target;
      if (t.name === "services") {
        t.checked ? state.services.add(t.value) : state.services.delete(t.value);
        syncCards();
        if (t.value === "outro" && t.checked) setTimeout(() => $("#f-service-other").focus(), 50);
      }
      if (t.name === "occasion") {
        state.occasion = t.value;
        if (t.value === "outro") setTimeout(() => $("#f-occasion-other").focus(), 50);
      }
      if (t.name === "period") state.period = t.value;
      if (t.id === "f-date") state.date = t.value;
      refresh();
    });
    form.addEventListener("submit", (e) => { e.preventDefault(); if (current < TOTAL) next(); });
    // Enter avança (exceto no campo de observações)
    form.addEventListener("keydown", (e) => {
      if (e.key !== "Enter" || e.shiftKey || e.isComposing) return;
      const t = e.target;
      if (t.tagName === "TEXTAREA" || t.tagName === "BUTTON" || t.tagName === "A") return;
      e.preventDefault();
      if (current < TOTAL) next();
    });
    backBtn.addEventListener("click", () => go(current - 1));
    $("#review-list").addEventListener("click", (e) => {
      const b = e.target.closest("[data-goto]");
      if (b) go(Number(b.dataset.goto));
    });

    // --- Envio: o botão é um <a> com href atualizado ao vivo ---
    sendBtn.addEventListener("click", () => {
      burst(sendBtn);
      setTimeout(() => {
        form.hidden = true;
        $(".wz-progress", wizard).hidden = true;
        thanks.hidden = false;
        thanks.focus({ preventScroll: true });
        live.textContent = `Quase lá, ${firstName()}! Sua solicitação foi montada.`;
      }, 250);
    });
    $("#wz-restart").addEventListener("click", () => {
      form.reset();
      Object.assign(state, { name: "", serviceOther: "", occasion: "", occasionOther: "", date: "", period: "", notes: "" });
      state.services.clear();
      syncCards();
      $$("[aria-invalid]", form).forEach((f) => f.removeAttribute("aria-invalid"));
      $$(".wz-error", form).forEach((el) => { el.textContent = ""; });
      thanks.hidden = true;
      form.hidden = false;
      $(".wz-progress", wizard).hidden = false;
      refresh();
      go(1);
    });

    // --- Integração com os cards de serviço ---
    function syncCards() {
      $$(".service-card").forEach((c) => c.classList.toggle("is-picked", state.services.has(c.dataset.service)));
    }
    function pickService(id) {
      if (!serviceById(id)) return;
      if (!thanks.hidden) $("#wz-restart").click(); // pedido anterior já enviado: começa um novo
      const input = $(`input[name=services][value="${CSS.escape(id)}"]`, form);
      if (input && !input.checked) { input.checked = true; state.services.add(id); }
      syncCards();
      refresh();
      setError("err-services", "");
      live.textContent = `${serviceById(id).name} incluído no seu pedido.`;
      const section = $("#agendar");
      section.scrollIntoView({ behavior: reducedMotion.matches ? "auto" : "smooth", block: "start" });
      // Foca o campo atual sem pular a rolagem suave
      setTimeout(() => {
        const stepEl = steps[current - 1];
        ($("input.field", stepEl) || $("input", stepEl))?.focus({ preventScroll: true });
      }, reducedMotion.matches ? 0 : 600);
    }

    refresh();
    go(1, { focus: false });
    return { pickService };
  }

  /* ---------- Confete de brilhos dourados ---------- */
  function burst(el) {
    if (reducedMotion.matches || !el.animate) return;
    const r = el.getBoundingClientRect();
    const cx = r.left + r.width / 2, cy = r.top + r.height / 2;
    for (let i = 0; i < 26; i++) {
      const s = document.createElement("span");
      s.className = "burst";
      s.innerHTML = '<svg aria-hidden="true"><use href="#i-sparkle"/></svg>';
      s.style.left = `${cx}px`;
      s.style.top = `${cy}px`;
      document.body.appendChild(s);
      const a = Math.random() * Math.PI * 2;
      const d = 60 + Math.random() * 140;
      const sc = .4 + Math.random() * .9;
      s.animate([
        { transform: "translate(0,0) scale(.2) rotate(0deg)", opacity: 1 },
        { transform: `translate(${Math.cos(a) * d}px, ${Math.sin(a) * d - 30}px) scale(${sc}) rotate(${Math.random() * 180}deg)`, opacity: 0 },
      ], { duration: 900 + Math.random() * 500, easing: "cubic-bezier(.22,1,.36,1)" }).onfinish = () => s.remove();
    }
  }

  /* ---------- Revelação ao rolar (com stagger entre irmãos) ---------- */
  function initReveal() {
    if (!("IntersectionObserver" in window)) return;
    $$("[data-stagger]").forEach((group) => {
      $$(":scope > [data-reveal]", group).forEach((el, i) => el.style.setProperty("--i", String(i % 8)));
    });
    const io = new IntersectionObserver((entries) => {
      entries.forEach((en) => {
        if (en.isIntersecting) { en.target.classList.add("is-in"); io.unobserve(en.target); }
      });
    }, { rootMargin: "0px 0px -8% 0px", threshold: .12 });
    $$("[data-reveal]").forEach((el) => io.observe(el));
    document.documentElement.classList.add("reveal-on");
  }

  /* ---------- Partículas douradas no hero (canvas leve) ---------- */
  function initParticles() {
    const canvas = $(".hero-particles");
    if (!canvas || reducedMotion.matches || !canvas.getContext) return;
    const ctx = canvas.getContext("2d");
    const hero = $(".hero");
    const dpr = Math.min(window.devicePixelRatio || 1, 2);
    let w = 0, h = 0, parts = [], running = false, visible = true, raf = 0;

    // Sprite de brilho pré-renderizado (barato de desenhar)
    const sprite = document.createElement("canvas");
    sprite.width = sprite.height = 64;
    const sx = sprite.getContext("2d");
    const g = sx.createRadialGradient(32, 32, 0, 32, 32, 32);
    g.addColorStop(0, "rgba(251,239,200,1)");
    g.addColorStop(.25, "rgba(243,217,139,.75)");
    g.addColorStop(1, "rgba(212,175,55,0)");
    sx.fillStyle = g;
    sx.fillRect(0, 0, 64, 64);

    const make = () => ({
      x: Math.random() * w, y: Math.random() * h,
      r: 2 + Math.random() * 5,
      vy: -(.08 + Math.random() * .25), vx: (Math.random() - .5) * .12,
      t: Math.random() * Math.PI * 2, ts: .008 + Math.random() * .02,
      star: Math.random() < .22,
    });
    function resize() {
      const rect = hero.getBoundingClientRect();
      w = rect.width; h = rect.height;
      canvas.width = Math.round(w * dpr); canvas.height = Math.round(h * dpr);
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
      const count = window.innerWidth < 768 ? 18 : 40;
      parts = Array.from({ length: count }, make);
    }
    function drawStar(x, y, s, a) {
      ctx.save();
      ctx.globalAlpha = a;
      ctx.fillStyle = "#F6E3A1";
      ctx.beginPath();
      ctx.moveTo(x, y - s);
      ctx.quadraticCurveTo(x, y, x + s, y);
      ctx.quadraticCurveTo(x, y, x, y + s);
      ctx.quadraticCurveTo(x, y, x - s, y);
      ctx.quadraticCurveTo(x, y, x, y - s);
      ctx.fill();
      ctx.restore();
    }
    function frame() {
      ctx.clearRect(0, 0, w, h);
      for (const p of parts) {
        p.t += p.ts; p.x += p.vx; p.y += p.vy;
        if (p.y < -10) { p.y = h + 10; p.x = Math.random() * w; }
        if (p.x < -10) p.x = w + 10; else if (p.x > w + 10) p.x = -10;
        const a = .25 + (Math.sin(p.t) + 1) * .35;
        if (p.star) drawStar(p.x, p.y, p.r * 1.3, a);
        else { ctx.globalAlpha = a; ctx.drawImage(sprite, p.x - p.r * 2, p.y - p.r * 2, p.r * 4, p.r * 4); }
      }
      ctx.globalAlpha = 1;
      raf = requestAnimationFrame(frame);
    }
    const update = () => {
      const should = visible && !document.hidden;
      if (should && !running) { running = true; raf = requestAnimationFrame(frame); }
      else if (!should && running) { running = false; cancelAnimationFrame(raf); }
    };
    resize();
    let rt;
    window.addEventListener("resize", () => { clearTimeout(rt); rt = setTimeout(resize, 200); });
    new IntersectionObserver(([en]) => { visible = en.isIntersecting; update(); }).observe(hero);
    document.addEventListener("visibilitychange", update);
    update();
  }

  /* ---------- Parallax leve (desktop) ---------- */
  function initParallax() {
    const els = $$("[data-parallax]");
    if (!els.length) return;
    const desktop = media("(min-width: 1024px)");
    let ticking = false;
    const apply = () => {
      ticking = false;
      const on = desktop.matches && !reducedMotion.matches;
      const y = Math.min(window.scrollY, window.innerHeight);
      els.forEach((el) => { el.style.transform = on ? `translate3d(0, ${(y * Number(el.dataset.parallax)).toFixed(1)}px, 0)` : ""; });
    };
    window.addEventListener("scroll", () => { if (!ticking) { ticking = true; requestAnimationFrame(apply); } }, { passive: true });
    desktop.addEventListener("change", apply);
    apply();
  }

  /* ---------- Cards: brilho que segue o mouse + inclinação 3D ---------- */
  function initCardFX() {
    const grid = $("#services-grid");
    grid.addEventListener("pointermove", (e) => {
      const card = e.target.closest(".service-card");
      if (!card || e.pointerType !== "mouse") return;
      const r = card.getBoundingClientRect();
      const x = e.clientX - r.left, y = e.clientY - r.top;
      card.style.setProperty("--mx", `${x}px`);
      card.style.setProperty("--my", `${y}px`);
      if (finePointer.matches && !reducedMotion.matches) {
        const rx = ((y / r.height) - .5) * -7;
        const ry = ((x / r.width) - .5) * 7;
        card.style.transform = `perspective(900px) rotateX(${rx.toFixed(2)}deg) rotateY(${ry.toFixed(2)}deg) translateY(-4px)`;
      }
    });
    grid.addEventListener("pointerout", (e) => {
      const card = e.target.closest(".service-card");
      if (card && !card.contains(e.relatedTarget)) card.style.transform = "";
    });
  }

  /* ---------- Botões magnéticos (desktop) ---------- */
  function initMagnetic() {
    if (!finePointer.matches || reducedMotion.matches) return;
    $$(".magnetic").forEach((btn) => {
      btn.addEventListener("pointermove", (e) => {
        const r = btn.getBoundingClientRect();
        const dx = (e.clientX - r.left - r.width / 2) / (r.width / 2);
        const dy = (e.clientY - r.top - r.height / 2) / (r.height / 2);
        btn.style.transform = `translate(${(dx * 5).toFixed(1)}px, ${(dy * 4).toFixed(1)}px)`;
      });
      btn.addEventListener("pointerleave", () => { btn.style.transform = ""; });
    });
  }

  /* ---------- WhatsApp flutuante: some quando o formulário está na tela ---------- */
  function initFloatingWA() {
    const fab = $("#wa-float");
    fab.href = waLink("Olá, Gelise! ✨ Vim pelo site do Cantinho Vip.");
    // Instagram flutuante: some se CONFIG.INSTAGRAM_URL estiver vazio
    const ig = $("#ig-float");
    if (CONFIG.INSTAGRAM_URL) ig.href = CONFIG.INSTAGRAM_URL; else ig.remove();
    const floats = [fab, ig].filter((el) => el.isConnected);
    if (!("IntersectionObserver" in window)) return;
    new IntersectionObserver(([en]) => floats.forEach((el) => el.classList.toggle("is-hidden", en.isIntersecting)), { threshold: .15 }).observe($("#agendar .booking-layout"));
  }

  /* ---------- Inicialização ---------- */
  initIntro();
  initHeader();
  const wizard = initWizard();
  renderServices((id) => wizard.pickService(id));
  renderCourses();
  renderGallery();
  renderContact();
  initReveal();
  initParticles();
  initParallax();
  initCardFX();
  initMagnetic();
  initFloatingWA();
  $("#year").textContent = String(new Date().getFullYear());
})();
