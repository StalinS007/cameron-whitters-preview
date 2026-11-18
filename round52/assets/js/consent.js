/* Cameron Whitters: Meta Pixel loader. No cookie banner (removed 26 Oct 2026 at Cameron's request).
   Load as a normal (non-module) script in <head>, before anything else, so window.CWConsent exists
   before cw-site-bootstrap.mjs is imported.

   - The Pixel (CSW Fitness Market Data, 1073988224464549) loads for every visitor on the live domain,
     after the page calls window.CWReleasePixel() (after bootstrap has cleaned the URL).
   - window.CWConsent is kept as the adapter cw-site-bootstrap.mjs / cw-application.mjs expect. It always
     reports advertising as on, so campaign details travel with every application.
   - autoConfig stays off: the Pixel never reads form fields, and application answers never go to Meta. */
(function () {
  "use strict";
  var PIXEL_ID = "1073988224464549";
  var PIXEL_HOSTS = ["www.cameronwhitters.com", "cameronwhitters.com"]   // PREVIEW COPY: Pixel never fires here;

  // The old banner's saved choice is no longer used.
  try { localStorage.removeItem("cw.consent.v1"); } catch (e) {}

  window.CWConsent = {
    isGranted: function () { return true; },
    subscribe: function () { return function () {}; },
    getReceipt: function () { return ""; },
  };

  var pixelReady = false;
  var pixelLoaded = false;
  function loadPixel() {
    if (!pixelReady || pixelLoaded || PIXEL_HOSTS.indexOf(location.hostname) === -1) return;
    pixelLoaded = true;
    /* Standard Meta Pixel base code */
    !function (f, b, e, v, n, t, s) { if (f.fbq) return; n = f.fbq = function () { n.callMethod ? n.callMethod.apply(n, arguments) : n.queue.push(arguments); };
      if (!f._fbq) f._fbq = n; n.push = n; n.loaded = !0; n.version = "2.0"; n.queue = []; t = b.createElement(e); t.async = !0;
      t.src = v; s = b.getElementsByTagName(e)[0]; s.parentNode.insertBefore(t, s); }(window, document, "script", "https://connect.facebook.net/en_US/fbevents.js");
    window.fbq("set", "autoConfig", false, PIXEL_ID);   // no automatic page scraping / advanced matching
    window.fbq("init", PIXEL_ID);
    window.fbq("track", "PageView");
  }
  window.CWReleasePixel = function () { pixelReady = true; loadPixel(); };
})();
