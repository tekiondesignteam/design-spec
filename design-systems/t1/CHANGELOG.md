# T1 Design System — Changelog

Versioned by **CalVer** (`YYYY.MM`), per `Constitution.md` §12. One entry per release, newest first. Record breaking changes and migration steps inline so downstream projects know what to do on "pull latest" (`CLAUDE.md` Rule 12).

Entry template:

```
## YYYY.MM
### Breaking
- <what changed> → **Migration:** <exact steps>
### Added
- <new component / token / doc>
### Changed
- <non-breaking change>
### Fixed
- <fix>
```

---

## 2026.07

Baseline release — first versioned snapshot of the T1 design system.

### Added
- `Constitution.md` — system-wide governance + inherited visual direction, owner: Alpesh Karanpuria.
- 45 components in `ui_kit/components/`, docs in `ui_kit/docs/`, tokens in `tokens.scss` / `colors_and_type.css`.

### Notes
- No prior versions; nothing to migrate.
- Pending source changes decided in `Constitution.md` (motion tokens, 12-col grid, AA contrast audit) are not yet in the kit — they will land in a future release and be recorded here.
