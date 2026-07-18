#!/usr/bin/env bash
# Package the sellable ZIP: dist/freelance-client-kit.zip
set -euo pipefail
cd "$(dirname "$0")/.."

STAGE="$(mktemp -d)"
trap 'rm -rf "$STAGE"' EXIT

KIT="$STAGE/Freelance Client Kit"
mkdir -p "$KIT/PDF" "$KIT/Editable (Markdown)"

cp product/pdf/*.pdf "$KIT/PDF/"
cp product/editable/*.md "$KIT/Editable (Markdown)/"
cp product/LICENSE.txt "$KIT/"

mkdir -p dist
rm -f dist/freelance-client-kit.zip
(cd "$STAGE" && zip -rq "$OLDPWD/dist/freelance-client-kit.zip" "Freelance Client Kit")
echo "built dist/freelance-client-kit.zip ($(du -h dist/freelance-client-kit.zip | cut -f1))"
