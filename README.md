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
`js/main.js` handles mobile nav, scroll reveal, and AJAX form submission.

## Before launch

### Blocked on infrastructure (Cloudflare / Resend / domain)

1. **Turnstile sitekey.** `schools.html` and `private.html` carry
   `data-sitekey="REPLACE_WITH_TURNSTILE_SITEKEY"`. Create the widget after the Cloudflare
   account exists.
2. **Analytics token.** All five pages carry `data-cf-beacon` with
   `REPLACE_WITH_CF_ANALYTICS_TOKEN`.
3. **Forms Worker.** Both forms POST to
   `https://tc-forms.technicalcreations.workers.dev/f/speech-infinity`. That Worker
   (`ops/forms-worker/` in the parent workspace) is written but not deployed, and the
   `workers.dev` subdomain must match the real Cloudflare account.
4. **Domain + DNS.** `speechinfinitytg.com` is not registered and does not resolve. The
   canonical URLs and `og:image` absolute URLs assume it.

### Blocked on the client

5. **Credentials to verify.** The credentials table lists *M.S. — Universitat de Vic, Spain* and
   *B.S. — University of Houston*. The bio Janette supplied only says "bachelor's and master's
   degrees in speech-language pathology." Confirm institutions before publishing.
6. **Founder quote.** The pull quote on `about.html` ("Every child has infinite potential…") was
   drafted for her, not written by her. She must approve or replace it.
7. **Testimonials** are verbatim from `Testimonials.docx`; home/schools pages show excerpts.
   Confirm each person consents to being named publicly.

### Optional

8. **Hero photography.** Hero uses a green gradient. To use a photo, set
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

## Privacy guardrail
No form collects student names, IEP content, or clinical information — intentional, keeps the
site outside HIPAA/FERPA territory. Keep it that way.
