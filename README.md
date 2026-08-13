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

## Before launch — client to confirm / supply

1. **Logo file.** `images/logo.svg` is a hand-drawn stand-in built from the logo screenshot.
   Drop in the real PNG/SVG and update the five `<img src="images/logo.svg">` references.
2. **Headshot.** `images/founder-placeholder.svg` appears on Home, Private, and About.
   Replace with Janette's professional photo (`image_c08e90.png`).
3. **Phone number.** Every footer has `(000) 000-0000` / `tel:+10000000000` — placeholder.
4. **Hero photography.** Hero uses a green gradient. To use a photo, set
   `--hero-img: url('images/hero.jpg')` on the `.hero` element.
5. **Form endpoint.** All three forms post to `REPLACE_WITH_FORM_ENDPOINT`.
   Set up Formspree (or equivalent) and replace in `schools.html`, `private.html`, `careers.html`.
   Note: the careers form includes a résumé file upload — the free Formspree tier does not
   accept attachments, so this needs a paid plan or the field should be dropped in favour of
   "email your résumé to …".
6. **Credentials to verify.** The credentials table lists *M.S. — Universitat de Vic, Spain* and
   *B.S. — University of Houston*. The bio Janette supplied only says "bachelor's and master's
   degrees in speech-language pathology." Confirm institutions before publishing.
7. **Founder quote.** The pull quote on `about.html` ("Every child has infinite potential…") was
   drafted for her, not written by her. She must approve or replace it.
8. **Testimonials** are verbatim from `Testimonials.docx`; home/schools pages show excerpts.
   Confirm each person consents to being named publicly.

## Privacy guardrail
No form collects student names, IEP content, or clinical information — intentional, keeps the
site outside HIPAA/FERPA territory. Keep it that way.
