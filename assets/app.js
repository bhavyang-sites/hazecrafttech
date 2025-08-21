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
});
