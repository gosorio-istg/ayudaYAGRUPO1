/* BrigadaSalud — Utilidades compartidas */

function initSidebar() {
  const toggle = document.getElementById('sidebar-toggle');
  const sidebar = document.getElementById('sidebar');
  const overlay = document.getElementById('sidebar-overlay');

  if (!toggle || !sidebar) return;

  toggle.addEventListener('click', () => {
    sidebar.classList.toggle('is-open');
    overlay?.classList.toggle('is-visible');
  });

  overlay?.addEventListener('click', () => {
    sidebar.classList.remove('is-open');
    overlay.classList.remove('is-visible');
  });
}

function initPasswordToggle() {
  document.querySelectorAll('[data-toggle-password]').forEach(btn => {
    btn.addEventListener('click', () => {
      const input = document.getElementById(btn.dataset.togglePassword);
      if (!input) return;
      const isPassword = input.type === 'password';
      input.type = isPassword ? 'text' : 'password';
      btn.textContent = isPassword ? 'visibility_off' : 'visibility';
      btn.setAttribute('aria-label', isPassword ? 'Ocultar contraseña' : 'Mostrar contraseña');
    });
  });
}

function showToast(message, type = 'success') {
  let toast = document.getElementById('toast');
  if (!toast) {
    toast = document.createElement('div');
    toast.id = 'toast';
    toast.className = 'toast';
    document.body.appendChild(toast);
  }
  toast.className = `toast toast-${type}`;
  toast.innerHTML = `<span class="material-symbols-rounded">${type === 'success' ? 'check_circle' : 'error'}</span><span>${message}</span>`;
  toast.classList.add('show');
  setTimeout(() => toast.classList.remove('show'), 3000);
}

function initModals() {
  document.querySelectorAll('[data-modal-open]').forEach(btn => {
    btn.addEventListener('click', () => {
      const modal = document.getElementById(btn.dataset.modalOpen);
      modal?.classList.add('is-open');
    });
  });

  document.querySelectorAll('[data-modal-close]').forEach(btn => {
    btn.addEventListener('click', () => {
      btn.closest('.modal-overlay')?.classList.remove('is-open');
    });
  });

  document.querySelectorAll('.modal-overlay').forEach(overlay => {
    overlay.addEventListener('click', e => {
      if (e.target === overlay) overlay.classList.remove('is-open');
    });
  });
}

function initChipSelectors() {
  document.querySelectorAll('.chip-selectable').forEach(chip => {
    chip.addEventListener('click', () => chip.classList.toggle('is-selected'));
  });
}

function initFilterChips() {
  document.querySelectorAll('.filter-bar[data-filter-group]').forEach(bar => {
    bar.querySelectorAll('.filter-chip').forEach(chip => {
      chip.addEventListener('click', () => {
        bar.querySelectorAll('.filter-chip').forEach(c => c.classList.remove('is-active'));
        chip.classList.add('is-active');
        const filter = chip.dataset.filter;
        const target = bar.dataset.filterGroup;
        document.querySelectorAll(`[data-filter-target="${target}"]`).forEach(el => {
          el.style.display = !filter || filter === 'all' || el.dataset.status === filter ? '' : 'none';
        });
      });
    });
  });
}

function setActiveNav(page) {
  document.querySelectorAll('.sidebar-link[data-page]').forEach(link => {
    link.classList.toggle('is-active', link.dataset.page === page);
  });
}

document.addEventListener('DOMContentLoaded', () => {
  initSidebar();
  initPasswordToggle();
  initModals();
  initChipSelectors();
  initFilterChips();
});
