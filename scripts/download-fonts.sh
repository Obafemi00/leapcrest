#!/bin/bash

# Script to download Inter font files
# Run: bash scripts/download-fonts.sh

FONT_DIR="fonts/inter"
BASE_URL="https://github.com/rsms/inter/raw/master/docs/font-files"

# Create directory if it doesn't exist
mkdir -p "$FONT_DIR"

echo "Downloading Inter font files..."
echo ""

# Download each font file
curl -L -o "$FONT_DIR/Inter-Regular.woff2" "$BASE_URL/Inter-Regular.woff2"
curl -L -o "$FONT_DIR/Inter-Medium.woff2" "$BASE_URL/Inter-Medium.woff2"
curl -L -o "$FONT_DIR/Inter-Bold.woff2" "$BASE_URL/Inter-Bold.woff2"
curl -L -o "$FONT_DIR/Inter-ExtraBold.woff2" "$BASE_URL/Inter-ExtraBold.woff2"

echo ""
echo "Font download complete!"
echo "Files saved to: $FONT_DIR"
