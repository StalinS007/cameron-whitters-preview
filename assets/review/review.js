/* PREVIEW-ONLY review markers: Cameron's Website Edit Guide, Loom and WhatsApp updates (22 Oct 2026 round)
   and what was done about each point. Injected into the preview site by tools/preview_sync.py;
   never part of the live site. Markers are attached by CSS selector at runtime, so index.html
   carries no review attributes. */
(() => {
  const EDITS = {
    1:  { sel: ".hero .lede", t: "Hero supporting copy", s: "done", src: "Website Edit Guide",
          ask: "\"REPLACE the supporting paragraph with: A private six-month physique and performance transformation for founders, business owners and executives. Personally managed by me, around your work, travel and family.\"",
          before: "A private six-month physique and performance transformation for founders, CEOs and business owners who have achieved professionally but know they've underperformed physically and personally.",
          did: "Replaced word for word. Headline kept as it was." },
    2:  { sel: ".hero .eyebrow", t: "'Personally managed by Cameron Whitters' line removed", s: "done", src: "Website Edit Guide",
          ask: "\"Keep 'Private Executive Transformation' once as the offer label. Delete its repetition in the credibility strip. Remove the separate widely spaced 'Personally managed by Cameron Whitters' paragraph.\"",
          did: "The separate gold line is gone (the new copy says 'Personally managed by me'). 'Private Executive Transformation' now appears once, as this label." },
    3:  { sel: ".vsl-caption", t: "Video label", s: "check", src: "Website Edit Guide",
          ask: "\"A simple nearby label can read 'Watch Cameron explain the approach · 7 min 52 sec.' Include full captions, as previously requested, and do not autoplay sound.\"",
          did: "Label added under the video, visible on phones too. It says 5 min 41 sec, the length of the current cut (the 7:52 version was replaced). The small 7:52 tag inside the poster is gone. Check: update the time when the final VSL is locked." },
    4:  { sel: ".hero .cta-sub", t: "Application note + 'Not all applicants are accepted' removed", s: "check", src: "Guide + Loom 5:30",
          ask: "Guide: \"REPLACE the application note with: I personally review every application. If I believe I can help, we'll arrange a private conversation.\" Loom: \"Not all applicants are accepted. I think we're just gonna get rid of this completely man.\"",
          before: "By application only. Every application is reviewed personally by Cameron. Not all applicants are accepted.",
          did: "Replaced with the guide's note. 'Not all applicants are accepted' is removed everywhere on the page (hero, engagement, final section). To discuss with Cameron: he said 'we can always go over that together', and the line isn't in his written guide." },
    5:  { sel: ".cta-guarantee", t: "Guarantee line under the main button", s: "check", src: "Website Edit Guide",
          ask: "\"After the full guarantee is settled, a single concise line below the main application button can read: 'Your agreed result is guaranteed, with your coaching fee refunded if I don't deliver it.'\"",
          did: "Added, with 'full coaching fee' because you settled on a full refund (20 Oct). Check: happy for this to show in the hero?" },
    6:  { sel: ".cred-strip", t: "Credibility strip: '25+' gone, three new markers", s: "done", src: "Loom 1:34 + Guide",
          ask: "Loom: \"I changed this isn't this doesn't really make sense. I have like hundreds of transformations. So it's not just 25.\" Guide: \"Mr Australia 2026 · International competition experience · Documented results for business owners.\"",
          before: "Mr Australia 2026 / Competitive bodybuilding · 25+ client transformations / Business owners and executives · Private executive transformation / Managed by Cameron",
          did: "Exactly the guide's three markers, as three compact items with no sub-lines." },
    7:  { sel: ".strip-title", t: "'Real clients. Documented results.' centred", s: "done", src: "Loom 1:44",
          ask: "\"This kind of looks a little bit left-centered. But whatever, you can tidy all that up.\"",
          did: "Heading now sits in the centre; the arrows moved to the right edge." },
    8:  { sel: "#proofStrip", pos: "inside", t: "Names under every transformation, strongest first", s: "check", src: "Drive folder renamed 21 Oct + Guide",
          ask: "Guide: \"Lead with six to ten strong transformations and keep the rest accessible. Show complete pairs with names or approved initials and elapsed time.\" WhatsApp (21 Oct): \"Transformation folder all sorted with names plus added some new dope ones\".",
          did: "29 named pairs. The strip now opens with the strongest: Johan, Riccardo, Jordan, Pat, Jourdon, Donnie, Aidan, Oliver; the rest follow in folder order. Cameron's 5 new clients are in (Aidan, Johan, Jordan, Marc, Pat; front views only). The photo named 'Sam' is removed so every tile is named and Sam's privacy is kept. Check: elapsed time per client isn't shown, because we only have it for Riccardo and Oliver; Cameron would need to send timeframes. Two different files are both named 'Sean'." },
    9:  { sel: "#recognition .section-head", t: "Problem + Sound familiar merged, now cream", s: "done", src: "Guide + Loom 2:08",
          ask: "Guide: \"MERGE the current comparison table and Sound familiar section… NEW section introduction: You hold your business to a standard. Hold yourself to it, too.\" Loom: \"This could have maybe been cream.\"",
          did: "One cream section with the guide's introduction, headline, five moments and closing line." },
    10: { removedAfter: "#recognition .split", t: "Removed from the recognition section", s: "done", src: "Website Edit Guide",
          ask: "\"Delete the repeated professional-versus-physical lists, the vague 'You did everything right' headline and the generic 'If that's you, this was built for you' ending.\"",
          did: "All three removed.",
          removed: "Removed: the Professionally / Physically lists, “You did everything right. So why does it feel like this?” and “If that's you, this was built for you.”" },
    11: { sel: ".mirror-list", t: "Five moments", s: "done", src: "Website Edit Guide",
          ask: "\"NEW recognition headline: You know where you've let yourself slip.\" + the five moments.",
          did: "Headline and all five moments word for word." },
    12: { sel: "#life .h2", t: "Ella photo + new life copy", s: "done", src: "Guide + Loom 2:12",
          ask: "Loom: \"This is good as the photo, but I've told you what to fix, where to put the copy.\" Guide: \"REPLACE the lifestyle heading and paragraph with: The result has to work in your life…\"",
          before: "Outside the business / The life the strategy has to survive. (one long paragraph)",
          did: "Photo and quote kept. New heading and both paragraphs placed straight after the photo, with the gap before it tightened." },
    13: { sel: ".bridge", t: "'Motivation is not the constraint' merged into the method", s: "done", src: "Website Edit Guide",
          ask: "\"MERGE 'Motivation is not the constraint' into the protocol introduction… 'Business,' 'Travel' and 'Family' do not each need another standalone explanation here. NEW bridge copy: You already have enough to manage…\"",
          before: "Cream section: Why conventional coaching fails / Motivation is not the constraint + Business, Travel, Family cards",
          did: "That cream section is gone. The guide's bridge copy now opens the method section." },
    14: { sel: "#protocol .section-head", t: "Protocol introduction", s: "done", src: "Website Edit Guide",
          ask: "\"KEEP the method name: The Executive Physique Protocol™. REPLACE the current introduction with: We agree the result, build the strategy around your circumstances and review the evidence as you progress…\"",
          did: "Name kept, introduction replaced word for word." },
    15: { sel: ".steps4", t: "Assess · Build · Review · Adapt", s: "done", src: "Website Edit Guide",
          ask: "\"Show how Cameron manages the result: 1. Assess 2. Build 3. Review 4. Adapt\" and \"Keep the four management steps visible without animation.\"",
          did: "Four steps with the guide's wording, always visible, no animation." },
    16: { sel: ".protocol-diagram", t: "Six-month diagram: static, new labels", s: "done", src: "Website Edit Guide",
          ask: "\"Use 'Months 1–3 · Build the result' and 'Months 4–6 · Strengthen the standard'… make the graphic static and compact. Label them 'Physical · Body composition, strength and fitness'… Delete the large closing paragraph.\"",
          did: "Two phases and three bars with the guide's labels. The scroll animation and moving marker are removed. The closing paragraph about results holding up is deleted." },
    17: { sel: "#access .section-head", t: "Direct access: cream, new introduction", s: "done", src: "Loom 2:40 + Guide",
          ask: "Loom: \"I think this section here should probably be this color.\" Guide: \"REPLACE the introduction with: I review your progress, make the decisions and adjust the strategy with you. You work directly with me throughout the engagement.\"",
          did: "Section is now cream. Headline kept, introduction replaced." },
    18: { sel: ".access-grid", t: "Five new rows, calls included", s: "check", src: "Website Edit Guide",
          ask: "\"Personal progress reviews · Direct private messaging and calls · Unlimited strategic adaptations · Planning before demanding periods · Recovery and health planning.\"",
          did: "All five rows word for word. One change: the last row said 'Cameron works alongside…'; it now reads 'I work alongside…' because the guide says to use first person for Cameron's offer copy. Check that's OK." },
    19: { sel: "#proof .section-head", t: "Case studies back on black", s: "done", src: "Loom 2:49",
          ask: "\"This section should be black because I don't like that it's like this creamy color and then it's got these harsh black boxes… they just look a bit stuck on.\"",
          did: "Black background, no more dark boxes on cream. Headline 'The physique is the evidence.' kept." },
    20: { sel: "#proof .case:nth-child(1) .case-title", t: "Riccardo: new story, 17.2 kg", s: "check", src: "Guide + WhatsApp 21 Oct",
          ask: "Guide: \"NEW story headline: A result he could take home to his family.\" + narrative. WhatsApp (Cameron): \"lost 17.2 not 17.1\".",
          before: "17.1 kg lost · 'Seven-figure business' · four short Before / Constraint / Result lines",
          did: "Headline and the guide's three paragraphs; the four boxes kept (your pick), now 17.2 kg. Body fat marked 'estimated' as the guide asks; 'seven-figure business' removed. Added one short line from his own testimonial underneath. Still waiting on Cameron for the exact business name (kept 'Marino Meats')." },
    21: { sel: "#proof .case:nth-child(2) .case-title", t: "Oliver: Managing Director, 30% → 13%", s: "done", src: "Guide + Stats doc + WhatsApp 21 Oct",
          ask: "Guide: \"NEW story headline: Frequent travel. More than 25 kg lost.\" Stats doc (Cameron, 11 Oct): \"~110 kg → ~85 kg · 25+ kg lost · 8 months · constant interstate and overseas travel\". WhatsApp: \"Nah just go managing director\" and Oliver went from 30% to 13% body fat.",
          before: "Telecommunications infrastructure · ~110 kg → ~85 kg · ~?% → ~?%",
          did: "Same four boxes as Riccardo: ~110 kg → ~85 kg (Cameron's Stats doc) · 30% → 13% body fat · 25+ kg lost · 8 months. Subtitle: Managing Director · Frequent interstate + overseas travel · 8 months. 'Managing Director' is also used on the wall and his testimonial." },
    22: { sel: ".wall-head", t: "More results: complete, named cards", s: "check", src: "Website Edit Guide",
          ask: "\"On desktop, use three columns with 16–24 px between complete cards. On a phone, use one clearly readable full-width pair per card… Put captions below photographs… Show a manageable initial selection, then 'View all transformations'.\"",
          did: "Three across on desktop with 20 px gaps, one per row on phones, names below the photos. Riccardo and Oliver are not on the wall (Stalin, 22 Oct: they're already in the case studies; they stay in the testimonials). 18 different clients, no repeats: Cameron's new ones (Johan, Jordan, Pat, Aidan, Marc) plus Owen. 9 show first. 'View all transformations' opens the rest, and the same button then reads 'Show fewer' to close them again (it scrolls you back to the top of the wall). The image viewer has the name plus previous / next arrows. The unnamed 'Sam' photo is replaced with Johan (see #8)." },
    23: { sel: ".quotes-head", t: "Testimonials: not cut off, new order", s: "done", src: "Loom 3:11 + Guide",
          ask: "Loom: \"See how like these testimonial things are cut off here and on the phone they are as well.\" Guide: \"Use two complete cards at medium widths and one on phones… Lead with Riccardo, Josh and Jourdon.\"",
          did: "Fixed the quote mark that was getting cut off (it's now inside the card). 3 full cards on desktop, 2 on tablet, and on phones one full-width card, centred, with no half-cut neighbour (Stalin, 22 Oct). Previous / Next buttons on every size, plus a 'Swipe for more' hint. Order: Riccardo, Josh, Jourdon, Oliver, Donnie, Sam, Meylad, Michael." },
    24: { sel: "#about .about-c-copy", t: "About: words first, new copy", s: "done", src: "Website Edit Guide",
          ask: "\"Put the heading and introduction first, a professional portrait beside them on desktop and after the opening text on phones… REPLACE the headline and body with: Elite physique expertise. Built around your life.\"",
          before: "Two large stage photos first · 'I don't teach theory. I build results.' · three-country list and fact boxes",
          did: "Heading and the guide's four paragraphs come first. The country list and the 'Competed internationally / Direct private coaching / No junior coaches' boxes are removed." },
    25: { sel: ".about-c-feat", t: "Profile photo + Mr Australia feature (Option C)", s: "check", src: "Loom 4:11–5:15 + Guide + WhatsApp",
          ask: "Loom: \"maybe it's AI, one of me, man. Like sitting on a stool with a white background, white or black background\" and the gold medal: \"just me with the gold medal… make it more portrait.\" Guide: \"Use one competition photograph as supporting evidence.\" WhatsApp: \"just AI one for now\".",
          did: "Stalin chose layout C (22 Oct). The AI portrait (from his real CHARGE photo: smart black polo, belt, seated on a stool, warm-grey backdrop) is a round profile photo next to 'About · Cameron Whitters'; click it to open the full portrait in high resolution. Beside the copy, the full-body gold-medal photo (just Cameron) with 'Mr Australia 2026 · Gold medal' over it; click to open in full. Phones: profile and copy first, then the Mr Australia feature. Check: he said white or black background; the portrait is warm grey." },
    26: { sel: ".about-close", t: "'Before you say a word' line made small", s: "done", src: "Website Edit Guide",
          ask: "\"The quote 'Build a body and presence that command respect before you say a word' can remain if Cameron wants it. Make it a small closing line, not another oversized section.\"",
          did: "Kept as a small closing line." },
    27: { sel: "#engagement .section-head", t: "Engagement: 'Six months, personally managed.'", s: "done", src: "Guide + Loom 5:15",
          ask: "Guide: \"NEW engagement headline: Six months, personally managed.\" + four paragraphs. \"Delete the separate 'Included' list.\" Loom: \"Again, I like this change of color.\"",
          before: "Private. Personalised. Built around your life. + 'Included' list + 'Not all applicants are accepted.'",
          did: "Cream kept. New headline and the guide's four paragraphs. The Included list and the 'Not all applicants' line are gone." },
    28: { sel: "#guarantee", t: "Refund guarantee + Terms page match", s: "check", src: "Guide + Stalin 20 Oct",
          ask: "Guide: \"NEW guarantee heading: Your agreed result is guaranteed… Align that wording with the new promise.\" Stalin: full refund, Terms page must match.",
          did: "Guarantee sits right under the engagement copy with 'full coaching fee'. FAQ says the same. Terms page: 'no particular outcome is guaranteed' replaced with the guide's wording, plus an 'Agreed-result guarantee' paragraph." },
    29: { sel: ".timeline", t: "After you apply: three stages", s: "done", src: "Website Edit Guide",
          ask: "\"Reduce the visible process to three stages: 1. Apply 2. Have a private conversation 3. Begin.\"",
          before: "Five boxes: Application review · Qualification call · Placement · Assessment · Strategy call",
          did: "Three stages, word for word." },
    30: { sel: "#faq", t: "Ten new FAQ answers", s: "done", src: "Website Edit Guide",
          ask: "\"Replace the FAQ answers\" (ten questions, including 'Is the result guaranteed?'). \"Delete the separate job-title eligibility question… Remove 'Most of my clients do'.\"",
          did: "All ten in his wording. The '3–4 sessions a week' answer, the job-title question and 'Most of my clients do' are gone." },
    31: { sel: ".final-inner", t: "Final section", s: "done", src: "Guide + Loom 5:30",
          ask: "Guide: \"REPLACE the body with: Tell me where you are now, what you want to change and why now… Supporting line: Your application is the first step. We agree on the engagement before you commit.\"",
          did: "New body and supporting line. 'Not all applicants are accepted' removed." },
    32: { sel: "#apply .cta-row", t: "Apply page", s: "needs", src: "Website Edit Guide",
          ask: "\"Replace the generic paragraph with: Tell me about your starting point, the result you want and the demands your strategy needs to work around… Give the embed the available screen height.\"",
          did: "On phones the form now fills the screen under the header, so there's no scroll inside a scroll. The welcome paragraph lives inside Cameron's Typeform, so it has to be changed in his Typeform account (not on the website). Ask Cameron to do it or to give access." },
    33: { sel: ".footer nav", t: "Privacy and Terms finalised", s: "done", src: "Website Edit Guide",
          ask: "\"Finalise the privacy and terms pages. Both currently display 'Draft for review' with an internal approval note.\"",
          did: "Both 'Draft for review' notes removed. Terms dated 22 Oct with the guarantee wording." },
    34: { sel: ".footer-words", t: "Design rules from the guide", s: "done", src: "Website Edit Guide",
          ask: "\"Use a 48–56 px control within a compact bar… 16–18 px body text… navigation labels and the application button wrap onto two lines. Switch to the menu earlier… remove staggered delays from essential text and the main action.\"",
          did: "Phone Apply bar is smaller (50 px button) and only appears after the hero button. It hides while the menu or image viewer is open, and the page has room at the bottom so it doesn't cover the end. Body text 16–17 px. The menu switches over before the links can wrap. Compact header after scrolling (69 → 55 px) with a 44 × 40 px menu button. Section spacing on phones tightened (88 → 60 px), about 1,000 px less scrolling. No delayed entrances on the hero, and the protocol is static. Keyboard focus is now visible." },
  };
  const STATUS = { done: "Done", check: "Done · is this OK?", needs: "Waiting on Cameron" };
  const TITLE = "Website edits · 22 Oct";

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
