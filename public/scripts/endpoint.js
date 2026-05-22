(function () {
  document.addEventListener('click', async function (e) {
    var btn = e.target.closest('[data-run]');
    if (!btn || btn.disabled) return;
    var id = btn.dataset.run;
    var url = btn.dataset.url;
    var input = document.getElementById('inp-' + id);
    if (input) {
      var val = input.value.trim();
      if (!val) { input.focus(); input.classList.add('input-err'); return; }
      input.classList.remove('input-err');
      url = url.replace('__INPUT__', encodeURIComponent(val));
    }
    var out = document.getElementById('out-' + id);
    btn.disabled = true;
    var orig = btn.innerHTML;
    btn.innerHTML = '<span class="text-muted">Running…</span>';
    out.style.display = 'block';
    out.className = 'api-out loading';
    out.textContent = 'Fetching…';
    try {
      var r = await fetch(url);
      var raw = await r.text();
      var display;
      try { display = JSON.stringify(JSON.parse(raw), null, 2); } catch (ex) { display = raw; }
      out.textContent = display;
      out.className = 'api-out ' + (r.ok ? 'ok' : 'err');
    } catch (ex) {
      out.textContent = 'Network error: ' + ex.message;
      out.className = 'api-out err';
    }
    btn.disabled = false;
    btn.innerHTML = orig;
  });
})();
