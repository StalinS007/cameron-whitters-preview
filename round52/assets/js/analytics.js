/* Cameron Whitters: visitor analytics (Microsoft Clarity + Google Analytics 4). Load as a normal
   script in <head>, straight after consent.js, on every page.

   - Clarity: visits, traffic sources, heatmaps, scroll depth and session recordings.
   - GA4: visits and trends over time, campaign attribution, funnel reporting. Enhanced measurement
     (scrolls, outbound clicks) is on in the GA4 property itself.
   - Custom events, sent to both: apply_click (tag cta = which Apply button), application_opened,
     application_submitted. Pages call window.CWTrack(name, tags).
   - The application form lives inside Typeform's own frame, which neither tool can see, so
     application answers are never recorded.
   - Only runs on the hosts listed below. Preview visits are marked (Clarity tag env=preview,
     GA4 traffic_type=internal) so they can be filtered out of the real numbers. */
(function () {
  "use strict";
  var CLARITY_ID = "z4r6uf976u";    // Microsoft Clarity project ID (public: it appears in the page source)
  var GA_ID = "G-RGPC4YKJ2T";       // Google Analytics 4 measurement ID (public, likewise)
  var HOSTS = ["www.cameronwhitters.com", "cameronwhitters.com", "stalins007.github.io"];
  var onHost = HOSTS.indexOf(location.hostname) !== -1;
  var preview = location.hostname === "stalins007.github.io";
  var clarityOn = !!CLARITY_ID && onHost;
  var gaOn = !!GA_ID && onHost;

  window.CWTrack = function (name, tags) {
    tags = tags || {};
    try {
      if (clarityOn && window.clarity) {
        for (var k in tags) window.clarity("set", k, String(tags[k]));
        window.clarity("event", name);
      }
      if (gaOn && window.gtag) window.gtag("event", name, tags);
    } catch (e) {}
  };

  if (clarityOn) {
    /* Standard Microsoft Clarity snippet */
    (function (c, l, a, r, i, t, y) { c[a] = c[a] || function () { (c[a].q = c[a].q || []).push(arguments); };
      t = l.createElement(r); t.async = 1; t.src = "https://www.clarity.ms/tag/" + i;
      y = l.getElementsByTagName(r)[0]; y.parentNode.insertBefore(t, y); })(window, document, "clarity", "script", CLARITY_ID);
    if (preview) window.clarity("set", "env", "preview");
  }

  if (gaOn) {
    /* Standard Google tag (gtag.js) */
    var g = document.createElement("script"); g.async = true;
    g.src = "https://www.googletagmanager.com/gtag/js?id=" + GA_ID;
    document.head.appendChild(g);
    window.dataLayer = window.dataLayer || [];
    window.gtag = window.gtag || function () { window.dataLayer.push(arguments); };
    window.gtag("js", new Date());
    window.gtag("config", GA_ID, preview ? { traffic_type: "internal" } : {});
  }

  if (!clarityOn && !gaOn) return;
  // Every Apply button carries data-cta (nav, sticky, hero, proof, engagement, final).
  document.addEventListener("click", function (e) {
    var a = e.target && e.target.closest ? e.target.closest("[data-cta]") : null;
    if (a) window.CWTrack("apply_click", { cta: a.getAttribute("data-cta") || "unknown" });
  }, true);
})();
