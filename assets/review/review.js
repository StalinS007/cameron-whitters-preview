/* PREVIEW-ONLY review markers: Cameron's WhatsApp feedback (Website Work Chat, 19 Oct 2026)
   and what was done about each point. Injected into the preview site by tools/preview_sync.py;
   never part of the live site. Markers are attached by CSS selector at runtime, so index.html
   carries no review attributes. */
(() => {
  const EDITS = {
    1:  { sel: "#proofStrip", pos: "inside", t: "Transformations from the Drive folder", s: "done",
          ask: "\"I don't think I told you to use these transformations. The correct transformations are in the folder in the Google Drive. All of these, use these. If you need names let me know.\"",
          did: "All 25 clients from the All Transformations folder, one tile each, in the same order as the folder (the two duplicate photos left out). Names kept off: too many to label, so it's Before / After only. OK to keep it that way?" },
    2:  { sel: ".strip-title", t: "Same treatment on every photo", s: "done",
          ask: "\"We can't have a couple of photos with statistics on them and a cup, and the rest without.\"",
          did: "Every tile now shows only Before and After. No names, no stats, no medal shot." },
    3:  { sel: ".cred-strip div:nth-child(2)", t: "'Client transformations · Documented results' replaced", s: "check",
          ask: "\"Also this doesn't really make sense. We need to replace that with something else.\"",
          before: "Client transformations · Documented results",
          did: "Now '25+ client transformations · Business owners and executives'. Check: happy with this wording?" },
    4:  { sel: ".hero .cta-sub", t: "Line under the Apply button", s: "check",
          ask: "(Screenshot of the Apply button with 'By application only. Every application is reviewed personally by Cameron.' No comment.)",
          did: "Added 'Not all applicants are accepted.' underneath. Check: is this what you wanted here?" },
    5:  { sel: "#proof .section-head", t: "Riccardo and Oliver case studies", s: "needs",
          ask: "(Screenshot of both case studies, no comment. Earlier: no stats on some photos and not others.)",
          did: "Oliver now uses exactly Riccardo's layout: four boxes (weight arrow, body fat, kg lost, months), with the travel line in the subtitle like Riccardo's business line. Waiting on Cameron for Oliver's exact start and end weight (shown as ~110 kg → ~85 kg, from his case-study text) and body fat (placeholder ~?% → ~?%). Question: keep the full stats on these two, or Before / After only like the strip?" },
    6:  { removedAfter: ".wall", t: "Consent disclaimer removed", s: "check",
          ask: "(Screenshot of 'Client photographs, shared with consent. Results vary.' No comment.)",
          did: "Removed. Check: that's what you wanted? Your edits doc had said to keep it.",
          removed: "Removed: “Client photographs, shared with consent. Results vary.”" },
    7:  { sel: ".quotes-head", t: "All written testimonials in", s: "needs",
          ask: "8 testimonials in the Google Drive doc (one still coming from a client).",
          did: "7 of 8 in, as a swipe strip: Josh, Donnie, Riccardo, Meylad, Oliver, Michael, Sam. Excerpts trimmed from your doc; Michael's reworded from 'you' to 'Cam'. Needs: Jourdon's testimonial (blank in the doc)." },
    8:  { sel: ".about-media", t: "Stage photos: bigger, two of them", s: "check",
          ask: "Make the stage photo bigger, more prominent and more square.",
          did: "Two square stage photos, now a large full-width pair above the About copy (about twice the previous size): front pose on the AGP stage and the gold-medal podium, colour-corrected from your originals. The CHARGE portrait is off the page until the new About section arrives." },
    9:  { sel: ".about-copy", t: "About section copy", s: "needs",
          ask: "Cameron is redoing this section.",
          did: "Unchanged. Waiting on the new version." },
    10: { sel: ".engagement", pos: "inside", t: "Cream section", s: "check",
          ask: "(Screenshot of this section, no comment.)",
          did: "Nothing changed yet. Question: was it the empty space on the right, or the wording?" },
    11: { sel: "#faq", pos: "inside", t: "FAQ copy", s: "needs",
          ask: "\"I'll also give you the correct copy for the frequently asked questions section.\"",
          did: "Waiting on the copy." },
    12: { sel: ".footer-words", t: "'Physical · Performance · Lifestyle'", s: "needs",
          ask: "(Screenshot of this line.) Too generic.",
          did: "Waiting on a rephrase." },
    13: { sel: ".footer nav [data-cookie-settings]", t: "Consent log to Zapier", s: "done",
          ask: "\"Please resend the denied and withdrawn tests and provide their timestamps and HTTP responses.\"",
          did: "All three consent states confirmed received by your team (19 Oct, 5:38 pm). Banner reduced to one line." },
    14: { sel: ".footer nav a[href='privacy/']", t: "Cloudflare consent record (server side)", s: "needs",
          ask: "\"Retain a stable consent ID linked to the visitor, store each change with a unique event ID and revision, provide authenticated forwarding and a way to check the current consent status.\"",
          did: "Agreed. Not built yet; it will be set up in your Cloudflare and tested with your team." },
    15: { sel: ".vsl", pos: "inside", t: "VSL thumbnail caption", s: "check",
          ask: "(Stalin) Drop 'Cameron Whitters explains the six-month engagement.' and sign it off as Cameron instead.",
          did: "Thumbnail re-rendered: the sentence is gone, replaced by '\u2014 Cameron Whitters'." },
    16: { sel: ".cred-strip div:nth-child(3)", t: "'Direct private coaching' replaced", s: "check",
          ask: "(Stalin) Replace 'Direct private coaching' with 'Private executive transformation', 'Managed by Cameron' underneath.",
          before: "Direct private coaching · Managed by Cameron",
          did: "Now 'Private executive transformation · Managed by Cameron'." },
    17: { sel: "#proof .section-head .h2", t: "Third cream section", s: "check",
          ask: "(Stalin, from Cameron's note about changing tones more often) Three cream resets instead of two, evenly spaced: black \u00b7 cream \u00b7 black \u00b7 cream \u00b7 black \u00b7 cream \u00b7 black.",
          did: "Case studies (Riccardo and Oliver) now sit on cream, between the 'Why conventional coaching fails' cream and the engagement cream. The case cards stay dark so the photos and stats stand out." },
    18: { sel: ".wall-head", t: "More results wall", s: "needs",
          ask: "(Stalin) Remove the Before / After labels in this section. Names only on the clients we know.",
          did: "Before / After labels removed from the wall. Names shown only for Donnie (Construction & property) and Meylad (Dental practice owner). Question for Cameron: do you want names and occupations for the other clients in this section? If so, send them through." },
  };
  const STATUS = { done: "Done", check: "Done · is this OK?", needs: "Waiting on Cameron" };
  const TITLE = "Cameron's feedback · 19 Oct";

  const make = (tag, cls, html) => { const e = document.createElement(tag); if (cls) e.className = cls; if (html != null) e.innerHTML = html; return e; };
  const esc = (s) => String(s).replace(/[&<>"]/g, (c) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;" }[c]));

  // Attach markers by selector (no attributes in the real page).
  Object.entries(EDITS).forEach(([n, e]) => {
    if (e.removedAfter) {
      const anchor = document.querySelector(e.removedAfter);
      if (!anchor) return;
      const d = make("div", "rv-removed", esc(e.removed)); d.dataset.edit = n; d.hidden = false;
      anchor.insertAdjacentElement("afterend", d);
      return;
    }
    const el = e.sel && document.querySelector(e.sel);
    if (!el) return;
    el.dataset.edit = n; if (e.pos) el.dataset.editPos = e.pos;
  });

  document.body.classList.add("rv-on");

  // Badges
  document.querySelectorAll("[data-edit]").forEach((el) => {
    const n = el.dataset.edit, e = EDITS[n];
    el.classList.add("rv-target");
    if (getComputedStyle(el).position === "static") el.style.position = "relative";
    const b = make("button", `rv-badge rv-${e.s}${el.dataset.editPos === "right" ? " rv-right" : ""}`, `#${n}`);
    b.type = "button"; b.setAttribute("aria-label", `Point ${n}: ${e.t}`);
    b.addEventListener("click", (ev) => { ev.preventDefault(); ev.stopPropagation(); openPop(el, b); });
    el.appendChild(b);
  });

  // Popover
  const pop = make("div", "rv-pop"); pop.hidden = true; document.body.appendChild(pop);
  const closePop = () => (pop.hidden = true);
  function openPop(el, badge) {
    const n = el.dataset.edit, e = EDITS[n];
    pop.innerHTML = `
      <div class="rv-pop-head"><span class="rv-num">#${n}</span><b>${esc(e.t)}</b><span class="rv-chip rv-${e.s}">${STATUS[e.s]}</span><button type="button" class="rv-x" aria-label="Close">×</button></div>
      <div class="rv-sec"><i>What we did</i><p>${esc(e.did)}</p></div>
      ${e.before ? `<div class="rv-sec rv-before"><i>Before</i><p>${esc(e.before)}</p></div>` : ""}
      <div class="rv-sec rv-ask"><i>Cameron said (WhatsApp, 19 Oct)</i><p>${esc(e.ask)}</p></div>`;
    pop.hidden = false;
    const r = badge.getBoundingClientRect(), w = Math.min(380, window.innerWidth - 24);
    pop.style.width = w + "px";
    pop.style.left = Math.min(Math.max(12, r.left), window.innerWidth - w - 12) + "px";
    pop.style.top = r.bottom + 8 + "px";
    const ph = pop.getBoundingClientRect().height;
    if (r.bottom + 8 + ph > window.innerHeight - 12) pop.style.top = Math.max(12, r.top - ph - 8) + "px";
    pop.querySelector(".rv-x").addEventListener("click", closePop);
  }
  document.addEventListener("click", (e) => { if (!pop.hidden && !pop.contains(e.target)) closePop(); });
  window.addEventListener("scroll", closePop, { passive: true });
  document.addEventListener("keydown", (e) => e.key === "Escape" && closePop());

  // Panel
  const counts = Object.values(EDITS).reduce((a, e) => ((a[e.s] = (a[e.s] || 0) + 1), a), {});
  const total = Object.keys(EDITS).length;
  const panel = make("aside", "rv-panel");
  panel.innerHTML = `
    <div class="rv-bar">
      <button type="button" class="rv-open">${TITLE} <b>${total}</b></button>
      <label class="rv-toggle"><input type="checkbox" checked id="rvShow" /> Markers</label>
    </div>
    <div class="rv-list" hidden>
      <div class="rv-list-head">
        <b>${TITLE} · preview only</b>
        <span><i class="rv-dot rv-done"></i>${counts.done || 0} done <i class="rv-dot rv-check"></i>${counts.check || 0} done, is this OK? <i class="rv-dot rv-needs"></i>${counts.needs || 0} waiting on Cameron</span>
        <small>Click a row to jump to it. Click any badge on the page for what Cameron said and what changed. Red strips show what was removed.</small>
      </div>
      <ol>${Object.entries(EDITS).map(([n, e]) => `
        <li data-go="${n}"><span class="rv-num">#${n}</span><div><b>${esc(e.t)}</b><span class="rv-chip rv-${e.s}">${STATUS[e.s]}</span><p>${esc(e.did)}</p></div></li>`).join("")}
      </ol>
    </div>`;
  document.body.appendChild(panel);
  const list = panel.querySelector(".rv-list");
  panel.querySelector(".rv-open").addEventListener("click", () => (list.hidden = !list.hidden));
  panel.querySelector("#rvShow").addEventListener("change", (e) => {
    const on = e.target.checked;
    document.body.classList.toggle("rv-on", on);
    document.querySelectorAll(".rv-removed").forEach((el) => (el.hidden = !on));
    closePop();
  });
  panel.querySelectorAll("li[data-go]").forEach((li) =>
    li.addEventListener("click", () => {
      const el = document.querySelector(`[data-edit="${li.dataset.go}"]`);
      if (!el) return;
      if (window.innerWidth < 760) list.hidden = true;
      el.closest(".reveal") && el.closest(".reveal").classList.add("in");
      el.classList.add("in");
      window.scrollTo({ top: Math.max(0, el.getBoundingClientRect().top + window.scrollY - 110), behavior: "instant" });
      el.classList.remove("rv-flash"); void el.offsetWidth; el.classList.add("rv-flash");
    })
  );
})();
