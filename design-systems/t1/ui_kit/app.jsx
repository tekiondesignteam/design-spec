/* ==========================================================================
   T1 UI Kit — Showcase app
   Side-nav with all 48 Figma pages; main pane shows the component & variants.
   Page names are 1:1 with Figma page names.
   ========================================================================== */

// Group display order — controls the order sections appear in the sidebar
const GROUP_ORDER = [
  'Chat Core',
  'Shell & Layout',
  'AI Output Cards',
  'Domain Cards',
  'Forms & Inputs',
  'Buttons & Actions',
  'Status & Data',
  'Notifications',
  'Primitives',
];

const PAGES = [
  // ── Chat Core ──────────────────────────────────────────────────────────────
  // The primary building blocks for a conversation thread
  { id: 'Response',                   group: 'Chat Core',        status: 'done' },
  { id: 'Chat-Bubble',                group: 'Chat Core',        status: 'done' },
  { id: 'Chat-Container',             group: 'Chat Core',        status: 'done' },
  { id: 'Prompt-Input',               group: 'Chat Core',        status: 'done' },
  { id: 'Feedback-Action',            group: 'Chat Core',        status: 'done' },
  { id: 'Reasoning-Log',              group: 'Chat Core',        status: 'done' },
  { id: 'Welcome',                    group: 'Chat Core',        status: 'done' },
  { id: 'Suggestion-List',            group: 'Chat Core',        status: 'done' },

  // ── Shell & Layout ─────────────────────────────────────────────────────────
  // Structural chrome — navigation and window frames
  { id: 'Side-Navigation',            group: 'Shell & Layout',   status: 'done' },
  { id: 'Nav-Bar',                    group: 'Shell & Layout',   status: 'done' },
  { id: 'App-Bar',                    group: 'Shell & Layout',   status: 'done' },
  { id: 'Global-Search',              group: 'Shell & Layout',   status: 'done' },

  // ── AI Output Cards ────────────────────────────────────────────────────────
  // Rich cards that embed inside Response contentSlot or thread
  { id: 'Planner-Card',               group: 'AI Output Cards',  status: 'done' },
  { id: 'Message-Draft',              group: 'AI Output Cards',  status: 'done' },
  { id: 'Document-Card',              group: 'AI Output Cards',  status: 'done' },
  { id: 'Completion-Card',            group: 'AI Output Cards',  status: 'done' },
  { id: 'Tip-Card',                   group: 'AI Output Cards',  status: 'done' },
  { id: 'Notify-My-Card',             group: 'AI Output Cards',  status: 'done' },
  { id: 'Conversation-History-Card',  group: 'AI Output Cards',  status: 'done' },
  { id: 'Quote',                      group: 'AI Output Cards',  status: 'done' },

  // ── Domain Cards ───────────────────────────────────────────────────────────
  // CRM data display cards
  { id: 'Deal-Card',                  group: 'Domain Cards',     status: 'done' },
  { id: 'Task-Card',                  group: 'Domain Cards',     status: 'done' },
  { id: 'Listing-Card',               group: 'Domain Cards',     status: 'done' },
  { id: 'Credit-Score-Card',          group: 'Domain Cards',     status: 'done' },

  // ── Forms & Inputs ─────────────────────────────────────────────────────────
  // User input controls
  { id: 'Dropdown',                   group: 'Forms & Inputs',   status: 'done' },
  { id: 'Input-Text',                 group: 'Forms & Inputs',   status: 'done' },
  { id: 'Search',                     group: 'Forms & Inputs',   status: 'done' },
  { id: 'Checkbox',                   group: 'Forms & Inputs',   status: 'done' },
  { id: 'Switch',                     group: 'Forms & Inputs',   status: 'done' },

  // ── Buttons & Actions ──────────────────────────────────────────────────────
  // Clickable elements and action triggers
  { id: 'Button',                     group: 'Buttons & Actions', status: 'done' },
  { id: 'Icon-Button',                group: 'Buttons & Actions', status: 'done' },
  { id: 'Link',                       group: 'Buttons & Actions', status: 'done' },
  { id: 'Interactive-Icon',           group: 'Buttons & Actions', status: 'done' },
  { id: 'FAB-Icon',                   group: 'Buttons & Actions', status: 'done' },
  { id: 'Gradient-Icon-Button',       group: 'Buttons & Actions', status: 'done' },
  { id: 'Fav-Bar-Icon',               group: 'Buttons & Actions', status: 'done' },

  // ── Status & Data ──────────────────────────────────────────────────────────
  // Identity, counts, tags, and progress
  { id: 'Avatar',                     group: 'Status & Data',    status: 'done' },
  { id: 'Badge',                      group: 'Status & Data',    status: 'done' },
  { id: 'Chip',                       group: 'Status & Data',    status: 'done' },
  { id: 'Progress-Bar',               group: 'Status & Data',    status: 'done' },

  // ── Notifications ──────────────────────────────────────────────────────────
  // Alerts, dialogs, and empty states
  { id: 'Notification-Banner-Toast',  group: 'Notifications',    status: 'done' },
  { id: 'Modal',                      group: 'Notifications',    status: 'done' },
  { id: 'Empty',                      group: 'Notifications',    status: 'done' },

  // ── Primitives ─────────────────────────────────────────────────────────────
  // Base-level layout helpers
  { id: 'Seperator',                  group: 'Primitives',       status: 'done' },
  { id: 'Divider',                    group: 'Primitives',       status: 'done' },
];

const Section = ({ title, children }) => (
  <>
    <div className="kit-section-title">{title}</div>
    <div className="kit-surface">{children}</div>
  </>
);
const Row = ({ children, style }) => <div className="kit-row" style={style}>{children}</div>;
const Label = ({ children }) => <div className="kit-label">{children}</div>;
const Col = ({ children, style }) => <div style={{ display: 'flex', flexDirection: 'column', gap: 8, ...style }}>{children}</div>;

/* ---------- page bodies ---------- */
const P = {};

P['Button'] = () => {
  const COLORS = ['primary', 'neutral', 'error'];
  const VARIANTS = ['contained', 'outlined', 'text'];
  const SIZES = ['lg', 'md', 'sm'];
  const row = { display: 'flex', alignItems: 'center', gap: 16, flexWrap: 'wrap' };

  return (
    <>
      <Section title="Matrix · 3 colors × 3 variants × 3 sizes">
        <div style={{ display: 'grid', gridTemplateColumns: '96px repeat(3, 1fr)', gap: 24, alignItems: 'start' }}>
          <div />
          {VARIANTS.map(v => <div key={v} className="kit-label" style={{ textTransform: 'capitalize' }}>{v}</div>)}
          {COLORS.map(c => (
            <React.Fragment key={c}>
              <div className="kit-label" style={{ textTransform: 'capitalize', alignSelf: 'center' }}>{c}</div>
              {VARIANTS.map(v => (
                <div key={v} style={{ display: 'flex', flexDirection: 'column', gap: 10, alignItems: 'flex-start' }}>
                  {SIZES.map(s => <Button key={s} variant={v} color={c} size={s}>Label</Button>)}
                </div>
              ))}
            </React.Fragment>
          ))}
        </div>
      </Section>

      <Section title="States · primary / lg">
        <div style={row}>
          <Col><Label>default</Label><Button color="primary" size="lg">Label</Button></Col>
          <Col><Label>hover</Label><Button color="primary" size="lg" state="hover">Label</Button></Col>
          <Col><Label>active</Label><Button color="primary" size="lg" state="active">Label</Button></Col>
          <Col><Label>loading</Label><Button color="primary" size="lg" loading>Label</Button></Col>
          <Col><Label>disabled</Label><Button color="primary" size="lg" disabled>Label</Button></Col>
        </div>
        <div style={{ ...row, marginTop: 20 }}>
          <Col><Label>outlined · default</Label><Button variant="outlined" size="lg">Label</Button></Col>
          <Col><Label>outlined · hover</Label><Button variant="outlined" size="lg" state="hover">Label</Button></Col>
          <Col><Label>outlined · active</Label><Button variant="outlined" size="lg" state="active">Label</Button></Col>
          <Col><Label>outlined · disabled</Label><Button variant="outlined" size="lg" disabled>Label</Button></Col>
        </div>
        <div style={{ ...row, marginTop: 20 }}>
          <Col><Label>text · default</Label><Button variant="text" size="lg">Label</Button></Col>
          <Col><Label>text · hover</Label><Button variant="text" size="lg" state="hover">Label</Button></Col>
          <Col><Label>text · active</Label><Button variant="text" size="lg" state="active">Label</Button></Col>
          <Col><Label>text · disabled</Label><Button variant="text" size="lg" disabled>Label</Button></Col>
        </div>
      </Section>

      <Section title="With Phosphor icons (CDN)">
        <div style={row}>
          <Button iconStart="plus">Add deal</Button>
          <Button iconEnd="arrow-right" variant="outlined">Continue</Button>
          <Button iconStart="download-simple" variant="text">Download</Button>
          <Button iconStart="trash" color="error">Delete</Button>
          <Button iconStart="magnifying-glass" size="md">Search</Button>
          <Button iconStart="star" size="sm" variant="outlined" color="neutral">Favorite</Button>
        </div>
      </Section>
    </>
  );
};
P['Icon-Button'] = () => {
  const ico   = <i className="ph ph-magnifying-glass" style={{fontSize:16}} />;
  const icoSm = <i className="ph ph-magnifying-glass" style={{fontSize:14}} />;
  const icoLg = <i className="ph ph-magnifying-glass" style={{fontSize:20}} />;
  return (
    <>
      <Section title="Neutral / Contained">
        <Row>
          <IconButton color="neutral" style="contained" size="md" icon={ico} aria-label="default" />
          <IconButton color="neutral" style="contained" size="md" icon={ico} states="hover"    aria-label="hover" />
          <IconButton color="neutral" style="contained" size="md" icon={ico} states="active"   aria-label="active" />
          <IconButton color="neutral" style="contained" size="md" icon={ico} states="disabled" aria-label="disabled" />
          <IconButton color="neutral" style="contained" size="md" loading    aria-label="loading" />
        </Row>
      </Section>
      <Section title="Neutral / Plain">
        <Row>
          <IconButton color="neutral" style="plain" size="md" icon={ico} aria-label="default" />
          <IconButton color="neutral" style="plain" size="md" icon={ico} states="hover"    aria-label="hover" />
          <IconButton color="neutral" style="plain" size="md" icon={ico} states="active"   aria-label="active" />
          <IconButton color="neutral" style="plain" size="md" icon={ico} states="disabled" aria-label="disabled" />
        </Row>
      </Section>
      <Section title="Inverse / Contained">
        <Row>
          <IconButton color="inverse" style="contained" size="md" icon={ico} aria-label="default" />
          <IconButton color="inverse" style="contained" size="md" icon={ico} states="hover"    aria-label="hover" />
          <IconButton color="inverse" style="contained" size="md" icon={ico} states="active"   aria-label="active" />
          <IconButton color="inverse" style="contained" size="md" icon={ico} states="disabled" aria-label="disabled" />
        </Row>
      </Section>
      <Section title="Inverse / Plain">
        <Row style={{background:'#3F4757',padding:'12px 16px',borderRadius:'var(--t1-radius-xs)',display:'inline-flex'}}>
          <IconButton color="inverse" style="plain" size="md" icon={ico} aria-label="default" />
          <IconButton color="inverse" style="plain" size="md" icon={ico} states="hover"    aria-label="hover" />
          <IconButton color="inverse" style="plain" size="md" icon={ico} states="active"   aria-label="active" />
          <IconButton color="inverse" style="plain" size="md" icon={ico} states="disabled" aria-label="disabled" />
        </Row>
      </Section>
      <Section title="Sizes">
        <Row>
          <IconButton color="neutral" style="contained" size="sm" icon={icoSm} aria-label="sm" />
          <IconButton color="neutral" style="contained" size="md" icon={ico}   aria-label="md" />
          <IconButton color="neutral" style="contained" size="lg" icon={icoLg} aria-label="lg" />
        </Row>
      </Section>
    </>
  );
};
P['Badge'] = () => (
  <>
    <Section title="Counts">
      <Row>
        <Badge count={1} color="primary" />
        <Badge count={7} color="primary" />
        <Badge count={99} color="primary" />
        <Badge count={100} color="primary" />
      </Row>
    </Section>
    <Section title="Colors">
      <Row>
        <Badge count={7} color="primary" />
        <Badge count={7} color="success" />
        <Badge count={7} color="error" />
        <Badge count={7} color="warning" />
        <Badge count={7} color="neutral" />
      </Row>
    </Section>
    <Section title="Light">
      <Row>
        <Badge count={7} color="primary" light />
        <Badge count={7} color="success" light />
        <Badge count={7} color="error" light />
      </Row>
    </Section>
    <Section title="Dot">
      <Row>
        <Badge dot color="primary" />
        <Badge dot color="success" />
        <Badge dot color="error" />
      </Row>
    </Section>
  </>
);
P['Avatar'] = () => (
  <>
    <Section title="Sizes">
      <Row>
        {['xs','sm','md','lg','xl','2xl'].map(s => <Avatar key={s} size={s} type="icon" />)}
      </Row>
    </Section>
    <Section title="Types">
      <Row>
        <Avatar type="icon" />
        <Avatar type="letter" initials="AB" />
        <Avatar type="letter" initials="SC" />
        <Avatar type="image" src="https://i.pravatar.cc/80?img=12" />
      </Row>
    </Section>
    <Section title="Variants">
      <Row>
        <Avatar type="letter" initials="T1" variant="circle" />
        <Avatar type="letter" initials="T1" variant="rounded" />
      </Row>
    </Section>
    <Section title="Status">
      <Row>
        <Avatar type="letter" initials="AB" status="online" />
        <Avatar type="letter" initials="AB" status="away" />
        <Avatar type="letter" initials="AB" status="busy" />
      </Row>
    </Section>
  </>
);
P['Chip'] = () => (
  <>
    <Section title="Outlined · Neutral"><Row>
      <Chip variant="outlined" color="neutral" size="md">Chip</Chip>
      <Chip variant="outlined" color="neutral" size="md" startIcon="tag">With icon</Chip>
      <Chip variant="outlined" color="neutral" size="md" endIcon="chevron-down">Dropdown</Chip>
      <Chip variant="outlined" color="neutral" size="xs">xs size</Chip>
      <Chip variant="outlined" color="neutral" size="md" disabled>Disabled</Chip>
    </Row></Section>
    <Section title="Outlined · Primary"><Row>
      <Chip variant="outlined" color="primary" size="md">Chip</Chip>
      <Chip variant="outlined" color="primary" size="md" startIcon="star">Starred</Chip>
      <Chip variant="outlined" color="primary" size="md" endIcon="chevron-down">Filter</Chip>
      <Chip variant="outlined" color="primary" size="xs">xs size</Chip>
      <Chip variant="outlined" color="primary" size="md" disabled>Disabled</Chip>
    </Row></Section>
    <Section title="Soft · Neutral"><Row>
      <Chip variant="soft" color="neutral" size="md">Chip</Chip>
      <Chip variant="soft" color="neutral" size="md" startIcon="tag">Tag</Chip>
      <Chip variant="soft" color="neutral" size="md" endIcon="x">Removable</Chip>
      <Chip variant="soft" color="neutral" size="xs">xs size</Chip>
      <Chip variant="soft" color="neutral" size="md" disabled>Disabled</Chip>
    </Row></Section>
    <Section title="Soft · Primary"><Row>
      <Chip variant="soft" color="primary" size="md">Chip</Chip>
      <Chip variant="soft" color="primary" size="md" startIcon="check">Active</Chip>
      <Chip variant="soft" color="primary" size="md" endIcon="x">Removable</Chip>
      <Chip variant="soft" color="primary" size="xs">xs size</Chip>
      <Chip variant="soft" color="primary" size="md" disabled>Disabled</Chip>
    </Row></Section>
    <Section title="With avatar (md only)"><Row>
      <Chip variant="outlined" color="neutral" size="md" avatar="https://i.pravatar.cc/40">John D.</Chip>
      <Chip variant="soft" color="primary" size="md" avatar="https://i.pravatar.cc/41">Jane S.</Chip>
    </Row></Section>
  </>
);
P['Switch'] = () => (
  <>
    <Section title="Unchecked / Checked"><Row>
      <Switch label="Off" />
      <Switch checked label="On" />
    </Row></Section>
    <Section title="Disabled"><Row>
      <Switch label="Disabled off" disabled />
      <Switch checked label="Disabled on" disabled />
    </Row></Section>
  </>
);
P['Checkbox'] = () => {
  const grid4 = { display: 'grid', gridTemplateColumns: 'repeat(4, auto)', gap: '16px 32px', alignItems: 'center', justifyItems: 'start' };
  const colHead = { fontSize: 10, fontWeight: 600, textTransform: 'uppercase', letterSpacing: '0.06em', color: 'var(--t1-fg-muted)' };
  const Grid = ({ children }) => <div style={grid4}>{children}</div>;
  const H = ({ label }) => <span style={colHead}>{label}</span>;
  return (
    <>
      <Section title="Brand · Square">
        <Grid>
          <H label="Default" /><H label="Hover" /><H label="Active" /><H label="Disabled" />
          <Checkbox /><Checkbox state="hover" /><Checkbox state="active" /><Checkbox disabled />
          <Checkbox checked /><Checkbox checked state="hover" /><Checkbox checked state="active" /><Checkbox checked disabled />
          <Checkbox indeterminate /><Checkbox indeterminate state="hover" /><Checkbox indeterminate state="active" /><Checkbox indeterminate disabled />
        </Grid>
      </Section>
      <Section title="Brand · Circle">
        <Grid>
          <H label="Default" /><H label="Hover" /><H label="Active" /><H label="Disabled" />
          <Checkbox shape="circle" /><Checkbox shape="circle" state="hover" /><Checkbox shape="circle" state="active" /><Checkbox shape="circle" disabled />
          <Checkbox shape="circle" checked /><Checkbox shape="circle" checked state="hover" /><Checkbox shape="circle" checked state="active" /><Checkbox shape="circle" checked disabled />
          <Checkbox shape="circle" indeterminate /><Checkbox shape="circle" indeterminate state="hover" /><Checkbox shape="circle" indeterminate state="active" /><Checkbox shape="circle" indeterminate disabled />
        </Grid>
      </Section>
      <Section title="Success · Square (no indeterminate)">
        <Grid>
          <H label="Default" /><H label="Hover" /><H label="Active" /><H label="Disabled" />
          <Checkbox color="success" /><Checkbox color="success" state="hover" /><Checkbox color="success" state="active" /><Checkbox color="success" disabled />
          <Checkbox color="success" checked /><Checkbox color="success" checked state="hover" /><Checkbox color="success" checked state="active" /><Checkbox color="success" checked disabled />
        </Grid>
      </Section>
      <Section title="With label &amp; description">
        <Col>
          <Checkbox label="Unchecked" />
          <Checkbox label="Checked" checked />
          <Checkbox label="Indeterminate" indeterminate />
          <Checkbox label="Disabled" disabled />
          <Checkbox color="success" label="Success checked" checked />
          <Checkbox label="Notifications" description="Email me when a deal changes" />
          <Checkbox checked label="Auto-save drafts" description="Save every 30 seconds" />
          <Checkbox label="Disabled with description" description="This option is currently unavailable" disabled />
        </Col>
      </Section>
    </>
  );
};
P['Input-Text'] = () => {
  const SearchIco = () => (
    <svg width="14" height="14" viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="1.5">
      <circle cx="7" cy="7" r="4.5"/><line x1="10.5" y1="10.5" x2="14" y2="14"/>
    </svg>
  );
  const MailIco = () => (
    <svg width="14" height="14" viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="1.5">
      <rect x="1" y="3" width="14" height="10" rx="1.5"/>
      <polyline points="1,3 8,9 15,3"/>
    </svg>
  );
  const ClearIco = () => (
    <svg width="14" height="14" viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="1.5">
      <line x1="4" y1="4" x2="12" y2="12"/><line x1="12" y1="4" x2="4" y2="12"/>
    </svg>
  );
  return (
    <>
      <Section title="States"><div style={{display:'grid', gap: 16, gridTemplateColumns:'1fr 1fr'}}>
        <InputText label="Default"       placeholder="Enter text" />
        <InputText label="Filled"        value="Sarah Chen" />
        <InputText label="With assistive" placeholder="name@example.com" assistive="We'll never share your email." />
        <InputText label="Error"         value="bad@email" error="Please enter a valid email address." />
        <InputText label="Disabled"      value="Locked value" disabled />
      </div></Section>
      <Section title="Prefix / suffix icons"><div style={{display:'grid', gap: 16, gridTemplateColumns:'1fr 1fr'}}>
        <InputText label="Search"         placeholder="Search…"          startIcon={<SearchIco />} />
        <InputText label="Email"          placeholder="you@example.com"  startIcon={<MailIco />} endIcon={<ClearIco />} />
        <InputText label="Filled + icons" value="hello@tekion.com"       startIcon={<MailIco />} endIcon={<ClearIco />} />
        <InputText label="Error + icons"  value="bad@email"              startIcon={<MailIco />} error="Please enter a valid email address." />
      </div></Section>
      <Section title="Character counter"><div style={{display:'grid', gap: 16, gridTemplateColumns:'1fr 1fr'}}>
        <InputText label="Counter empty"   placeholder="Type something…"  maxLength={256} />
        <InputText label="Counter filled"  value="Sarah Chen"             maxLength={50} />
        <InputText label="Error + counter" value="bad-value" error="Please enter a valid value." maxLength={256} />
        <InputText label="Disabled + counter" value="Locked"              maxLength={100} disabled />
      </div></Section>
      <Section title="All features"><div style={{display:'grid', gap: 16, gridTemplateColumns:'1fr 1fr'}}>
        <InputText
          label="Full example"
          placeholder="Search messages…"
          startIcon={<SearchIco />}
          endIcon={<ClearIco />}
          assistive="Up to 256 characters."
          maxLength={256}
        />
        <InputText
          label="Full error"
          value="bad@email"
          startIcon={<MailIco />}
          endIcon={<ClearIco />}
          error="Please enter a valid email address."
          maxLength={256}
        />
      </div></Section>
    </>
  );
};
P['Chat-Bubble'] = () => {
  const [log, setLog] = React.useState('');
  return (
    <>
      <Section title="Default — hover to reveal Copy &amp; Edit">
        <div style={{display:'flex', flexDirection:'column', gap: 8, width: 480, alignItems: 'flex-end'}}>
          <ChatBubble
            onCopy={(t)  => setLog(`Copied: "${t}"`)}
            onEdit={(t)  => setLog(`Edited: "${t}"`)}
          >Can you pull up the open deals for Sarah Chen?</ChatBubble>
          <ChatBubble
            onCopy={(t)  => setLog(`Copied: "${t}"`)}
            onEdit={(t)  => setLog(`Edited: "${t}"`)}
          >Draft a follow-up for the Accord deal.</ChatBubble>
          <ChatBubble
            onCopy={(t)  => setLog(`Copied: "${t}"`)}
            onEdit={(t)  => setLog(`Edited: "${t}"`)}
          >Which deals are closing this week?</ChatBubble>
        </div>
        {log && <div style={{ marginTop: 12, fontSize: 12, color: 'var(--t1-fg-muted)', fontFamily: 'ui-monospace, monospace' }}>{log}</div>}
      </Section>
      <Section title="Hover state (frozen)">
        <div style={{display:'flex', flexDirection:'column', gap: 8, width: 480, alignItems: 'flex-end'}}>
          <ChatBubble state="hover" onCopy={() => setLog('Copied!')} onEdit={(t) => setLog(`Edit saved: "${t}"`)}>
            Can you pull up the open deals for Sarah Chen?
          </ChatBubble>
        </div>
      </Section>
    </>
  );
};
P['Prompt-Input'] = () => {
  const [log, setLog] = React.useState('');
  return (
    <>
      <Section title="Desktop · Default">
        <PromptInput
          onSend={v    => setLog(`Sent: "${v}"`)}
          onAttach={() => setLog('Attach clicked')}
          onMic={()    => setLog('Mic clicked')}
        />
        {log && <div style={{ marginTop: 8, fontSize: 12, color: 'var(--t1-fg-muted)' }}>{log}</div>}
      </Section>
      <Section title="Desktop · With Search Chip">
        <PromptInput showSearchChip />
      </Section>
      <Section title="Desktop · Disabled">
        <PromptInput disabled />
      </Section>
      <Section title="Desktop · Loading">
        <PromptInput loading />
      </Section>
      <Section title="Mobile · Default (inline)">
        <div style={{ background: '#fff', borderRadius: 16, padding: 16, display: 'inline-block', boxShadow: '0 2px 12px rgba(0,0,0,0.06)' }}>
          <PromptInput mobile onSend={v => setLog(`Mobile sent: "${v}"`)} />
        </div>
      </Section>
      <Section title="Mobile · With Search Chip (focus to expand)">
        <div style={{ background: '#fff', borderRadius: 16, padding: 16, display: 'inline-block', boxShadow: '0 2px 12px rgba(0,0,0,0.06)' }}>
          <PromptInput mobile showSearchChip onSend={v => setLog(`Mobile sent: "${v}"`)} />
        </div>
      </Section>
    </>
  );
};
P['Welcome'] = () => (
  <>
    <Section title="Default">
      <Welcome />
    </Section>
    <Section title="Custom name &amp; description">
      <Welcome name="Sarah" description="What can I help you with?" />
    </Section>
  </>
);
P['Suggestion-List'] = () => (
  <Section title="Suggestions · count=5">
    <SuggestionList
      items={[
        { label: 'What are my open deals?',                 icon: 'chat-circle-text' },
        { label: 'Show deals closing this week',            icon: 'chat-circle-text' },
        { label: 'Find customers not contacted in 30 days', icon: 'chat-circle-text' },
        { label: 'Draft a follow-up for the Accord deal',   icon: 'chat-circle-text' },
        { label: 'Summarize today\'s test drives',          icon: 'chat-circle-text' },
      ]}
      onSelect={(item, i) => console.log('suggestion selected', i, item)}
    />
  </Section>
);
P['App-Bar'] = () => {
  const [log, setLog] = React.useState('');
  return (
    <>
      <Section title="Interactive — click controls / layout icon to cycle variants">
        <AppBar
          onMinimize={()   => setLog('→ stickyMinimized')}
          onFullscreen={() => setLog('→ fullscreen')}
          onRestore={()    => setLog('→ panel (restored)')}
          onCollapse={()   => setLog('→ panel (collapsed)')}
          onMove={t        => setLog('→ move: ' + t)}
          onClose={()      => setLog('✕ close')}
        />
        {log && <div style={{marginTop:8,fontSize:12,color:'var(--t1-neutral-500)'}}>{log}</div>}
      </Section>
      <Section title="panel (400px) · orientation=right"><AppBar type="panel" /></Section>
      <Section title="panel · orientation=left"><AppBar type="panel" orientation="left" /></Section>
      <Section title="fullscreen (full width)"><AppBar type="fullscreen" /></Section>
      <Section title="stickyMaximized (drag grip + Move & Resize menu)"><AppBar type="stickyMaximized" /></Section>
      <Section title="stickyMinimized (drag grip + collapse)"><AppBar type="stickyMinimized" /></Section>
      <Section title="mobileDrag (drag pill + close)"><AppBar type="mobileDrag" /></Section>
    </>
  );
};
P['Side-Navigation'] = () => {
  const PINNED = [
    { id: 'pc1', label: 'Monthly Sales Review' },
    { id: 'pc2', label: 'Summarize recent hot leads' },
    { id: 'pc3', label: 'Draft quote for Model X' },
  ];
  const TASKS = [
    { id: 'rt1', label: 'Daily Sales Report' },
    { id: 'rt2', label: 'Prepare monthly performance reports' },
    { id: 'rt3', label: 'Analyze quarterly revenue trends' },
  ];
  const CHATS = [
    { id: 'rc1', label: 'Monthly Sales Review' },
    { id: 'rc2', label: 'Summarize recent hot leads' },
    { id: 'rc3', label: 'Draft quote for Model X' },
    { id: 'rc4', label: 'Last high-priority test drives' },
    { id: 'rc5', label: 'Coordinate follow-up calls with prospects' },
    { id: 'rc6', label: 'Schedule follow-up meetings' },
  ];

  return (
    <>
      <Section title="Default — Sections Expanded (190:24915)">
        <SideNavigation
          scheduledTask={false}
          sections="Expanded"
          task="Default"
          activeNav="tasks"
          pinnedChats={PINNED}
          recentChats={CHATS}
          style={{ height: 560 }}
        />
      </Section>
      <Section title="Scheduled Task — Sections Expanded">
        <SideNavigation
          scheduledTask={true}
          sections="Expanded"
          task="Default"
          activeNav="tasks"
          pinnedChats={PINNED}
          recentTasks={TASKS}
          recentChats={CHATS}
          style={{ height: 560 }}
        />
      </Section>
      <Section title="Sections Collapsed (190:25007)">
        <SideNavigation
          scheduledTask={true}
          sections="Collapsed"
          task="Collapsed"
          activeNav="tasks"
          pinnedChats={PINNED}
          recentTasks={TASKS}
          recentChats={CHATS}
          style={{ height: 560 }}
        />
      </Section>
      <Section title="Task Expanded (190:25049)">
        <SideNavigation
          scheduledTask={true}
          sections="Expanded"
          task="Expanded"
          activeNav="tasks"
          pinnedChats={PINNED}
          recentTasks={TASKS}
          recentChats={CHATS}
          style={{ height: 560 }}
        />
      </Section>
    </>
  );
};
P['Nav-Bar'] = () => (
  <>
    <Section title="Mobile — Hamburger + More (8:60377)">
      <NavBar
        title="Title"
        onMenuClick={() => {}}
        showMore={true}
        style={{ maxWidth: 400 }}
      />
    </Section>
    <Section title="Mobile — Hamburger + New Chat + More">
      <NavBar
        title="Title"
        onMenuClick={() => {}}
        showNewChat={true}
        showMore={true}
        style={{ maxWidth: 400 }}
      />
    </Section>
    <Section title="Desktop — Title + Action Button (430:41165)">
      <NavBar
        title="Task"
        actionLabel="New Task"
        actionIcon="plus"
        onAction={() => {}}
      />
    </Section>
    <Section title="Title only">
      <NavBar title="Title" />
    </Section>
  </>
);
P['Modal'] = () => {
  const [open, setOpen] = React.useState(null);
  const close = () => setOpen(null);

  /* Inline panel — renders .t1-modal without the fixed overlay, so it's
     visible directly on the page without needing to click anything. */
  const ModalPanel = ({ title, subtitle, primaryLabel, secondaryLabel, children, width = 480 }) => (
    <div className="t1-modal" style={{ width, maxWidth: '100%' }}>
      <div className="t1-modal__header">
        <div className="t1-modal__header-content">
          {title    && <p className="t1-modal__title">{title}</p>}
          {subtitle && <p className="t1-modal__subtitle">{subtitle}</p>}
        </div>
        <div className="t1-modal__close">
          <IconButton color="neutral" style="plain" size="sm" aria-label="Close">
            <Phi name="x" size={16} weight="bold" />
          </IconButton>
        </div>
      </div>
      {children && <div className="t1-modal__body">{children}</div>}
      {(primaryLabel || secondaryLabel) && (
        <div className="t1-modal__footer">
          {secondaryLabel && <Button variant="outlined" color="neutral" size="md">{secondaryLabel}</Button>}
          {primaryLabel   && <Button variant="contained" color="primary" size="md">{primaryLabel}</Button>}
        </div>
      )}
    </div>
  );

  return (
    <>
      <Section title="Title + body + footer">
        <ModalPanel title="Delete draft?" primaryLabel="Delete" secondaryLabel="Cancel">
          <p style={{ margin:0, fontSize:14, lineHeight:'20px', color:'var(--t1-neutral-700)' }}>
            This action cannot be undone. The draft will be permanently removed from your account.
          </p>
        </ModalPanel>
      </Section>

      <Section title="Title + subtitle + body + footer">
        <ModalPanel
          title="Title goes here"
          subtitle="Sub title text content will appear here."
          primaryLabel="Confirm"
          secondaryLabel="Cancel"
        >
          <p style={{ margin:0, fontSize:14, lineHeight:'20px', color:'var(--t1-neutral-700)' }}>
            Content area — add any body content here: forms, lists, rich text, etc.
          </p>
        </ModalPanel>
      </Section>

      <Section title="No footer — close button only">
        <ModalPanel title="Read-only information">
          <p style={{ margin:0, fontSize:14, lineHeight:'20px', color:'var(--t1-neutral-700)' }}>
            This modal has no footer. It is used for read-only content that requires no action other than dismissal.
          </p>
        </ModalPanel>
      </Section>

      <Section title="Narrow (360px)">
        <ModalPanel title="Confirm action" primaryLabel="OK" secondaryLabel="Cancel" width={360}>
          <p style={{ margin:0, fontSize:14, lineHeight:'20px', color:'var(--t1-neutral-700)' }}>
            Are you sure you want to proceed?
          </p>
        </ModalPanel>
      </Section>

      <Section title="Interactive — opens with full overlay backdrop">
        <Row>
          <Button onClick={() => setOpen('confirm')}>Delete confirm</Button>
          <Button variant="outlined" color="neutral" onClick={() => setOpen('info')}>Info modal</Button>
          <Button variant="outlined" color="neutral" onClick={() => setOpen('subtitle')}>With subtitle</Button>
          <Button variant="outlined" color="neutral" onClick={() => setOpen('nofoot')}>No footer</Button>
        </Row>
      </Section>

      {/* Overlay-triggered modals */}
      <Modal open={open === 'confirm'} title="Delete draft?" onClose={close} secondaryLabel="Cancel" primaryLabel="Delete" onPrimary={close}>
        <p style={{ margin:0, fontSize:14, lineHeight:'20px', color:'var(--t1-neutral-700)' }}>
          This action cannot be undone. The draft will be permanently removed.
        </p>
      </Modal>
      <Modal open={open === 'info'} title="Title goes here" onClose={close} secondaryLabel="Label" primaryLabel="Label" onPrimary={close}>
        <p style={{ margin:0, fontSize:14, lineHeight:'20px', color:'var(--t1-neutral-700)' }}>
          Content area — add any body content here: forms, lists, rich text, etc.
        </p>
      </Modal>
      <Modal open={open === 'subtitle'} title="Title goes here" subtitle="Sub title text content will appear here." onClose={close} secondaryLabel="Cancel" primaryLabel="Confirm" onPrimary={close}>
        <p style={{ margin:0, fontSize:14, lineHeight:'20px', color:'var(--t1-neutral-700)' }}>
          Modal with both a title and a subtitle in the header.
        </p>
      </Modal>
      <Modal open={open === 'nofoot'} title="Read-only info" onClose={close}>
        <p style={{ margin:0, fontSize:14, lineHeight:'20px', color:'var(--t1-neutral-700)' }}>
          This modal has no footer — only a close button in the header.
        </p>
      </Modal>
    </>
  );
};
P['Notification-Banner-Toast'] = () => (
  <>
    {/* ── Toast ─────────────────────────────────────────────────────────── */}
    <Section title="Toast · info">
      <Toast color="info" title="Update available" description="Version 2.4 will be deployed tomorrow at 9 AM." onClose={()=>{}} />
    </Section>
    <Section title="Toast · error">
      <Toast color="error" title="Submission failed" description="Please check the required fields and try again." onClose={()=>{}} />
    </Section>
    <Section title="Toast · warning">
      <Toast color="warning" title="Session expiring" description="Your session will expire in 5 minutes." onClose={()=>{}} />
    </Section>
    <Section title="Toast · success">
      <Toast color="success" title="Deal saved" description="Deal #DEAL-10042 has been saved successfully." onClose={()=>{}} />
    </Section>
    <Section title="Toast · no close button">
      <Col>
        <Toast color="info"    title="Syncing data"       description="Fetching latest records from DMS." />
        <Toast color="success" title="Payment confirmed"  description="Transaction ID: TXN-98127" />
      </Col>
    </Section>

    {/* ── Notification Banner ───────────────────────────────────────────── */}
    <Section title="Notification Banner · neutral">
      <NotificationBanner color="neutral" title="System maintenance" description="Scheduled downtime on Saturday 2–4 AM." onClose={()=>{}} />
    </Section>
    <Section title="Notification Banner · info">
      <NotificationBanner color="info" title="New feature available" description="Try the updated Deal Manager in your sidebar." onClose={()=>{}} />
    </Section>
    <Section title="Notification Banner · error">
      <NotificationBanner color="error" title="Sync failed" description="Could not connect to DMS. Retry or contact support." onClose={()=>{}} />
    </Section>
    <Section title="Notification Banner · warning">
      <NotificationBanner color="warning" title="Incomplete profile" description="Add missing fields before submitting the deal." onClose={()=>{}} />
    </Section>
    <Section title="Notification Banner · success">
      <NotificationBanner color="success" title="Deal submitted" description="Deal #DEAL-10042 is now pending finance approval." onClose={()=>{}} />
    </Section>
    <Section title="Notification Banner · no close button">
      <Col>
        <NotificationBanner color="info"    title="Read-only mode"    description="You have view-only access to this record." />
        <NotificationBanner color="warning" title="Draft auto-saved"  description="Your changes were saved automatically." />
      </Col>
    </Section>
  </>
);
P['Search'] = () => {
  const DEMO_OPTIONS = ['Acura MDX', 'BMW 5 Series', 'Chevrolet Silverado', 'Ford F-150', 'Honda Accord', 'Toyota Camry'];
  return (
    <>
      <Section title="md — default / hover / active / error / disabled">
        <div style={{ display:'flex', gap:24, alignItems:'flex-start', flexWrap:'wrap' }}>
          <div style={{ width:220 }}><Search size="md" label="Search" placeholder="Search..." /></div>
          <div style={{ width:220 }}><Search size="md" label="Search" placeholder="Search..." options={DEMO_OPTIONS} /></div>
          <div style={{ width:220 }}><Search size="md" label="Search" placeholder="Search..." error="Something went wrong" /></div>
          <div style={{ width:220 }}><Search size="md" label="Search" placeholder="Disabled" disabled={true} /></div>
        </div>
      </Section>
      <Section title="lg — default / with options / error">
        <div style={{ display:'flex', gap:24, alignItems:'flex-start', flexWrap:'wrap' }}>
          <div style={{ width:260 }}><Search size="lg" label="Search" placeholder="Search..." /></div>
          <div style={{ width:260 }}><Search size="lg" label="Search" placeholder="Search..." options={DEMO_OPTIONS} /></div>
          <div style={{ width:260 }}><Search size="lg" label="Search" placeholder="Search..." error="No results found" /></div>
        </div>
      </Section>
    </>
  );
};
P['Global-Search'] = () => (
  <>
    <Section title="AI mode — normalSearch · default (node 8:69133)">
      <GlobalSearch initialMode="ai" />
    </Section>
    <Section title="Search mode — Search · default (node 8:69136)">
      <GlobalSearch initialMode="search" />
    </Section>
    <Section title="Interactive — type in AI mode to reveal Ask button">
      <GlobalSearch onAsk={v => console.log('Ask:', v)} />
    </Section>
  </>
);
P['Dropdown'] = () => {
  const STAGES    = ['Prospect', 'Contacted', 'Qualified', 'Proposal Sent', 'Negotiating', 'Closed Won', 'Closed Lost'];
  const ASSIGNEES = ['Alice Johnson', 'Bob Smith', 'Carlos Rivera', 'Diana Park', 'Ethan Moore'];
  const grid = { display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(220px, 1fr))', gap: 16 };
  return (
    <>
      <Section title="Basic — click header to open, select to close">
        <div style={grid}>
          <Dropdown title="Deal Stage" placeholder="Select stage" items={STAGES} />
          <Dropdown title="Assigned To" placeholder="Select person" items={ASSIGNEES} />
        </div>
      </Section>

      <Section title="With search — type to filter">
        <div style={grid}>
          <Dropdown title="Deal Stage" placeholder="Select stage" items={STAGES} search />
          <Dropdown title="Assigned To" placeholder="Select person" items={ASSIGNEES} search />
        </div>
      </Section>

      <Section title="With description + search">
        <div style={{ maxWidth: 320 }}>
          <Dropdown
            title="Deal Stage"
            description="Current stage of this deal"
            placeholder="Select a stage"
            search
            items={STAGES}
          />
        </div>
      </Section>

      <Section title="With dividers">
        <div style={{ maxWidth: 280 }}>
          <Dropdown title="Deal Stage" placeholder="Select stage" items={STAGES} dividers />
        </div>
      </Section>

      <Section title="Grouped sections + search">
        <div style={{ maxWidth: 280 }}>
          <Dropdown
            title="Assign To"
            placeholder="Select a person"
            search
            sections={[
              { label: 'Sales', items: ['Alice Johnson', 'Bob Smith'] },
              { label: 'Pre-Sales', items: ['Carlos Rivera', 'Diana Park'] },
              { label: 'Management', items: ['Ethan Moore', 'Fiona Walsh'] },
            ]}
          />
        </div>
      </Section>
    </>
  );
};
P['Quote'] = () => {
  const col = { display: 'flex', flexDirection: 'column', gap: 16, maxWidth: 480 };
  return (
    <>
      <Section title="Default">
        <div style={col}>
          <Quote>
            {"\"I understand you've seen higher numbers online. Those are often retail prices, not trade-in values. Let me show you the reconditioning costs and market average for this specific VIN to clarify the difference.\""}
          </Quote>
        </div>
      </Section>
      <Section title="Short quote">
        <div style={col}>
          <Quote>{"\"We'd like to test drive the Accord this weekend.\""}</Quote>
          <Quote>{"\"Can you walk me through the financing options available for the Model Y?\""}</Quote>
        </div>
      </Section>
    </>
  );
};
P['FAB-Icon'] = () => {
  const Item = ({ label, children }) => (
    <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 8 }}>
      {children}
      {label && <div style={{ fontSize: 11, color: 'var(--t1-fg-muted)' }}>{label}</div>}
    </div>
  );
  return (
    <>
      <Section title="Live — hover &amp; click to see state transitions">
        <Row>
          <Item label="default · hover · active"><FabIcon /></Item>
          <Item label="disabled"><FabIcon disabled /></Item>
        </Row>
      </Section>

      <Section title="All 3 states (Figma: default / hover / active)">
        <Row>
          <Item label="default">
            <button className="t1-fab" style={{ pointerEvents: 'none' }}>
              <svg className="t1-fab__logo" width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                <defs><linearGradient id="ag1" x1="0.422607" y1="2.13244" x2="17.3755" y2="6.01376" gradientUnits="userSpaceOnUse"><stop stopColor="#25C8A5"/><stop offset="0.5" stopColor="#1B90B4"/><stop offset="1" stopColor="#1A6CC4"/></linearGradient></defs>
                <path d="M7.0275 4.57162C7.70578 3.22474 9.44818 2.13244 10.9184 2.13244H15.5774L14.3486 4.57162L11.1368 4.68878C10.2383 4.72137 9.42704 5.2367 9.01478 6.03654L6.08408 11.7288H3.42202L7.0275 4.57162Z" fill="url(#ag1)"/>
                <path d="M1.65233 2.13244L7.30849 2.13509L6.07968 4.57427H0.422607L1.65233 2.13244Z" fill="url(#ag1)"/>
                <path d="M13.9847 6.58877L11.7974 6.5923L10.5677 9.03412L12.0274 9.04204C12.2159 9.03942 12.3401 9.23674 12.2555 9.40499L10.0075 13.8675H12.6695L15.2822 8.65623C15.7623 7.69783 15.0559 6.57205 13.9838 6.58877H13.9847Z" fill="url(#ag1)"/>
              </svg>
            </button>
          </Item>
          <Item label="hover">
            <button className="t1-fab" style={{ pointerEvents: 'none', background: 'linear-gradient(98.52deg, rgb(231,252,255) 0%, rgb(243,231,205) 100%)' }}>
              <svg className="t1-fab__logo" width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                <defs><linearGradient id="ag2" x1="0.422607" y1="2.13244" x2="17.3755" y2="6.01376" gradientUnits="userSpaceOnUse"><stop stopColor="#25C8A5"/><stop offset="0.5" stopColor="#1B90B4"/><stop offset="1" stopColor="#1A6CC4"/></linearGradient></defs>
                <path d="M7.0275 4.57162C7.70578 3.22474 9.44818 2.13244 10.9184 2.13244H15.5774L14.3486 4.57162L11.1368 4.68878C10.2383 4.72137 9.42704 5.2367 9.01478 6.03654L6.08408 11.7288H3.42202L7.0275 4.57162Z" fill="url(#ag2)"/>
                <path d="M1.65233 2.13244L7.30849 2.13509L6.07968 4.57427H0.422607L1.65233 2.13244Z" fill="url(#ag2)"/>
                <path d="M13.9847 6.58877L11.7974 6.5923L10.5677 9.03412L12.0274 9.04204C12.2159 9.03942 12.3401 9.23674 12.2555 9.40499L10.0075 13.8675H12.6695L15.2822 8.65623C15.7623 7.69783 15.0559 6.57205 13.9838 6.58877H13.9847Z" fill="url(#ag2)"/>
              </svg>
            </button>
          </Item>
          <Item label="active">
            <button className="t1-fab" style={{ pointerEvents: 'none', background: 'linear-gradient(98.52deg, rgb(189,247,255) 0%, rgb(245,237,201) 100%)' }}>
              <svg className="t1-fab__logo" width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                <defs><linearGradient id="ag3" x1="0.422607" y1="2.13244" x2="17.3755" y2="6.01376" gradientUnits="userSpaceOnUse"><stop stopColor="#25C8A5"/><stop offset="0.5" stopColor="#1B90B4"/><stop offset="1" stopColor="#1A6CC4"/></linearGradient></defs>
                <path d="M7.0275 4.57162C7.70578 3.22474 9.44818 2.13244 10.9184 2.13244H15.5774L14.3486 4.57162L11.1368 4.68878C10.2383 4.72137 9.42704 5.2367 9.01478 6.03654L6.08408 11.7288H3.42202L7.0275 4.57162Z" fill="url(#ag3)"/>
                <path d="M1.65233 2.13244L7.30849 2.13509L6.07968 4.57427H0.422607L1.65233 2.13244Z" fill="url(#ag3)"/>
                <path d="M13.9847 6.58877L11.7974 6.5923L10.5677 9.03412L12.0274 9.04204C12.2159 9.03942 12.3401 9.23674 12.2555 9.40499L10.0075 13.8675H12.6695L15.2822 8.65623C15.7623 7.69783 15.0559 6.57205 13.9838 6.58877H13.9847Z" fill="url(#ag3)"/>
              </svg>
            </button>
          </Item>
        </Row>
      </Section>
    </>
  );
};
P['Fav-Bar-Icon'] = () => {
  const FBItem = ({ label, children }) => (
    <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 8 }}>
      {children}
      <span style={{ fontSize: 11, color: 'var(--t1-fg-muted)' }}>{label}</span>
    </div>
  );
  return (
    <Section title="Fav Bar Icon">
      <Row>
        <FBItem label="default"><FavBarIcon /></FBItem>
        <FBItem label="interactive"><FavBarIcon onClick={() => {}} /></FBItem>
      </Row>
    </Section>
  );
};
P['Gradient-Icon-Button'] = () => {
  const ico = React.createElement('i', { className: 'ph ph-sparkle', style: { fontSize: 16 } });
  return (
    <Section title="Gradient Icon Button">
      <Row>
        <GradientIconButton state="default"  aria-label="default"  icon={ico} />
        <GradientIconButton state="hover"    aria-label="hover"    icon={ico} />
        <GradientIconButton state="active"   aria-label="active"   icon={ico} />
        <GradientIconButton state="disabled" aria-label="disabled" icon={ico} />
      </Row>
    </Section>
  );
};
P['Feedback-Action'] = () => {
  const [log, setLog] = React.useState('');
  return (
    <>
      <Section title="Interactive — click to try all states">
        <FeedbackAction
          filterCount={3}
          sourceCount={5}
          onCopy={()       => setLog('Copied to clipboard!')}
          onThumbUp={v     => setLog(v ? '👍 Marked as helpful'     : 'Helpful rating removed')}
          onThumbDown={v   => setLog(v ? '👎 Marked as not helpful' : 'Not-helpful rating removed')}
          onMore={()       => setLog('More options clicked')}
          onRegenerate={() => setLog('Regenerating response…')}
        />
        <div style={{ marginTop: 8, fontSize: 12, color: 'var(--t1-fg-muted)', minHeight: 18 }}>{log || 'Click any action above'}</div>
      </Section>
      <Section title="Default (Figma reference — 1 filter, 1 source)">
        <FeedbackAction />
      </Section>
      <Section title="Without chips">
        <FeedbackAction showFilter={false} showSource={false} />
      </Section>
    </>
  );
};
P['Empty'] = () => {
  const center = { display: 'flex', justifyContent: 'center' };
  const w      = { width: 260 };
  return (
    <>
      <Section title="Full — title + description + buttons + link">
        <div style={center}><div style={w}>
          <Empty
            icon="image-broken"
            title="Title"
            description="Placeholder text describing the purpose of this empty state."
            secondaryLabel="Button"
            primaryLabel="Button"
            helpText="Need help?"
            linkText="Contact support"
          />
        </div></div>
      </Section>

      <Section title="Title + Description">
        <div style={center}><div style={w}>
          <Empty
            icon="magnifying-glass"
            title="No results found"
            description="Try adjusting your search or filters to find what you're looking for."
          />
        </div></div>
      </Section>

      <Section title="Title only">
        <div style={center}><div style={w}>
          <Empty icon="folder-open" title="Nothing here yet" />
        </div></div>
      </Section>

      <Section title="With primary action">
        <div style={center}><div style={w}>
          <Empty
            icon="plus-circle"
            title="No items yet"
            description="Get started by creating your first item."
            primaryLabel="Create item"
          />
        </div></div>
      </Section>

      <Section title="Both actions, no link">
        <div style={center}><div style={w}>
          <Empty
            icon="cloud-slash"
            title="Connection lost"
            description="We couldn't load your data. Please try again."
            secondaryLabel="Dismiss"
            primaryLabel="Retry"
            linkText=""
          />
        </div></div>
      </Section>
    </>
  );
};
P['Message-Draft'] = () => (
  <>
    <Section title="Interactive — click content then Send">
      <MessageDraft />
    </Section>
    <Section title="Custom recipient">
      <MessageDraft
        to="Marcus Webb"
        body={"Hi Marcus,\n\nJust confirming your appointment on Friday at 2 PM for the trade-in appraisal.\n\nSee you then!\nDean"}
      />
    </Section>
  </>
);
P['Tip-Card'] = () => (<Section title="Tip"><TipCard /></Section>);
P['Task-Card'] = () => (<Section title="Task"><TaskCard /></Section>);
P['Deal-Card'] = () => (<Section title="Deal"><DealCard /></Section>);
P['Listing-Card'] = () => {
  /* Items array — any length. Component renders all rows dynamically. */
  const ITEMS = [
    { initials: 'MW', title: 'Marcus Webb',  id: '#DL-2841', chip: 'Hot Lead',
      subtitle1: 'Sales Consultant', subtitle2: 'Downtown Toyota',
      description: 'marcus.webb@tekion.com',
      suffixLabel: 'Last contact', suffixDetail: '2h ago' },
    { initials: 'AS', title: 'Anna Stone',   id: '#DL-2842',
      subtitle1: 'Finance Manager',  subtitle2: 'Bay Honda',
      description: 'anna.stone@bayhonda.com',
      suffixLabel: 'Last contact', suffixDetail: 'Yesterday' },
    { initials: 'TK', title: 'Tom Kim',      id: '#DL-2843', chip: 'New',
      subtitle1: 'GM',               subtitle2: 'Sunrise Ford',
      description: 'tom.kim@sunriseford.com',
      suffixLabel: 'Last contact', suffixDetail: '3 days' },
    { initials: 'SL', title: 'Sarah Lee',    id: '#DL-2844', chip: 'Hot',
      subtitle1: 'Sales Consultant', subtitle2: 'Metro Chevy',
      description: 'sarah.lee@metrochevy.com',
      suffixLabel: 'Last contact', suffixDetail: '1h ago' },
    { initials: 'RP', title: 'Ryan Park',    id: '#DL-2845',
      subtitle1: 'BDC Manager',     subtitle2: 'Eastside Nissan',
      description: 'ryan.park@eastnissan.com',
      suffixLabel: 'Last contact', suffixDetail: '4 days' },
  ];

  return (
    <>
      {/* expanded=true — avatar prefix, any number of rows */}
      <Section title="expanded=true">
        <div style={{ maxWidth: 780 }}>
          <ListingCard
            expanded={true}
            onItemClick={(item) => alert('Clicked: ' + item.title)}
            items={ITEMS}
          />
        </div>
      </Section>

      {/* expanded=false — compact, no avatar */}
      <Section title="expanded=false">
        <div style={{ maxWidth: 360 }}>
          <ListingCard expanded={false} items={ITEMS} />
        </div>
      </Section>

      {/* Suffix nested properties */}
      <Section title="Suffix — label / detail toggles">
        <div style={{ display:'flex', gap:24, flexWrap:'wrap', alignItems:'flex-start' }}>
          {[
            { label: 'label + detail', suffixLabel: 'Label',     suffixDetail: 'Detail'  },
            { label: 'detail only',    suffixLabel: undefined,   suffixDetail: '$42,500' },
            { label: 'label only',     suffixLabel: '2 days ago',suffixDetail: undefined },
            { label: 'no suffix',      suffixLabel: undefined,   suffixDetail: undefined },
          ].map(({ label, suffixLabel, suffixDetail }) => (
            <div key={label}>
              <div style={{ fontSize:11, fontWeight:600, letterSpacing:'0.06em', textTransform:'uppercase', color:'#969aa3', marginBottom:8 }}>{label}</div>
              <div style={{ width: 340 }}>
                <ListingCard expanded={false} items={[{
                  initials:'CN', title:'Title', id:'#123', chip:'Chip',
                  subtitle1:'Subtitle1', subtitle2:'Subtitle2',
                  description:'Description1',
                  suffixLabel, suffixDetail,
                }]} />
              </div>
            </div>
          ))}
        </div>
      </Section>

      {/* Chip prop */}
      <Section title="Chip — present / absent">
        <div style={{ display:'flex', gap:24, flexWrap:'wrap', alignItems:'flex-start' }}>
          <div>
            <div style={{ fontSize:11, fontWeight:600, letterSpacing:'0.06em', textTransform:'uppercase', color:'#969aa3', marginBottom:8 }}>with chip</div>
            <div style={{ maxWidth: 500 }}>
              <ListingCard expanded={true} items={[
                { initials:'JD', title:'John Doe', id:'#456', chip:'New',
                  subtitle1:'2024 Honda Accord', subtitle2:'Silver',
                  description:'john.doe@tekion.com', suffixLabel:'1h ago', suffixDetail:'$42,500' },
              ]} />
            </div>
          </div>
          <div>
            <div style={{ fontSize:11, fontWeight:600, letterSpacing:'0.06em', textTransform:'uppercase', color:'#969aa3', marginBottom:8 }}>no chip</div>
            <div style={{ maxWidth: 500 }}>
              <ListingCard expanded={true} items={[
                { initials:'JD', title:'John Doe', id:'#456',
                  subtitle1:'2024 Honda Accord', subtitle2:'Silver',
                  description:'john.doe@tekion.com', suffixLabel:'1h ago', suffixDetail:'$42,500' },
              ]} />
            </div>
          </div>
        </div>
      </Section>
    </>
  );
};
P['Credit-Score-Card'] = () => (<Section title="Credit score"><CreditScoreCard /></Section>);
P['Completion-Card'] = () => (<Section title="Completion"><CompletionCard /></Section>);
P['Conversation-History-Card'] = () => (<Section title="History"><Col><ConversationHistoryCard /><ConversationHistoryCard title="Inventory gap analysis" when="Yesterday" preview="Found 12 models below target stock level" /></Col></Section>);
P['Notify-My-Card'] = () => (
  <>
    <Section title="Default — click to notify">
      <NotifyMyCard />
    </Section>
    <Section title="Notified">
      <NotifyMyCard notified={true} />
    </Section>
    <Section title="Custom copy">
      <NotifyMyCard
        heading="Generating your deal summary is taking longer than expected."
        description="We'll send you a notification once the summary is ready."
        actionLabel="Notify me when done"
      />
    </Section>
  </>
);
P['Planner-Card'] = () => {
  const completedLists = [
    {
      label: '1. List',
      items: [
        { text: 'Select Customer',        checked: true },
        { text: 'Draft follow-up SMS',     checked: true },
        { text: 'Check inventory status',  checked: true },
        { text: 'Schedule test drive',     checked: true },
        { text: 'Send calendar invite',    checked: true },
      ],
    },
    {
      label: '2. List',
      items: [
        { text: 'Prepare trade-in quote',   checked: true },
        { text: 'Run credit pre-check',     checked: true },
        { text: 'Review financing options',  checked: true },
        { text: 'Confirm delivery date',     checked: true },
        { text: 'Schedule follow-up call',   checked: true },
      ],
    },
  ];
  return (
    <>
      <Section title="Default — in progress">
        <PlannerCard />
      </Section>
      <Section title="Completed — all done">
        <PlannerCard title="Flora Fleisher: Action Plan" lists={completedLists} />
      </Section>
      <Section title="Single list">
        <PlannerCard
          title="Quick Follow-up"
          lists={[{ label: '1. List', items: [
            { text: 'Call customer',        checked: true  },
            { text: 'Send quote via email', checked: false },
            { text: 'Log in CRM',           checked: false },
          ]}]}
        />
      </Section>
    </>
  );
};
P['Reasoning-Log'] = () => (
  <>
    <Section title="In Progress">
      <ReasoningLog inProgress={true} interrupted={false} />
    </Section>
    <Section title="Done">
      <ReasoningLog inProgress={false} interrupted={false} />
    </Section>
    <Section title="Interrupted">
      <ReasoningLog inProgress={false} interrupted={true} />
    </Section>
  </>
);
P['Document-Card'] = () => (
  <>
    <Section title="Default (Figma)">
      <DocumentCard />
    </Section>
    <Section title="Document reference">
      <DocumentCard
        title="Vehicle Inspection Report"
        icon="file-text"
        subtitles={['PDF', '2.4 MB', 'Updated today']}
        links={[{ label: 'View', href: '#' }, { label: 'Download', href: '#' }]}
      />
    </Section>
    <Section title="Contract">
      <DocumentCard
        title="Sales Agreement — DEAL-10042"
        icon="file-doc"
        subtitles={['DOCX', 'Draft', 'Awaiting signature']}
        links={[{ label: 'Open', href: '#' }, { label: 'Sign', href: '#' }]}
      />
    </Section>
    <Section title="No subtitles">
      <DocumentCard
        title="Proof of Insurance"
        icon="shield-check"
        subtitles={[]}
        links={[{ label: 'View', href: '#' }, { label: 'Replace', href: '#' }]}
      />
    </Section>
  </>
);
P['Response'] = () => (
  <Section title="Full response">
    <Response
      title="Summary text"
      filterCount={2}
      sourceCount={2}
    >
      Based on your open pipeline, 3 deals need attention this afternoon. Sarah Chen is ready to close — she responded positively to the financing terms. Michael Rodriguez is waiting for the trade-in appraisal. David Park asked for a callback by 4 PM.
    </Response>
    <br />
    <Response
      title="Pipeline Summary"
      orderedList={['Follow up with Sarah Chen on financing terms', 'Get trade-in appraisal for Rodriguez deal', 'Call David Park before 4 PM']}
      filterCount={1}
      sourceCount={3}
    />
    <br />
    <Response
      title="Action Items"
      unorderedList={['Review open deals in CRM', 'Update deal stages for today\'s meetings', 'Send follow-up emails to warm leads']}
      showFilter={false}
      sourceCount={2}
    />
  </Section>
);
P['Chat-Container'] = () => (
  <>
    <Section title="messages prop (structured)">
      <ChatContainer messages={[
        { role: 'user',      content: 'Who are my hot leads today?' },
        { role: 'assistant', title: 'Top Leads Today', content: 'Based on engagement score and deal stage, here are your top 3 leads for today.', filterCount: 1, sourceCount: 3 },
        { role: 'user',      content: "Can you show me Sarah Chen's deal details?" },
        { role: 'assistant', title: 'Sarah Chen — Deal Summary', content: 'Sarah Chen is interested in a 2024 Honda Accord EX. Deal score 94 — highest in your pipeline.', filterCount: 2, sourceCount: 2 },
      ]} />
    </Section>
    <Section title="children passthrough (auto role-detection)">
      <ChatContainer>
        <ChatBubble role="user">What's the status of my open deals?</ChatBubble>
        <Response role="assistant" title="Open Deals Summary" filterCount={2} sourceCount={4}>
          You have 12 open deals totaling $840K. 3 are in final negotiation.
        </Response>
        <ChatBubble role="user">Which ones need follow-up this week?</ChatBubble>
        <Response role="assistant" title="Priority Follow-ups" filterCount={1} sourceCount={2}>
          Focus on Johnson Family Motors (expires Friday) and Westside Auto Group (waiting on trade-in appraisal).
        </Response>
      </ChatContainer>
    </Section>
  </>
);
P['Link'] = () => (<Section title="Links"><Row><Link>Default link</Link><Link underlined>Underlined link</Link><Link size="small">Small</Link><Link size="large">Large</Link><Link appearance="neutral">Neutral</Link></Row></Section>);
P['Interactive-Icon'] = () => {
  const Ico = ({ size = 12 }) => (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none"
         stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <rect x="3" y="3" width="18" height="18" rx="2"/>
      <circle cx="8.5" cy="8.5" r="1.5"/>
      <polyline points="21 15 16 10 5 21"/>
    </svg>
  );
  const icoSize = { xs:10, sm:12, md:14, lg:16, xl:20 };
  const SIZES  = ['xs','sm','md','lg','xl'];
  const STATES = ['default','hover','active','disabled'];
  const COLORS = ['neutral','primary','error'];
  const colSub = { fontSize: 11, fontWeight: 600, letterSpacing: '0.06em', textTransform: 'uppercase', color: 'var(--t1-fg-muted)', marginBottom: 12 };
  return (
    <Section title="Interactive Icon">
      {COLORS.map(color => (
        <div key={color} style={{ marginBottom: 24 }}>
          <div style={colSub}>{color}</div>
          <div style={{ display: 'grid', gridTemplateColumns: 'auto repeat(5,auto)', gap: '10px 16px', alignItems: 'center' }}>
            <div/>
            {SIZES.map(s => <span key={s} style={{ fontSize: 10, color: 'var(--t1-fg-muted)', textAlign: 'center' }}>{s}</span>)}
            {STATES.map(state => (
              <React.Fragment key={state}>
                <span style={{ fontSize: 10, color: 'var(--t1-fg-muted)', whiteSpace: 'nowrap' }}>{state}</span>
                {SIZES.map(size => (
                  <InteractiveIcon key={size} color={color} size={size} states={state}
                    aria-label={`${color} ${size} ${state}`}
                    icon={<Ico size={icoSize[size]}/>}
                  />
                ))}
              </React.Fragment>
            ))}
          </div>
        </div>
      ))}
    </Section>
  );
};
P['Seperator'] = () => (<>
  <Section title="Horizontal (fullWidth)"><Separator /></Section>
  <Section title="Horizontal (inset)"><Separator variant="inset" /></Section>
  <Section title="Vertical"><div style={{display:'flex', alignItems:'center', gap: 12, height: 20}}><span>Before</span><Separator orientation="vertical" /><span>After</span></div></Section>
  <Section title="Pipe"><div style={{display:'flex', alignItems:'center', gap: 12, height: 20}}><span>Label A</span><Separator orientation="vertical" variant="pipe" /><span>Label B</span></div></Section>
</>);
P['Divider'] = P['Seperator'];
P['Progress-Bar'] = () => {
  const [val, setVal] = React.useState(35);
  const sliderStyle = {
    WebkitAppearance: 'none', appearance: 'none',
    flex: 1, height: 4, borderRadius: 9999,
    background: `linear-gradient(to right, #4285f4 ${val}%, #d4d5d6 ${val}%)`,
    outline: 'none', cursor: 'pointer', border: 'none',
  };
  return (
    <>
      <Section title="Interactive — drag slider to adjust">
        <div style={{ maxWidth: 400 }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 12, marginBottom: 20 }}>
            <input
              type="range" min={0} max={100} value={val}
              onChange={e => setVal(Number(e.target.value))}
              style={sliderStyle}
            />
            <span style={{ fontSize: 13, fontWeight: 600, color: 'var(--t1-fg)', minWidth: 36, textAlign: 'right' }}>{val}%</span>
          </div>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 20 }}>
            <ProgressBar value={val} label="Upload progress" color="brand" />
            <ProgressBar value={val} label="Tasks completed" color="success" />
          </div>
        </div>
      </Section>
      <Section title="Brand · 0 / 25 / 50 / 75 / 100">
        <div style={{ display: 'flex', flexDirection: 'column', gap: 16, maxWidth: 400 }}>
          {[0, 25, 50, 75, 100].map(v => <ProgressBar key={v} value={v} label="Label" color="brand" />)}
        </div>
      </Section>
      <Section title="Success · 0 / 25 / 50 / 75 / 100">
        <div style={{ display: 'flex', flexDirection: 'column', gap: 16, maxWidth: 400 }}>
          {[0, 25, 50, 75, 100].map(v => <ProgressBar key={v} value={v} label="Label" color="success" />)}
        </div>
      </Section>
      <Section title="Without label">
        <div style={{ display: 'flex', flexDirection: 'column', gap: 12, maxWidth: 400 }}>
          <ProgressBar value={val} color="brand" />
          <ProgressBar value={val} color="success" />
        </div>
      </Section>
      <Section title="Indeterminate">
        <div style={{ display: 'flex', flexDirection: 'column', gap: 12, maxWidth: 400 }}>
          <ProgressBar determinate={false} color="brand" />
          <ProgressBar determinate={false} color="success" />
        </div>
      </Section>
    </>
  );
};

/* ---------- shell ---------- */
function App() {
  const initial = (typeof localStorage !== 'undefined' && localStorage.getItem('t1-kit-page')) || 'Button';
  const [activeId, setActiveId] = React.useState(initial);
  const [search, setSearch] = React.useState('');

  React.useEffect(() => { localStorage.setItem('t1-kit-page', activeId); }, [activeId]);

  const filtered = PAGES.filter(p => !search || p.id.toLowerCase().includes(search.toLowerCase()));
  const grouped = filtered.reduce((acc, p) => { (acc[p.group] = acc[p.group] || []).push(p); return acc; }, {});
  const activePage = PAGES.find(p => p.id === activeId) || PAGES[0];
  const Component = P[activePage.id];

  return (
    <div className="kit-app">
      <aside className="kit-sidenav">
        <div className="kit-brand">
          <div className="kit-brand-mark"><img src="../assets/T1.svg" width="18" height="14" alt="T1" style={{ display: 'block' }} /></div>
          <div>
            <div className="kit-brand-title">T1 Design System</div>
            <div className="kit-brand-sub">UI Kit · {PAGES.length} components</div>
          </div>
        </div>
        <div className="kit-search">
          <Icon name="search" size={14} />
          <input placeholder="Search components…" value={search} onChange={e => setSearch(e.target.value)} />
        </div>
        {GROUP_ORDER.filter(g => grouped[g]).map(group => (
          <div key={group}>
            <div className="kit-nav-group-title">{group}</div>
            {grouped[group].map(p => (
              <div key={p.id} className={`kit-nav-item ${p.status} ${p.id === activeId ? 'active' : ''}`}
                onClick={() => setActiveId(p.id)}>
                <span className="dot" />
                <span>{p.id}</span>
              </div>
            ))}
          </div>
        ))}
      </aside>

      <main className="kit-main">
        <div className="kit-page-head">
          <h1 className="kit-page-title">{activePage.id}</h1>
        </div>
        {Component ? <Component /> : (
          <div className="kit-stub">
            <strong>{activePage.id}</strong>
            <em>No implementation yet — see Figma /{activePage.id}</em>
          </div>
        )}
      </main>
    </div>
  );
}

ReactDOM.createRoot(document.getElementById('root')).render(<App />);
