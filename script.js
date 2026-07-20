/* ===== Brian's Tree Service — interactions ===== */
(function () {
  "use strict";
  var reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

  /* ---- Year in footer ---- */
  var yearEl = document.getElementById("year");
  if (yearEl) yearEl.textContent = new Date().getFullYear();

  /* ---- Navbar scrolled state + progress bar ---- */
  var nav = document.getElementById("nav");
  var progress = document.getElementById("progress");
  function onScroll() {
    var y = window.scrollY || window.pageYOffset;
    if (nav) nav.classList.toggle("scrolled", y > 40);
    if (progress) {
      var h = document.documentElement.scrollHeight - window.innerHeight;
      progress.style.width = (h > 0 ? (y / h) * 100 : 0) + "%";
    }
  }
  window.addEventListener("scroll", onScroll, { passive: true });
  onScroll();

  /* ---- Mobile menu toggle ---- */
  var toggle = document.getElementById("navToggle");
  if (toggle && nav) {
    toggle.addEventListener("click", function () {
      var open = nav.classList.toggle("open");
      toggle.setAttribute("aria-expanded", open ? "true" : "false");
    });
    nav.querySelectorAll(".nav-links a").forEach(function (a) {
      a.addEventListener("click", function () {
        nav.classList.remove("open");
        toggle.setAttribute("aria-expanded", "false");
      });
    });
  }

  /* ---- Reveal on scroll ---- */
  var revealEls = document.querySelectorAll(".reveal");
  if ("IntersectionObserver" in window && !reduceMotion) {
    var io = new IntersectionObserver(
      function (entries) {
        entries.forEach(function (e) {
          if (e.isIntersecting) {
            e.target.classList.add("in");
            io.unobserve(e.target);
          }
        });
      },
      { threshold: 0.12, rootMargin: "0px 0px -8% 0px" }
    );
    revealEls.forEach(function (el) { io.observe(el); });
  } else {
    revealEls.forEach(function (el) { el.classList.add("in"); });
  }

  /* ---- Count-up stats ---- */
  var counters = document.querySelectorAll(".num[data-count]");
  function runCounter(el) {
    var target = parseInt(el.getAttribute("data-count"), 10) || 0;
    if (reduceMotion) { el.textContent = target; return; }
    var start = null, dur = 1600;
    function step(ts) {
      if (!start) start = ts;
      var p = Math.min((ts - start) / dur, 1);
      var eased = 1 - Math.pow(1 - p, 3);
      el.textContent = Math.floor(eased * target);
      if (p < 1) requestAnimationFrame(step);
      else el.textContent = target;
    }
    requestAnimationFrame(step);
  }
  if ("IntersectionObserver" in window) {
    var cio = new IntersectionObserver(
      function (entries) {
        entries.forEach(function (e) {
          if (e.isIntersecting) { runCounter(e.target); cio.unobserve(e.target); }
        });
      },
      { threshold: 0.6 }
    );
    counters.forEach(function (el) { cio.observe(el); });
  } else {
    counters.forEach(runCounter);
  }

  /* ---- Contact form (front-end demo handler) ---- */
  var form = document.getElementById("quoteForm");
  var note = document.getElementById("formNote");
  if (form) {
    form.addEventListener("submit", function (e) {
      e.preventDefault();
      var name = form.querySelector("#name");
      var phone = form.querySelector("#phone");
      if (!name.value.trim() || !phone.value.trim()) {
        note.textContent = "Please add your name and phone so we can reach you.";
        note.className = "form-note err";
        return;
      }
      note.textContent = "Thanks, " + name.value.trim().split(" ")[0] +
        "! We got your request and will call you shortly. 🌲";
      note.className = "form-note ok";
      form.reset();
    });
  }

  /* ---- Falling leaves canvas ---- */
  var canvas = document.getElementById("leaves");
  if (canvas && !reduceMotion) {
    var ctx = canvas.getContext("2d");
    var W, H, leaves = [];
    var glyphs = ["🍃", "🍂", "🌿"];
    var COUNT = 18;

    function resize() {
      W = canvas.width = window.innerWidth;
      H = canvas.height = window.innerHeight;
    }
    function makeLeaf() {
      return {
        x: Math.random() * W,
        y: Math.random() * -H,
        size: 12 + Math.random() * 20,
        speed: 0.4 + Math.random() * 1.1,
        drift: (Math.random() - 0.5) * 1.2,
        rot: Math.random() * Math.PI * 2,
        vr: (Math.random() - 0.5) * 0.03,
        glyph: glyphs[(Math.random() * glyphs.length) | 0],
        sway: Math.random() * Math.PI * 2
      };
    }
    function init() {
      resize();
      leaves = [];
      for (var i = 0; i < COUNT; i++) leaves.push(makeLeaf());
    }
    function draw() {
      ctx.clearRect(0, 0, W, H);
      for (var i = 0; i < leaves.length; i++) {
        var l = leaves[i];
        l.sway += 0.02;
        l.y += l.speed;
        l.x += l.drift + Math.sin(l.sway) * 0.6;
        l.rot += l.vr;
        if (l.y > H + 30) { leaves[i] = makeLeaf(); leaves[i].y = -30; }
        ctx.save();
        ctx.translate(l.x, l.y);
        ctx.rotate(l.rot);
        ctx.font = l.size + "px serif";
        ctx.textAlign = "center";
        ctx.textBaseline = "middle";
        ctx.fillText(l.glyph, 0, 0);
        ctx.restore();
      }
      requestAnimationFrame(draw);
    }
    var rt;
    window.addEventListener("resize", function () {
      clearTimeout(rt);
      rt = setTimeout(init, 200);
    });
    init();
    draw();
  }
})();
