// In-memory data store with seed data. Swap for a real database when the
// product graduates past prototype stage — every access goes through this
// module so the migration is contained.

import { randomUUID } from "node:crypto";

const startups = new Map();
const investors = new Map();
const deals = new Map();

// The platform's cut of every closed deal, as a fraction of the amount raised.
export const PLATFORM_SUCCESS_FEE = 0.03;

function seedStartup(s) {
  const id = randomUUID();
  startups.set(id, { id, createdAt: new Date().toISOString(), ...s });
  return id;
}

function seedInvestor(i) {
  const id = randomUUID();
  investors.set(id, { id, createdAt: new Date().toISOString(), ...i });
  return id;
}

seedStartup({
  name: "LoopLearn",
  founder: "Ava Chen",
  pitch: "Peer-to-peer micro-tutoring marketplace for high-school students, matched by AI.",
  businessModel: "marketplace",
  stage: "pre-seed",
  monthlyRevenue: 1200,
  monthlyGrowthPct: 22,
  teamSize: 3,
  askAmount: 250000,
  sector: "edtech",
});

seedStartup({
  name: "GreenCrate",
  founder: "Marcus Oduya",
  pitch: "Subscription boxes of surplus produce from local farms, cutting food waste by 40%.",
  businessModel: "subscription",
  stage: "seed",
  monthlyRevenue: 18500,
  monthlyGrowthPct: 11,
  teamSize: 7,
  askAmount: 900000,
  sector: "food & sustainability",
});

seedStartup({
  name: "ShiftBoard",
  founder: "Priya Raman",
  pitch: "SaaS scheduling and payroll for small restaurants, replacing spreadsheets and group chats.",
  businessModel: "saas",
  stage: "seed",
  monthlyRevenue: 32000,
  monthlyGrowthPct: 9,
  teamSize: 9,
  askAmount: 1500000,
  sector: "b2b software",
});

seedInvestor({
  name: "Northgate Ventures",
  contact: "deals@northgate.vc",
  thesis: "Pre-seed and seed B2B SaaS, $250k–$2M checks",
  sectors: ["b2b software", "fintech"],
});

seedInvestor({
  name: "Sprout Capital",
  contact: "hello@sproutcap.com",
  thesis: "Consumer subscription and marketplace startups with early traction",
  sectors: ["edtech", "food & sustainability", "consumer"],
});

export const db = {
  listStartups: () => [...startups.values()],
  getStartup: (id) => startups.get(id),
  addStartup(data) {
    const id = randomUUID();
    const startup = { id, createdAt: new Date().toISOString(), ...data };
    startups.set(id, startup);
    return startup;
  },

  listInvestors: () => [...investors.values()],
  getInvestor: (id) => investors.get(id),
  addInvestor(data) {
    const id = randomUUID();
    const investor = { id, createdAt: new Date().toISOString(), ...data };
    investors.set(id, investor);
    return investor;
  },

  listDeals: () => [...deals.values()],
  getDeal: (id) => deals.get(id),
  addDeal({ startupId, investorId, amount }) {
    const id = randomUUID();
    const deal = {
      id,
      startupId,
      investorId,
      amount,
      status: "interested", // interested -> in_diligence -> closed | passed
      platformFeePct: PLATFORM_SUCCESS_FEE * 100,
      platformFee: null, // set when the deal closes
      createdAt: new Date().toISOString(),
    };
    deals.set(id, deal);
    return deal;
  },
  updateDeal(id, patch) {
    const deal = deals.get(id);
    if (!deal) return undefined;
    Object.assign(deal, patch);
    if (deal.status === "closed" && deal.platformFee == null) {
      deal.platformFee = Math.round(deal.amount * PLATFORM_SUCCESS_FEE);
    }
    return deal;
  },
};
