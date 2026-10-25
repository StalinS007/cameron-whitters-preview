/* Cameron Whitters: cookie consent + Meta Pixel gate.
   Load as a normal (non-module) script in <head>, before anything else, so the saved choice is
   known before cw-site-bootstrap.mjs is imported (required by Cameron's integration package).

   - window.CWConsent is the adapter the package expects: isGranted(), subscribe(cb), getReceipt().
   - The Pixel (CSW Fitness Market Data, 1073988224464549) is never loaded without consent,
     and only after the page calls window.CWReleasePixel() (after bootstrap has cleaned the URL).
   - Each choice is sent to CONSENT_ENDPOINT with an opaque receipt, event ID and revision.
     Delivery acknowledgement and concurrent revision reconciliation remain separate work. */
(function () {
  "use strict";
  var CONSENT_ENDPOINT = "";   // PREVIEW COPY: consent clicks are not recorded
  var PIXEL_ID = "1073988224464549";
  var PIXEL_HOSTS = ["www.cameronwhitters.com", "cameronwhitters.com"]   // PREVIEW COPY: Pixel never fires here;
  var POLICY_VERSION = "2026-10-18";
  var KEY = "cw.consent.v1";

  var listeners = [];
  var pixelReady = false;   // page has finished bootstrap and allows the Pixel to start
  var pixelLoaded = false;

  function read() { try { return JSON.parse(localStorage.getItem(KEY) || "null"); } catch (e) { return null; } }
  function write(v) { try { localStorage.setItem(KEY, JSON.stringify(v)); } catch (e) {} }
  function newId() {
    try { if (crypto.randomUUID) return crypto.randomUUID(); } catch (e) {}
    var a = new Uint8Array(16); (window.crypto || {}).getRandomValues ? crypto.getRandomValues(a) : a.forEach(function (_, i) { a[i] = Math.random() * 256; });
    return Array.prototype.map.call(a, function (b) { return ("0" + b.toString(16)).slice(-2); }).join("");
  }

  var state = read();       // { id, advertising: "granted" | "declined", at, v, rev }
  function granted() { return !!(state && state.advertising === "granted" && state.v === POLICY_VERSION); }

  window.CWConsent = {
    isGranted: function () { return granted() === true; },
    subscribe: function (cb) { listeners.push(cb); return function () { listeners = listeners.filter(function (f) { return f !== cb; }); }; },
    getReceipt: function () { return state && state.id ? String(state.id).replace(/[^A-Za-z0-9_-]/g, "") : ""; },
  };

  function log() {
    if (CONSENT_ENDPOINT) {
      var evt = JSON.stringify({
        consent_id: state.id, event_id: newId(), revision: state.rev, choice: state.advertising, purpose: "advertising",
        policy_version: POLICY_VERSION, occurred_at: state.at, page: location.origin + location.pathname,
      });
      try { fetch(CONSENT_ENDPOINT, { method: "POST", keepalive: true, headers: { "Content-Type": "text/plain" }, body: evt }); } catch (e) {}
      return;
    }

  }

  function loadPixel() {
    if (!pixelReady || !granted() || PIXEL_HOSTS.indexOf(location.hostname) === -1) return;
    if (pixelLoaded) {
      // Re-grant the existing Pixel without another init or PageView.
      if (typeof window.fbq === "function") window.fbq("consent", "grant");
      return;
    }
    pixelLoaded = true;
    /* Standard Meta Pixel base code */
    !function (f, b, e, v, n, t, s) { if (f.fbq) return; n = f.fbq = function () { n.callMethod ? n.callMethod.apply(n, arguments) : n.queue.push(arguments); };
      if (!f._fbq) f._fbq = n; n.push = n; n.loaded = !0; n.version = "2.0"; n.queue = []; t = b.createElement(e); t.async = !0;
      t.src = v; s = b.getElementsByTagName(e)[0]; s.parentNode.insertBefore(t, s); }(window, document, "script", "https://connect.facebook.net/en_US/fbevents.js");
    window.fbq("set", "autoConfig", false, PIXEL_ID);   // no automatic page scraping / advanced matching
    window.fbq("consent", "grant");
    window.fbq("init", PIXEL_ID);
    window.fbq("track", "PageView");
  }
  window.CWReleasePixel = function () { pixelReady = true; loadPixel(); };

  function clearMetaCookies() {
    ["_fbp", "_fbc"].forEach(function (name) {
      var host = location.hostname, parts = host.split(".");
      var domains = ["", host, "." + host]; if (parts.length > 2) domains.push("." + parts.slice(-2).join("."));
      domains.forEach(function (d) { document.cookie = name + "=; Max-Age=0; path=/" + (d ? "; domain=" + d : ""); });
    });
  }

  function setChoice(advertising) {
    var wasGranted = granted();
    state = { id: (state && state.id) || newId(), advertising: advertising, at: new Date().toISOString(), v: POLICY_VERSION, rev: ((state && state.rev) || 0) + 1 };
    write(state);
    log();
    if (advertising === "granted") loadPixel();
    else if (wasGranted) { if (window.fbq) window.fbq("consent", "revoke"); clearMetaCookies(); }
    listeners.slice().forEach(function (cb) { try { cb(granted()); } catch (e) {} });
    hide();
  }

  // A storage event is generated in the other tabs, never the writing tab.
  // Synchronization changes local behavior only; it must not repost the choice.
  window.addEventListener("storage", function (event) {
    if (event.key !== KEY && event.key !== null) return;
    if (event.storageArea && event.storageArea !== localStorage) return;
    var wasGranted = granted();
    state = read();
    if (granted()) {
      if (!wasGranted) loadPixel();
    } else {
      if (wasGranted && typeof window.fbq === "function") window.fbq("consent", "revoke");
      clearMetaCookies();
    }
    listeners.slice().forEach(function (cb) { try { cb(granted()); } catch (e) {} });
    if (box) show(true);
    else if (!state || state.v !== POLICY_VERSION) show(false);
  });

  /* ---------- Banner UI (self-contained styles so it works on every page) ---------- */
  var css = ".cwc{position:fixed;z-index:70;left:12px;right:12px;bottom:calc(12px + env(safe-area-inset-bottom));max-width:520px;margin:0 auto;background:#121212;border:1px solid rgba(184,155,106,.45);color:#c8c3b9;font:13px/1.4 Inter,system-ui,-apple-system,Helvetica,Arial,sans-serif;padding:10px 10px 10px 14px;box-shadow:0 8px 28px rgba(0,0,0,.55);display:flex;align-items:center;gap:12px}" +
    ".cwc p{margin:0;flex:1 1 auto;min-width:0}.cwc a{color:#d2b88c;text-decoration:underline;text-underline-offset:3px}" +
    ".cwc-row{display:flex;gap:6px;flex:none}" +
    ".cwc button{font:500 11px/1 Oswald,'Arial Narrow',sans-serif;letter-spacing:.16em;text-transform:uppercase;padding:9px 12px;cursor:pointer;border:1px solid #b89b6a}" +
    ".cwc .cwc-yes{background:#b89b6a;color:#0b0b0b}.cwc .cwc-no{background:transparent;color:#f3f0ea;border-color:rgba(243,240,234,.35)}" +
    ".cwc button:focus-visible{outline:2px solid #f0c46e;outline-offset:2px}" +
    "@media (max-width:420px){.cwc{font-size:12px;gap:8px;padding:8px 8px 8px 12px}.cwc button{padding:8px 10px;letter-spacing:.12em}}";
  var box = null;
  function privacyHref() { var path = location.pathname; return /\/(apply|privacy|terms)\/?$/.test(path) ? "../privacy/" : "privacy/"; }
  function show(settings) {
    if (!document.body) return;
    if (!document.getElementById("cwc-style")) { var st = document.createElement("style"); st.id = "cwc-style"; st.textContent = css; document.head.appendChild(st); }
    if (box) box.remove();
    box = document.createElement("div");
    box.className = "cwc"; box.setAttribute("role", "dialog"); box.setAttribute("aria-label", "Cookie preferences");
    var current = settings && state ? (granted() ? " (On)" : " (Off)") : "";
    box.innerHTML = "<p>We use cookies to improve your experience." + current + "</p>" +
      '<div class="cwc-row"><button type="button" class="cwc-yes">Accept</button><button type="button" class="cwc-no">' + (settings && granted() ? "Withdraw" : "Decline") + "</button></div>";
    box.querySelector(".cwc-yes").addEventListener("click", function () { setChoice("granted"); });
    box.querySelector(".cwc-no").addEventListener("click", function () { setChoice("declined"); });
    document.body.appendChild(box);
  }
  function hide() { if (box) { box.remove(); box = null; } }
  window.CWConsentSettings = function () { show(true); };

  function init() {
    document.querySelectorAll("[data-cookie-settings]").forEach(function (a) {
      a.addEventListener("click", function (e) { e.preventDefault(); show(true); });
    });
    if (!state || state.v !== POLICY_VERSION) show(false);
  }
  if (document.readyState === "loading") document.addEventListener("DOMContentLoaded", init); else init();
})();
