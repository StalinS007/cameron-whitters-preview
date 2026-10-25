(() => {
  const $ = (s, el = document) => el.querySelector(s);
  const $$ = (s, el = document) => [...el.querySelectorAll(s)];
  const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

  /* ---------- CTA tracking: every Apply click pushes one event ---------- */
  window.dataLayer = window.dataLayer || [];
  const track = (event, data = {}) => {
    window.dataLayer.push({ event, ...data, ts: Date.now() });
  };
  document.addEventListener("click", (e) => {
    const cta = e.target.closest("[data-cta]");
    if (cta) track("cta_click", { location: cta.dataset.cta });
  });

  /* ---------- Nav + mobile sticky bar ---------- */
  // #25: the sticky Apply button hides while any inline Apply button is on screen,
  // so two Apply buttons are never visible at once.
  const nav = $("#nav");
  const sticky = $("#stickyBar");
  const hero = $(".hero");
  const inlineCtas = $$(".hero .btn, .cta-after .btn, .final-cta .btn");
  const visibleCtas = new Set();
  const ctaIo = new IntersectionObserver(
    (entries) => { entries.forEach((e) => (e.isIntersecting ? visibleCtas.add(e.target) : visibleCtas.delete(e.target))); onScroll(); },
    { threshold: 0.01 }
  );
  // Guide: the sticky button appears only once the main hero button has scrolled past,
  // and hides while the menu or the image viewer is open.
  const heroBtn = $(".hero .btn-lg");
  const onScroll = () => {
    const y = window.scrollY;
    nav.classList.toggle("scrolled", y > 40);   // #26: on mobile the header also shrinks (CSS)
    const pastHero = heroBtn ? heroBtn.getBoundingClientRect().bottom < 0 : y > hero.offsetHeight - 120;
    const overlayOpen = nav.classList.contains("open") || document.querySelector(".lightbox.open") || document.querySelector(".cwc");   // menu, viewer or cookie banner
    const ctaOnScreen = inlineCtas.some((b) => { const r = b.getBoundingClientRect(); return r.bottom > 0 && r.top < window.innerHeight; });   // measured directly: never a frame late
    sticky.classList.toggle("show", pastHero && !ctaOnScreen && !overlayOpen);
  };
  inlineCtas.forEach((b) => ctaIo.observe(b));
  onScroll();
  window.addEventListener("scroll", onScroll, { passive: true });

  const burger = $("#burger");
  const closeMenu = () => { nav.classList.remove("open"); burger.setAttribute("aria-expanded", "false"); document.body.style.overflow = ""; onScroll(); };
  burger.addEventListener("click", () => {
    const open = nav.classList.toggle("open");
    burger.setAttribute("aria-expanded", open);
    document.body.style.overflow = open ? "hidden" : "";
    onScroll();
  });
  $$("#navLinks a").forEach((a) => a.addEventListener("click", closeMenu));

  /* ---------- Reveal: each piece rises in as it scrolls into view (#27: short and subtle) ---------- */
  $$("[data-stagger]").forEach((box) => {
    box.classList.remove("reveal");
    [...box.children].forEach((child, i) => { child.classList.add("reveal"); child.style.setProperty("--i", i); });
  });
  const io = new IntersectionObserver(
    (entries) => entries.forEach((e) => { if (e.isIntersecting) { e.target.classList.add("in"); io.unobserve(e.target); } }),
    { threshold: 0.12, rootMargin: "0px 0px -40px 0px" }
  );
  $$(".reveal").forEach((el) => io.observe(el));

  /* ---------- Testimonial strip: a seamless loop.
     The last three cards are cloned in front and the first three after, so the strip never has an end.
     The browser's own snapping stays on the whole time (so swiping and the arrows feel identical). When the strip
     settles on a clone it is moved, with no animation, to the matching real card: the picture is identical, so nothing visibly changes. ---------- */
  $$(".quotes-strip").forEach((strip) => {
    const real = $$(":scope > blockquote, :scope > figure", strip);
    if (real.length < 2) return;
    const K = Math.min(3, real.length);
    const ready = (img) => { img.loading = "eager"; const dec = () => { if (img.decode) img.decode().catch(() => {}); }; img.complete ? dec() : img.addEventListener("load", dec, { once: true }); };
    const clone = (card, i) => {
      const c = card.cloneNode(true);
      c.removeAttribute("id"); c.dataset.clone = String(i); c.setAttribute("aria-hidden", "true");
      $$("img", c).forEach(ready);
      return c;
    };
    // Front copies: the last K cards, inserted so they read ...Meylad, Michael, Stefan, then the real Jourdon (insert in reverse, each at the very front)
    for (let i = real.length - K; i < real.length; i++) strip.insertBefore(clone(real[i], i), strip.children[i - (real.length - K)] || null);
    // End copies: the first K cards, in order
    real.slice(0, K).forEach((card, j) => strip.appendChild(clone(card, j)));
    // Every card must already be loaded and decoded before it can be stepped or jumped to, so no card ever appears mid-load
    real.forEach((card) => $$("img", card).forEach(ready));
    const pitch = () => real[1].getBoundingClientRect().left - real[0].getBoundingClientRect().left;
    const span = () => pitch() * real.length;                       // width of the eight real cards
    const pos = (el) => el.getBoundingClientRect().left - strip.getBoundingClientRect().left + strip.scrollLeft;
    strip.scrollLeft = pos(real[0]);                                 // start on the first real card
    // After any scroll settles on a clone, jump (instantly) to the real card it copies.
    let settle, heading = null, current = 0;   // heading = where the strip is on its way to (null once it has arrived); current = the real card in view
    const fix = () => {
      const x = strip.scrollLeft, first = pos(real[0]), last = pos(real[real.length - 1]);
      if (x < first - 2) strip.scrollLeft = x + span();
      else if (x > last + 2) strip.scrollLeft = x - span();
      heading = null;
      current = ((Math.round((strip.scrollLeft - pos(real[0])) / pitch()) % real.length) + real.length) % real.length;
      // iOS can ignore a position set while its own snap animation is still running: check once more shortly after
      requestAnimationFrame(() => { const y = strip.scrollLeft; if (y < pos(real[0]) - 2 || y > pos(real[real.length - 1]) + 2) setTimeout(fix, 150); });
    };
    strip.addEventListener("scroll", () => { clearTimeout(settle); settle = setTimeout(fix, 120); }, { passive: true });
    if ("onscrollend" in strip) strip.addEventListener("scrollend", fix);
    // Arrows: one card per click, measured from where the strip is heading, so taps queue up cleanly even on a slow phone
    $$('.strip-btn[data-target="#' + strip.id + '"]').forEach((btn) =>
      btn.addEventListener("click", () => {
        const dir = Number(btn.dataset.dir), p = pitch();
        const first = pos(real[0]), last = pos(real[real.length - 1]);
        let from = heading == null ? strip.scrollLeft : heading;
        if (from < first - 2) from += span(); else if (from > last + 2) from -= span();   // normalise onto the real cards
        if (Math.abs(from - strip.scrollLeft) > p * (K - 1)) { strip.scrollLeft = from; }    // land there now if a wrap is needed first
        heading = Math.round(from / p) * p + dir * p;
        strip.scrollTo({ left: heading, behavior: reduceMotion ? "auto" : "smooth" });
      })
    );
    // Keep the visitor's place when the width really changes (phones fire resize just from the address bar collapsing)
    let lastW = window.innerWidth;
    window.addEventListener("resize", () => {
      if (window.innerWidth === lastW) return;
      lastW = window.innerWidth;
      strip.scrollLeft = pos(real[current]); heading = null;   // same card, re-aligned for the new width
    });
  });

  /* ---------- VSL: our own player. The poster and bronze play button show until the first click,
     then the hosted 1080p file plays in place with the browser's own controls (sound allowed: it starts from a click) ---------- */
  const vsl = $("#vsl");
  const VSL_SRC = "assets/video/cameron-vsl-1080p.mp4?v=20261025";
  const playVsl = () => {
    if (vsl.classList.contains("played")) return;
    track("vsl_play");
    const v = document.createElement("video");
    v.src = VSL_SRC; v.controls = true; v.playsInline = true; v.preload = "auto";
    v.poster = $(".vsl-poster", vsl).currentSrc || $(".vsl-poster", vsl).src;
    v.setAttribute("aria-label", "Watch Cameron explain the approach, 5 minutes 46 seconds");
    vsl.appendChild(v);
    vsl.classList.add("played"); vsl.removeAttribute("role"); vsl.removeAttribute("tabindex"); vsl.removeAttribute("aria-label");
    v.addEventListener("ended", () => track("vsl_complete"), { once: true });
    const p = v.play();
    if (p && p.catch) p.catch(() => {});   // if the browser blocks it, the controls are already there to press play
  };
  vsl.addEventListener("click", playVsl);
  vsl.addEventListener("keydown", (e) => (e.key === "Enter" || e.key === " ") && (e.preventDefault(), playVsl()));

  /* ---------- Case studies: "testimonial" link scrolls up to that card in the strip ---------- */
  $$("[data-testi]").forEach((a) =>
    a.addEventListener("click", (e) => {
      const card = $(a.dataset.testi), strip = card && card.closest(".quotes-strip");
      if (!card || !strip) return;
      e.preventDefault();
      const behavior = reduceMotion ? "auto" : "smooth";
      strip.scrollTo({ left: card.offsetLeft - strip.offsetLeft, behavior });
      window.scrollTo({ top: strip.getBoundingClientRect().top + window.scrollY - 140, behavior });
      card.classList.add("testi-flash");
      setTimeout(() => card.classList.remove("testi-flash"), 2200);
      track("case_testimonial_click", { client: a.dataset.testi });
    })
  );

  /* ---------- About photos: swipe, arrows and dots ---------- */
  const aboutSlides = $("#aboutSlides");
  if (aboutSlides) {
    const media = aboutSlides.closest(".about-c-media");
    const dots = $$(".about-dots button", media);
    const go = (i) => aboutSlides.scrollTo({ left: Math.max(0, Math.min(dots.length - 1, i)) * aboutSlides.clientWidth, behavior: reduceMotion ? "auto" : "smooth" });
    const current = () => Math.round(aboutSlides.scrollLeft / aboutSlides.clientWidth);
    aboutSlides.addEventListener("scroll", () => dots.forEach((d, i) => d.classList.toggle("on", i === current())), { passive: true });
    dots.forEach((d, i) => d.addEventListener("click", () => go(i)));
    $$(".about-arrow", media).forEach((b) => b.addEventListener("click", () => go(current() + Number(b.dataset.step))));
  }

  /* ---------- FAQ accordion ---------- */
  $$(".faq-item").forEach((item) => {
    const q = $(".faq-q", item);
    q.addEventListener("click", () => {
      const open = item.classList.toggle("open");
      q.setAttribute("aria-expanded", open);
      if (open) track("faq_open", { question: q.textContent.trim() });
    });
  });

  /* ---------- "View all transformations" ---------- */
  const wallAll = $("#wallAll");
  if (wallAll) wallAll.addEventListener("click", () => {
    const grid = $("#wallGrid");
    const open = grid.classList.toggle("all");
    wallAll.setAttribute("aria-expanded", String(open));
    wallAll.textContent = open ? "Show fewer" : "View all transformations";
    if (open) track("wall_view_all");
    // Collapsing removes the cards below, so bring the wall back into view
    else window.scrollTo({ top: grid.getBoundingClientRect().top + window.scrollY - 100, behavior: reduceMotion ? "auto" : "smooth" });
  });

  /* ---------- Lightbox: client label, previous / next within the same collection ---------- */
  const lb = $("#lightbox");
  const lbImg = $("#lbImg");
  const lbCap = $("#lbCap");
  let group = [], idx = 0;
  const show = (i) => {
    idx = (i + group.length) % group.length;
    const el = group[idx], img = $("img", el);
    lbImg.src = el.dataset.full || img.src;   // data-full: a larger file for the enlarged view
    lbImg.alt = img.alt;
    lbCap.textContent = el.dataset.lb;
  };
  $$("[data-lb]").forEach((trigger) =>
    trigger.addEventListener("click", () => {
      let el = trigger;
      const cl = el.closest("[data-clone]");   // a cloned testimonial card stands in for its real one
      if (cl) { const realCard = $$(":scope > :not([data-clone])", cl.parentElement)[Number(cl.dataset.clone)]; el = (realCard && $("[data-lb]", realCard)) || el; }
      const box = el.closest(".proof-strip, .wall, .quotes-strip, .cases, .about-c-media");
      group = box ? $$("[data-lb]", box).filter((g) => g.offsetParent !== null && !g.closest("[data-clone]")) : [el];
      if (!group.includes(el)) group = [el];
      lb.classList.toggle("single", group.length < 2);
      show(group.indexOf(el));
      lb.classList.add("open");
      lb.setAttribute("aria-hidden", "false");
      onScroll();
    })
  );
  const closeLb = () => { lb.classList.remove("open"); lb.setAttribute("aria-hidden", "true"); onScroll(); };
  let tx = null;
  lb.addEventListener("touchstart", (e) => { tx = e.touches[0].clientX; }, { passive: true });
  lb.addEventListener("touchend", (e) => {
    if (tx == null) return;
    const dx = e.changedTouches[0].clientX - tx; tx = null;
    if (Math.abs(dx) > 40 && group.length > 1) { show(dx < 0 ? idx + 1 : idx - 1); e.preventDefault(); }
  });
  lb.addEventListener("click", (e) => { if (!e.target.closest(".lb-nav")) closeLb(); });
  $(".lb-prev", lb).addEventListener("click", () => show(idx - 1));
  $(".lb-next", lb).addEventListener("click", () => show(idx + 1));
  document.addEventListener("keydown", (e) => {
    if (!lb.classList.contains("open")) return;
    if (e.key === "Escape") closeLb();
    if (e.key === "ArrowLeft") show(idx - 1);
    if (e.key === "ArrowRight") show(idx + 1);
  });

  /* ---------- Guide: a photo that fails to load never leaves an empty card ---------- */
  const dropBroken = (img) => { const card = img.closest("#proofStrip figure, #wallGrid figure"); if (card) card.remove(); };
  $$("#proofStrip img, #wallGrid img").forEach((img) => {
    if (img.complete && img.naturalWidth === 0 && img.getAttribute("loading") !== "lazy") dropBroken(img);
    img.addEventListener("error", () => dropBroken(img));
  });

  $("#yr").textContent = new Date().getFullYear();
})();
