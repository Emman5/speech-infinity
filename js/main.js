/* Speech Infinity Therapy Group — site behaviour */
(function () {
  'use strict';

  /* ---- mobile nav ---- */
  var burger = document.getElementById('hamburger');
  var links = document.getElementById('navLinks');
  if (burger && links) {
    burger.addEventListener('click', function () {
      var open = links.classList.toggle('open');
      burger.classList.toggle('open', open);
      burger.setAttribute('aria-expanded', open ? 'true' : 'false');
    });
    links.addEventListener('click', function (e) {
      if (e.target.tagName === 'A') {
        links.classList.remove('open');
        burger.classList.remove('open');
      }
    });
  }

  /* ---- scroll reveal ---- */
  var targets = document.querySelectorAll('.reveal');
  if ('IntersectionObserver' in window && targets.length) {
    var io = new IntersectionObserver(function (entries) {
      entries.forEach(function (en) {
        if (en.isIntersecting) {
          en.target.classList.add('in');
          io.unobserve(en.target);
        }
      });
    }, { threshold: 0.12, rootMargin: '0px 0px -40px' });
    targets.forEach(function (t, i) {
      t.style.transitionDelay = (i % 3) * 90 + 'ms';
      io.observe(t);
    });
  } else {
    targets.forEach(function (t) { t.classList.add('in'); });
  }

  /* ---- forms ----
     Set the form's action to a Formspree (or similar) endpoint before launch.
     Until then, submission is intercepted and a friendly notice is shown. */
  document.querySelectorAll('form[data-form]').forEach(function (form) {
    form.addEventListener('submit', function (e) {
      var status = form.querySelector('.form-status');
      var action = form.getAttribute('action') || '';

      if (!action || action.indexOf('REPLACE_WITH_FORM_ENDPOINT') !== -1) {
        e.preventDefault();
        if (status) {
          status.className = 'form-status err';
          status.textContent =
            'Form endpoint not configured yet. Please email speechinfinitytg@gmail.com in the meantime.';
        }
        return;
      }

      e.preventDefault();
      var btn = form.querySelector('button[type="submit"]');
      var label = btn ? btn.textContent : '';
      if (btn) { btn.disabled = true; btn.textContent = 'Sending…'; }

      fetch(action, {
        method: 'POST',
        body: new FormData(form),
        headers: { Accept: 'application/json' }
      })
        .then(function (r) {
          if (!r.ok) throw new Error('bad response');
          form.reset();
          if (status) {
            status.className = 'form-status ok';
            status.textContent = 'Thank you — your message has been sent. We will be in touch shortly.';
          }
        })
        .catch(function () {
          if (status) {
            status.className = 'form-status err';
            status.textContent =
              'Something went wrong. Please email speechinfinitytg@gmail.com directly.';
          }
        })
        .then(function () {
          if (btn) { btn.disabled = false; btn.textContent = label; }
        });
    });
  });

  /* ---- current year ---- */
  document.querySelectorAll('[data-year]').forEach(function (el) {
    el.textContent = new Date().getFullYear();
  });
})();
