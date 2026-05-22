(function () {
  var input = document.getElementById('claim-filter');
  if (!input) return;
  input.addEventListener('input', function () {
    var q = this.value.toLowerCase();
    document.querySelectorAll('#claims-tbody tr').forEach(function (row) {
      row.style.display = row.textContent.toLowerCase().includes(q) ? '' : 'none';
    });
  });
})();
