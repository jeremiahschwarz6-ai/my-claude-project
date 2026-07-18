# The Freelance Client Kit

A ready-to-sell digital product: 8 plug-and-play templates covering the freelance client lifecycle — onboarding, discovery calls, proposals, contracts, email scripts, invoicing, status updates, and rate setting.

**👉 Start with [`LAUNCH_GUIDE.md`](LAUNCH_GUIDE.md)** — the step-by-step path from this repo to a live storefront and first sales.

## Repo Layout

| Path | What it is |
|------|-----------|
| `product/editable/` | Product source: 9 Markdown documents (the actual content) |
| `product/pdf/` | Styled PDFs generated from the Markdown |
| `product/LICENSE.txt` | The buyer-facing license included in the bundle |
| `dist/freelance-client-kit.zip` | **The sellable file** — upload this to Gumroad/Lemon Squeezy |
| `sales/gumroad-listing.md` | Paste-ready storefront copy: title, description, pricing, FAQ |
| `sales/landing-page.html` | Standalone sales page (insert your payment link at the `#buy` section) |
| `build/build_pdfs.py` | Markdown → styled PDF pipeline (needs Chromium + `pip install markdown`) |
| `build/package.sh` | Rebuilds the ZIP from `product/` |
| `LAUNCH_GUIDE.md` | Storefront setup, pricing rationale, 30-day marketing plan |

## Editing the Product

1. Edit any file in `product/editable/`
2. `python3 build/build_pdfs.py`
3. `./build/package.sh`
4. Upload the new `dist/freelance-client-kit.zip` to your storefront
