# Brian's Tree Service — Website

An animated, single-page marketing website for Brian's Tree Service. Built with
plain HTML, CSS, and vanilla JavaScript — no build step, no dependencies.

## Run it

Just open `index.html` in a browser, or serve the folder:

```bash
python3 -m http.server 8000
# then visit http://localhost:8000
```

## Files

- `index.html` — page structure and content
- `styles.css` — all styling and animations
- `script.js` — scroll reveals, count-up stats, falling-leaves canvas, mobile menu, form handling

## Features

- Full-screen animated hero with gradient motion and a falling-leaves canvas
- Sticky navbar that solidifies on scroll + scroll-progress bar
- Scroll-reveal animations and animated count-up stats
- Services grid, "why us", masonry work gallery, and reviews
- Contact form with front-end validation (demo handler — see below)
- Fully responsive with a mobile menu and sticky "call" bar
- Respects `prefers-reduced-motion`

## Customize (replace the placeholders)

Search-and-replace these throughout `index.html`:

- **Phone:** `(555) 555-0123` / `tel:+15555550123`
- **Email:** `hello@brianstreeservice.com`
- **Map link:** the Google Maps URL in the contact section
- **Stats, reviews, hours** — edit the text directly
- **Gallery / hero images:** the tiles use colored placeholders with emoji.
  Swap each `.tile-ph` (and the hero background) for real `<img>` photos.

### Making the contact form actually send

`script.js` currently shows a success message without sending anything. To
receive submissions, point the `<form>` at a form backend (e.g. Formspree,
Basin, or your own endpoint) by adding an `action`/`method` and removing the
`e.preventDefault()` demo handler — or wire it to an email service.
