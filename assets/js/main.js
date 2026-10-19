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
  const onScroll = () => {
    const y = window.scrollY;
    nav.classList.toggle("scrolled", y > 40);   // #26: on mobile the header also shrinks (CSS)
    const pastHero = y > hero.offsetHeight - 120;
    sticky.classList.toggle("show", pastHero && visibleCtas.size === 0);
  };
  inlineCtas.forEach((b) => ctaIo.observe(b));
  onScroll();
  window.addEventListener("scroll", onScroll, { passive: true });

  const burger = $("#burger");
  const closeMenu = () => { nav.classList.remove("open"); burger.setAttribute("aria-expanded", "false"); document.body.style.overflow = ""; };
  burger.addEventListener("click", () => {
    const open = nav.classList.toggle("open");
    burger.setAttribute("aria-expanded", open);
    document.body.style.overflow = open ? "hidden" : "";
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

  /* ---------- Proof strip arrows (#3) ---------- */
  const strip = $("#proofStrip");
  if (strip) {
    $$(".strip-btn").forEach((btn) =>
      btn.addEventListener("click", () => {
        const tile = strip.querySelector("figure");
        const step = tile ? tile.getBoundingClientRect().width + 2 : 300;
        strip.scrollBy({ left: Number(btn.dataset.dir) * step * 2, behavior: reduceMotion ? "auto" : "smooth" });
      })
    );
  }

  /* ---------- Protocol diagram: plays once when in view, then follows the scroll ---------- */
  const seq = $("#protocolSeq");
  const diagram = $("#protocolDiagram");
  if (seq && diagram) {
    const so = new IntersectionObserver(
      (entries) => entries.forEach((e) => {
        if (e.isIntersecting) {
          seq.classList.add("play"); track("protocol_play"); so.unobserve(diagram);
          setTimeout(() => seq.classList.add("played"), reduceMotion ? 0 : 1300);
        }
      }),
      { threshold: 0.35 }
    );
    so.observe(diagram);

    const months = $$(".pd-months span", diagram);
    const phases = $$(".pd-phase", diagram);
    const headLabel = $("#pdHeadLabel");
    let ticking = false;
    const updateP = () => {
      ticking = false;
      const r = diagram.getBoundingClientRect();
      const vh = window.innerHeight;
      const p = Math.max(0, Math.min(1, (vh * 0.82 - r.top) / (r.height + vh * 0.5)));
      seq.style.setProperty("--p", p.toFixed(4));
      const m = Math.min(6, Math.floor(p * 6) + 1);
      months.forEach((s, i) => s.classList.toggle("is-now", i === m - 1));
      phases.forEach((ph, i) => ph.classList.toggle("is-now", i === (m <= 3 ? 0 : 1)));
      if (headLabel) headLabel.textContent = `Month ${m} · Phase ${m <= 3 ? 1 : 2}`;
    };
    window.addEventListener("scroll", () => { if (!ticking) { ticking = true; requestAnimationFrame(updateP); } }, { passive: true });
    window.addEventListener("resize", updateP);
    updateP();
  }

  /* ---------- VSL placeholder ---------- */
  const vsl = $("#vsl");
  const playVsl = () => {
    track("vsl_play");
    // Replace with the real embed (hosted video or Vimeo iframe) once the final VSL is uploaded.
    vsl.classList.add("played");
  };
  vsl.addEventListener("click", playVsl);
  vsl.addEventListener("keydown", (e) => (e.key === "Enter" || e.key === " ") && (e.preventDefault(), playVsl()));

  /* ---------- FAQ accordion ---------- */
  $$(".faq-item").forEach((item) => {
    const q = $(".faq-q", item);
    q.addEventListener("click", () => {
      const open = item.classList.toggle("open");
      q.setAttribute("aria-expanded", open);
      if (open) track("faq_open", { question: q.textContent.trim() });
    });
  });

  /* ---------- Lightbox ---------- */
  const lb = $("#lightbox");
  const lbImg = $("#lbImg");
  const lbCap = $("#lbCap");
  $$("[data-lb]").forEach((el) =>
    el.addEventListener("click", () => {
      const img = $("img", el);
      lbImg.src = img.src;
      lbImg.alt = img.alt;
      lbCap.textContent = el.dataset.lb;
      lb.classList.add("open");
      lb.setAttribute("aria-hidden", "false");
    })
  );
  const closeLb = () => { lb.classList.remove("open"); lb.setAttribute("aria-hidden", "true"); };
  lb.addEventListener("click", closeLb);
  document.addEventListener("keydown", (e) => e.key === "Escape" && closeLb());

  $("#yr").textContent = new Date().getFullYear();
})();
