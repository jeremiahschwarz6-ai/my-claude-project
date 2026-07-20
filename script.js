/* =========================================================
   Brian's Tree Service — premium interactions
   ========================================================= */
(function () {
  "use strict";
  var reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  var fine = window.matchMedia("(pointer: fine)").matches;

  /* ---- Footer year ---- */
  var y = document.getElementById("year");
  if (y) y.textContent = new Date().getFullYear();

  /* ---- Nav scrolled state + progress ---- */
  var nav = document.getElementById("nav");
  var progress = document.getElementById("progress");
  function onScroll() {
    var sy = window.scrollY || window.pageYOffset;
    if (nav) nav.classList.toggle("scrolled", sy > 40);
    if (progress) {
      var h = document.documentElement.scrollHeight - window.innerHeight;
      progress.style.width = (h > 0 ? (sy / h) * 100 : 0) + "%";
    }
  }
  window.addEventListener("scroll", onScroll, { passive: true });
  onScroll();

  /* ---- Mobile menu ---- */
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
  if ("IntersectionObserver" in window && !reduce) {
    var io = new IntersectionObserver(function (entries) {
      entries.forEach(function (e, i) {
        if (e.isIntersecting) {
          // subtle stagger for grouped items
          var sibs = e.target.parentElement ? e.target.parentElement.children : [];
          var idx = Array.prototype.indexOf.call(sibs, e.target);
          e.target.style.transitionDelay = Math.min(idx, 5) * 70 + "ms";
          e.target.classList.add("in");
          io.unobserve(e.target);
        }
      });
    }, { threshold: 0.12, rootMargin: "0px 0px -8% 0px" });
    revealEls.forEach(function (el) { io.observe(el); });
  } else {
    revealEls.forEach(function (el) { el.classList.add("in"); });
  }

  /* ---- Count-up in hero meta (parse from text) ---- */
  var metas = document.querySelectorAll(".hero-meta strong");
  if (!reduce) {
    metas.forEach(function (el) {
      var raw = el.textContent.trim();
      var m = raw.match(/^([\d,]+)(\+?)$/);
      if (!m) return;
      var target = parseInt(m[1].replace(/,/g, ""), 10);
      var suffix = m[2] || "";
      var start = null, dur = 1500;
      function step(ts) {
        if (!start) start = ts;
        var p = Math.min((ts - start) / dur, 1);
        var val = Math.floor((1 - Math.pow(1 - p, 3)) * target);
        el.textContent = val.toLocaleString() + suffix;
        if (p < 1) requestAnimationFrame(step);
        else el.textContent = target.toLocaleString() + suffix;
      }
      // kick off shortly after intro
      setTimeout(function () { requestAnimationFrame(step); }, 2100);
    });
  }

  /* ---- Cursor spotlight ---- */
  var spot = document.getElementById("spotlight");
  if (spot && fine && !reduce) {
    var sx = 0, sy2 = 0, tx = 0, ty = 0, active = false;
    window.addEventListener("mousemove", function (e) {
      tx = e.clientX; ty = e.clientY;
      if (!active) { active = true; spot.style.opacity = "1"; }
    });
    (function loop() {
      sx += (tx - sx) * 0.12; sy2 += (ty - sy2) * 0.12;
      spot.style.transform = "translate(" + sx + "px," + sy2 + "px) translate(-50%,-50%)";
      requestAnimationFrame(loop);
    })();
  }

  /* ---- Magnetic buttons ---- */
  if (fine && !reduce) {
    document.querySelectorAll(".magnetic").forEach(function (el) {
      var strength = 0.28;
      el.addEventListener("mousemove", function (e) {
        var r = el.getBoundingClientRect();
        var mx = e.clientX - (r.left + r.width / 2);
        var my = e.clientY - (r.top + r.height / 2);
        el.style.transform = "translate(" + mx * strength + "px," + my * strength + "px)";
      });
      el.addEventListener("mouseleave", function () { el.style.transform = ""; });
    });
  }

  /* ---- 3D tilt card ---- */
  var card = document.getElementById("card3d");
  if (card && fine && !reduce) {
    var inner = card.querySelector(".card-3d-inner");
    card.addEventListener("mousemove", function (e) {
      var r = card.getBoundingClientRect();
      var px = (e.clientX - r.left) / r.width - 0.5;
      var py = (e.clientY - r.top) / r.height - 0.5;
      inner.style.transform = "rotateX(" + (-py * 14) + "deg) rotateY(" + (px * 16) + "deg)";
    });
    card.addEventListener("mouseleave", function () {
      inner.style.transform = "rotateX(6deg) rotateY(-9deg)";
    });
  }

  /* ---- Hero parallax on scroll ---- */
  var mesh = document.querySelector(".hero-mesh");
  if (mesh && !reduce) {
    window.addEventListener("scroll", function () {
      var sy = window.scrollY || window.pageYOffset;
      if (sy < window.innerHeight) mesh.style.transform = "translateY(" + sy * 0.18 + "px) scale(1.04)";
    }, { passive: true });
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
      note.textContent = "Thank you, " + name.value.trim().split(" ")[0] +
        " — we've got your request and will call you shortly. 🌲";
      note.className = "form-note ok";
      form.reset();
    });
  }

  /* ---- Falling leaves canvas ---- */
  var canvas = document.getElementById("leaves");
  if (canvas && !reduce) {
    var ctx = canvas.getContext("2d");
    var W, H, leaves = [];
    var glyphs = ["🍃", "🍂", "🌿"];
    var COUNT = window.innerWidth < 640 ? 10 : 16;

    function resize() { W = canvas.width = window.innerWidth; H = canvas.height = window.innerHeight; }
    function makeLeaf() {
      return {
        x: Math.random() * W, y: Math.random() * -H,
        size: 12 + Math.random() * 18, speed: 0.35 + Math.random() * 0.95,
        drift: (Math.random() - 0.5) * 1.1, rot: Math.random() * Math.PI * 2,
        vr: (Math.random() - 0.5) * 0.025, glyph: glyphs[(Math.random() * glyphs.length) | 0],
        sway: Math.random() * Math.PI * 2, alpha: 0.35 + Math.random() * 0.4
      };
    }
    function init() { resize(); leaves = []; for (var i = 0; i < COUNT; i++) leaves.push(makeLeaf()); }
    function draw() {
      ctx.clearRect(0, 0, W, H);
      for (var i = 0; i < leaves.length; i++) {
        var l = leaves[i];
        l.sway += 0.02; l.y += l.speed; l.x += l.drift + Math.sin(l.sway) * 0.6; l.rot += l.vr;
        if (l.y > H + 30) { leaves[i] = makeLeaf(); leaves[i].y = -30; }
        ctx.save();
        ctx.globalAlpha = l.alpha;
        ctx.translate(l.x, l.y); ctx.rotate(l.rot);
        ctx.font = l.size + "px serif"; ctx.textAlign = "center"; ctx.textBaseline = "middle";
        ctx.fillText(l.glyph, 0, 0);
        ctx.restore();
      }
      requestAnimationFrame(draw);
    }
    var rt;
    window.addEventListener("resize", function () { clearTimeout(rt); rt = setTimeout(init, 200); });
    init(); draw();
  }
})();
