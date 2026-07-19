import express from "express";
import path from "node:path";
import { fileURLToPath } from "node:url";
import { db, PLATFORM_SUCCESS_FEE } from "./lib/store.js";
import { recommendBusinessModel, analyzeInvestment, BUSINESS_MODELS } from "./lib/ai.js";

const app = express();
const here = path.dirname(fileURLToPath(import.meta.url));

app.use(express.json());
app.use(express.static(path.join(here, "public")));

// --- Founder: business model discovery -------------------------------------

app.get("/api/business-models", (_req, res) => {
  res.json({ models: BUSINESS_MODELS });
});

app.post("/api/recommendations", async (req, res) => {
  const answers = req.body;
  const required = ["offering", "customers", "revenuePreference", "capital", "technical"];
  const missing = required.filter((k) => !answers?.[k]);
  if (missing.length) {
    return res.status(400).json({ error: `Missing answers: ${missing.join(", ")}` });
  }
  res.json(await recommendBusinessModel(answers));
});

// --- Startups ---------------------------------------------------------------

app.get("/api/startups", (_req, res) => {
  res.json(db.listStartups());
});

app.post("/api/startups", (req, res) => {
  const { name, founder, pitch, businessModel, stage, sector } = req.body ?? {};
  if (!name || !founder || !pitch) {
    return res.status(400).json({ error: "name, founder, and pitch are required" });
  }
  const startup = db.addStartup({
    name,
    founder,
    pitch,
    businessModel: businessModel ?? "unknown",
    stage: stage ?? "pre-seed",
    sector: sector ?? "other",
    monthlyRevenue: Number(req.body.monthlyRevenue) || 0,
    monthlyGrowthPct: Number(req.body.monthlyGrowthPct) || 0,
    teamSize: Number(req.body.teamSize) || 1,
    askAmount: Number(req.body.askAmount) || 0,
  });
  res.status(201).json(startup);
});

// --- Investors --------------------------------------------------------------

app.get("/api/investors", (_req, res) => {
  res.json(db.listInvestors());
});

app.post("/api/investors", (req, res) => {
  const { name, contact, thesis } = req.body ?? {};
  if (!name || !contact) {
    return res.status(400).json({ error: "name and contact are required" });
  }
  const investor = db.addInvestor({
    name,
    contact,
    thesis: thesis ?? "",
    sectors: Array.isArray(req.body.sectors) ? req.body.sectors : [],
  });
  res.status(201).json(investor);
});

// --- AI due diligence -------------------------------------------------------

app.post("/api/startups/:id/analyze", async (req, res) => {
  const startup = db.getStartup(req.params.id);
  if (!startup) return res.status(404).json({ error: "startup not found" });
  const investor = req.body?.investorId ? db.getInvestor(req.body.investorId) : null;
  res.json(await analyzeInvestment(startup, investor));
});

// --- Deals (how the platform gets paid) -------------------------------------

app.get("/api/deals", (_req, res) => {
  const deals = db.listDeals().map((d) => ({
    ...d,
    startup: db.getStartup(d.startupId)?.name,
    investor: db.getInvestor(d.investorId)?.name,
  }));
  res.json({ platformFeePct: PLATFORM_SUCCESS_FEE * 100, deals });
});

app.post("/api/deals", (req, res) => {
  const { startupId, investorId, amount } = req.body ?? {};
  if (!db.getStartup(startupId)) return res.status(400).json({ error: "invalid startupId" });
  if (!db.getInvestor(investorId)) return res.status(400).json({ error: "invalid investorId" });
  const parsed = Number(amount);
  if (!Number.isFinite(parsed) || parsed <= 0) {
    return res.status(400).json({ error: "amount must be a positive number" });
  }
  res.status(201).json(db.addDeal({ startupId, investorId, amount: parsed }));
});

app.patch("/api/deals/:id", (req, res) => {
  const { status } = req.body ?? {};
  const allowed = ["interested", "in_diligence", "closed", "passed"];
  if (!allowed.includes(status)) {
    return res.status(400).json({ error: `status must be one of: ${allowed.join(", ")}` });
  }
  const deal = db.updateDeal(req.params.id, { status });
  if (!deal) return res.status(404).json({ error: "deal not found" });
  res.json(deal);
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`FounderFit running on http://localhost:${PORT}`);
  console.log(
    process.env.ANTHROPIC_API_KEY || process.env.ANTHROPIC_AUTH_TOKEN
      ? "AI analysis: Claude API connected"
      : "AI analysis: no ANTHROPIC_API_KEY set — using built-in heuristics"
  );
});
