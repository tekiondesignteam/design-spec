# Layer 3 · Templates Folder

A single shared folder of ready-made templates from **every product and every brand** — more than one template per product. Templates are **compositions**: they assemble Product Kit components into complete screens and flows, and inherit theming entirely from the kit's brand modes.

## Organisation

**Product → Template → Brand mode.** Each product below contributes multiple templates:

- [`arc/`](arc/)
- [`drp/`](drp/)
- [`drs/`](drs/)
- [`drsc/`](drsc/)
- [`t1/`](t1/)
- [`arc-consumer/`](arc-consumer/)

## Rules

- A template never carries its own styling. Changing the brand mode of the underlying kit(s) is what re-themes it.
- Templates may combine components from more than one kit (the Orchestration Layer merges the selected kit(s) into one themed output).
- Never style templates directly or detach kit components inside them.
