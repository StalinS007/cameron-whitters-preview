/* No credentials. Host owns CMP, Pixel initialization and the server event ledger. */
export const FORM_ID = 'epGkkctg';
export const STORAGE_KEY = 'cw.application.attribution.v1';
const SENT_KEY = 'cw.application.browser-events.v1';
const CAMPAIGN_KEYS = ['utm_source', 'utm_medium', 'utm_campaign', 'utm_content',
  'utm_term', 'utm_id', 'meta_campaign_id', 'meta_adset_id', 'meta_ad_id'];
export const TOUCH_KEYS = [...CAMPAIGN_KEYS, 'fbclid', 'fbp', 'fbc',
  'landing_page', 'original_referrer', 'lead_source'];
export const HIDDEN_KEYS = [...TOUCH_KEYS, 'first_captured_at',
  ...TOUCH_KEYS.map(k => `latest_${k}`), 'latest_captured_at',
  'marketing_consent', 'consent_captured_at', 'consent_receipt'];

// Only static, public routes are retained. Query, fragment, credentials and arbitrary paths are dropped.
export function safePageUrl(raw, allowedPaths = ['/','/apply','/apply/']) {
  try {
    const url = new URL(raw);
    if (!['https:', 'http:'].includes(url.protocol)) return '';
    const path = allowedPaths.includes(url.pathname) ? url.pathname : '/';
    return `${url.origin}${path}`;
  } catch { return ''; }
}
export function safeReferrer(raw) {
  try {
    const url = new URL(raw);
    return ['https:', 'http:'].includes(url.protocol) ? `${url.origin}/` : '';
  } catch { return ''; }
}
function safeLabel(raw) {
  return typeof raw === 'string' && /^[\p{L}\p{N} _.,:+\-]{1,160}$/u.test(raw) ? raw : '';
}
function safeId(raw) {
  return typeof raw === 'string' && /^[A-Za-z0-9_-]{1,512}$/.test(raw) ? raw : '';
}
function cookieValue(cookie, name) {
  const value = cookie.split(';').map(s => s.trim()).find(s => s.startsWith(`${name}=`));
  try { return value ? decodeURIComponent(value.slice(name.length + 1)) : ''; }
  catch { return ''; }
}
// Valid Meta cookies are kept exactly as stored, including Meta Parameter Builder's optional suffix.
function safeFbp(value) { return /^fb\.\d\.\d{13}\.\d{1,40}(\.[A-Za-z0-9_-]{1,64})?$/.test(value) ? value : ''; }
function safeFbc(value) {
  if (!/^fb\.\d\.\d{13}\.[A-Za-z0-9_-]{5,512}(\.[A-Za-z0-9_-]{1,64})?$/.test(value)) return '';
  return /(?:TEST_VALUE|PLACEHOLDER|TEST_CLICK)/i.test(value) ? '' : value;
}
function safeTime(value) {
  return typeof value === 'string' && /^\d{4}-\d\d-\d\dT\d\d:\d\d:\d\d\.\d{3}Z$/.test(value)
    && Number.isFinite(Date.parse(value)) ? value : '';
}
// fbc for the latest touch: the Pixel's own cookie, unless a newer ad click arrived that the cookie
// doesn't describe; then Meta's documented format, fb.1.<click time in ms>.<fbclid>, from the click
// exactly as it arrived (case kept) and the time it first reached the site. Never invented.
function clickId(fbc) { return fbc ? fbc.split('.')[3] || '' : ''; }
function currentFbc(touch, cookieFbc) {
  const click = touch && touch.fbclid;
  const at = click && touch.fbclid_at ? Date.parse(touch.fbclid_at) : NaN;
  if (cookieFbc && (!click || clickId(cookieFbc) === click)) return cookieFbc;
  if (click && Number.isFinite(at)) return safeFbc(`fb.1.${at}.${click}`);
  return cookieFbc || '';
}
// A repeat of the same click (reload, back button) keeps the time it first arrived.
function keepClickTime(next, previous) {
  if (next && previous && next.fbclid && next.fbclid === previous.fbclid && previous.fbclid_at) next.fbclid_at = previous.fbclid_at;
  return next;
}
function cleanTouch(value, allowedPaths) {
  if (!value || !safeTime(value.captured_at)) return null;
  const result = {};
  for (const key of CAMPAIGN_KEYS) result[key] = safeLabel(value[key]);
  result.fbclid = safeId(value.fbclid);
  result.fbclid_at = result.fbclid ? safeTime(value.fbclid_at) : '';
  result.fbp = safeFbp(value.fbp || '');
  result.fbc = safeFbc(value.fbc || '');
  result.landing_page = safePageUrl(value.landing_page, allowedPaths);
  result.original_referrer = safeReferrer(value.original_referrer);
  result.lead_source = safeLabel(value.lead_source);
  result.captured_at = value.captured_at;
  return result.landing_page ? result : null;
}

export function createAttribution({
  browser = window,
  consent = { isGranted: () => false, subscribe: () => () => {} },
  allowedPaths = ['/','/apply','/apply/'],
  now = () => new Date().toISOString(),
  onDiagnostic = () => {},
} = {}) {
  const report = code => { try { onDiagnostic({ code }); } catch {} };
  const hasConsent = () => { try { return consent.isGranted() === true; } catch { return false; } };
  function storageGet(key) {
    try { return browser.localStorage.getItem(key); }
    catch { report('storage_unavailable'); return null; }
  }
  function storageSet(key, value) {
    try { browser.localStorage.setItem(key, value); }
    catch { report('storage_unavailable'); }
  }
  function storageRemove(key) {
    try { browser.localStorage.removeItem(key); }
    catch { report('storage_unavailable'); }
  }
  function capture() {
    const url = new URL(browser.location.href);
    const referrer = safeReferrer(browser.document.referrer);
    const touch = { captured_at: now() };
    for (const key of CAMPAIGN_KEYS) touch[key] = safeLabel(url.searchParams.get(key));
    touch.fbclid = safeId(url.searchParams.get('fbclid'));
    touch.fbclid_at = touch.fbclid ? touch.captured_at : '';   // captured before cleanAddressBar() removes it
    let cookies = '';
    if (hasConsent()) { try { cookies = browser.document.cookie || ''; } catch {} }
    touch.fbp = safeFbp(cookieValue(cookies, '_fbp'));
    touch.fbc = safeFbc(cookieValue(cookies, '_fbc'));
    touch.landing_page = safePageUrl(url.href, allowedPaths);
    touch.original_referrer = referrer;
    const internal = referrer === `${url.origin}/`;
    const campaign = CAMPAIGN_KEYS.some(key => touch[key]) || !!touch.fbclid;
    touch.lead_source = touch.utm_source || (touch.fbclid ? 'facebook' :
      referrer && !internal ? 'referral' : 'direct');
    return { touch, internal: internal && !campaign };
  }
  let observed = capture();
  let first = observed.touch;
  let latest = observed.touch;
  let active = null;
  let activeReceipt = '';
  let grantTime = '';
  let sent = new Set();
  const listeners = new Set();
  function persist() {
    if (hasConsent()) storageSet(STORAGE_KEY, JSON.stringify({ version: 1, first, latest }));
  }
  function syncConsent() {
    const granted = hasConsent();
    let receipt = '';
    if (granted) { try { receipt = safeId(consent.getReceipt?.()); } catch {} }
    if (granted === active && receipt === activeReceipt) return;
    const previous = active;
    active = granted;
    activeReceipt = receipt;
    if (granted) {
      grantTime = now();
      try {
        const stored = JSON.parse(storageGet(STORAGE_KEY) || 'null');
        if (stored?.version === 1) {
          // Whole snapshot, including blank UTMs: a direct first visit stays direct.
          first = cleanTouch(stored.first, allowedPaths) || first;
          const storedLatest = cleanTouch(stored.latest, allowedPaths);
          if (observed.internal) latest = storedLatest || latest;
          else keepClickTime(latest, storedLatest);
        }
        const ids = JSON.parse(storageGet(SENT_KEY) || '[]');
        if (Array.isArray(ids)) sent = new Set(ids.filter(safeId).slice(-100));
      } catch { report('stored_data_invalid'); }
      persist();
    } else {
      storageRemove(STORAGE_KEY);
      storageRemove(SENT_KEY);
      sent.clear();
      grantTime = '';
      // Revocation begins a new untracked observation period; never restore withdrawn identifiers.
      if (previous !== null) {
        const clean = { ...capture().touch };
        for (const key of CAMPAIGN_KEYS) clean[key] = '';
        clean.fbclid = clean.fbp = clean.fbc = '';
        clean.lead_source = 'direct';
        first = latest = clean;
        observed = { touch: clean, internal: false };
      }
    }
    for (const listener of listeners) { try { listener(granted); } catch { report('consent_listener_failed'); } }
  }
  syncConsent();
  let unsubscribe = () => {};
  try { unsubscribe = consent.subscribe?.(syncConsent) || unsubscribe; }
  catch { report('consent_subscription_failed'); }
  return {
    hasConsent,
    syncConsent,
    subscribe(listener) { listeners.add(listener); return () => listeners.delete(listener); },
    captureVisit() {
      syncConsent();
      observed = capture();
      if (!observed.internal) latest = keepClickTime(observed.touch, latest);
      persist();
    },
    hidden() {
      syncConsent();
      // No tracking identifiers are forwarded to Typeform without explicit current consent.
      if (!hasConsent()) return { marketing_consent: 'not_granted' };
      // Pixel may have become ready after the first page observation. First touch remains unchanged.
      try {
        const cookies = browser.document.cookie || '';
        latest = { ...latest,
          fbp: safeFbp(cookieValue(cookies, '_fbp')),
          fbc: currentFbc(latest, safeFbc(cookieValue(cookies, '_fbc'))) };
      } catch {}
      persist();
      const hidden = {};
      for (const key of TOUCH_KEYS) {
        hidden[key] = first[key] || '';
        hidden[`latest_${key}`] = latest[key] || '';
      }
      hidden.first_captured_at = first.captured_at;
      hidden.latest_captured_at = latest.captured_at;
      // Meta matching (26 Oct handover): the visitor's real browser string, read at mount time.
      try { hidden.user_agent = String(browser.navigator?.userAgent || '').slice(0, 512); } catch { hidden.user_agent = ''; }
      // Notice-based measurement (26 Oct): no opt-out mechanism on the site, so no known objection.
      hidden.measurement_mode = 'notice_opt_out_v1';
      hidden.measurement_opt_out = 'false';
      hidden.marketing_consent = 'not_asked';   // No cookie banner since 26 Oct 2026: campaign details are sent for every applicant.
      hidden.consent_captured_at = grantTime;
      // Informational opaque reference only. The server must independently validate its record.
      try { hidden.consent_receipt = safeId(consent.getReceipt?.()); } catch { hidden.consent_receipt = ''; }
      return hidden;
    },
    hasSent(id) { return sent.has(id); },
    markQueued(id) {
      if (!hasConsent()) return;
      sent.add(id);
      sent = new Set([...sent].slice(-100));
      storageSet(SENT_KEY, JSON.stringify([...sent]));
    },
    cleanAddressBar() {
      // Run before host CMP loads Pixel. The raw visit has already been captured in memory.
      const current = new URL(browser.location.href);
      if (!allowedPaths.includes(current.pathname)) {
        report('url_clean_unknown_route');
        return false;
      }
      if (current.search || current.hash) {
        try { browser.history.replaceState(browser.history.state, '', safePageUrl(current.href, allowedPaths)); }
        catch { report('url_clean_failed'); return false; }
      }
      return true;
    },
    destroy() { unsubscribe(); listeners.clear(); },
  };
}

export function mountApplication({
  createWidget,
  container,
  attribution,
  browser = window,
  formId = FORM_ID,
  // Leave false until the real dataset and server canonical ID have been verified in Test Events.
  enableMetaSubmission = false,
  onSubmitted = () => {},
  onDiagnostic = () => {},
}) {
  if (typeof createWidget !== 'function' || !container || !attribution) throw new Error('Missing embed dependency');
  const report = code => { try { onDiagnostic({ code }); } catch {} };
  let widget;
  let generation = 0;
  let destroyed = false;
  function render() {
    const currentGeneration = ++generation;
    widget?.unmount?.();
    container.replaceChildren();
    widget = createWidget(formId, {
      container,
      hidden: attribution.hidden(),
      transitiveSearchParams: [],
      inlineOnMobile: true,
      hideFooter: false,
      autoFocus: false,
      iframeProps: { title: 'Apply to work with Cameron', referrerPolicy: 'origin' },
      onSubmit: ({ responseId, formId: submittedFormId } = {}) => {
        if (destroyed || currentGeneration !== generation) return;
        if (submittedFormId && submittedFormId !== formId) return;
        // Never generate a replacement ID: webhook form_response.token must match exactly.
        if (!safeId(responseId)) { report('submission_id_missing_or_invalid'); return; }
        try { onSubmitted({ responseId }); } catch { report('submission_listener_failed'); }
        attribution.syncConsent();
        if (!enableMetaSubmission || !attribution.hasConsent() || attribution.hasSent(responseId)) return;
        // Pixel reads the page URL itself. Block this event if raw query/fragment is still present.
        const url = new URL(browser.location.href);
        if (url.search || url.hash) { report('meta_blocked_unsanitized_url'); return; }
        if (typeof browser.fbq !== 'function') { report('pixel_unavailable'); return; }
        try {
          browser.fbq('track', 'SubmitApplication', {}, { eventID: responseId });
          attribution.markQueued(responseId);
        } catch { report('pixel_queue_failed'); }
      },
    });
  }
  const unsubscribe = attribution.subscribe(granted => {
    if (!destroyed) {
      // Each iframe receives a snapshot of hidden fields. Refresh it on both
      // grant and withdrawal so that the active consent/receipt is represented.
      // This resets unfinished form progress; the host must explain that consequence.
      render();
      report(granted ? 'consent_granted_form_restarted' : 'consent_revoked_form_restarted');
    }
  });
  render();
  return {
    destroy() { destroyed = true; ++generation; unsubscribe(); widget?.unmount?.(); container.replaceChildren(); },
  };
}
