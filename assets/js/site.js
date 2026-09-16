/* ---------------------------------------------------------------
   site.js — theme, interface language, list filters, GitHub repos.
   No dependencies, no tracking.
   --------------------------------------------------------------- */
(function () {
  'use strict';

  var root = document.documentElement;

  /* ── 1. Light / dark ─────────────────────────────────────── */
  var themeBtn = document.getElementById('theme-toggle');

  function currentTheme() {
    return root.getAttribute('data-theme') ||
      (window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light');
  }
  function paintTheme() {
    if (themeBtn) themeBtn.classList.toggle('is-dark', currentTheme() === 'dark');
  }
  if (themeBtn) {
    themeBtn.addEventListener('click', function () {
      var next = currentTheme() === 'dark' ? 'light' : 'dark';
      root.setAttribute('data-theme', next);
      try { localStorage.setItem('theme', next); } catch (e) {}
      paintTheme();
    });
    paintTheme();
    window.matchMedia('(prefers-color-scheme: dark)').addEventListener('change', paintTheme);
  }

  /* ── 2. Türkçe / English ─────────────────────────────────── */
  var langBtn = document.getElementById('lang-toggle');
  if (langBtn) {
    langBtn.addEventListener('click', function () {
      var next = root.getAttribute('data-ui') === 'tr' ? 'en' : 'tr';
      root.setAttribute('data-ui', next);
      root.setAttribute('lang', next);
      try { localStorage.setItem('ui', next); } catch (e) {}
    });
  }

  /* ── 3. Filter buttons (posts by language, library by kind) ── */
  document.querySelectorAll('.filters').forEach(function (group) {
    var buttons = group.querySelectorAll('button[data-filter]');
    buttons.forEach(function (b) {
      b.addEventListener('click', function () {
        var want = b.dataset.filter;
        buttons.forEach(function (o) { o.setAttribute('aria-pressed', String(o === b)); });

        document.querySelectorAll('.entry[data-lang]').forEach(function (row) {
          row.hidden = !(want === 'all' || row.dataset.lang === want);
        });
        document.querySelectorAll('.item[data-kind]').forEach(function (row) {
          row.hidden = !(want === 'all' || row.dataset.kind === want);
        });
        document.querySelectorAll('section[data-year]').forEach(function (sec) {
          sec.hidden = sec.querySelectorAll('.entry:not([hidden])').length === 0;
        });
      });
    });
  });

  /* ── 4. Public repositories, straight from the GitHub API ── */
  var box = document.getElementById('repos');
  if (box && box.dataset.user) {
    var user = box.dataset.user;
    var limit = parseInt(box.dataset.limit || '0', 10);
    var api = 'https://api.github.com/users/' + encodeURIComponent(user) +
              '/repos?sort=pushed&per_page=100&type=owner';

    fetch(api, { headers: { Accept: 'application/vnd.github+json' } })
      .then(function (r) {
        if (!r.ok) throw new Error('GitHub ' + r.status);
        return r.json();
      })
      .then(function (repos) {
        var list = repos.filter(function (r) { return !r.fork && !r.archived; });
        if (limit > 0) list = list.slice(0, limit);

        if (!list.length) {
          box.innerHTML = '<div class="empty"><h3><span class="tr">Henüz açık repo yok.</span>' +
            '<span class="en">No public repositories yet.</span></h3>' +
            '<p><span class="tr">İlk herkese açık repoyu gönderdiğinde burada kendiliğinden görünecek.</span>' +
            '<span class="en">Push your first public repo and it shows up here on its own.</span></p></div>';
          return;
        }

        var html = '<div class="projects">';
        list.forEach(function (r) {
          var when = new Date(r.pushed_at);
          html += '<a class="proj" href="' + esc(r.html_url) + '">' +
            '<div class="proj-top"><h3>' + esc(r.name) + '</h3>' +
            (r.stargazers_count ? '<span class="chip">★ ' + r.stargazers_count + '</span>' : '') +
            '</div>' +
            '<p>' + (r.description ? esc(r.description) :
              '<span class="tr" style="color:var(--muted)">Açıklama yok.</span>' +
              '<span class="en" style="color:var(--muted)">No description.</span>') + '</p>' +
            '<div class="proj-meta">' +
            (r.language ? '<span><span class="dot"></span>' + esc(r.language) + '</span>' : '') +
            '<span>' + pad(when.getDate()) + '.' + pad(when.getMonth() + 1) + '.' + when.getFullYear() + '</span>' +
            '</div></a>';
        });
        box.innerHTML = html + '</div>';
      })
      .catch(function (err) {
        box.innerHTML = '<div class="empty"><h3><span class="tr">GitHub\'a ulaşılamadı.</span>' +
          '<span class="en">Could not reach GitHub.</span></h3><p>' + esc(String(err.message)) +
          ' — <a href="https://github.com/' + esc(user) + '" style="color:var(--accent)">github.com/' +
          esc(user) + '</a></p></div>';
      });
  }

  function pad(n) { return n < 10 ? '0' + n : '' + n; }

  function esc(s) {
    return String(s).replace(/[&<>"']/g, function (c) {
      return { '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[c];
    });
  }
})();
