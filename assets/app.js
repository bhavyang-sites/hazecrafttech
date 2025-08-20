// year
document.querySelectorAll('#year').forEach(el => el.textContent = new Date().getFullYear());

// simple tabs on Home page demo block
const tabs = document.querySelectorAll('.tab');
if (tabs.length) {
  tabs.forEach(btn => {
    btn.addEventListener('click', () => {
      tabs.forEach(b => b.classList.remove('active'));
      btn.classList.add('active');
      document.querySelectorAll('.pane').forEach(p => p.style.display = 'none');
      const target = document.querySelector(btn.dataset.target);
      if (target) target.style.display = 'block';
    });
  });
}

// smooth scroll for in-page anchors
document.querySelectorAll('a[href^="#"]').forEach(a => {
  a.addEventListener('click', e => {
    const id = a.getAttribute('href');
    if (id.length > 1) {
      const el = document.querySelector(id);
      if (el) {
        e.preventDefault();
        el.scrollIntoView({ behavior: 'smooth', block: 'start' });
        history.replaceState(null, "", id);
      }
    }
  });
});

// AJAX submit for forms marked data-ajax (works with Formspree or similar)
document.querySelectorAll('form[data-ajax]').forEach(form => {
  form.addEventListener('submit', async (e) => {
    const ok = form.querySelector('.notice.ok');
    const err = form.querySelector('.notice.err');
    ok && ok.classList.add('hidden');
    err && err.classList.add('hidden');

    // Only intercept if posting to an HTTP(S) endpoint
    if (!form.action || !/^https?:\/\//.test(form.action)) return;

    e.preventDefault();
    const data = new FormData(form);
    try {
      const res = await fetch(form.action, { method: 'POST', body: data, headers: { 'Accept': 'application/json' }});
      if (res.ok) {
        ok && ok.classList.remove('hidden');
        form.reset();
      } else {
        err && err.classList.remove('hidden');
      }
    } catch {
      err && err.classList.remove('hidden');
    }
  });
});


// copy-to-clipboard for code blocks
document.querySelectorAll('[data-copy]').forEach(btn => {
  btn.addEventListener('click', () => {
    const sel = btn.getAttribute('data-copy');
    const el = document.querySelector(sel);
    if (!el) return;
    const text = el.textContent;
    navigator.clipboard.writeText(text).then(() => {
      const prev = btn.textContent;
      btn.textContent = 'Copied!';
      setTimeout(() => (btn.textContent = prev), 1200);
    });
  });
});

// // smooth scroll for in-page anchors
// document.querySelectorAll('a[href^="#"]').forEach(a => {
//   a.addEventListener('click', e => {
//     const id = a.getAttribute('href');
//     if (id.length > 1) {
//       const el = document.querySelector(id);
//       if (el) {
//         e.preventDefault();
//         el.scrollIntoView({ behavior: 'smooth', block: 'start' });
//         history.replaceState(null, "", id);
//       }
//     }
//   });
// });

// // simple AJAX submit for forms marked data-ajax
// document.querySelectorAll('form[data-ajax]').forEach(form => {
//   form.addEventListener('submit', async (e) => {
//     const ok = form.querySelector('.notice.ok');
//     const err = form.querySelector('.notice.err');
//     ok && ok.classList.add('hidden');
//     err && err.classList.add('hidden');

//     // Use Formspree (or similar) endpoint in action attribute.
//     // If you haven't set one yet, let it do normal POST/navigation.
//     if (!form.action || !/^https?:\/\//.test(form.action)) return;

//     e.preventDefault();
//     const data = new FormData(form);
//     try {
//       const res = await fetch(form.action, { method: 'POST', body: data, headers: { 'Accept': 'application/json' }});
//       if (res.ok) {
//         ok && ok.classList.remove('hidden');
//         form.reset();
//       } else {
//         err && err.classList.remove('hidden');
//       }
//     } catch {
//       err && err.classList.remove('hidden');
//     }
//   });
// });


