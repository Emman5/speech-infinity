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
     Submissions POST to the Technical Creations forms Worker, which emails
     them to the practice. The endpoint lives in each form's action attribute. */
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
          return r.json().catch(function () { return {}; }).then(function (data) {
            if (!r.ok) {
              throw new Error(
                data.error || 'Something went wrong. Please email speechinfinitytg@gmail.com directly.'
              );
            }
            return data;
          });
        })
        .then(function (data) {
          form.reset();
          if (status) {
            status.className = 'form-status ok';
            status.textContent =
              (data && data.message) ||
              form.getAttribute('data-success') ||
              'Thank you — your message has been sent. We will be in touch shortly.';
          }
          // A submitted review is not visible yet; re-pull in case it was auto-published.
          if (form.getAttribute('action').indexOf('/r/') !== -1) { loadReviews(); }
        })
        .catch(function (err) {
          if (status) {
            // A network/CORS failure surfaces as "Failed to fetch", which means
            // nothing to a visitor — always give them the mailto fallback.
            var msg = err.message || '';
            if (!msg || /failed to fetch|networkerror|load failed/i.test(msg)) {
              msg = 'We could not send your message. Please email speechinfinitytg@gmail.com directly.';
            }
            status.className = 'form-status err';
            status.textContent = msg;
          }
        })
        .then(function () {
          if (btn) { btn.disabled = false; btn.textContent = label; }
          // Turnstile tokens are single-use — issue a fresh one for any retry.
          if (window.turnstile) { window.turnstile.reset(); }
        });
    });
  });

  /* ---- review form: only ask for what the chosen credit needs ---- */
  document.querySelectorAll('form[data-form] input[name="display"]').forEach(function (radio) {
    var form = radio.form;
    var apply = function () {
      var mode = (form.querySelector('input[name="display"]:checked') || {}).value;
      var nameField = form.querySelector('#r-name');
      var roleField = form.querySelector('#r-role');
      if (!nameField || !roleField) return;
      // Anonymous needs neither; role-only needs the role; named needs both.
      nameField.required = mode === 'name';
      roleField.required = mode !== 'anonymous';
      nameField.closest('.field').hidden = mode === 'anonymous';
      roleField.closest('.field').hidden = mode === 'anonymous';
    };
    radio.addEventListener('change', apply);
    apply();
  });

  /* ---- approved reviews ----
     The practice approves a review in the moderation console and it appears
     here on the next page load — no redeploy. If the endpoint is unreachable
     the section simply stays hidden. */
  function loadReviews() {
    var box = document.querySelector('[data-reviews]');
    if (!box || !window.fetch) return;
    var endpoint = box.getAttribute('data-endpoint');
    if (!endpoint || endpoint.indexOf('REPLACE_WITH') !== -1) return;

    fetch(endpoint, { headers: { Accept: 'application/json' } })
      .then(function (r) { return r.ok ? r.json() : null; })
      .then(function (data) {
        var reviews = (data && data.reviews) || [];
        if (!reviews.length) return;
        box.textContent = '';
        reviews.forEach(function (rev) {
          var card = document.createElement('blockquote');
          card.className = 'testimonial in';
          var quote = document.createElement('p');
          // textContent, never innerHTML — this is text a stranger wrote.
          quote.textContent = '"' + rev.quote + '"';
          var foot = document.createElement('footer');
          var attrib = document.createElement('span');
          attrib.className = 't-attrib';
          attrib.textContent = rev.name || 'Client';
          foot.appendChild(attrib);
          if (rev.detail) {
            var detail = document.createElement('span');
            detail.className = 't-detail';
            detail.textContent = rev.detail;
            foot.appendChild(detail);
          }
          card.appendChild(quote);
          card.appendChild(foot);
          box.appendChild(card);
        });
        box.hidden = false;
      })
      .catch(function () { /* endpoint not up yet — leave the section hidden */ });
  }
  loadReviews();

  /* ---- current year ---- */
  document.querySelectorAll('[data-year]').forEach(function (el) {
    el.textContent = new Date().getFullYear();
  });
})();
