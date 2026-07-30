# gm-vsr — Brief

**Source:** Pasted by owner (jrajan) in chat on 2026-07-30. Verbatim below.

---

1. Objective & Success Metrics Goal: increase VDP click-through rate and lead form starts from the VRP. Track: filter usage rate, avg. time-to-first-click, zero-result rate, compare-tray usage, "Get Pre-Approved" click rate.
2. User Stories

* As a shopper, I can filter by model/trim/price so I only see relevant Chevys.
* As a shopper, I can see estimated payment without logging in, so I can gauge affordability upfront.
* As a shopper, I can save/favorite a vehicle to revisit later.
* As a returning visitor, my last-used filters persist (session-based).

3. Data Fields per Vehicle Card Year, Make, Model, Trim, Stock #, VIN (hidden, used for VDP link), Ext/Int color, MSRP, Dealer discount/incentive amount, Est. monthly payment (APR assumption disclosed via tooltip), Availability status (In Stock/In Transit/Factory Order), Days on lot, Primary photo + photo count badge, Distance from user (if geolocation enabled).
4. Filter Panel - Behavior

* Desktop: persistent left sidebar, filters apply instantly (no "Apply" button needed) with a live result count.
* Mobile: filters open as a bottom sheet/drawer, with "Apply (N results)" and "Clear all" buttons since real-time updates hurt scroll performance.
* Filters should be collapsible groups (Price, Model, Color, Features) with the most-used ones (Model, Price) expanded by default.
* Show active filter chips above results, each removable individually.

5. States to Design

* Loading (skeleton cards, not spinners)
* Zero results (with relaxed-filter suggestions)
* Partial match (e.g., no exact trim, show "3 similar trims available")
* Error/API failure (retry CTA)
* Low inventory warning ("Only 2 left in this trim")

6. Sort & Pagination Default sort: "Best Match" (weighted by availability + distance + incentive). Desktop: 24/page with numbered pagination. Mobile: infinite scroll, 12 at a time.
7. Compare Tray Sticky bottom bar, max 3 vehicles, persists across page navigation within session, "Compare Now" opens side-by-side modal with spec table (price, mileage, features, warranty).
