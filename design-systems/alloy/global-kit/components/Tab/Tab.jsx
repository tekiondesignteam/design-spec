// Tab - core Global Kit component (build-less React; styles in Tab.css).
// 1:1 with the Figma "Alloy DS BETA" Tab set (node 276-16796).
//
// A tablist container: a horizontal row of TabItems. The group is a PURE layout
// wrapper - no --component-tab-* tokens exist, so it owns no colours or sizes of
// its own; every tab's colour/size/state comes from the composed <TabItem> and
// its own --component-tabItem-* tokens. Items sit flush (Figma group gap 0) and
// left-aligned; each TabItem carries its own bottom-border indicator.
//
// Axis (from Figma): Size lg|sm - cascades to the TabItems supplied via `tabs`.
//
// slot `children` (Figma "Tab Group Slot", allowPreferredValuesOnly=true):
//   allowed - TabItem only (the slot's preferred values resolve to the .Tab Item
//   Large + Small sets). Fill only with the sibling Global Kit <TabItem>; never
//   inline a raw button.
//
// Composition: two ways to supply tabs (provide one; `children` wins when both
// are given):
//   tabs      array of TabItem prop objects ({ label / children, selected,
//             disabled, state, leadingIcon, count, badge, ... }); the data-driven
//             form. Each entry's `label` (or `children`) is the tab text. `size`
//             is injected from the group so all tabs match the group size.
//   children  TabItem elements passed directly - use when a tab needs a click
//             handler or node props. Rendered as-is; the group only lays them out.
//
// Props:
//   size       'lg' | 'sm'                              (default 'lg')
//   tabs       array of TabItem prop objects (see above)  default []
//   children   TabItem elements passed directly           default undefined
//   className  extra classes on the tablist container
function Tab({ size = 'lg', tabs = [], className = '', children, ...rest }) {
  // TabItem is a sibling Global Kit component exposed on window (build-less, no import).
  const TabItemCmp = typeof TabItem !== 'undefined' ? TabItem : window.TabItem;

  const classes = ['gk-tab', `gk-tab--${size}`, className].filter(Boolean).join(' ');

  return (
    <div className={classes} role="tablist" {...rest}>
      {children != null
        ? children
        : TabItemCmp
          ? tabs.map(({ label, children: kids, ...props }, i) => (
              <TabItemCmp key={i} size={size} {...props}>
                {kids != null ? kids : label}
              </TabItemCmp>
            ))
          : null}
    </div>
  );
}

window.Tab = Tab;
