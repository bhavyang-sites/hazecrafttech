// assets/app.js

document.addEventListener('DOMContentLoaded', () => {
  // === Mobile menu ===
  const toggle = document.querySelector('[data-nav-toggle]');
  const nav = document.querySelector('[data-nav]');
  if (toggle && nav) {
    toggle.addEventListener('click', () => nav.classList.toggle('open'));
  }

  // === Close dropdowns on ESC / outside (desktop) ===
  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') {
      document.querySelectorAll('.menu-panel').forEach(p => p.style.display = 'none');
    }
  });
  document.addEventListener('click', (e) => {
    const inMenu = e.target.closest('.menu');
    if (!inMenu) {
      document.querySelectorAll('.menu-panel').forEach(p => p.style.display = 'none');
    }
  });
  document.addEventListener('DOMContentLoaded', () => {
    const tabs = document.querySelectorAll('.tabs .tab');
    tabs.forEach(tab => {
      tab.addEventListener('click', () => {
        tabs.forEach(t => t.classList.remove('active'));
        tab.classList.add('active');
        document.querySelectorAll('.pane').forEach(p => p.style.display='none');
        const pane = document.querySelector(tab.dataset.target);
        if (pane) pane.style.display = 'block';
      });
    });
  });

  // === Contact page: dynamic subtitle + button text (optional) ===
  const interest = document.querySelector('select[name="interest"]');
  const hint = document.getElementById('topic-hint');
  const submitBtn = document.querySelector('#hc-contact button[type="submit"]');

  const pretty = (v) => ({
    'AI Solutions': 'AI',
    'Networking': 'Networking',
    'Cloud / AKS': 'Cloud',
    'OTT / Media (SmartSkips)': 'OTT/Media',
    'Other': 'AI, Networking, Cloud, or OTT/Media'
  }[v] || 'AI, Networking, Cloud, or OTT/Media');

  if (interest && hint) {
    interest.addEventListener('change', () => {
      const area = pretty(interest.value);
      hint.textContent = area === 'AI, Networking, Cloud, or OTT/Media'
        ? area
        : `You’re asking about ${area}`;
      if (submitBtn) submitBtn.textContent = 'Send request';
    });
  }

  // === Contact page: AJAX submit to Formspree (optional) ===
  const form = document.getElementById('hc-contact');
  if (form) {
    const statusEl = document.getElementById('hc-status');
    form.addEventListener('submit', async (e) => {
      e.preventDefault();
      const btn = form.querySelector('button[type="submit"]');
      if (btn) btn.disabled = true;
      if (statusEl) statusEl.textContent = 'Sending…';

      try {
        const resp = await fetch(form.action, {
          method: 'POST',
          body: new FormData(form),
          headers: { 'Accept': 'application/json' }
        });
        if (resp.ok) {
          if (statusEl) statusEl.textContent = 'Thanks! We’ll be in touch shortly.';
          form.reset();
        } else {
          if (statusEl) statusEl.textContent = 'Could not send. Please try again.';
        }
      } catch (err) {
        console.error(err);
        if (statusEl) statusEl.textContent = 'Network error. Please try again.';
      } finally {
        if (btn) btn.disabled = false;
      }
    });
  }

// === Hero carousel ===
const carousel = document.getElementById('hero-carousel');
if (carousel) {
  const slides = Array.from(carousel.querySelectorAll('.slide'));
  const dots = Array.from(carousel.querySelectorAll('.dot'));
  let i = slides.findIndex(s => s.classList.contains('is-active'));
  if (i < 0) { i = 0; slides[0].classList.add('is-active'); dots[0]?.classList.add('is-active'); }

  const show = (idx) => {
    slides.forEach((s,k)=> s.classList.toggle('is-active', k===idx));
    dots.forEach((d,k)=> d.classList.toggle('is-active', k===idx));
    i = idx;
  };

  const next = () => show((i + 1) % slides.length);
  let timer = setInterval(next, 6000);

  // pause on hover/focus
  carousel.addEventListener('mouseenter', ()=> clearInterval(timer));
  carousel.addEventListener('mouseleave', ()=> timer = setInterval(next, 6000));
  carousel.addEventListener('focusin', ()=> clearInterval(timer));
  carousel.addEventListener('focusout', ()=> timer = setInterval(next, 6000));

  // dots click
  dots.forEach((d,k)=> d.addEventListener('click', (e)=> { e.preventDefault(); show(k); }));

  // keyboard left/right for accessibility
  carousel.addEventListener('keydown', (e)=>{
    if (e.key === 'ArrowRight') next();
    if (e.key === 'ArrowLeft') show((i - 1 + slides.length) % slides.length);
  });
}
});
