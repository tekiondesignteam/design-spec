# t1-vehicle-search — Constitution

> The constitution is the fixed frame for this project: its **boundaries** and the **visual language** it must follow. The visual language is not invented here — it is **inherited from the t1 design system**, which is the source of truth. Read this file first, and re-read it whenever a session gets long or a decision feels ambiguous. When anything conflicts with this file — or with the t1 docs it points to — those win.

**Owner:** jrajan  |  **Design system:** t1  |  **Last updated:** 2026-07-30

---

## 1. Boundaries (non-negotiable)

- This project lives **only** in `projects/t1-vehicle-search/`. Never create, edit, or delete files outside this folder.
- This project's design system is **t1**, at `design-systems/t1/`. That folder — and every other folder under `design-systems/` — is a **read-only source of truth**. Read from `design-systems/t1/` freely; never write to it.
- **Use t1 and only t1.** Never read from or mix in another design system, and never touch another `projects/<other>/` folder.
- All tokens, type, spacing, and components come from `design-systems/t1/`. If something you need is missing, note it in §4 as a gap — do not invent a token or borrow from another system.

## 2. Visual direction — inherited from t1

This project does not define its own visual language; it follows t1's. **Authoritative sources — read these, and prefer them over the summary below whenever there's any doubt:**

- `design-systems/t1/README.md` — visual foundations (color, type, spacing, radii, shadows, motion) and content fundamentals
- `design-systems/t1/CLAUDE.md` — brand essentials + hard rules
- `design-systems/t1/tokens.scss` — the actual token values (the only place values live)

<!-- GENERATED FROM t1 — /new-project fills this in by reading the docs above. It is a convenience summary, not a second source of truth. -->

- **Look & feel:** Cool, sober, desaturated. This is the **Tekion T1 AI sales assistant** — a chat/AI panel floating over the automotive dealer platform, not a standalone app. White and light-grey canvases dominate; a mid-blue is the primary action accent, green is success, red is error/destructive. Violet is reserved exclusively for the T1 AI brand mark — never a general accent. Exactly one gradient exists in the whole system (`$t1-gradient-brand`) and it is reserved for the AI send/generate button only. Surfaces are flat: solid fills, 1px borders, tight 2px corner radii as the workhorse, subtle card shadows on hover. No imagery, patterns, textures, noise, or blur. Voice is a capable product assistant — short, direct, second-person, sentence-case, no emoji (Phosphor icon glyphs carry tone instead).
- **Type / density / spacing:** Proxima Nova only (no system fonts), three active weights — Regular 400, Medium 500, Semibold 600. Compact, information-dense layout on a 4pt spacing grid (`$t1-space-1`=4px … `$t1-space-8`=32px; note there is no `$t1-space-7`/28px). Card padding ~12px, section padding 16–24px, inter-card gutters 8–16px. Motion is restrained: 150ms ease-out on hover, 200ms ease-in-out on modal/sheet enter — no bounce, no spring. Consult `tokens.scss` for all concrete values; never restate them here.
- **Never do (anti-patterns):** Never build a standalone HTML page from scratch — **every visual task forks `design-systems/t1/ui_kit/template/chat-interface.html`** into this project and edits the copy (see plan/tasks). Never rebuild or restyle the locked shell (`AppBar`, `NavBar`, `SideNavigation`, `GlobalSearch`, `PromptInput`, `FabIcon`) or the `.ts-menubar` / `.ts-body` platform chrome zones. Never hand-roll raw `<button>`/`<a>`/`<input>`/`<svg>` — compose kit primitives (`<Button>`, `<Link>`, `<InputText>`, `<Phi>`) and existing domain cards. Never hardcode a hex/rgb/size/radius — use `$t1-*` tokens only. No third-party UI libraries (Tailwind, MUI, shadcn, Bootstrap, Radix, etc.); icons are **Phosphor only** via `<Phi>` — no Lucide/Heroicons/Material/inline SVG, no emoji, no unicode glyphs. No gradients other than the reserved AI-send gradient. Violet is the AI brand mark only.
- **Available surfaces:** One product — the T1 AI assistant chat surface, worked entirely inside the chat-thread content zone of a fork of `chat-interface.html`. Building blocks: conversational frames (`<Response>`, `<ChatBubble>`, `<Welcome>`, `<MessageDraft>`, `<ReasoningLog>`, `<SuggestionList>`, `<FeedbackAction>`), domain cards (`<ListingCard>`, `<DealCard>`, `<TaskCard>`, `<TipCard>`, `<CreditScoreCard>`, `<DocumentCard>`, `<PlannerCard>`, `<NotifyMyCard>`, `<CompletionCard>`, `<ConversationHistoryCard>`), overlays (`<Modal>`, `<NotificationBannerToast>`), and atoms (`<Button>`, `<IconButton>`, `<GradientIconButton>`, `<InputText>`, `<Dropdown>`, `<Chip>`, `<Badge>`, `<Avatar>`, `<Switch>`, `<Checkbox>`, `<Link>`, `<Seperator>`, `<ProgressBar>`, `<Phi>`). The IDEA behavioral model (Inform → Decide → Execute → Ask) maps request types onto component combinations — see `design-systems/t1/CLAUDE.md`.

## 3. Anchors — from t1

- **Tokens:** use only `design-systems/t1/tokens.scss` and `colors_and_type.css`. Never hardcode a value.
- **Component catalog:** `design-systems/t1/ui_kit/docs/INDEX.md`.
- **Components this project uses:** Any component in the catalog. Narrow to the specific subset this project needs in `spec.md`.

## 4. Known gaps / open questions

Anything t1 doesn't cover yet. Flag it here — do not solve it by inventing a style or borrowing from another system.

- {{gap}}

## 5. Project-specific deviations

Default: **none** — this project inherits t1 exactly. Record here only intentional, signed-off departures from the design system, with a reason.

- **Vehicle photo thumbnail in `<ListingCard>` rows** (signed off by jrajan, 2026-07-30). T1's `<ListingCard>` renders an initials avatar in its row prefix slot; it has no vehicle-image field. This project shows an actual vehicle photo thumbnail in that prefix slot instead. **Reason:** inventory results are far more scannable with a car photo than with initials, and the brief explicitly requires an image per vehicle. **Constraints:** the thumbnail occupies the existing avatar prefix slot (same 40×40px footprint, `$t1-radius-xs`), styled only with `$t1-*` tokens; no new colors, no third-party libs. Implemented at the fork level (the kit is read-only): the `.t1-lc__avatar` slot is painted via the fork's own scoped `.veh-listing` CSS, initials hidden, with a neutral placeholder (`$t1-neutral-400`) layer for missing/failed photos. Tracked as a design-system gap in `spec.md` — candidate for a proper `image`/`thumbnail` prop on the kit `<ListingCard>` upstream.
  - **Extends to overriding the kit's narrow-panel avatar-hide** (discovered Step 3; kept — signed off by jrajan 2026-07-30). The kit hides `.t1-lc__avatar` in the narrow AI panel via `@container t1-response (max-width: 500px)`. Because this project's whole scenario lives in that narrow panel and the brief requires the image there, the `.veh-listing` rule restores the slot's `display` in-panel (higher specificity, no `!important`). **Trade-off:** this departs from T1's deliberate space-saving choice to drop the avatar in the narrow panel. Scoped to `.veh-listing` only — no other `<ListingCard>` is affected.

## 6. Definition of done

A screen is done when:

- It uses only t1 tokens and components (per §1–§3).
- The deliverable is **always a single browser-openable HTML file — no build step, no bundler.** Allowed: plain HTML/CSS/JS, or React/JSX transpiled in-browser via **Babel Standalone** inline (as T1's `chat-interface.html` does). Never a Vite/TS/webpack app that must be compiled.
- It uses t1's tokens, CSS, components, and conventions (`design-systems/t1/CLAUDE.md`) — link/consume its token CSS for visual fidelity. Where t1's native workflow assumes a bundler (e.g. Vite/TS), render its components via Babel or apply its CSS classes in plain HTML instead, so the output stays a single openable file (note it in §5).
- Every state in the spec (empty / loading / error / success) is built.
- It follows t1's visual direction (§2), with any deviation recorded in §5.
- Nothing outside `projects/t1-vehicle-search/` was modified.
