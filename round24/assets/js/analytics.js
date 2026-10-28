/* Cameron Whitters: visitor analytics (Microsoft Clarity). Load as a normal script in <head>,
   straight after consent.js, on every page.

   - Counts visits and pages, shows traffic sources, and records heatmaps and scroll depth.
   - Custom events: apply_click (tag cta = which Apply button), application_opened,
     application_submitted. Pages call window.CWTrack(name, tags).
   - The application form lives inside Typeform's own frame, which Clarity cannot see, so
     application answers are never recorded.
   - Nothing loads until CLARITY_ID is filled in, and only on the hosts listed below. */
(function () {
  "use strict";
  var CLARITY_ID = "";   // Microsoft Clarity project ID (public: it appears in the page source)
  var HOSTS = ["www.cameronwhitters.com", "cameronwhitters.com", "stalins007.github.io"];
  var enabled = !!CLARITY_ID && HOSTS.indexOf(location.hostname) !== -1;

  window.CWTrack = function (name, tags) {
    if (!enabled || !window.clarity) return;
    try {
      if (tags) for (var k in tags) window.clarity("set", k, String(tags[k]));
      window.clarity("event", name);
    } catch (e) {}
  };

  if (!enabled) return;
  /* Standard Microsoft Clarity snippet */
  (function (c, l, a, r, i, t, y) { c[a] = c[a] || function () { (c[a].q = c[a].q || []).push(arguments); };
    t = l.createElement(r); t.async = 1; t.src = "https://www.clarity.ms/tag/" + i;
    y = l.getElementsByTagName(r)[0]; y.parentNode.insertBefore(t, y); })(window, document, "clarity", "script", CLARITY_ID);
  if (location.hostname === "stalins007.github.io") window.clarity("set", "env", "preview");

  // Every Apply button carries data-cta (nav, sticky, hero, proof, engagement, final).
  document.addEventListener("click", function (e) {
    var a = e.target && e.target.closest ? e.target.closest("[data-cta]") : null;
    if (a) window.CWTrack("apply_click", { cta: a.getAttribute("data-cta") || "unknown" });
  }, true);
})();
