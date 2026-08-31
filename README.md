# Speech Infinity Therapy Group — website

Static site. No build step. Open `index.html` or serve the folder:

```
python3 -m http.server 8080
```

## Pages
| File | Purpose |
| --- | --- |
| `index.html` | Home — hero, about snippet, three service pathways, testimonials |
| `schools.html` | B2B — district services, why-us checklist, partnership form |
| `private.html` | B2C — treatment areas, approach, consultation form |
| `about.html` | Founder spotlight, quote, credentials table, all testimonials |
| `careers.html` | Recruiting — advantages, rates table, application form |

`css/style.css` holds the whole design system (green/gold/cream, Playfair Display + Inter).
`js/main.js` handles mobile nav, scroll reveal, and form submission.

## How the lead forms deliver

There is no mail server and no third-party form service. The forms on
`schools.html` and `private.html` are marked `data-mailto`; on submit, `main.js`
assembles the answers into a labelled plain-text message and opens the visitor's
own mail app with it, addressed to `speechinfinitytg@gmail.com`. The visitor
presses send, so the mail arrives from their own address and a reply goes
straight back to them.

Consequences worth knowing: delivery depends on the visitor having a working
mail app, nothing is recorded server-side, and there is no spam filtering (hence
no Turnstile — there is no server to verify a challenge against). `careers.html`
already worked this way, via its "Email Your Resume" button.

## Before launch

### Blocked on infrastructure (Cloudflare / Resend / domain)

1. **Analytics token.** All five pages carry `data-cf-beacon` with
   `REPLACE_WITH_CF_ANALYTICS_TOKEN`.
2. **Domain + DNS.** `speechinfinitytg.com` is not registered and does not resolve. The
   canonical URLs and `og:image` absolute URLs assume it.

### Blocked on the client

3. **Credentials to verify.** The credentials list shows *M.S. — Universitat de Vic, Spain* and
   *B.S. — University of Houston*. The bio Janette supplied only says "bachelor's and master's
   degrees in speech-language pathology." Confirm institutions before publishing.
4. **Founder quote.** The pull quote on `about.html` ("Every student has infinite potential…") was
   drafted for her, not written by her. She must approve or replace it.
5. ~~**Testimonials** consent.~~ Resolved: the five named reviewers are now credited by
   role only (*Special Education Coordinator*, *Licensed School Psychologist*, …). The
   wording is still verbatim from `Testimonials.docx`, but no individual is identified,
   so no consent is outstanding. If anyone later wants their name shown, add it back by
   hand or have them resubmit through the review form.

### Optional

6. **Hero photography.** Hero uses a green gradient. To use a photo, set
   `--hero-img: url('images/hero.jpg')` on the `.hero` element.

## Images

| File | Used on | Source |
| --- | --- | --- |
| `logo.png` / `logo.svg` | header + `logo.svg` unused spare | client logo, background removed |
| `favicon.png` | tab icon, apple-touch-icon, all pages | infinity mark cropped square, 512px |
| `social-card.png` | `og:image` / `twitter:image`, all pages | logo on cream, 1200x630 |
| `janette-vazquez-headshot.jpg` | `index.html` about snippet | client photo |
| `janette-vazquez-portrait.jpg` | `about.html` founder spotlight | client photo |
| `janette-vazquez-office.jpg` | `private.html` approach section | client photo |

Full-resolution originals live in `../source-assets/`, outside the deployed site.
Portrait slots are `aspect-ratio: 4/5` with `object-fit: cover`.

## Reviews

`about.html` collects its own testimonials. A visitor fills in the form under
*Share Your Experience*; the Worker holds it for approval and emails Janette a
link; one click publishes it and it appears on the next page load. No redeploy.

The submitter chooses how they are credited — **role only** (the default),
**name and role**, or **fully anonymous**. Their email is collected so Janette
can confirm a review is genuine and is never published. Full details, including
the moderation console and why approval is on, are in
`ops/forms-worker/README.md`.

Two things on this page make it work:

- `#communityReviews` carries `data-reviews` and `data-endpoint`. `main.js`
  fetches it, renders each review with `textContent` (never `innerHTML` — this
  is text a stranger wrote), and leaves the section `hidden` if the endpoint is
  empty or unreachable. The page is correct before the Worker exists.
- The review form is an ordinary `data-form`, so it reuses the same AJAX
  submit as the lead forms. `data-success` gives it its own confirmation copy.

The five original testimonials are hand-written in the HTML and are separate
from this pipeline.

## Accessibility

Verified with a headless-Chromium sweep across 320/375/414/768/1024/1280/1440 on all
five pages: no horizontal scroll, no skipped heading levels, one `h1` per page, every
image has alt text, every internal link and `#anchor` resolves, and all body/UI text
clears WCAG AA contrast.

Things that are easy to break again:

- `--gold-600` (#A88326) is only 3.5:1 on white. **Text uses `--gold-text` (#856517)**;
  `--gold-600` is for borders and fills only.
- Every page opens with a `.skip-link` to `<main id="main" tabindex="-1">`. Keep both.
- `.split > * { min-width: 0 }` is what stops the fixed-width Turnstile widget from
  widening the whole page below 375px. `.cf-turnstile` also gets its own `overflow-x`.
- Footer section headings are `h2.footer-head`, not `h4` — an `h4` there skips a level.

## Privacy guardrail
No form collects student names, IEP content, or clinical information — intentional, keeps the
site outside HIPAA/FERPA territory. Keep it that way.
