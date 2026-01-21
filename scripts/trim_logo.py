#!/usr/bin/env python3
"""
Trim transparent whitespace from PNG logo file.

This script:
1. Loads the PNG logo with transparency
2. Detects the bounding box of non-transparent pixels
3. Crops the image to tightly fit the actual logo
4. Preserves transparency and saves as a new file
"""

from PIL import Image
import os
from pathlib import Path

# Input and output paths
INPUT_PATH = Path("public/logo/LeapCrest White PNG.png")
OUTPUT_PATH = Path("public/logo/LeapCrest White PNG-trimmed.png")

def trim_transparent_whitespace(image_path: Path, output_path: Path) -> None:
    """
    Trim transparent whitespace from a PNG image.
    
    Args:
        image_path: Path to input PNG file
        output_path: Path to save trimmed output file
    """
    # Load the image with transparency support
    img = Image.open(image_path)
    
    # Convert to RGBA if not already (ensures alpha channel is available)
    if img.mode != "RGBA":
        img = img.convert("RGBA")
    
    # Get image dimensions
    width, height = img.size
    
    # Find bounding box of non-transparent pixels
    # Get alpha channel (transparency)
    alpha = img.split()[3]
    
    # Find the bounding box of non-transparent pixels
    bbox = alpha.getbbox()
    
    if bbox is None:
        # Image is fully transparent, cannot trim
        print(f"Warning: {image_path} is fully transparent. No trimming possible.")
        return
    
    # bbox is (left, top, right, bottom)
    left, top, right, bottom = bbox
    
    # Crop the image to the bounding box
    trimmed = img.crop((left, top, right, bottom))
    
    # Ensure output directory exists
    output_path.parent.mkdir(parents=True, exist_ok=True)
    
    # Save the trimmed image with transparency preserved
    trimmed.save(output_path, "PNG", optimize=False)
    
    # Print results
    original_size = width * height
    trimmed_size = trimmed.size[0] * trimmed.size[1]
    reduction = ((original_size - trimmed_size) / original_size) * 100
    
    print(f"✓ Trimmed logo saved to: {output_path}")
    print(f"  Original size: {width}x{height} ({original_size:,} pixels)")
    print(f"  Trimmed size: {trimmed.size[0]}x{trimmed.size[1]} ({trimmed_size:,} pixels)")
    print(f"  Reduction: {reduction:.1f}%")

if __name__ == "__main__":
    # Verify input file exists
    if not INPUT_PATH.exists():
        print(f"Error: Input file not found: {INPUT_PATH}")
        print(f"Current working directory: {os.getcwd()}")
        exit(1)
    
    # Trim the logo
    trim_transparent_whitespace(INPUT_PATH, OUTPUT_PATH)
    
    print("\n✓ Logo trimming complete.")
