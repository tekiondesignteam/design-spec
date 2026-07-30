# Product Kit · ARC

Product-scoped library assembled from Global Kit components.

- **Brand modes:** Tekion · GMC · Ford · Honda · Acura

## Structure

- [`components/`](components/) — components built from the Global Kit core library, consuming tokens from [`../../tokens/dist/`](../../tokens/dist/).

## Rules

- No token values stored here. Semantics, this kit's component-specific variables, and its brand modes all live in the combined file under [`../../tokens/`](../../tokens/); components consume them from `tokens/dist/`.
- Brand identity enters only through the token file's Brand modes. A brand is a mode, never a fork.
- To add a brand: add its mode to the Brand collection in `tokens/` (surfaced first through the Global Kit), then it becomes available to this kit — no copied component set.
