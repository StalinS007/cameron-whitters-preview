/* PREVIEW-ONLY review markers: Cameron's Website Edit Guide, Loom and WhatsApp updates (22 Oct 2026 round)
   and what was done about each point. Injected into the preview site by tools/preview_sync.py;
   never part of the live site. Markers are attached by CSS selector at runtime, so index.html
   carries no review attributes. */
(() => {
  const EDITS = {
    1:  { sel: ".hero-cred", t: "Credentials line above the video", s: "done", src: "Loom 0:20–1:27",
          ask: "\"I think we should move these higher so that when you first come on the page… you already know who I am and what I do… Cameron Whitters, Mr Australia 2026. I wouldn't say international bodybuilding competitor… So you could just say private physique coach to business owners… And then boom, hit the VSL.\"",
          did: "Added 'Cameron Whitters — Mr Australia 2026 / Private physique coach to business owners' under the intro, before the video. The old three-marker strip under the button is removed (Stalin, 23 Oct). No 'international' wording." },
    2:  { sel: ".hero .cta-sub", t: "'Not all applications are accepted' is back", s: "done", src: "Loom 1:34",
          ask: "\"Apply to work with Cameron. I think here say not all applications are accepted and then you can put the agree[d result line] and then that'll be the hero section.\"",
          did: "Under the hero button: the review note, then 'Not all applications are accepted.', then the guarantee line." },
    3:  { sel: "#results .quotes-head", t: "Testimonials straight after the hero", s: "done", src: "Loom 1:50–2:58",
          ask: "\"I don't think we should have the big collage of everybody here… put the testimonials of the people they care about… Instead, you could say real clients documented results and then we could do the swipe.\"",
          before: "A 29-photo collage titled 'Real clients. Documented results.'",
          did: "Collage removed (desktop and phone). The testimonial cards (before/after + quote) now sit right under the hero with that heading, and the old testimonials block further down is gone." },
    4:  { sel: "#quoteStrip", pos: "inside", t: "His new testimonial wording, in his order", s: "done", src: "WhatsApp + Testimonials doc 23 Oct · Loom 2:34",
          ask: "\"Replace all your testimonies, including the ones in the video, with these brother. They're a lot better\" · \"Do Josh, then Ricardo, then Jordan, then Donnie, Sam, Oliver, Maylad and Michael.\"",
          did: "All 8 quotes word for word from his doc, in his order. Roles from his doc, except Oliver = Managing Director (Stalin). Donnie's card uses his abs photo. Sam stays text-only." },
    5:  { sel: "#proof .case:nth-child(1) .who", t: "Riccardo: subtitle, body fat, quote", s: "check", src: "Loom 8:27–9:46",
          ask: "\"I'm not sure why this says estimated. Fucking scrap that. That should be 25% to 10%… Replace this. This doesn't make sense… Maybe don't say Marino meets here. Just say business owner. And then eight month transformation.\"",
          did: "Case studies now sit right after the testimonials. 'Business owner · 8-month transformation'; body fat '25% → 10%' (no 'estimated', no '~'); quote replaced with his own line about the aquatic centre from the new testimonial. Check the quote choice." },
    6:  { sel: "#proof .case:nth-child(2) .who", t: "Oliver: subtitle, 'weekly' travel, matching quote", s: "done", src: "Loom 9:20–10:40",
          ask: "\"just go managing director, eight month transformation… You can even say Oliver's work took him interstate and overseas weekly… and then you can put one of his quotes in there as well.\"",
          did: "'Managing Director · 8-month transformation', first line now says 'interstate and overseas weekly', and a quote from his new testimonial in the same style as Riccardo's." },
    7:  { sel: "#about .about-c-feat", t: "About moved up, 'Gold medal' tag removed", s: "check", src: "Loom 3:19–4:48",
          ask: "\"Everybody that's read this says this should be way higher… No need to say gold medal. I don't think they're blind.\"",
          did: "About now comes straight after the case studies; copy unchanged; 'Gold medal' tag removed. Photo unchanged for now: he also suggested AAGP3768 or the black-and-white backstage shot (our choice)." },
    8:  { sel: "#life .life-quote", t: "Ella photo to the side, quote big and bold", s: "done", src: "Loom 4:48–5:28",
          ask: "\"on the website, you can't see this photo at all… make this like a photo to the side, full body… And then make this really bold and big… And on the phone, I think it should be a bit longer. Like you can't see my stomach or my legs or Ella's body.\"",
          did: "Desktop: the whole photo beside a big bold quote, with the life copy under it. Phone: the full photo (both of them, down to the knees), then the quote and copy." },
    9:  { sel: ".steps4 li:nth-child(3)", t: "'Review' step: weekly private advisory calls", s: "done", src: "Loom 6:21–7:24",
          ask: "\"This should be like, I assess your progress in our weekly private advisory calls… We don't need to say 45 minutes, 60 minutes, whatever, just say that that's in there.\"",
          did: "Now: 'I assess your progress, supplements and health in our weekly private advisory calls, so decisions follow what is actually happening.'" },
    10: { sel: "#access .access-grid", t: "Direct access: weekly calls + 7-day one-on-one access", s: "check", src: "Loom 7:31–8:16",
          ask: "\"in here needs to be the private weekly advisory calls… they get private one on one access to me, whenever they need, they can send me messages or voice notes seven days a week. And when a call is best to solve it, we're going to call.\"",
          did: "Row 1 is now 'Weekly private advisory calls'; row 2 'Private one-on-one access, seven days a week' with messages/voice notes any day and a call when that's best. Check the row titles." },
    11: { sel: "#wallGrid", pos: "inside", t: "More results: names only, every other client", s: "needs", src: "Loom 11:33–13:31",
          ask: "\"Just name these… Let's do a name and a time frame… let's get rid of these because I've already seen them up top in the testimonials… double check that you've used every transformation in here.\"",
          did: "Roles removed, testimonial and case-study clients taken off, and all 24 other named clients from his folder are in (Sam stays off). Waiting on Cameron for a timeframe per name." },
    12: { sel: ".wall-all", t: "'View all transformations' bolder", s: "done", src: "Loom 12:14",
          ask: "\"make that bolder and more poppier so that they actually see it and they don't scroll past it.\"",
          did: "Solid gold, larger, with a soft glow. 3×3 on desktop and one by one on phones kept." },
    13: { sel: ".timeline .t-step:nth-child(3)", t: "'in a 90-minute strategy session'", s: "done", src: "Loom 14:23",
          ask: "\"You can just say like in a 90 minute strategy session.\"",
          did: "Step 3 now ends '…in a 90-minute strategy session. Then we put the plan into action.'" },
    14: { sel: "#apply .cta-sub", t: "Final section: 'Not all applications are accepted.'", s: "done", src: "Loom 14:34",
          ask: "\"Your application is the first step. We agree on the engagement before you commit. Not all applications are accepted. Boom. Apply.\"",
          did: "Added under the final button's supporting line." },
    15: { sel: "#vsl", t: "New VSL thumbnail", s: "needs", src: "Loom 15:07",
          ask: "\"let's change this. This photo looks fucking stupid… maybe do like a collage of transformations and then me sitting there looking a little bit more like normal.\"",
          did: "Not built yet: next step (collage of transformations + a natural frame of Cameron from the video)." },
  };
  const STATUS = { done: "Done", check: "Done · is this OK?", needs: "Waiting on Cameron" };
  const TITLE = "Website edits · 23 Oct";

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
