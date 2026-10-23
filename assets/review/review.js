/* PREVIEW-ONLY review markers: Cameron's Website Edit Guide, Loom and WhatsApp updates (22 Oct 2026 round)
   and what was done about each point. Injected into the preview site by tools/preview_sync.py;
   never part of the live site. Markers are attached by CSS selector at runtime, so index.html
   carries no review attributes. */
(() => {
  const EDITS = {
    "R1": {"t": "Reorder the page around proof and Cameron", "s": "done", "src": "Loom 23 Oct", "ask": "[2:56] \"They might apply straight after that. So that's why we want that as soon as possible on that page.\" [3:19] \"I think then we should maybe even go into me, bro. Everybody that's read this says this should be way higher.\" [8:59] \"So it should go like the new hero section, the new testimonial section with the before and afters and the quotes. So both. Then it could be this… Then it could be Ricardo and Oliver. Then it can be the rest of the stuff.\" [10:51] \"You have the hero, you have the testimonials and the transformations. Then you have something that you think is relevant here… Then you have the section about me.\"", "did": "Page order on the preview: hero → testimonials → Riccardo & Oliver → About → recognition → Ella/life → method → direct access → more results → engagement → process → FAQ → final (Stalin's order).", "sel": ".hero .eyebrow"},
    "H1": {"t": "Credentials line under the intro, above the video", "s": "done", "src": "Loom 23 Oct", "ask": "[0:20] \"I think we should move these higher so that when you first come on the page… you already know who I am and what I do.\" [1:04] \"But then Cameron Whitters, Mr Australia 2026. I wouldn't say international bodybuilding competitor because I want people to think I'm… a private advisor, not a competitor. So you could just say private physique coach to business owners.\" [1:27] \"And then boom, hit the VSL.\"", "did": "Added under the intro, before the video: 'Cameron Whitters — Mr Australia 2026' / 'Private physique coach to business owners'. The old three-marker strip under the button is removed completely (Stalin). No 'international' wording.", "sel": ".hero-cred"},
    "H2": {"t": "Bring back 'Not all applications are accepted' under the hero button", "s": "done", "src": "Loom 23 Oct", "ask": "[1:34] \"Apply to work with Cameron. I think here say not all applications are accepted and then you can put the agree[d result line] and then that'll be the hero section. I think fucking done and dusted.\"", "did": "Under the hero button: the review note, then 'Not all applications are accepted.', then the guarantee line.", "sel": ".hero .cta-sub"},
    "H3": {"t": "New VSL thumbnail", "s": "check", "src": "Loom 23 Oct", "ask": "[15:07] \"But let's change this. This photo looks fucking stupid, but we can fix this. You can maybe do like a collage of transformations and then me sitting there looking a little bit more like normal than this… face. And then people can play that.\"", "did": "New thumbnail (Stalin chose option A): a full collage of 15 client transformations behind the title \"Who it's for. How it works. Why it holds.\" No photo of Cameron, so the old stiff video frame is gone.", "sel": "#vsl"},
    "T1": {"t": "Remove the big 29-photo collage under the hero", "s": "done", "src": "Loom 23 Oct", "ask": "[1:50] \"I don't think we should have the big collage of everybody here. And it's the same on the phone.\"", "did": "The 29-photo collage under the hero is removed on desktop and phone.", "removedAfter": ".hero", "removed": "Removed here: the 29-photo collage ('Real clients. Documented results.' strip)."},
    "T2": {"t": "Put the testimonials there, titled 'Real clients. Documented results.'", "s": "done", "src": "Loom 23 Oct", "ask": "[1:56] \"I think what we should do instead here is put the fucking testimonials of the people they care about. The first thing these guys are going to want to see is… who's like me that's done this that I like the transformation of.\" [2:19] \"Instead, you could say real clients documented results and then we could do the swipe.\" [9:02] \"the new testimonial section with the before and afters and the quotes. So both.\"", "did": "The testimonial cards (before/after photo + quote) now sit straight under the hero, titled 'Real clients. Documented results.', with swipe and Previous / Next.", "sel": "#results .quotes-head"},
    "T3": {"t": "Replace all 8 quotes with his new wording", "s": "done", "src": "WhatsApp + Testimonials doc, 23 Oct", "ask": "[WhatsApp, 23 Oct 3:21 pm] \"Replace all your testimonies, including the ones in the video, with these brother. They're a lot better\" [2:29] \"I think these sound fucking 10 times better.\"", "did": "All 8 quotes are word for word from his 'Testimonials' doc (23 Oct). Roles from his doc, except Oliver = Managing Director (Stalin). The VSL quotes are being redone in the VSL chat.", "sel": "#quoteStrip", "pos": "inside"},
    "T4": {"t": "New order", "s": "done", "src": "Loom 23 Oct", "ask": "[2:34] \"Do Josh, then Ricardo, then Jordan, then Donnie, Sam, Oliver, Maylad and Michael.\"", "did": "Order: Josh, Riccardo, Jourdon, Donnie, Sam, Oliver, Meylad, Michael. Sam stays text-only ('Private client' panel).", "sel": "#results .strip-nav"},
    "T5": {"t": "Remove the old testimonials section further down", "s": "done", "src": "Loom 23 Oct", "ask": "[11:06] \"I don't think this testimonials [section here]…\" [12:37] \"let's get rid of these because I've already seen them up top in the testimonials.\"", "did": "The old 'Testimonials' block further down is removed.", "removedAfter": "#wall .wall-all", "removed": "Removed here: the old 'Testimonials' block (now at the top of the page)."},
    "A1": {"t": "Move About Cameron much higher", "s": "done", "src": "Loom 23 Oct", "ask": "[3:23] \"Everybody that's read this says this should be way higher.\" [4:42] \"But I think that should be higher, bro. I definitely think that should be up here somewhere.\"", "did": "About now comes straight after the Riccardo & Oliver case studies.", "sel": "#about .about-c-profile"},
    "A2": {"t": "Keep the About copy as it is", "s": "done", "src": "Loom 23 Oct", "ask": "[3:28] \"So I think this is good. I think this is good… I bring that expertise into a strategy… I think that's good.\"", "did": "About wording unchanged.", "sel": "#about .about-lead"},
    "A3": {"t": "Remove the 'Gold medal' tag on the Mr Australia photo", "s": "done", "src": "Loom 23 Oct", "ask": "[3:49] \"No need to say gold medal. I don't think they're blind. I think they can see the gold medal.\"", "did": "'Gold medal' tag removed; 'Mr Australia 2026' stays.", "sel": "#about .about-c-feat figcaption"},
    "A4": {"t": "Choose the About photo", "s": "done", "src": "Loom 23 Oct", "ask": "[3:55] \"So I think we keep that photo in there… I think maybe this photo. This photo looks really classy. It looks really good… Use your fucking eye to see what looks better.\" [4:28] \"this photo here also looks very professional, black and white, crisp. That could look nice on the website too as well somewhere… But it's up to you.\"", "did": "Agreed with Cameron on WhatsApp (23 Oct, 9:02 pm, \"Nah I agree with the medal\"): AAGP3768 (the stage photo he called 'really classy') is the first picture people see, and the gold-medal photo sits beside it as a second, clickable picture for a cheeky flex. Tap either to open it full-size; the arrows move between the two. No 'gold medal' label. The black-and-white backstage shot isn't used (photographer watermark).", "sel": "#about .about-c-feat"},
    "E1": {"t": "Desktop: photo to the side, quote big and bold", "s": "done", "src": "Loom 23 Oct", "ask": "[4:48] \"And then on the website, man, you can't see this photo at all. So I'm thinking on the website, you might have to make this like a photo to the side, full body, maybe… full body off to the side, make it look good. And then make this really bold and big.\"", "did": "Desktop: the whole Ella photo to the side, the quote set big and bold beside it, life copy underneath.", "sel": "#life .life-quote"},
    "E2": {"t": "Phone: show more of the photo", "s": "done", "src": "Loom 23 Oct", "ask": "[5:09] \"And on the phone, I think it should be a bit longer. Like you can't see my stomach or my legs or Ella's body. And I think that's good to see because one, Ella looks good… And two, I look like I have an impressive physique.\"", "did": "Phone: the full photo (both of them, down to the knees), then the quote and copy below.", "sel": "#life .life-photo-full"},
    "M1": {"t": "Middle sections: our call, as long as the flow makes sense", "s": "done", "src": "Loom 23 Oct", "ask": "[5:40] \"all of this is pretty fine. You can place this how you want. Just make sure it makes sense.\"", "did": "Middle sections in this order: recognition → Ella/life → method → direct access.", "sel": "#recognition .section-head"},
    "M2": {"t": "'Review' step mentions weekly private advisory calls", "s": "done", "src": "Loom 23 Oct", "ask": "[6:27] \"This should be like, I assess your progress in our weekly private advisory calls… because I want them to know that they're getting those weekly private advisory calls… We don't need to say 45 minutes, 60 minutes, whatever, just say that that's in there.\" [7:10] \"I assess your progress, supplements, health, whatever, just get it to write it nicely, in our weekly private advisory calls.\"", "did": "Review step now: 'I assess your progress, supplements and health in our weekly private advisory calls, so decisions follow what is actually happening.'", "sel": ".steps4 li:nth-child(3)"},
    "M3": {"t": "Direct access, row 1: add the weekly calls", "s": "check", "src": "Loom 23 Oct", "ask": "[7:31] \"Again, I review body weight, photos, training, supplements, sleep and energy, you know, but in here needs to be the private weekly advisory calls.\"", "did": "Row 1 is now 'Weekly private advisory calls': 'Every week, we go through your bodyweight, photos, training, nutrition, supplements, sleep and energy together, and I decide what needs attention next.' Check the new row title.", "sel": "#access .access-grid > div:nth-child(1)"},
    "M4": {"t": "Direct access, row 2: private one-on-one access 7 days a week", "s": "check", "src": "Loom 23 Oct", "ask": "[7:45] \"I want this to tell them more that they're getting like, private access to me whenever they need. So someone here say that like they get private one on one access to me, whenever they need, they can send me messages or voice notes seven days a week. And when a call is best to solve it, we're going to call.\"", "did": "Row 2 is now 'Private one-on-one access, seven days a week': 'You have direct access to me whenever you need it. Message me or send a voice note any day of the week, and when a call is the best way to solve something, we get on a call.' Check the wording.", "sel": "#access .access-grid > div:nth-child(2)"},
    "M5": {"t": "Make the whole site feel like an interactive one-on-one service", "s": "done", "src": "Loom 23 Oct", "ask": "[8:09] \"Just make that sound a bit tidier. Because I don't want this to sound like a list of products, but throughout the website, they should feel like this is going to be a very interactive one-on-one service with you.\"", "did": "Read the copy through: the calls and 7-day access now lead direct access, so it reads as a one-on-one service rather than a feature list.", "sel": "#access .section-head"},
    "C1": {"t": "Move both case studies higher", "s": "done", "src": "Loom 23 Oct", "ask": "[8:49] \"quote what Oliver says and move this up higher. So this section should probably be like… under here.\"", "did": "Case studies now sit straight after the testimonials.", "sel": "#proof .section-head"},
    "C2": {"t": "Riccardo: drop '(estimated)' on body fat", "s": "done", "src": "Loom 23 Oct", "ask": "[8:27] \"Now, this section, I'm not sure why this says estimated. Fucking scrap that. That should be 25% to 10%. Just boom, boom.\"", "did": "Body fat now '25% → 10%' (no 'estimated', no '~'), label 'Body fat'.", "sel": "#proof .case:nth-child(1) .case-nums"},
    "C3": {"t": "Riccardo: quote replaced by a link to his testimonial", "s": "done", "src": "Loom 23 Oct", "ask": "[8:38] \"Replace this. This doesn't make sense. Maybe here you can find something else good to say. And if you're going to quote something that Ricardo says here, which I think is probably good to do, quote what Oliver says…\"", "did": "Stalin: no quote here. A soft 'Read Riccardo’s testimonial ↑' button takes you up to his full testimonial (first card in the testimonials).", "sel": "#proof .case:nth-child(1) .case-testi"},
    "C4": {"t": "Oliver: matching link to his testimonial", "s": "done", "src": "Loom 23 Oct", "ask": "[9:20] \"if you're going to quote something here, just make sure it's symmetrical here with the quote.\" [10:36] \"and then you can put one of his quotes in there as well.\"", "did": "Same as Riccardo: a soft 'Read Oliver’s testimonial ↑' button takes you up to his full testimonial (second card).", "sel": "#proof .case:nth-child(2) .case-testi"},
    "C5": {"t": "Riccardo subtitle: 'Business owner · 8-month transformation'", "s": "done", "src": "Loom 23 Oct", "ask": "[9:35] \"Maybe don't say Marino meets here. Just say… business owner. And then eight month transformation.\"", "did": "Subtitle now 'Business owner · 8-month transformation'.", "sel": "#proof .case:nth-child(1) .who"},
    "C6": {"t": "Oliver subtitle: 'Managing Director · 8-month transformation'", "s": "done", "src": "Loom 23 Oct", "ask": "[9:49] \"Again, here, managing director, eight month transformation… Because you've got here frequent travel, more than 25 kilos lost. So just go managing director, eight month transformation.\"", "did": "Subtitle now 'Managing Director · 8-month transformation' (travel line dropped).", "sel": "#proof .case:nth-child(2) .who"},
    "C7": {"t": "Oliver story: 'interstate and overseas weekly'", "s": "done", "src": "Loom 23 Oct", "ask": "[10:13] \"You can even say Oliver's work took him interstate and overseas weekly. You know, fucking throw that in there.\" [10:35] \"Cool. That's fine.\"", "did": "First line now 'Oliver's work took him interstate and overseas weekly.'", "sel": "#proof .case:nth-child(2) .case-story"},
    "C8": {"t": "Oliver: no ~ on the numbers", "s": "done", "src": "Stalin 23 Oct", "ask": "Remove all the approximate symbols, estimation, and that squiggly line in the middle.", "did": "Bodyweight now '110 kg → 85 kg' (no ~). Nothing else in his case study said estimated or approximate.", "sel": "#proof .case:nth-child(2) .case-nums"},
    "W1": {"t": "Every card: name + timeframe only", "s": "done", "src": "Loom 23 Oct", "ask": "[11:33] \"this looks silly where you've got a name. And then you've got what they do. And then you've got fucking nothing on all of these. Just name these.\" [11:51] \"maybe we put a time frame on them. Let's do a name and a time frame, a name and a time frame.\"", "did": "Role lines removed; every card shows the name only until Cameron sends the timeframes.", "sel": "#wallGrid", "pos": "inside"},
    "W2": {"t": "Send Cameron the list of names for timeframes", "s": "needs", "src": "Loom 23 Oct", "ask": "[11:56] \"when you get to this section, just tell me and just write me a list of names and I'll just send you back a time frame for each of them.\" [13:31] \"I'll tell you the time frames when you message me about getting to that part.\"", "did": "Waiting on Cameron: send him the 24 names, he replies with a timeframe for each.", "sel": "#wall .wall-head"},
    "W3": {"t": "Donnie: use the abs photo, not the front double bicep", "s": "done", "src": "Loom 23 Oct", "ask": "[11:38] \"with Donnie's do the transformation with the abs, not the front double. Cause I don't want everyone thinking they have to be a bodybuilder.\"", "did": "Donnie now appears only in the testimonials, with his abs photo (not the front double bicep).", "sel": "#quoteStrip .quote:nth-child(4) footer"},
    "W4": {"t": "Take the testimonial clients off the wall", "s": "done", "src": "Loom 23 Oct", "ask": "[12:37] \"let's get rid of these because I've already seen them up top in the testimonials. And then let's just replace those with name, time frame, name, time frame.\"", "did": "Testimonial and case-study clients are off the wall.", "sel": "#wall .wall-head .eyebrow"},
    "W5": {"t": "Make 'View all transformations' bolder", "s": "done", "src": "Loom 23 Oct", "ask": "[12:14] \"the thing where you said view all transformations, make that bolder and more poppier so that they actually see it and they don't scroll past it.\"", "did": "'View all transformations' is now solid gold, larger, with a soft glow.", "sel": ".wall-all"},
    "W6": {"t": "Keep the layout and heading", "s": "done", "src": "Loom 23 Oct", "ask": "[12:05] \"on this section I like on the phone that… they're just like one by one.\" [12:33] \"on the website, it's good just in this three by three kind of layout.\" [12:56] \"You can keep this header. That sounds good.\"", "did": "Kept: 3×3 on desktop, one by one on phones, heading unchanged.", "sel": "#wall .wall-head .h2"},
    "W7": {"t": "Use every transformation in his folder, none missed", "s": "done", "src": "Loom 23 Oct", "ask": "[13:22] \"all of these transformations should have everybody's names in them. And just double check that you've used every transformation in here. I don't want any of them missed.\"", "did": "All 24 other named clients from his All Transformations folder are on the wall (the rest are in the testimonials and case studies). Sam is off (consent).", "sel": "#wallGrid figure:nth-child(1)"},
    "P1": {"t": "After you apply, step 3: 'in a 90-minute strategy session'", "s": "done", "src": "Loom 23 Oct", "ask": "[14:23] \"You can just say like in a 90 minute strategy session. Then we put the plan into action or something.\"", "did": "Step 3 now ends '…in a 90-minute strategy session. Then we put the plan into action.'", "sel": ".timeline .t-step:nth-child(3)"},
    "P2": {"t": "Final section: add 'Not all applications are accepted.'", "s": "done", "src": "Loom 23 Oct", "ask": "[14:34] \"Your application is the first step. We agree on the engagement before you commit. Not all applications are accepted. Boom. Apply.\"", "did": "'Not all applications are accepted.' added under the final button.", "sel": "#apply .cta-sub"},
    "P3": {"t": "Keep: engagement, guarantee, FAQ, final heading", "s": "done", "src": "Loom 23 Oct", "ask": "[13:48] \"This is fine. I like this. I like this. Apply to work with Cameron is fine.\" [14:30] \"Frequently asked questions is fine.\"", "did": "Engagement, guarantee, FAQ and the final heading unchanged.", "sel": "#engagement .section-head"},
  };
  const TODO = ["W2 · Timeframes: send Cameron the 24 wall names; he sends back a timeframe for each, then they go under every name.", "M3 / M4 · Check the new direct-access row titles: 'Weekly private advisory calls' and 'Private one-on-one access, seven days a week'.", "VSL · Embedding the final 5:51 video (later, as agreed) and the VSL re-cut with the new testimonials (VSL chat)."];
  const STATUS = { done: "Done", check: "Done · is this OK?", needs: "Waiting on Cameron" };
  const TITLE = "Website edits · 23 Oct (numbers match the artifact)";

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
