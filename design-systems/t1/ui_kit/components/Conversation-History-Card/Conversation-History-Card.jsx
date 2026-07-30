/* Partial — edit this, then regen ui_kit/components.jsx */

/* ==========================================================================
   CONVERSATION-HISTORY-CARD — from /Conversation-History-Card (15:75727)
   326×136. Title 16/700 + "(subText)" 14/500 + right-aligned time 12/500
   · description 14/regular · "View conversation" 148×32 button.
   ========================================================================== */
const ConversationHistoryCard = ({
  title = 'Text Message',
  subText = '(Incoming)',
  when = 'Yesterday at 4:30 pm',
  preview = 'She asked about pricing for a white AeroVibe Limited trim.',
  action = 'View conversation',
}) => (
  <div className="t1-history-v2">
    <div className="t1-history-v2__head">
      <div className="t1-history-v2__title-row">
        <span className="t1-history-v2__title">{title}</span>
        {subText && <span className="t1-history-v2__subtext">{subText}</span>}
      </div>
      <span className="t1-history-v2__when">{when}</span>
    </div>
    <div className="t1-history-v2__preview">{preview}</div>
    <Button size="md" variant="contained" color="primary">{action}</Button>
  </div>
);
