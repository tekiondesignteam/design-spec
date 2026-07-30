# T1 / components

Components for the **T1** Product Kit, assembled **exclusively from Global Kit core components**.

- Components consume tokens from [`../../../tokens/dist/`](../../../tokens/dist/) (CSS custom properties in `[data-*]` layers) — never hardcoded values, no local token storage.
- Do not fork or duplicate a component to create a brand variant — brand differences come from the token file's Brand modes (`data-brand`).
- Switching a brand mode re-themes every component here automatically.
