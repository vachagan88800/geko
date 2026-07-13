// Filter pills — toggle active state within group
document.querySelectorAll('.sf-filter-pill').forEach(pill => {
  pill.addEventListener('click', function () {
    const group = this.closest('.sf-filters, div');
    group.querySelectorAll('.sf-filter-pill').forEach(p => p.classList.remove('active'));
    this.classList.add('active');
  });
});

// View toggle — grid / list
document.querySelectorAll('.sf-toggle-btn').forEach(btn => {
  btn.addEventListener('click', function () {
    this.closest('.sf-view-toggle')
      .querySelectorAll('.sf-toggle-btn')
      .forEach(b => b.classList.remove('active'));
    this.classList.add('active');
  });
});

// Save button — toggle saved state
document.querySelectorAll('.sf-card-btn.save').forEach(btn => {
  btn.addEventListener('click', function (e) {
    e.stopPropagation();
    this.textContent = this.textContent.includes('♡') ? '♥ Saved' : '♡ Save';
  });
});
