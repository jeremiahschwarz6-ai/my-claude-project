# Launch Guide — From This Repo to First Sales

Everything in this repo is ready to sell. What remains are the steps only you can do: creating the storefront account, setting the price live, and telling people it exists. Follow this in order.

## Step 1 — Package the Product (5 minutes)

The sellable ZIP is already built at `dist/freelance-client-kit.zip` (PDFs + editable Markdown + license note). If you change any content, rebuild:

```bash
python3 build/build_pdfs.py     # regenerate PDFs from product/editable/*.md
./build/package.sh              # regenerate dist/freelance-client-kit.zip
```

## Step 2 — Create Your Storefront (30 minutes)

**Recommended: Gumroad** — free to start, no monthly fee, ~10% + processing per sale, handles VAT/sales tax for you, 2-minute checkout for buyers. Alternative: **Lemon Squeezy** (5% + fees, also handles tax) or **Payhip**.

1. Sign up at gumroad.com → New product → Digital product.
2. **Name, description, FAQ:** copy-paste from `sales/gumroad-listing.md` — it's written for this.
3. **Price:** $29 (see pricing rationale below).
4. **Upload:** `dist/freelance-client-kit.zip`.
5. **Cover image:** 1280×720. Make it in Canva in 10 minutes: navy background (#1d3557), the cover text from the listing copy, big type. Text-heavy covers outperform pretty-but-vague ones for this product type.
6. Create a discount code `LAUNCH` for $10 off, limited to 7 days.
7. Buy your own product once ($0 test or minimum price) to verify the download works.

## Step 3 — Pricing (already decided, here's why)

- **$29 list.** Under $20 signals "cheap PDF"; over $40 needs testimonials you don't have yet. $29 is the proven sweet spot for template kits from new sellers.
- **$19 launch week** with the `LAUNCH` code — converts your earliest audience and generates the first reviews, which matter more than the $10.
- **Later:** once you have 5+ reviews, test $39. Add order-bump/upsell when you build product #2.

## Step 4 — First 30 Days of Marketing (the honest version)

No audience? These work in order of effort-to-payoff:

**Week 1 — warm circles.** Post on your own LinkedIn/X/Instagram: not "I made a product" but a *lesson from it* ("The email script I use when an invoice is 7 days late — and the mistake most freelancers make instead"), with the kit linked in a comment/reply. Message 5–10 freelancer friends: free copy in exchange for honest feedback and, if they like it, a testimonial.

**Weeks 2–3 — communities where freelancers already gather.** r/freelance, r/freelanceWriters, Indie Hackers, freelancer Discord/Slack groups, Facebook groups for your niche. **Do not drop links.** Answer real questions about late payments/scope creep/pricing with genuinely complete answers; your product sits in your profile/bio. One helpful comment that ranks in a big thread outsells ten link-drops that get you banned.

**Week 3 — give one piece away.** Publish the Weekly Status Update template (#7) in full as a free post/PDF ("free sample" funnel). It's the cheapest doc to give away and demonstrates the kit's quality. Collect emails for the free version if you want to build a list from day one.

**Week 4 — double down on whichever of the above produced sales.** Check your Gumroad analytics for referrer data before guessing.

**Ongoing, highest leverage:** turn each of the 8 documents into 2–3 short posts (the material is already written — excerpt it). That's a month of content sitting in `product/editable/`.

## Step 5 — Operate

- **Respond to every buyer email within 24h.** Early buyers who feel heard become reviewers and referrers.
- **Refund fast and without argument.** A $29 refund is cheaper than a public complaint.
- **Collect testimonials deliberately:** 7 days post-purchase, Gumroad can auto-email buyers — ask "what changed?" and request permission to quote.
- **Iterate:** every buyer question is either a listing-copy fix or a product v1.1 addition. Ship updates to existing buyers free (Gumroad does this automatically) — it drives reviews.

## What Success Realistically Looks Like

Straight talk: digital products are not passive income at launch — they're an audience game.

- **No audience, community marketing only:** 5–30 sales in month one ($100–$900) is a solid result. Most of the value is learning what messaging converts.
- **Small audience (1–5k relevant followers):** 30–100 launch-week sales is achievable.
- **The compounding move:** product #1 is rarely the money-maker — it's the reason people join your list. Products #2 and #3 sold to that list are where revenue gets meaningful. Candidates already implied by this kit: a niche-specific version ("The Freelance Designer's Client Kit"), a Notion dashboard version, or a video walkthrough upsell at $79.

## Legal/Tax Notes (brief, not advice)

- Gumroad/Lemon Squeezy act as merchant of record for VAT/sales tax on most sales — one of the main reasons to start there instead of raw Stripe.
- Product revenue is taxable income; track it from sale #1.
- The kit's contract/invoice documents are marked "educational, not legal advice" in the product itself — keep that language in any edits.

## Repo Map

```
product/editable/   ← the product source (9 Markdown docs)
product/pdf/        ← styled PDFs, built from the above
build/build_pdfs.py ← Markdown → PDF pipeline (Chromium-based)
build/package.sh    ← builds dist/freelance-client-kit.zip
sales/gumroad-listing.md   ← paste-ready storefront copy
sales/landing-page.html    ← standalone sales page (add your payment link at #buy)
```
