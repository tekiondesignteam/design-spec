# Alloy Design System (GM DRP)

The **Digital Retail Program (DRP)** design system — white-label ecommerce UI for GM's four brands (Chevrolet, Buick, GMC, Cadillac), one system switched at runtime via `[data-brand]` on `<html>`.

- **Governance + inherited visual direction:** `Constitution.md`
- **Engineering guide + build process:** `CLAUDE.md`
- **Tokens:** `styles/tokens.css` (Chevy base) → `styles/brands.css` (per-brand) → `styles/global.css` (component classes)
- **Components:** `src/components/ui/<name>.tsx`
- **Design source of truth:** Figma `RsCbyz0LF6FaItYny1FqUU` + Storybook `https://aecgm-dev.tekion.xyz/docs/ui-components/`

Read-only for designers — enforced by `hooks/pre-commit`.
