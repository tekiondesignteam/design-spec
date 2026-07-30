# tokens / source

Holds the **ONE combined token file** — the single source of truth for all token values.

> **Combined file:** [`Tokens.json`](Tokens.json) — the DSG export. This one file is the only input the build consumes.

- DSG export · one namespace · single source of truth.
- Six uniquely-named collections in a single file, so collection names can never collide (no cross-source namespacing needed).
- All modes bundled together; aliases intact. No alias points outside the file — fully self-contained.
- Also carries a top-level **`styles`** array (Figma TEXT styles). Each style's `bindings` reference `01. Brand` tokens; the build compiles them to `.text-*` classes in [`../dist/computedStyles.css`](../dist/). Line-height has no binding and is inferred from the style's PERCENT value → the matching `01. Brand` `semantic/typography/lineHeight/{N}` token.

This file is the input to the compile step in [`../build/`](../build/), which splits it by Brand-collection mode into [`../dist/`](../dist/) and compiles the `styles` array into `computedStyles.css`.
