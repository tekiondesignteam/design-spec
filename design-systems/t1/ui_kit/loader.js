/* ==========================================================================
   T1 UI Kit — Live JSX loader

   Reads manifest.js, fetches every component's .jsx partial in parallel,
   runs them through @babel/standalone, and evals as one script so edits to
   any partial take effect on refresh.

   CSS is NOT handled here — it's pre-bundled into ui_kit/components.css
   from the individual components/<Name>/<Name>.scss source files. When you
   edit a .scss file, ask Claude to "rebuild components.css".

   Consumers:
     <link rel="stylesheet" href="./components.css">
     <script src="./manifest.js"></script>          <!-- sets window.T1_COMPONENT_ORDER -->
     <script src="./loader.js"
             data-base="./"
             data-entry="./app.jsx"></script>       <!-- comma-separated entry files to run last -->

   After loading, loader fires `t1:ready` on window.
   ========================================================================== */
(function () {
  const script = document.currentScript;
  const base = (script && script.dataset.base) || './';
  const entries = ((script && script.dataset.entry) || '')
    .split(',').map(s => s.trim()).filter(Boolean);

  async function loadPartials() {
    if (!window.T1_COMPONENT_ORDER) {
      throw new Error('T1_COMPONENT_ORDER missing — load manifest.js first');
    }
    if (!window.Babel) {
      throw new Error('@babel/standalone not loaded before loader.js');
    }

    const order = window.T1_COMPONENT_ORDER;

    // Try pre-built bundle first (works cross-project); fall back to individual partials.
    let src = '';
    const bundlePath = base + 'components.jsx';
    const bundleRes = await fetch(bundlePath).catch(() => null);
    if (bundleRes && bundleRes.ok) {
      src = await bundleRes.text();
    } else {
      // Parallel fetch — all partials in flight at once, reassembled in manifest order.
      const texts = await Promise.all(order.map(async id => {
        const path = id === '_core'
          ? base + '_core.jsx'
          : base + 'components/' + id + '/' + id + '.jsx';
        const res = await fetch(path);
        if (!res.ok) throw new Error('Failed to fetch ' + path + ' (' + res.status + ')');
        return res.text();
      }));

      order.forEach((id, i) => {
        src += '\n/* -------- ' + id + ' -------- */\n' + texts[i];
      });
    }

    // exports — same list the old bundle used
    src += `\n\n/* expose to window */\nObject.assign(window, {
      Icon, Phi, T1Mark,
      Button, IconButton, Badge, Avatar, Chip, Switch, Checkbox, InputText, Link, InteractiveIcon,
      Separator, Divider, ProgressBar,
      AppBar, SideNavigation, NavBar,
      ChatBubble, PromptInput, Welcome, SuggestionList, Response, ChatContainer,
      Search, GlobalSearch, Dropdown, Modal,
      Toast, NotificationBanner, NotificationBannerToast,
      Quote, FabIcon, FavBarIcon, GradientIconButton, FeedbackAction,
      Empty, MessageDraft,
      TipCard, TaskCard, DealCard, ListingCard, CreditScoreCard,
      CompletionCard, ConversationHistoryCard, NotifyMyCard, PlannerCard, ReasoningLog,
      DocumentCard,
    });`;

    const transformed = Babel.transform(src, {
      presets: [['react', { runtime: 'classic' }]],
      filename: 't1-ui-kit-bundle.jsx',
    }).code;

    // Eval at global scope so all declarations become globals.
    const tag = document.createElement('script');
    tag.textContent = transformed;
    document.head.appendChild(tag);

    // Load any entry files (e.g. app.jsx) after components are defined.
    for (const entry of entries) {
      const res = await fetch(entry);
      if (!res.ok) throw new Error('Failed to fetch entry ' + entry + ' (' + res.status + ')');
      const text = await res.text();
      const transformedEntry = Babel.transform(text, {
        presets: [['react', { runtime: 'classic' }]],
        filename: entry,
      }).code;
      const entryTag = document.createElement('script');
      entryTag.textContent = transformedEntry;
      document.head.appendChild(entryTag);
    }

    window.dispatchEvent(new CustomEvent('t1:ready'));
  }

  loadPartials().catch(err => {
    console.error('[T1 loader] ' + err.message, err);
    const pre = document.createElement('pre');
    pre.style.cssText = 'position:fixed;inset:0;padding:24px;background:#fff;color:#b00020;font:12px/1.5 ui-monospace,monospace;white-space:pre-wrap;overflow:auto;z-index:9999';
    pre.textContent = 'T1 UI Kit loader failed:\n\n' + err.stack;
    document.body.appendChild(pre);
  });
})();
