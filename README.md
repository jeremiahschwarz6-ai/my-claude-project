# FounderFit

A prototype platform that helps young founders figure out which business model
fits them, and connects startups with investors — with AI doing the first-pass
due diligence. The platform monetizes through a **3% success fee** on deals
that close through it.

## What it does

**For founders**
- A 5-question discovery quiz. Claude analyzes the answers and recommends the
  best business model (SaaS, marketplace, subscription, …) with reasoning,
  concrete first steps for the next 30 days, and risks to watch.
- List a startup profile (pitch, stage, revenue, growth, raise amount) so
  investors can find it.

**For investors**
- Browse startups raising now.
- Run an AI-generated first-pass investment memo on any startup: a 1–10 score,
  verdict, strengths, risks, questions to ask the founder, and fit against the
  investor's own thesis.
- Open a deal, move it through the pipeline (interested → in diligence →
  closed / passed). When a deal closes, the platform fee is calculated
  automatically.

## Running it

```bash
npm install
npm start          # http://localhost:3000
```

The AI features use the Claude API (`claude-opus-4-8`). Set an API key to
enable them:

```bash
export ANTHROPIC_API_KEY=sk-ant-...
npm start
```

Without a key the app still works — recommendations and memos fall back to a
built-in rule-based heuristic, clearly labeled in the UI.

## API overview

| Method | Path | Purpose |
|---|---|---|
| POST | `/api/recommendations` | Business-model recommendation from quiz answers |
| GET/POST | `/api/startups` | List / create startup profiles |
| POST | `/api/startups/:id/analyze` | AI investment memo (optional `investorId` for thesis fit) |
| GET/POST | `/api/investors` | List / join the investor network |
| GET/POST | `/api/deals` | List / open deals |
| PATCH | `/api/deals/:id` | Move a deal through the pipeline |

## Notes & next steps

- Data is in-memory with seed examples — restarting the server resets it.
  All access goes through `lib/store.js`, so swapping in a real database is
  contained to one file.
- No auth yet; founder/investor accounts would be the first production step.
- AI memos are a screening aid, not investment advice — the UI labels them
  as such.
