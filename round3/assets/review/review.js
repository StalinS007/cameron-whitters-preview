/* PREVIEW-ONLY review markers: Cameron's Website Edit Guide, Loom and WhatsApp updates (22 Oct 2026 round)
   and what was done about each point. Injected into the preview site by tools/preview_sync.py;
   never part of the live site. Markers are attached by CSS selector at runtime, so index.html
   carries no review attributes. */
(() => {
  const EDITS = {
    "N1": {"t": "Swap Josh and Jourdon", "s": "done", "src": "WhatsApp 24 Oct 9:20 am", "ask": "\"I think swap Josh with Jourdon here\"", "did": "Jourdon is now the first testimonial. Order: Jourdon, Riccardo, Oliver, Josh, Donnie, Meylad, Michael, Stefan.", "sel": "#results .quotes-strip .quote:nth-child(1)"},
    "L2": {"t": "Stefan replaces the empty 'Private client' card", "s": "check", "src": "Loom 24 Oct 0:21 + WhatsApp 8:25 pm", "ask": "\"we'll replace that so it doesn't look random\"", "did": "Stefan (Executive) takes the last testimonial slot with his before/after and his full quote, word for word from Cameron's WhatsApp. Sam's card is gone from the page (his quote can come back if Cameron wants it). Check: is that what he meant?", "sel": "#results .quotes-strip .quote:nth-child(8)"},
    "L3": {"t": "About now sits under the testimonials, case studies below", "s": "done", "src": "WhatsApp 9:21 am + Loom 0:54, 4:32", "ask": "\"move the about me section up to go under the testimonials\" / \"Then go back into case studies\"", "did": "Order: hero, testimonials, About Cameron, case studies, then the rest.", "sel": "#about .about-c"},
    "L4": {"t": "About photos blend into the page", "s": "check", "src": "Loom 1:04, 4:38", "ask": "\"blur those edges just so it doesn't look as like stuck in the middle\"", "did": "The box and border are gone; the edges of the photo fade into the page. Check the look.", "sel": ".about-c-media"},
    "L5": {"t": "Cream bands: the bridge section and the final Apply section", "s": "check", "src": "Loom 1:38, 4:07", "ask": "\"maybe change the color here to this\" / \"maybe that should be this color… Unless you think it looks good black\"", "did": "'You already have enough to manage' is now its own cream band, and the final Apply section is cream with a dark button. Our call, so check it.", "sel": ".bridge-sec .bridge"},
    "L6": {"t": "New Josh photo (Josh 1.JPG)", "s": "done", "src": "Loom 2:19 + WhatsApp 9:32 am", "ask": "\"you can put this one instead of Josh up here\"", "did": "Josh's testimonial card shows the kitchen-selfie before and bathroom-flex after (Josh 1.JPG).", "sel": "#results .quotes-strip .quote:nth-child(4)"},
    "L8": {"t": "Every transformation on the wall (38 cards)", "s": "check", "src": "Loom 2:49, 3:11 + WhatsApp 25 Oct", "ask": "\"make sure you've used absolutely every transformation I have\" / \"Just load them all in there… a gallery of people\"", "did": "Added the 5 photos from his All Transformations folder that were missing (Johan 1, Johan Back, Jordan Front, Jordan Back, Stefan's second) and put the testimonial clients together at the very end of the wall (Jourdon, Riccardo, Oliver, Josh x3, Donnie, Meylad, Michael, Stefan x2). Left out on purpose: Sam (no photos) and Donnie's second photo (Cameron: use the abs one).", "sel": "#wallGrid"},
    "L9": {"t": "Stefan on the wall, without a title", "s": "done", "src": "Loom 3:28 + Stalin 25 Oct", "ask": "\"in the actual results… put him in, but don't put that title saying Executive in there\"", "did": "Stefan has two wall cards at the end with just his name. 'Executive' only appears on his testimonial card.", "sel": "#wallGrid figure:nth-last-child(2)"},
  };
  const TODO = ["W2 · Timeframes: Cameron sends them, then 'Name · timeframe' goes under every wall card.", "L2 · Check: Stefan replaced Sam's card. Does Sam's quote drop off, or go somewhere else?", "VSL (VSL chat) · Josh 1.JPG and the same testimonials as the site (Stefan in, Sam out).", "R2 · Video hosting move needs Cameron's card (ads ready around Sun/Mon)."];
  const STATUS = { done: "Done", check: "Done · is this OK?", needs: "Waiting on Cameron" };
  const TITLE = "Website edits · 24 Oct (round 2)";

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
      <div class="rv-sec rv-ask"><i>Cameron said (${esc(e.src || "WhatsApp")})</i><p>${esc(e.ask)}</p></div>`;
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
      <div class="rv-todo"><b>Still to do / to clarify</b><ol>${TODO.map((x) => `<li>${esc(x)}</li>`).join("")}</ol></div>
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
