(function () {
  document.addEventListener('click', function (e) {
    var b = e.target.closest('[data-copy]');
    if (!b) return;
    navigator.clipboard.writeText(b.dataset.copy).then(function () {
      var o = b.textContent;
      b.textContent = 'Copied!';
      b.classList.add('copied');
      setTimeout(function () {
        b.textContent = o;
        b.classList.remove('copied');
      }, 1500);
    });
  });
})();
