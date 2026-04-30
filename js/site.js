// Shared chrome: renders nav, ticker, footer into [data-*] placeholders.
(function () {
  var D = window.OUFC_DATA;

  var navItems = [
    { label: "Home",      href: "index.html" },
    { label: "Shop",      href: "shop.html" },
    { label: "Schedule",  href: "schedule.html" },
    { label: "Roster",    href: "roster.html" },
    { label: "Partners",  href: "partners.html" },
    { label: "Community", href: "community.html" },
    { label: "About",     href: "about.html" },
  ];

  function escape(s) { return String(s).replace(/[&<>"']/g, function (c) { return ({ "&":"&amp;", "<":"&lt;", ">":"&gt;", "\"":"&quot;", "'":"&#39;" })[c]; }); }

  function navHTML(active) {
    var links = navItems.map(function (it) {
      var isActive = it.label === active;
      var color = isActive ? "var(--blue)" : "var(--ink)";
      var border = isActive ? "2px solid var(--blue)" : "2px solid transparent";
      return '<a href="' + it.href + '" class="font-display"' +
        ' style="padding:10px 14px;font-size:13px;font-weight:700;letter-spacing:0.08em;text-transform:uppercase;text-decoration:none;color:' + color + ';border-bottom:' + border + ';">' +
        escape(it.label) + '</a>';
    }).join("");

    return '' +
      '<header style="background:#fff;color:var(--ink);border-bottom:1px solid var(--line);">' +
        '<div style="max-width:1440px;margin:0 auto;padding:0 48px;height:76px;display:flex;align-items:center;justify-content:space-between;">' +
          '<a href="index.html" style="display:flex;align-items:center;gap:14px;text-decoration:none;color:inherit;">' +
            '<img src="assets/logo-club.png" alt="OUFC" style="height:48px;width:auto;" />' +
            '<div class="font-display" style="font-weight:800;font-size:14px;letter-spacing:0.04em;line-height:1.1;text-transform:uppercase;">Oklahoma<br/>United FC</div>' +
          '</a>' +
          '<nav class="nav-links" style="display:flex;gap:4px;flex-wrap:wrap;justify-content:center;">' + links + '</nav>' +
          '<button class="nav-toggle" type="button" aria-label="Toggle menu" aria-expanded="false">MENU <span class="nav-toggle-icon">☰</span></button>' +
          '<a class="btn btn-primary" href="' + D.ticketsUrl + '" target="_blank" rel="noopener" style="padding:10px 18px;">Buy Tickets</a>' +
        '</div>' +
      '</header>';
  }

  function tickerHTML(dark) {
    var bg = dark ? "var(--navy)" : "var(--ink)";
    var matches = D.schedule.slice(0, 5);
    var cells = matches.map(function (m, i) {
      var time = m.day.split(" · ")[1] || "7:30 PM";
      var border = i < matches.length - 1 ? "1px solid rgba(255,255,255,0.08)" : "none";
      var oufc = '<span style="color:var(--blue-light);">OUFC</span>';
      var opp = '<span style="opacity:0.7;">' + escape(m.abbr) + '</span>';
      var matchup = m.home ? (oufc + '<span style="color:rgba(255,255,255,0.35);font-size:10px;">vs</span>' + opp)
                           : (opp + '<span style="color:rgba(255,255,255,0.35);font-size:10px;">vs</span>' + oufc);
      return '<div style="flex:1;display:flex;align-items:center;gap:12px;padding:0 18px;border-right:' + border + ';min-width:200px;">' +
        '<div class="font-mono" style="font-size:11px;color:rgba(255,255,255,0.5);">' + escape(m.date) + '</div>' +
        '<div class="font-display" style="font-weight:700;font-size:13px;letter-spacing:0.04em;display:flex;align-items:center;gap:6px;">' + matchup + '</div>' +
        '<div class="font-mono" style="font-size:11px;color:rgba(255,255,255,0.5);margin-left:auto;">' + escape(time) + '</div>' +
      '</div>';
    }).join("");

    return '<div style="background:' + bg + ';color:#fff;border-top:1px solid rgba(255,255,255,0.1);border-bottom:1px solid rgba(255,255,255,0.1);">' +
      '<div style="max-width:1440px;margin:0 auto;padding:0 48px;display:flex;align-items:stretch;height:56px;overflow:hidden;">' +
        '<div class="font-display" style="display:flex;align-items:center;gap:8px;padding-right:24px;border-right:1px solid rgba(255,255,255,0.15);font-size:11px;font-weight:800;letter-spacing:0.14em;text-transform:uppercase;color:var(--blue-light);">' +
          '<span style="width:6px;height:6px;background:var(--blue-light);border-radius:50%;"></span>Schedule' +
        '</div>' +
        '<div style="display:flex;flex:1;overflow:hidden;">' + cells + '</div>' +
      '</div>' +
    '</div>';
  }

  function footerHTML() {
    var cols = [
      { title: "Club",   items: ["About", "Front Office", "Press", "Contact"] },
      { title: "Team",   items: ["Roster", "Schedule", "Standings", "Stats"] },
      { title: "Fans",   items: ["Tickets", "Membership", "Matchday Guide", "Chad Richison Stadium"] },
      { title: "Shop",   items: ["Kits", "Training", "Headwear", "Accessories"] },
    ];
    var socials = ["IG", "X", "FB", "YT", "TT"];

    var colsHTML = cols.map(function (c) {
      return '<div>' +
        '<div class="font-display" style="font-size:12px;font-weight:800;letter-spacing:0.14em;text-transform:uppercase;color:var(--blue-light);margin-bottom:18px;">' + escape(c.title) + '</div>' +
        '<ul style="list-style:none;display:flex;flex-direction:column;gap:12px;">' +
          c.items.map(function (it) { return '<li><a href="#" style="color:rgba(255,255,255,0.75);text-decoration:none;font-size:14px;">' + escape(it) + '</a></li>'; }).join("") +
        '</ul>' +
      '</div>';
    }).join("");

    var socialsHTML = socials.map(function (s) {
      var href = s === "IG" ? D.ig : "#";
      return '<a href="' + href + '" target="_blank" rel="noopener" style="width:36px;height:36px;border:1px solid rgba(255,255,255,0.2);display:flex;align-items:center;justify-content:center;color:#fff;text-decoration:none;font-size:11px;font-family:Archivo;font-weight:700;">' + s + '</a>';
    }).join("");

    var legalLinks = ["Privacy", "Terms", "Accessibility", "Contact"].map(function (l) {
      return '<a href="#" class="font-mono" style="font-size:11px;color:rgba(255,255,255,0.45);text-decoration:none;letter-spacing:0.06em;text-transform:uppercase;">' + l + '</a>';
    }).join("");

    return '<footer style="background:var(--ink);color:#fff;">' +
      '<div style="max-width:1440px;margin:0 auto;padding:72px 48px 32px;">' +
        '<div style="display:grid;grid-template-columns:1.4fr 1fr 1fr 1fr 1fr;gap:48px;padding-bottom:56px;border-bottom:1px solid rgba(255,255,255,0.1);">' +
          '<div>' +
            '<img src="assets/logo-club.png" alt="OUFC" style="height:80px;width:auto;margin-bottom:18px;filter:invert(1) brightness(2);" />' +
            '<div class="font-display" style="font-size:24px;font-weight:800;line-height:1.05;text-transform:uppercase;margin-bottom:14px;">Oklahoma<br/>United FC</div>' +
            '<div class="font-mono italic" style="font-size:12px;color:rgba(255,255,255,0.55);letter-spacing:0.04em;margin-bottom:22px;">Integritas et Excellentia</div>' +
            '<div style="display:flex;gap:8px;">' + socialsHTML + '</div>' +
          '</div>' +
          colsHTML +
        '</div>' +
        '<div style="padding-top:28px;display:flex;justify-content:space-between;align-items:center;flex-wrap:wrap;gap:16px;">' +
          '<div class="font-mono" style="font-size:11px;color:rgba(255,255,255,0.45);letter-spacing:0.06em;">© 2026 OKLAHOMA UNITED FC · ESTD 2024 · ALL RIGHTS RESERVED</div>' +
          '<div style="display:flex;gap:24px;">' + legalLinks + '</div>' +
        '</div>' +
      '</div>' +
    '</footer>';
  }

  document.querySelectorAll("[data-nav]").forEach(function (el) {
    el.outerHTML = navHTML(el.getAttribute("data-active") || "Home");
  });
  document.querySelectorAll("[data-ticker]").forEach(function (el) {
    var dark = el.getAttribute("data-ticker") === "dark";
    el.outerHTML = tickerHTML(dark);
  });
  document.querySelectorAll("[data-footer]").forEach(function (el) {
    el.outerHTML = footerHTML();
  });

  // Hamburger toggle — show/hide nav links on mobile
  document.querySelectorAll(".nav-toggle").forEach(function (btn) {
    btn.addEventListener("click", function () {
      var nav = btn.parentElement.querySelector(".nav-links");
      if (!nav) return;
      var open = nav.classList.toggle("is-open");
      btn.setAttribute("aria-expanded", open ? "true" : "false");
      var icon = btn.querySelector(".nav-toggle-icon");
      if (icon) icon.textContent = open ? "✕" : "☰";
    });
  });
})();
