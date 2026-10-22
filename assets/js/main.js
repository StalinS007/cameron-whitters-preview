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
    const overlayOpen = nav.classList.contains("open") || document.querySelector(".lightbox.open");
    sticky.classList.toggle("show", pastHero && visibleCtas.size === 0 && !overlayOpen);
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

  /* ---------- Proof strip arrows (#3) ---------- */
  // Each arrow scrolls the strip named in data-target (default: the proof strip).
  $$(".strip-btn").forEach((btn) =>
    btn.addEventListener("click", () => {
      const strip = $(btn.dataset.target || "#proofStrip");
      if (!strip) return;
      const tile = strip.querySelector("figure, blockquote");
      const gap = parseFloat(getComputedStyle(strip).columnGap) || 0;
      const step = tile ? tile.getBoundingClientRect().width + gap : 300;
      // Guide: arrows advance and snap to one complete card
      strip.scrollBy({ left: Number(btn.dataset.dir) * step, behavior: reduceMotion ? "auto" : "smooth" });
    })
  );

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
  $$("[data-lb]").forEach((el) =>
    el.addEventListener("click", () => {
      const box = el.closest(".proof-strip, .wall, .quotes-strip, .cases");
      group = box ? $$("[data-lb]", box).filter((g) => g.offsetParent !== null) : [el];
      if (!group.includes(el)) group = [el];
      lb.classList.toggle("single", group.length < 2);
      show(group.indexOf(el));
      lb.classList.add("open");
      lb.setAttribute("aria-hidden", "false");
      onScroll();
    })
  );
  const closeLb = () => { lb.classList.remove("open"); lb.setAttribute("aria-hidden", "true"); onScroll(); };
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
