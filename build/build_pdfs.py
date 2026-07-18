#!/usr/bin/env python3
"""Build styled PDFs from the markdown sources in product/editable/.

Usage: python3 build/build_pdfs.py
Requires: pip install markdown; Chromium at $CHROMIUM or /opt/pw-browsers/chromium
"""
import os
import re
import subprocess
import sys
import tempfile
from pathlib import Path

import markdown

ROOT = Path(__file__).resolve().parent.parent
SRC = ROOT / "product" / "editable"
OUT = ROOT / "product" / "pdf"
CHROMIUM = os.environ.get("CHROMIUM", "/opt/pw-browsers/chromium")

CSS = """
@page { size: letter; margin: 0; }
* { box-sizing: border-box; }
body {
  font-family: 'Helvetica Neue', Helvetica, Arial, sans-serif;
  color: #1a2233; margin: 0; font-size: 10.5pt; line-height: 1.55;
}
.page { padding: 0.9in 0.85in 0.7in; }
.brand-bar { height: 0.28in; background: linear-gradient(90deg, #1d3557, #457b9d); }
h1 { font-size: 21pt; color: #1d3557; margin: 0 0 4pt; line-height: 1.2; letter-spacing: -0.3pt; }
h1 + p em, .kicker { color: #55617a; }
h2 {
  font-size: 13.5pt; color: #1d3557; margin: 20pt 0 6pt;
  padding-bottom: 3pt; border-bottom: 2px solid #a8c3d9;
}
h3 { font-size: 11.5pt; color: #2b4a73; margin: 14pt 0 4pt; }
p { margin: 6pt 0; }
li { margin: 3pt 0; }
ul, ol { padding-left: 18pt; }
blockquote {
  margin: 8pt 0; padding: 8pt 12pt; background: #f1f5f9;
  border-left: 3px solid #457b9d; border-radius: 0 4px 4px 0; color: #23304a;
}
blockquote p { margin: 3pt 0; }
table { border-collapse: collapse; width: 100%; margin: 8pt 0; font-size: 9.5pt; }
th { background: #1d3557; color: #fff; text-align: left; padding: 5pt 7pt; }
td { border: 1px solid #cdd7e4; padding: 4.5pt 7pt; vertical-align: top; }
tr:nth-child(even) td { background: #f6f8fb; }
code, pre { font-family: 'SF Mono', Menlo, Consolas, monospace; font-size: 8.8pt; }
pre {
  background: #f1f5f9; border: 1px solid #d7e0ea; border-radius: 4px;
  padding: 9pt; overflow-x: hidden; white-space: pre-wrap; line-height: 1.45;
}
hr { border: none; border-top: 1px solid #cdd7e4; margin: 16pt 0 10pt; }
strong { color: #14203a; }
input[type=checkbox] { margin-right: 5pt; }
li:has(> input[type=checkbox]) { list-style: none; margin-left: -14pt; }
.footer { color: #8a94a8; font-size: 8pt; margin-top: 14pt; }
h2, h3 { page-break-after: avoid; }
table, blockquote, pre { page-break-inside: avoid; }
"""

HTML_SHELL = """<!doctype html><html><head><meta charset="utf-8">
<style>{css}</style></head><body>
<div class="brand-bar"></div>
<div class="page">{body}</div>
</body></html>"""


def checkboxify(html: str) -> str:
    html = html.replace("<li>[ ] ", '<li><input type="checkbox" disabled> ')
    html = html.replace("<li>[x] ", '<li><input type="checkbox" checked disabled> ')
    return html


def build(md_path: Path) -> Path:
    text = md_path.read_text()
    body = markdown.markdown(text, extensions=["tables", "fenced_code", "smarty"])
    body = checkboxify(body)
    html = HTML_SHELL.format(css=CSS, body=body)
    out_pdf = OUT / (md_path.stem + ".pdf")
    with tempfile.NamedTemporaryFile("w", suffix=".html", delete=False) as f:
        f.write(html)
        tmp = f.name
    try:
        subprocess.run(
            [CHROMIUM, "--headless", "--disable-gpu", "--no-sandbox",
             "--no-pdf-header-footer", f"--print-to-pdf={out_pdf}", f"file://{tmp}"],
            check=True, capture_output=True, timeout=120,
        )
    finally:
        os.unlink(tmp)
    return out_pdf


def main() -> int:
    OUT.mkdir(parents=True, exist_ok=True)
    sources = sorted(SRC.glob("*.md"))
    if not sources:
        print(f"no markdown sources in {SRC}", file=sys.stderr)
        return 1
    for md in sources:
        pdf = build(md)
        print(f"built {pdf.relative_to(ROOT)} ({pdf.stat().st_size // 1024} KB)")
    return 0


if __name__ == "__main__":
    sys.exit(main())
