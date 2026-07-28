# Orlune Codex Pet

Orlune is a small floating blue wizard with a crimson hat and robe, a lavender scarf, and a mischievous magical personality.

This package contains a Codex-compatible v2 animated custom pet with all nine standard animation states and sixteen clockwise look directions.

## Install

### macOS and Linux

1. Create the custom-pet folder:

   ```bash
   mkdir -p ~/.codex/pets/orlune
   ```

2. Copy the two required files into it:

   ```bash
   cp pet.json spritesheet.webp ~/.codex/pets/orlune/
   ```

3. Restart or reload Codex.

4. Open the pet picker and select **Orlune**.

### Windows PowerShell

1. Create the custom-pet folder:

   ```powershell
   New-Item -ItemType Directory -Force "$HOME\.codex\pets\orlune"
   ```

2. Copy the two required files:

   ```powershell
   Copy-Item pet.json, spritesheet.webp "$HOME\.codex\pets\orlune\"
   ```

3. Restart or reload Codex, then select **Orlune** from the pet picker.

## Package contents

- `pet.json` — Codex pet manifest with `spriteVersionNumber: 2`.
- `spritesheet.webp` — validated 8×11 animation atlas, 1536×2288 pixels.
- `validation.json` — final deterministic atlas validation.
- `qa/contact-sheet.png` — overview of every animation and direction cell.
- `qa/look-directions.png` — focused neutral-plus-16-directions review sheet.
- `qa/previews/` — GIF previews for the nine standard animation states.
- Other files under `qa/` — chroma, continuity, semantic, and blind-direction review evidence.

Only `pet.json` and `spritesheet.webp` are required for installation. The remaining files are optional QA and review artifacts.

## Back up or share

Keep the complete `orlune-pet` folder or the accompanying ZIP. Extract the archive before installing, then copy `pet.json` and `spritesheet.webp` as described above.

## Compatibility

- Sprite contract: Codex custom pet v2
- Atlas layout: 8 columns × 11 rows
- Cell size: 192×208 pixels
- Atlas size: 1536×2288 pixels
- Format: transparent WebP

## Sharing note

Orlune is an original custom pet inspired by broad traits associated with a classic floating fantasy wizard character. Public or commercial distribution should avoid implying official affiliation with any existing franchise and may be subject to applicable rights-holder terms.
