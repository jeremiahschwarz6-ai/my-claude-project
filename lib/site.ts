// Central, editable content for the MenteAI site.
// Placeholders are marked with EDIT: — swap these for real values.

export const site = {
  name: "MenteAI",
  // EDIT: your real booking link (Cal.com / Calendly). Falls back to #contact.
  bookingUrl:
    process.env.NEXT_PUBLIC_BOOKING_URL || "#book",
  email: "hello@mente-ai.com", // EDIT
  promise: "30-day promise · Pause anytime · No contracts",
};

// Video assets generated with Higgsfield (night→dawn palette).
// These point at the Higgsfield CDN so they work on the deployed site out of the box.
// For permanence, download them into /public/video/ and switch to the local paths
// (see README → "Videos"). Override at build time via env if you prefer.
export const video = {
  // 9:16 short-form "video that sells".
  sells:
    process.env.NEXT_PUBLIC_VIDEO_SELLS_URL ||
    "https://d8j0ntlcm91z4.cloudfront.net/user_3CECn5vZpEffDgEWHcsYzdJTdOo/hf_20260807_204221_e24c8db1-14af-40f5-97ba-d1230b00896d.mp4",
  // 16:9 ambient night→dawn loop.
  ambient:
    process.env.NEXT_PUBLIC_VIDEO_AMBIENT_URL ||
    "https://d8j0ntlcm91z4.cloudfront.net/user_3CECn5vZpEffDgEWHcsYzdJTdOo/hf_20260807_204351_ab052cec-ea21-4cfe-8994-8d7aa4a96693.mp4",
  // Local fallbacks (used automatically if you drop files here).
  sellsLocal: "/video/video-that-sells.mp4",
  ambientLocal: "/video/ambient-loop.mp4",
};

// The overnight ops feed shown in the hero.
export type FeedEvent = {
  time: string;
  label: string;
  detail: string;
  // 'work' animates cool → done; 'booked' breaks the dawn glow.
  kind: "work" | "booked" | "done";
};

export const heroFeed: FeedEvent[] = [
  { time: "2:04 AM", label: "Missed call", detail: "AI receptionist answered", kind: "work" },
  { time: "2:11 AM", label: "New lead captured", detail: "landing page form", kind: "work" },
  { time: "2:14 AM", label: "Lead qualified", detail: "$18k/mo, good fit", kind: "work" },
  { time: "2:15 AM", label: "Call booked", detail: "Thursday 2:00 PM", kind: "booked" },
  { time: "2:16 AM", label: "Follow-up sent", detail: "confirmation + reminder", kind: "done" },
];

export const pricing = [
  {
    name: "Starter",
    price: "$1.5k",
    cadence: "/mo",
    tagline: "One front-office system, live and handling inbound.",
    popular: false,
    features: [
      "1 capture funnel or landing page",
      "AI receptionist on one channel (call or DM)",
      "AI qualifier + booking on your calendar",
      "1 active automation at a time",
      "48–72h turnaround, async updates",
    ],
    cta: "Start with Starter",
  },
  {
    name: "Growth",
    price: "$3k",
    cadence: "/mo",
    tagline: "The whole machine — capture, answer, qualify, automate.",
    popular: true,
    features: [
      "Multiple funnels + landing pages",
      "AI receptionist across phone + DMs, 24/7",
      "AI qualifier with custom screening logic",
      "2 active automations at a time",
      "Priority 48h turnaround",
      "Monthly optimization pass",
    ],
    cta: "Get Growth",
  },
  {
    name: "Custom",
    price: "Let's talk",
    cadence: "",
    tagline: "Multi-brand, high-volume, or bespoke integrations.",
    popular: false,
    features: [
      "Everything in Growth, scaled",
      "Custom CRM + tooling integrations",
      "Dedicated build capacity",
      "SLAs and onboarding for your team",
    ],
    cta: "Book a scoping call",
  },
];

export const steps = [
  {
    n: "01",
    title: "Subscribe",
    body: "Pick a plan. One flat monthly fee — no scoping calls to nowhere, no per-project quotes.",
  },
  {
    n: "02",
    title: "Submit requests",
    body: "Drop what you need in a shared board. Capture pages, a receptionist, a new automation — async, no meetings required.",
  },
  {
    n: "03",
    title: "We ship in 48–72h",
    body: "Operators build and wire it live. You review, we refine. Most requests land in a couple of days.",
  },
  {
    n: "04",
    title: "Pause anytime",
    body: "Slow month? Pause your subscription and pick up where you left off. No contracts, no penalties.",
  },
];

// EDIT: founder + cofounder. Drop photos at public/team/founder.jpg and
// public/team/cofounder.jpg (see README) — the slots render initials until then.
export const team = [
  {
    name: "Your Partner", // EDIT: the builder
    role: "Founder · Head of Build",
    photo: "/team/founder.jpg",
    initials: "MB",
    note: "Builds the systems. Turns a messy inbound process into automations that run themselves.",
  },
  {
    name: "Your Name", // EDIT: you
    role: "Cofounder · Head of Sales & Marketing",
    photo: "/team/cofounder.jpg",
    initials: "SM",
    note: "Runs go-to-market. Makes sure the machine we build actually fills your calendar.",
  },
];

// EDIT: your real early number.
export const proof = {
  stat: "14",
  statLabel: "qualified calls booked in 60 days",
  line: "Fresh, hungry, and already handling inbound for our first clients.",
};
