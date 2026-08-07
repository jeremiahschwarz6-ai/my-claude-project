# MenteAI — site

A rebuild of the MenteAI marketing site. MenteAI is a subscription AI-automation
agency for coaches, consultants, and B2B founders. The site is built to **feel
like the product**: the machine runs live on the homepage instead of being
described.

The positioning is one connected system — a lead's inbound journey — not a menu
of services:

**Capture → Answer → Qualify → Automate.** Your front office runs itself, day
and night.

## Design system

Night → dawn arc. **Cool blue = AI working / processing. Warm gold = done /
booked / won.** That color logic is load-bearing across every section.

| Token | Hex | Use |
|---|---|---|
| `night` | `#14121C` | primary canvas |
| `nightsoft` | `#1C1926` | cards / raised surfaces |
| `ink` | `#F4EFE8` | primary text |
| `muted` | `#8B8598` | secondary text, labels |
| `line` | `#2A2636` | hairlines, borders |
| `cool` | `#6EA8FF` | AI working, links, active |
| `dawn` | `#F5B549` | done / booked / success |
| `dawn2` | `#FF9E6D` | dawn gradient partner |

Type: **Bricolage Grotesque** (display), **Inter** (body), **Space Mono**
(labels/timestamps) — all via `next/font`. Motion respects
`prefers-reduced-motion` everywhere.

## Stack

- Next.js (App Router) + React + TypeScript
- Tailwind (palette as theme tokens + CSS variables)
- Framer Motion (scroll reveals, transitions)
- Deploy target: Vercel

## Sections

1. **Hero** — live `front_office.stream` ops feed that loops the whole machine
   firing overnight (cool → gold, dawn glow on "Call booked").
2. **Qualifier** — the real AI, live. Type like a cold lead; it screens and
   books. Streams from `/api/qualify` (Anthropic Messages API, key server-side),
   with a scripted fallback if the key isn't set.
3. **The system** — Capture / Answer / Qualify / Automate as one connected flow.
4. **Video that sells** — Higgsfield 9:16 clip, graded to the palette.
5. **Proof** — one real, editable early number (no fake logo wall).
6. **How it works** — Subscribe / Submit / Ship in 48–72h / Pause anytime.
7. **Pricing** — Starter / Growth (popular) / Custom.
8. **Founder / team** — two headshot slots.
9. **Final CTA + footer** — "Pick a time. 15 minutes." + booking slot.

## Local dev

```bash
npm install
cp .env.example .env.local   # add ANTHROPIC_API_KEY for the live qualifier
npm run dev
```

Open http://localhost:3000.

## The live qualifier

`app/api/qualify/route.ts` calls the Anthropic Messages API server-side
(`claude-sonnet-4-6`, `max_tokens: 400`, streamed). Set `ANTHROPIC_API_KEY` in
your environment / Vercel project settings. Without it, the qualifier degrades
gracefully to a scripted flow so the section always works.

Env vars — see `.env.example`:

- `ANTHROPIC_API_KEY` (required for the real qualifier)
- `ANTHROPIC_QUALIFIER_MODEL` (optional model override)
- `NEXT_PUBLIC_BOOKING_URL` (optional Cal.com / Calendly link for CTAs)

## Editable placeholders

Content lives in `lib/site.ts`. Swap these before launch:

- **Team** — names, roles, notes (`team` array), and drop photos at
  `public/team/founder.jpg` + `public/team/cofounder.jpg` (see
  `public/team/README.md`).
- **Proof** — the early number (`proof`).
- **Pricing / booking URL / promise line**.

## Videos

Two Higgsfield-generated videos are referenced from the Higgsfield CDN in
`lib/site.ts`. For permanence, download them into `public/video/` and switch to
the local paths — see `public/video/README.md`.

## Deploy (Vercel)

Import the repo, set `ANTHROPIC_API_KEY` (and optionally the others) as
environment variables, and deploy. Fonts are fetched at build time via
`next/font`.
