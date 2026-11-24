/* Leslie Rivera · Abogada — interacciones */
(function () {
  'use strict';

  const WHATSAPP = '51976864560';
  const header = document.getElementById('header');
  const nav = document.getElementById('nav');
  const toggle = document.getElementById('menuToggle');

  /* Medición de conversiones (funciona si se instala Google Analytics 4 / gtag) */
  const track = (name, params = {}) => {
    if (typeof window.gtag === 'function') window.gtag('event', name, params);
  };
  document.addEventListener('click', (e) => {
    const el = e.target.closest('[data-track]');
    if (el) track('contact_click', { method: el.dataset.track });
  });

  /* Año del footer */
  const year = document.getElementById('year');
  if (year) year.textContent = new Date().getFullYear();

  /* Header con sombra al hacer scroll */
  const toTop = document.getElementById('toTop');
  const onScroll = () => {
    header.classList.toggle('is-scrolled', window.scrollY > 10);
    if (toTop) toTop.classList.toggle('is-visible', window.scrollY > 700);
  };
  onScroll();
  window.addEventListener('scroll', onScroll, { passive: true });

  /* Menú móvil */
  const closeMenu = () => {
    nav.classList.remove('is-open');
    toggle.setAttribute('aria-expanded', 'false');
    toggle.setAttribute('aria-label', 'Abrir menú');
    document.body.style.overflow = '';
  };
  toggle.addEventListener('click', () => {
    const open = nav.classList.toggle('is-open');
    toggle.setAttribute('aria-expanded', String(open));
    toggle.setAttribute('aria-label', open ? 'Cerrar menú' : 'Abrir menú');
    document.body.style.overflow = open ? 'hidden' : '';
  });
  nav.querySelectorAll('a').forEach((a) => a.addEventListener('click', closeMenu));
  document.addEventListener('keydown', (e) => { if (e.key === 'Escape') closeMenu(); });
  window.addEventListener('resize', () => { if (window.innerWidth > 920) closeMenu(); });

  /* Animación de aparición */
  const reveals = document.querySelectorAll('.reveal');
  if ('IntersectionObserver' in window) {
    const io = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add('is-visible');
          io.unobserve(entry.target);
        }
      });
    }, { threshold: 0.12, rootMargin: '0px 0px -40px 0px' });
    reveals.forEach((el, i) => {
      el.style.transitionDelay = `${(i % 4) * 70}ms`;
      io.observe(el);
    });
  } else {
    reveals.forEach((el) => el.classList.add('is-visible'));
  }

  /* Enlace activo en el menú */
  const links = document.querySelectorAll('.nav__link');
  const sections = [...links].map((l) => document.querySelector(l.getAttribute('href'))).filter(Boolean);
  if ('IntersectionObserver' in window) {
    const spy = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          links.forEach((l) => l.classList.toggle('is-active', l.getAttribute('href') === `#${entry.target.id}`));
        }
      });
    }, { rootMargin: '-45% 0px -50% 0px' });
    sections.forEach((s) => spy.observe(s));
  }

  /* Formulario → WhatsApp */
  const form = document.getElementById('contactForm');
  const error = document.getElementById('formError');
  if (form) {
    form.addEventListener('submit', (e) => {
      e.preventDefault();
      const fields = ['nombre', 'telefono', 'materia', 'mensaje'].map((id) => form.elements[id]);
      const consent = form.elements.privacidad;
      const rules = {
        nombre: (v) => v.length >= 3,
        telefono: (v) => v.replace(/\D/g, '').length >= 7,
      };
      let firstInvalid = null;
      let message = 'Por favor complete todos los campos.';
      const mark = (el, ok) => {
        el.classList.toggle('is-invalid', !ok);
        el.setAttribute('aria-invalid', String(!ok));
        if (!ok && !firstInvalid) firstInvalid = el;
      };
      fields.forEach((f) => {
        const v = f.value.trim();
        const filled = v !== '';
        const ok = filled && (!rules[f.name] || rules[f.name](v));
        if (filled && !ok && !firstInvalid) message = f.name === 'telefono' ? 'Ingrese un número de teléfono válido.' : 'Ingrese su nombre completo.';
        mark(f, ok);
      });
      if (consent) {
        const wasValid = !firstInvalid;
        mark(consent, consent.checked);
        if (wasValid && !consent.checked) message = 'Debe aceptar la política de privacidad para continuar.';
      }
      error.textContent = message;
      error.hidden = !firstInvalid;
      if (firstInvalid) { firstInvalid.focus(); return; }

      const [nombre, telefono, materia, mensaje] = fields.map((f) => f.value.trim());
      const text =
        `Hola Dra. Leslie, quisiera solicitar una consulta.\n\n` +
        `*Nombre:* ${nombre}\n*Teléfono:* ${telefono}\n*Materia:* ${materia}\n*Caso:* ${mensaje}`;
      track('form_whatsapp', { materia });
      window.open(`https://wa.me/${WHATSAPP}?text=${encodeURIComponent(text)}`, '_blank', 'noopener');
      form.reset();
    });
    form.addEventListener('change', (e) => {
      if (e.target.type === 'checkbox' && e.target.checked) {
        e.target.classList.remove('is-invalid');
        e.target.setAttribute('aria-invalid', 'false');
      }
    });
    form.addEventListener('input', (e) => {
      if (e.target.classList.contains('is-invalid') && e.target.value.trim()) {
        e.target.classList.remove('is-invalid');
        e.target.setAttribute('aria-invalid', 'false');
      }
    });
  }
})();
