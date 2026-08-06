/* ============================================================
   Sapiens Nova Academy — статический клон: интерактив
   Повторяет поведение оригинальных React-островков и скриптов
   ============================================================ */
(function () {
  "use strict";

  /* ---------- 1. Мобильное меню (аналог Header.js) ---------- */
  function initMobileMenu() {
    var btn = document.getElementById("mobile-menu-btn");
    var close = document.getElementById("mobile-menu-close");
    var overlay = document.getElementById("mobile-menu-overlay");
    var menu = document.getElementById("mobile-menu");
    function open() {
      if (!menu || !overlay) return;
      menu.classList.add("open");
      overlay.classList.add("open");
      document.body.style.overflow = "hidden";
    }
    function closeMenu() {
      if (!menu || !overlay) return;
      menu.classList.remove("open");
      overlay.classList.remove("open");
      document.body.style.overflow = "";
    }
    if (btn) btn.addEventListener("click", open);
    if (close) close.addEventListener("click", closeMenu);
    if (overlay) overlay.addEventListener("click", closeMenu);
    if (menu) {
      menu.querySelectorAll(".mobile-nav-link").forEach(function (a) {
        a.addEventListener("click", function () {
          var href = a.getAttribute("href");
          if (href && href.startsWith("#")) closeMenu();
        });
      });
    }
  }

  /* ---------- 2. Hero: слайд-шоу + ken-burns + индикаторы (аналог Hero.js) ---------- */
  function initHeroSlideshow() {
    var images = document.querySelectorAll(".hero-image");
    if (images.length < 2) return;
    var dotsBox = document.querySelector("[data-sn-hero-dots]");
    var dots = [];
    var current = 0;
    var timer = null;

    function setSlide(k) {
      images[current].style.opacity = "0";
      current = (k + images.length) % images.length;
      images[current].style.opacity = "1";
      var img = images[current].querySelector("img");
      if (img) {
        img.classList.remove("animate-ken-burns");
        void img.offsetWidth;
        img.classList.add("animate-ken-burns");
      }
      dots.forEach(function (d, i) {
        d.setAttribute("aria-current", i === current ? "true" : "false");
      });
    }
    function play() {
      if (timer) clearInterval(timer);
      timer = setInterval(function () { setSlide(current + 1); }, 5000);
    }

    if (dotsBox) {
      images.forEach(function (_, k) {
        var d = document.createElement("button");
        d.type = "button";
        d.className = "sn-hero-dot";
        d.setAttribute("aria-label", "Show slide " + (k + 1));
        d.addEventListener("click", function () { setSlide(k); play(); });
        dotsBox.appendChild(d);
        dots.push(d);
      });
    }

    setSlide(0);
    play();
  }

  /* ---------- 3. Появление при скролле (аналог GSAP fade-up) ---------- */
  function initScrollReveal() {
    var els = document.querySelectorAll("[data-reveal]");
    if (!els.length) return;
    if ("IntersectionObserver" in window) {
      var io = new IntersectionObserver(
        function (entries) {
          entries.forEach(function (e) {
            if (e.isIntersecting) {
              e.target.classList.add("visible");
              io.unobserve(e.target);
            }
          });
        },
        { threshold: 0.15 }
      );
      els.forEach(function (el) { io.observe(el); });
    } else {
      els.forEach(function (el) { el.classList.add("visible"); });
    }
  }

  function initHeroIntro() {
    var heading = document.getElementById("hero-heading");
    var ctas = document.querySelectorAll("#hero-ctas .hero-cta");
    var reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (reduced || !heading) return;
    heading.classList.add("anim-fade-up");
    heading.classList.add("run");
    ctas.forEach(function (c, i) {
      c.classList.add("anim-fade-up");
      setTimeout(function () { c.classList.add("run"); }, 200 + i * 150);
    });
  }

  /* ---------- 4. Featured Programmes (аналог CurrentlyAvailableProgrammesSection.js) ---------- */
  var PROGRAMMES_DATA = [
    {
      id: "e44c4197-4693-4af6-b697-60a0f1535dad",
      slug: "imperial-motorsport",
      name: "Imperial College London Motorsport Engineering Summer School",
      description:
        "A practical introduction to how engineers generate, modify, and use power in context of motorsport engineering",
      category: "course",
      location: "Imperial College London, South Kensington campus, London, UK",
      duration_text: "July 19-25, 2026",
      price_cents: 458000,
      currency: "GBP",
      application_fee: 10000,
      early_bird_price_cents: 398000,
      early_bird_deadline: "2026-03-30 23:59:59",
      age_range: "15-17 years old",
      language: "English",
      image: "../assets/images/programme-imperial-hero.jpeg",
      video: null,
      registrationClosed: true
    },
    {
      id: "a01e7a6a-51bd-4648-9f9c-aa92d926c131",
      slug: "human-tech-summer-camp",
      name: "Human+Tech Futures Summer Camp",
      description:
        "Discover how technology can support healthy living. Participants explore AI, sensing and robotics technologies to create prototypes that enhance physical and emotional well-being.",
      category: "bootcamp",
      location: "Awaji Island, Japan",
      duration_text: "July 13-17, 2026",
      price_cents: 1700000,
      currency: "HKD",
      application_fee: null,
      deposit: 300000,
      early_bird_price_cents: 1500000,
      early_bird_deadline: "2026-04-29 23:59:59",
      age_range: "15-22 years old",
      language: "English",
      image: "../assets/images/programme-human-tech.jpg",
      video: null,
      registrationClosed: true
    }
  ];

  function fmtMoney(cents, currency) {
    return (cents / 100).toLocaleString("en-US", { minimumFractionDigits: 2, maximumFractionDigits: 2 });
  }

  var PROGRAMME_PAGES = {
    "imperial-motorsport": "programme-imperial.html",
    "human-tech-summer-camp": "programme-human-tech.html"
  };

  function initFeatured() {
    var onHome = document.body && document.body.classList.contains("sn-home");
    document.querySelectorAll("[data-featured]").forEach(function (mount) {
      var grid = document.createElement("div");
      grid.className = "featured-grid";
      PROGRAMMES_DATA.forEach(function (p, i) {
        var dark = i % 2 === 0;
        var card = document.createElement("div");
        card.className = "featured-card";
        card.style.background = dark ? "var(--brand-stromboli)" : (onHome ? "var(--brand-primary)" : "var(--brand-azure)");
        card.style.color = "#fff";

        var media;
        if (p.video) {
          media = document.createElement("video");
          media.src = p.video;
          media.muted = true;
          media.playsInline = true;
          media.setAttribute("playsinline", "");
          media.preload = "metadata";
        } else {
          media = document.createElement("img");
          media.src = p.image;
          media.alt = p.name;
        }
        media.className = "w-full h-48 object-cover";
        var mediaWrap = document.createElement("div");
        mediaWrap.className = "featured-media";
        mediaWrap.appendChild(media);

        var loc = document.createElement("span");
        loc.className = "featured-badge-loc";
        loc.textContent = p.location;
        loc.setAttribute("data-i18n", "fd." + p.slug + ".loc");

        var h3 = document.createElement("h3");
        h3.className = "featured-title";
        h3.textContent = p.name;
        h3.setAttribute("data-i18n", "fd." + p.slug + ".title");

        var desc = document.createElement("p");
        desc.className = "featured-desc";
        desc.textContent = p.description;
        desc.setAttribute("data-i18n", "fd." + p.slug + ".desc");

        card.appendChild(mediaWrap);
        card.appendChild(loc);
        card.appendChild(h3);

        if (p.slug === "imperial-motorsport") {
          var banner = document.createElement("div");
          banner.className = "imperial-banner";
          var bText = document.createElement("p");
          bText.textContent =
            "Official Programme by Imperial College London (Exclusively offered to Sapiens Nova Academy)";
          bText.setAttribute("data-i18n", "fea.banner");
          banner.appendChild(bText);
          card.appendChild(banner);
        }

        card.appendChild(desc);

        var actions = document.createElement("div");
        actions.className = "featured-actions";

        var learn = document.createElement("a");
        learn.className = "btn-outline " + (dark ? "btn-outline-white" : "btn-outline-white");
        learn.href = PROGRAMME_PAGES[p.slug] || ("programme-" + p.slug + ".html");
        learn.textContent = "Learn More";
        learn.setAttribute("data-i18n", "fea.learn");

        var enroll = document.createElement("a");
        if (p.registrationClosed) {
          enroll.className = "btn-closed";
          enroll.textContent = "Registration Closed";
          enroll.setAttribute("aria-disabled", "true");
          enroll.setAttribute("data-i18n", "fea.closed");
        } else {
          enroll.className = "btn-enroll-featured";
          enroll.href = "checkout.html?programmeId=" + encodeURIComponent(p.id);
          enroll.innerHTML =
            '<span data-i18n="fea.enroll">Enroll Now</span> <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M5 12h14"></path><path d="m12 5 7 7-7 7"></path></svg>';
        }

        actions.appendChild(learn);
        actions.appendChild(enroll);
        card.appendChild(actions);

        if (media && media.tagName === "VIDEO") {
          media.loop = true;
          var lazyPlay = (function (v, wrap) {
            var reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
            var saveData = navigator.connection && navigator.connection.saveData;
            if (reduced || saveData) return;
            if (!("IntersectionObserver" in window)) {
              var pp = v.play(); if (pp && pp.catch) pp.catch(function () {});
              return;
            }
            var io = new IntersectionObserver(function (entries) {
              entries.forEach(function (en) {
                if (!en.isIntersecting) return;
                en.target.style.background = "transparent";
                var pr = v.play();
                if (pr && pr.catch) pr.catch(function () {});
                io.disconnect();
              });
            }, { rootMargin: "300px 0px" });
            io.observe(wrap);
          });
          lazyPlay(media, mediaWrap);
        }

        grid.appendChild(card);
      });
      mount.appendChild(grid);
    });
  }

  /* ---------- 5. Кнопки "Find out more" → mailto ---------- */
  function initFindOutMore() {
    document.querySelectorAll(".find-out-more-btn").forEach(function (b) {
      b.addEventListener("click", function () {
        var name = b.getAttribute("data-programme-name");
        if (name) {
          window.location.href =
            "mailto:info@sapiens-nova.com?subject=" +
            encodeURIComponent("Enquiry: SNA " + name + " programme");
        }
      });
    });
  }

  /* ---------- 6. Табы Track Record (аналог CurriculumSection.js) ---------- */
  function initTabs() {
    var bars = document.querySelectorAll("[data-tabs]");
    bars.forEach(function (bar) {
      var tabs = Array.prototype.slice.call(bar.querySelectorAll("[data-tab-id]"));
      var panels = document.querySelectorAll("[data-tab-panel]");
      var mobileLabel = bar.querySelector("[data-current-label]");
      var mobilePrev = bar.querySelector("[data-tab-prev]");
      var mobileNext = bar.querySelector("[data-tab-next]");
      var indicator = bar.querySelector(".active-indicator");
      var activeIndex = 0;

      function showTab(i, instant) {
        activeIndex = (i + tabs.length) % tabs.length;
        var id = tabs[activeIndex].getAttribute("data-tab-id");
        tabs.forEach(function (t, idx) {
          t.style.color = idx === activeIndex ? "#fff" : "#fff";
        });
        if (indicator && tabs[activeIndex]) {
          var tab = tabs[activeIndex];
          if (instant) {
            indicator.style.transition = "none";
          } else {
            indicator.style.transition = "all 0.4s ease";
          }
          indicator.style.left = tab.offsetLeft + "px";
          indicator.style.width = tab.offsetWidth + "px";
          indicator.style.top = tab.offsetTop + "px";
          if (instant) setTimeout(function () { indicator.style.transition = ""; }, 50);
        }
        panels.forEach(function (p) {
          p.style.display = p.getAttribute("data-tab-panel") === id ? "" : "none";
        });
        if (mobileLabel) {
          var lbl = tabs[activeIndex].getAttribute("data-i18n");
          var label = lbl ? snT(lbl) : tabs[activeIndex].textContent;
          mobileLabel.textContent = label;
          mobileLabel.title = label;
        }
        if (mobilePrev) mobilePrev.disabled = activeIndex === 0;
        if (mobileNext) mobileNext.disabled = activeIndex === tabs.length - 1;
      }

      tabs.forEach(function (t, idx) {
        t.addEventListener("click", function () { showTab(idx, false); });
      });
      if (mobilePrev) mobilePrev.addEventListener("click", function () { showTab(activeIndex - 1, false); });
      if (mobileNext) mobileNext.addEventListener("click", function () { showTab(activeIndex + 1, false); });

      var initTimer = setInterval(function () {
        if (bar.offsetWidth > 0) { clearInterval(initTimer); showTab(0, true); }
      }, 50);
      setTimeout(function () { showTab(0, true); }, 100);
      document.addEventListener("sn-lang-change", function () { showTab(activeIndex, true); });
    });

    /* слайдеры внутри карточек трек-рекорда */
    document.querySelectorAll("[data-track-slider]").forEach(function (slider) {
      var slides = slider.querySelector("[data-slides]");
      var prev = slider.querySelector("[data-slide-prev]");
      var next = slider.querySelector("[data-slide-next]");
      var dots = slider.querySelector("[data-dots]");
      var items = slides ? slides.children.length : 0;
      var idx = 0;
      function render() {
        if (slides) slides.style.transform = "translateX(-" + idx * 100 + "%)";
        if (prev) prev.disabled = idx === 0;
        if (next) next.disabled = idx === items - 1;
        if (dots) {
          Array.prototype.forEach.call(dots.children, function (d, i) {
            d.classList.toggle("active", i === idx);
          });
        }
      }
      if (prev) prev.addEventListener("click", function () { idx = Math.max(0, idx - 1); render(); });
      if (next) next.addEventListener("click", function () { idx = Math.min(items - 1, idx + 1); render(); });
      if (dots) {
        Array.prototype.forEach.call(dots.children, function (d, i) {
          d.addEventListener("click", function () { idx = i; render(); });
        });
      }
      render();
    });
  }

  /* ---------- 7. FAQ аккордеон ---------- */
  function initFaq() {
    document.querySelectorAll(".pd-faq-item > button").forEach(function (btn) {
      btn.addEventListener("click", function () {
        var item = btn.parentElement;
        item.classList.toggle("open");
      });
    });
  }

  /* ---------- 8. Галерея: форма пароля ---------- */
  function initGallery() {
    document.querySelectorAll("#gallery-login").forEach(function (form) {
      form.addEventListener("submit", function (e) {
        e.preventDefault();
        var input = document.getElementById("gallery-password");
        var err = document.getElementById("login-error");
        var pass = input ? input.value.trim() : "";
        /* Пароль выдаётся участникам офлайн; статический клон хранит демо-пароль */
        var demo = "SNA2026";
        if (pass === demo) {
          window.location.href = form.getAttribute("data-success-url") || "gallery.html";
        } else {
          if (err) { err.style.display = "block"; err.textContent = snT("gal.lock.err") || "Incorrect password. Please try again."; }
        }
      });
    });
  }

  /* ---------- 9. Чекаут ---------- */
  function initCheckout() {
    var form = document.getElementById("checkout-form");
    if (!form) return;
    var select = document.getElementById("programme");
    var order = document.getElementById("order-summary-body");
    var orderMobile = document.getElementById("order-summary-mobile-body");

    function selectedProgramme() {
      for (var i = 0; i < PROGRAMMES_DATA.length; i++) {
        if (PROGRAMMES_DATA[i].id === select.value) return PROGRAMMES_DATA[i];
      }
      return null;
    }

    function renderOrder() {
      var p = selectedProgramme();
      if (!p) {
        order.innerHTML = '<p style="color:rgb(0 0 0 / 0.6); text-align:center; padding:3rem 0;" data-i18n="ck.summary.none">' + snT("ck.summary.none") + '</p>';
        return;
      }
      var pTitle = snT("fd." + p.slug + ".title") || p.name;
      var pLoc = snT("fd." + p.slug + ".loc") || p.location;
      var html = "";
      html +=
        '<div style="position:relative; width:100%; height:10rem; border-radius:24px; overflow:hidden; margin-bottom:1.5rem;">' +
        '<img src="' + p.image + '" alt="' + pTitle + '" style="width:100%; height:100%; object-fit:cover;"></div>';
      html += '<h3 style="font-size:1.25rem; margin-bottom:0.5rem; font-family:var(--font-serif);">' + pTitle + "</h3>";
      html += '<span style="background:var(--program-cornfield); padding:0.25rem 0.75rem; border-radius:9999px; display:inline-block; margin-bottom:0.75rem;"><span style="font-size:0.875rem; color:#fff; text-transform:capitalize;">' + p.category + "</span></span>";
      html += '<p style="font-size:0.875rem; color:rgb(0 0 0 / 0.6); margin-bottom:0.25rem;"><span data-i18n="ck.summary.duration">' + snT("ck.summary.duration") + ':</span> ' + p.duration_text + "</p>";
      html += '<p style="font-size:0.875rem; color:rgb(0 0 0 / 0.6);"><span data-i18n="ck.summary.location">' + snT("ck.summary.location") + ':</span> ' + pLoc + "</p>";
      html += '<div style="border-top:2px solid rgb(0 0 0 / 0.1); margin-top:1.5rem; padding-top:1.5rem; display:flex; flex-direction:column; gap:0.75rem;">';
      if (p.application_fee) {
        html += '<div style="display:flex; justify-content:space-between; font-size:0.875rem;"><span style="color:rgb(0 0 0 / 0.6);" data-i18n="ck.summary.appfee">' + snT("ck.summary.appfee") + ':</span><span>' + fmtMoney(p.application_fee, "GBP") + " " + p.currency + "</span></div>";
      }
      if (p.deposit) {
        html += '<div style="display:flex; justify-content:space-between; font-size:0.875rem;"><span style="color:rgb(0 0 0 / 0.6);" data-i18n="ck.summary.deposit">' + snT("ck.summary.deposit") + ':</span><span>' + fmtMoney(p.deposit, "HKD") + " " + p.currency + "</span></div>";
      }
      var price = fmtMoney(p.price_cents, p.currency);
      if (p.early_bird_price_cents) {
        var earlyKey = p.slug === "imperial-motorsport" ? "ck.early.imperial" : "ck.early.human";
        html += '<div style="display:flex; justify-content:space-between; font-size:0.875rem;"><span style="color:rgb(0 0 0 / 0.6);" data-i18n="ck.summary.progfee">' + snT("ck.summary.progfee") + ':</span>' +
          '<div style="text-align:right;"><span style="color:#b45309; font-weight:500;">' + fmtMoney(p.early_bird_price_cents, p.currency) + " " + p.currency + "</span>" +
          '<span style="display:block; font-size:0.75rem; color:rgb(0 0 0 / 0.4); text-decoration:line-through;">' + price + " " + p.currency + "</span>" +
          '<span style="display:block; font-size:0.75rem; color:#d97706;" data-i18n="' + earlyKey + '">' + snT(earlyKey) + "</span></div></div>";
      } else {
        html += '<div style="display:flex; justify-content:space-between; font-size:0.875rem;"><span style="color:rgb(0 0 0 / 0.6);" data-i18n="ck.summary.progfee">' + snT("ck.summary.progfee") + ':</span><span>' + price + " " + p.currency + "</span></div>";
      }
      html += "</div>";
      var charge = p.application_fee ? fmtMoney(p.application_fee, p.currency) : p.deposit ? fmtMoney(p.deposit, p.currency) : fmtMoney(p.price_cents, p.currency);
      var chargeKey = p.application_fee ? "ck.summary.appfee" : p.deposit ? "ck.summary.deposit" : "ck.summary.progfee";
      html += '<div style="border-top:1px solid rgb(0 0 0 / 0.1); margin-top:1rem; padding-top:1rem; display:flex; justify-content:space-between; align-items:center;">' +
        '<div><p style="font-size:1.25rem; font-family:var(--font-serif);" data-i18n="' + chargeKey + '">' + snT(chargeKey) + '</p>' +
        '<p style="font-size:0.75rem; color:rgb(0 0 0 / 0.6);" data-i18n="ck.summary.charging">' + snT("ck.summary.charging") + '</p></div>' +
        '<p style="font-size:1.5rem; font-family:var(--font-serif);">' + charge + " " + p.currency + "</p></div>";
      html += '<div style="background:color-mix(in srgb, var(--program-cornfield) 30%, transparent); padding:1rem; border-radius:20px; margin-top:1rem;"><p style="font-size:0.875rem; color:rgb(0 0 0 / 0.8);" data-i18n="ck.summary.confirm">' + snT("ck.summary.confirm") + "</p></div>";
      order.innerHTML = html;
      if (orderMobile) orderMobile.innerHTML = html;
    }

    if (select) {
      select.addEventListener("change", renderOrder);
      var params = new URLSearchParams(window.location.search);
      var pid = params.get("programmeId");
      if (pid && select.querySelector('option[value="' + pid + '"]')) {
        select.value = pid;
      }
      renderOrder();
      document.addEventListener("sn-lang-change", renderOrder);
    }

    form.addEventListener("submit", function (e) {
      e.preventDefault();
      var errors = {};
      function errText(key, fallback) { return snT(key) || fallback; }
      var inputs = {
        programme: errText("ck.err.programme", "Please select a programme"),
        email: errText("ck.err.email.required", "Your Email is required"),
        relationship: errText("ck.err.relationship", "Relationship to student is required"),
        student_firstName: errText("ck.err.student_firstName", "Student's First name is required"),
        student_lastName: errText("ck.err.student_lastName", "Student's Last name is required"),
        student_age: errText("ck.err.student_age", "Student's age is required"),
        student_school: errText("ck.err.student_school", "Student's school is required"),
        student_country: errText("ck.err.student_country", "Student's country is required"),
        firstName: errText("ck.err.firstName", "Your First name is required"),
        lastName: errText("ck.err.lastName", "Your Last name is required")
      };
      var firstError = null;
      Object.keys(inputs).forEach(function (key) {
        var el = document.getElementById(key);
        var val = el ? el.value.trim() : "";
        var errEl = document.getElementById(key + "-error");
        if (!val) {
          errors[key] = inputs[key];
          if (errEl) errEl.textContent = inputs[key];
        } else if (key === "email" && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(val)) {
          errors[key] = errText("ck.err.email.format", "Please enter a valid email address");
          if (errEl) errEl.textContent = errors[key];
        } else if (key === "student_age" && (isNaN(Number(val)) || Number(val) < 1 || Number(val) > 100)) {
          errors[key] = errText("ck.err.age", "Please enter a valid age (1-100)");
          if (errEl) errEl.textContent = errors[key];
        } else if (errEl) {
          errEl.textContent = "";
        }
        if (errors[key] && !firstError) firstError = key;
      });
      var gender = document.getElementById("student_sex");
      var genderErr = document.getElementById("student_sex-error");
      if (!gender || !gender.value) {
        if (genderErr) genderErr.textContent = errText("ck.err.gender", "Student's gender is required");
        if (!firstError) firstError = "student_sex";
      } else if (genderErr) { genderErr.textContent = ""; }

      if (firstError) {
        var target = document.getElementById(firstError);
        if (target) target.focus();
        return;
      }
      /* Статический клон: без Stripe показываем подтверждение */
      var note = document.createElement("p");
      note.style.cssText =
        "margin-top:1.5rem; padding:1rem; border-radius:16px; background:#f0fdf4; border:1px solid #bbf7d0; color:#166534; text-align:center; font-size:0.95rem;";
      note.textContent =
        snT("ck.demo.note") || "Demo mode: in the original site this form creates a Stripe checkout session via POST /api/checkout. Enrollment data is not sent in this static copy.";
      form.appendChild(note);
    });
  }

  /* ---------- 9b. Промо-код (демо) ---------- */
  function initPromo() {
    var box = document.getElementById("promo-box");
    if (!box) return;
    var input = box.querySelector("input");
    var apply = box.querySelector(".promo-apply");
    var success = box.querySelector(".promo-success");
    var error = box.querySelector(".promo-error");
    apply.addEventListener("click", function () {
      var code = input ? input.value.trim() : "";
      if (!code) {
        if (error) { error.textContent = snT("ck.promo.err") || "Please enter a discount code"; error.style.display = "block"; }
        if (success) success.style.display = "none";
        return;
      }
      if (success) success.style.display = "block";
      if (error) error.style.display = "none";
    });
  }

  /* ---------- 10b. Homepage redesign extras (homepage only) ---------- */
  function initSnMarquee() {
    var root = document.querySelector("[data-sn-marquee]");
    if (!root) return;
    var track = root.querySelector("[data-sn-marquee-track]");
    var item = track ? track.querySelector(".sn-marquee-item") : null;
    if (!track || !item) return;
    function build() {
      var set = [];
      var width = 0;
      var gap = 56;
      var count = 0;
      while (width < root.offsetWidth && count < 24) {
        var clone = item.cloneNode(true);
        track.appendChild(clone);
        set.push(clone);
        width += clone.getBoundingClientRect().width + gap;
        count++;
      }
      if (!set.length) return;
      track.innerHTML = set.map(function (el) { return el.outerHTML; }).join("") +
        set.map(function (el) { return el.outerHTML; }).join("");
      if (typeof snApplyLang === "function" && typeof SN_I18N !== "undefined") {
        snApplyLang(snLang());
      }
    }
    build();
    if (document.fonts && document.fonts.ready) {
      document.fonts.ready.then(function () { build(); });
    }
  }

  function initSnCarousel() {
    var root = document.querySelector("[data-sn-carousel]");
    if (!root) return;
    var viewport = root.querySelector(".sn-carousel-viewport");
    var track = root.querySelector(".sn-carousel-track");
    var slides = track ? track.querySelectorAll(".sn-t-card") : [];
    var prev = root.querySelector("[data-car-prev]");
    var next = root.querySelector("[data-car-next]");
    var dotsBox = root.querySelector("[data-car-dots]");
    var count = root.querySelector("[data-sn-car-count]");
    if (!track || slides.length < 2) return;

    var idx = 0;
    var timer = null;
    var reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    var dots = [];

    function go(i) {
      idx = (i + slides.length) % slides.length;
      track.style.transform = "translateX(-" + idx * 100 + "%)";
      Array.prototype.forEach.call(slides, function (s, k) {
        s.setAttribute("aria-hidden", k === idx ? "false" : "true");
      });
      dots.forEach(function (d, k) {
        d.setAttribute("aria-current", k === idx ? "true" : "false");
      });
      if (count) count.textContent = (idx + 1) + " / " + slides.length;
    }
    function stop() { if (timer) { clearInterval(timer); timer = null; } }
    function play() {
      if (reduced) return;
      stop();
      timer = setInterval(function () { go(idx + 1); }, 7000);
    }
    function jump(i) { go(i); play(); }

    if (dotsBox) {
      Array.prototype.forEach.call(slides, function (_, k) {
        var d = document.createElement("button");
        d.type = "button";
        d.className = "sn-car-dot";
        d.setAttribute("aria-label", "Show testimonial " + (k + 1));
        d.addEventListener("click", function () { jump(k); });
        dotsBox.appendChild(d);
        dots.push(d);
      });
    }
    if (prev) prev.addEventListener("click", function () { jump(idx - 1); });
    if (next) next.addEventListener("click", function () { jump(idx + 1); });

    if (viewport) {
      var touchX = null;
      viewport.addEventListener("touchstart", function (e) { touchX = e.touches[0].clientX; }, { passive: true });
      viewport.addEventListener("touchend", function (e) {
        if (touchX === null) return;
        var dx = e.changedTouches[0].clientX - touchX;
        if (Math.abs(dx) > 40) jump(dx < 0 ? idx + 1 : idx - 1);
        touchX = null;
      }, { passive: true });
    }

    root.addEventListener("mouseenter", stop);
    root.addEventListener("mouseleave", play);
    root.addEventListener("focusin", stop);
    root.addEventListener("focusout", function (e) {
      if (!root.contains(e.relatedTarget)) play();
    });

    go(0);
    play();
  }

  function initSnMobileCta() {
    var bar = document.getElementById("sn-mobile-cta");
    var hero = document.getElementById("hero-section");
    if (!bar || !hero) return;
    var heroH = hero.offsetHeight;
    function measure() {
      heroH = hero.offsetHeight;
      update();
    }
    function update() {
      var show = window.scrollY > heroH * 0.6;
      bar.classList.toggle("visible", show);
      bar.setAttribute("aria-hidden", show ? "false" : "true");
      document.body.classList.toggle("sn-mobile-cta-shown", show);
    }
    window.addEventListener("scroll", function () { snScheduleScroll(update); }, { passive: true });
    window.addEventListener("resize", measure, { passive: true });
    update();
  }

  /* ---------- 10b. Полировка: header scroll, back-to-top, hero cue ---------- */
  var snScrollTicking = false;
  function snScheduleScroll(update) {
    if (snScrollTicking) return;
    snScrollTicking = true;
    requestAnimationFrame(function () {
      snScrollTicking = false;
      update();
    });
  }

  function initSnHeaderScroll() {
    var header = document.querySelector(".sn-header");
    if (!header) return;
    function update() { header.classList.toggle("scrolled", window.scrollY > 8); }
    window.addEventListener("scroll", function () { snScheduleScroll(update); }, { passive: true });
    update();
  }

  function initSnToTop() {
    var btn = document.getElementById("sn-to-top");
    if (!btn) return;
    var smooth = !window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    function update() { btn.classList.toggle("visible", window.scrollY > 600); }
    window.addEventListener("scroll", function () { snScheduleScroll(update); }, { passive: true });
    btn.addEventListener("click", function () {
      window.scrollTo({ top: 0, behavior: smooth ? "smooth" : "auto" });
    });
    update();
  }

  function initSnHeroCue() {
    var cue = document.querySelector("[data-scroll-cue]");
    if (!cue) return;
    cue.addEventListener("click", function () {
      var target = document.getElementById("who-we-are");
      if (target) {
        var smooth = !window.matchMedia("(prefers-reduced-motion: reduce)").matches;
        target.scrollIntoView({ behavior: smooth ? "smooth" : "auto" });
      }
    });
  }

  /* ---------- 10c. i18n: язык + переключатель ---------- */
  function snLang() {
    if (typeof SN_I18N === "undefined") return "en";
    var stored = localStorage.getItem("sn-lang");
    if (stored && SN_I18N[stored]) return stored;
    var nav = (navigator.language || "en").toLowerCase();
    if (nav.indexOf("zh") === 0) {
      return nav.indexOf("hant") >= 0 || nav.indexOf("tw") >= 0 ? "zh-TW" : "zh-CN";
    }
    if (nav.indexOf("th") === 0) return "th";
    if (nav.indexOf("ru") === 0) return "ru";
    return "en";
  }

  function snT(key, lang) {
    var d = SN_I18N[lang || snLang()] || SN_I18N.en;
    return d[key] != null ? d[key] : (SN_I18N.en[key] != null ? SN_I18N.en[key] : null);
  }

  function snApplyLang(lang) {
    if (typeof SN_I18N === "undefined") return;
    var attr = lang === "zh-TW" ? "zh-Hant" : lang === "zh-CN" ? "zh-Hans" : lang;
    document.documentElement.setAttribute("lang", attr);

    document.querySelectorAll("[data-i18n]").forEach(function (el) {
      var t = snT(el.getAttribute("data-i18n"), lang);
      if (t != null) el.textContent = t;
    });
    document.querySelectorAll("[data-i18n-html]").forEach(function (el) {
      var t = snT(el.getAttribute("data-i18n-html"), lang);
      if (t != null) el.innerHTML = t;
    });
    document.querySelectorAll("[data-i18n-attr]").forEach(function (el) {
      el.getAttribute("data-i18n-attr").split(";").forEach(function (pair) {
        var i = pair.indexOf(":");
        if (i > 0) {
          var t = snT(pair.slice(i + 1), lang);
          if (t != null) el.setAttribute(pair.slice(0, i), t);
        }
      });
    });

    document.querySelectorAll("[data-sn-lang-current]").forEach(function (el) {
      el.textContent = SN_LANG_BADGES[lang] || lang.toUpperCase();
    });
    document.querySelectorAll("[data-sn-lang-opt]").forEach(function (b) {
      b.classList.toggle("active", b.getAttribute("data-sn-lang-opt") === lang);
      if (b.getAttribute("aria-selected") != null) {
        b.setAttribute("aria-selected", b.getAttribute("data-sn-lang-opt") === lang ? "true" : "false");
      }
    });

    var t = snT("page.title", lang);
    if (t) document.title = t;
    try { localStorage.setItem("sn-lang", lang); } catch (e) {}
    document.dispatchEvent(new CustomEvent("sn-lang-change", { detail: { lang: lang } }));
  }

  function initLangSwitcher() {
    if (typeof SN_I18N === "undefined") return;
    var toggle = document.querySelector("[data-sn-lang-toggle]");
    var menu = document.querySelector("[data-sn-lang-menu]");
    if (toggle && menu) {
      toggle.addEventListener("click", function (e) {
        e.stopPropagation();
        var open = menu.classList.toggle("open");
        toggle.setAttribute("aria-expanded", open ? "true" : "false");
      });
      document.addEventListener("click", function (e) {
        if (!menu.classList.contains("open")) return;
        if (menu.contains(e.target) || toggle.contains(e.target)) return;
        menu.classList.remove("open");
        toggle.setAttribute("aria-expanded", "false");
      });
      document.addEventListener("keydown", function (e) {
        if (e.key === "Escape" && menu.classList.contains("open")) {
          menu.classList.remove("open");
          toggle.setAttribute("aria-expanded", "false");
          toggle.focus();
        }
      });
    }
    document.querySelectorAll("[data-sn-lang-opt]").forEach(function (b) {
      b.addEventListener("click", function () {
        var code = b.getAttribute("data-sn-lang-opt");
        if (!SN_I18N[code]) return;
        snApplyLang(code);
        if (menu) {
          menu.classList.remove("open");
          toggle.setAttribute("aria-expanded", "false");
        }
      });
    });
    snApplyLang(snLang());
  }

  /* ---------- 10. Инициализация ---------- */
  document.addEventListener("DOMContentLoaded", function () {
    initMobileMenu();
    initHeroSlideshow();
    initScrollReveal();
    initHeroIntro();
    initFeatured();
    initFindOutMore();
    initTabs();
    initFaq();
    initGallery();
    initPromo();
    initCheckout();
    initSnMarquee();
    initSnCarousel();
    initSnMobileCta();
    initSnHeaderScroll();
    initSnToTop();
    initSnHeroCue();
    initLangSwitcher();
  });
})();
