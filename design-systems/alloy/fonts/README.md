# fonts/

Font files for the families **referenced by the tokens**. One subfolder per family.

- [`proxima-nova/`](proxima-nova/) — Proxima Nova (the only family the tokens currently reference, via `primitive/typography/fontFamily/proximaNova` → `"Proxima Nova"`).

## How it's used

`npm run build` **scans each family folder**, infers weight + style from each file name, and generates `tokens/dist/fonts.css` (`@font-face` rules). `tokens/dist/tokens.css` and the per-brand slices `@import` it, so a consumer that includes `tokens.css` gets the fonts automatically.

Only families that appear in the tokens get `@font-face` output; a font folder for an unreferenced family is ignored. Supported formats: `.woff2`, `.woff`, `.otf`, `.ttf`.

Folder → family mapping lives in `FONT_FAMILIES` in [`../build/compile-tokens.js`](../build/compile-tokens.js).
