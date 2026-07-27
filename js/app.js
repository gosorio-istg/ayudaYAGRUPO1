/* BrigadaMedica — Utilidades compartidas */

const DataStore = {
  pacientes: [
    { id: 1, nombre: 'María González', cedula: '0923456789', turno: 'MG-024', especialidad: 'Medicina General', estado: 'Atendido', hora: '09:15' },
    { id: 2, nombre: 'Carlos Mendoza', cedula: '0912345678', turno: 'ODO-012', especialidad: 'Odontología', estado: 'Pendiente', hora: '10:30' },
    { id: 3, nombre: 'Ana Torres', cedula: '0956789012', turno: 'PED-008', especialidad: 'Pediatría', estado: 'En espera', hora: '11:00' },
    { id: 4, nombre: 'Rosa Vélez', cedula: '0934567890', turno: 'GIN-005', especialidad: 'Ginecología', estado: 'No asistió', hora: '11:45' },
    { id: 5, nombre: 'Luis Herrera', cedula: '0901234567', turno: 'NUT-003', especialidad: 'Nutrición', estado: 'Cancelado', hora: '—' },
    { id: 6, nombre: 'Patricia Silva', cedula: '0928765432', turno: 'MG-026', especialidad: 'Medicina General', estado: 'Atendido', hora: '12:00' },
  ],
  brigadas: [
    { id: 1, nombre: 'Campaña Bastión Popular', fecha: '25 Jul 2026', ubicacion: 'Cooperativa Balerio Estacio', estado: 'Programada', especialidades: 'MG, Odontología, Pediatría' },
    { id: 2, nombre: 'Jornada Entrada de la 8', fecha: '20 Jul 2026', ubicacion: 'Av. Casuarina Mz 102', estado: 'En curso', especialidades: 'MG, Ginecología, Nutrición' },
    { id: 3, nombre: 'Brigada Flor de Bastión', fecha: '5 Jul 2026', ubicacion: 'Flor de Bastión Bloque 3', estado: 'Finalizada', especialidades: 'MG, Pediatría' },
  ],
  medicos: [
    { id: 1, nombre: 'Dra. Rosa Pérez', especialidad: 'Medicina General', estado: 'Disponible', iniciales: 'DR' },
    { id: 2, nombre: 'Dr. Juan Morales', especialidad: 'Odontología', estado: 'Disponible', iniciales: 'JM' },
    { id: 3, nombre: 'Dra. Laura Castro', especialidad: 'Pediatría', estado: 'Ocupada', iniciales: 'LC' },
    { id: 4, nombre: 'Dra. Ana Flores', especialidad: 'Ginecología', estado: 'Disponible', iniciales: 'AF' },
  ],
  brigadistas: [
    { id: 1, nombre: 'Pedro Vega', brigada: 'Jornada Entrada de la 8', rol: 'Registro', asistencia: 'Presente', iniciales: 'PV' },
    { id: 2, nombre: 'Sandra Muñoz', brigada: 'Jornada Entrada de la 8', rol: 'Apoyo logístico', asistencia: 'Presente', iniciales: 'SM' },
    { id: 3, nombre: 'Jorge Rivas', brigada: 'Campaña Bastión Popular', rol: 'Registro', asistencia: 'Pendiente', iniciales: 'JR' },
    { id: 4, nombre: 'Karen López', brigada: 'Brigada Flor de Bastión', rol: 'Apoyo logístico', asistencia: 'Ausente', iniciales: 'KL' },
  ],
};

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

  document.querySelectorAll('.sidebar-link[data-page]').forEach(link => {
    link.addEventListener('click', () => {
      setTimeout(() => {
        sidebar.classList.remove('is-open');
        overlay?.classList.remove('is-visible');
      }, 150);
    });
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

  document.addEventListener('keydown', e => {
    if (e.key === 'Escape') {
      document.querySelectorAll('.modal-overlay.is-open').forEach(m => m.classList.remove('is-open'));
    }
  });
}

function initChipSelectors() {
  document.querySelectorAll('.chip-selectable').forEach(chip => {
    chip.addEventListener('click', () => {
      chip.classList.toggle('is-selected');
      const count = document.querySelectorAll('.chip-selectable.is-selected').length;
      const counter = document.getElementById('selected-count');
      if (counter) counter.textContent = count;
    });
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

function initSearch(selector, items, fields) {
  const input = document.querySelector(selector);
  if (!input) return;
  input.addEventListener('input', e => {
    const q = e.target.value.toLowerCase().trim();
    items.forEach(item => {
      const match = fields.some(f => String(item[f]).toLowerCase().includes(q));
      item.el.style.display = match ? '' : 'none';
    });
  });
}

function initTableSearch(tableSelector, searchInputSelector) {
  const input = document.querySelector(searchInputSelector);
  if (!input) return;
  input.addEventListener('input', e => {
    const q = e.target.value.toLowerCase().trim();
    const rows = document.querySelectorAll(`${tableSelector} tbody tr`);
    rows.forEach(row => {
      const text = row.textContent.toLowerCase();
      row.style.display = text.includes(q) ? '' : 'none';
    });
  });
}

// Menú de usuario del topbar (avatar -> ver perfil / cerrar sesión).
function initUserMenu() {
  const menu = document.getElementById('user-menu');
  const trigger = document.getElementById('user-menu-trigger');
  if (!menu || !trigger) return;

  function cerrar() {
    menu.classList.remove('is-open');
    trigger.setAttribute('aria-expanded', 'false');
  }

  trigger.addEventListener('click', (e) => {
    e.stopPropagation();
    const abrir = !menu.classList.contains('is-open');
    menu.classList.toggle('is-open', abrir);
    trigger.setAttribute('aria-expanded', String(abrir));
  });

  document.addEventListener('click', (e) => {
    if (!menu.contains(e.target)) cerrar();
  });

  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') cerrar();
  });
}

// Buscador global del topbar: escribe 2+ caracteres y aparecen coincidencias
// de ejemplo (DataStore) agrupadas por tipo, tal como en el panel de Laravel
// (ahí busca en la API real; aquí, al ser solo diseño, busca en datos de muestra).
function initGlobalSearch() {
  const wrap = document.getElementById('global-search');
  const input = document.getElementById('global-search-input');
  const panel = document.getElementById('global-search-results');
  if (!wrap || !input || !panel) return;

  let temporizador = null;

  function cerrar() { wrap.classList.remove('is-open'); }
  function abrir() { wrap.classList.add('is-open'); }

  input.addEventListener('input', () => {
    clearTimeout(temporizador);
    const termino = input.value.trim();
    if (termino.length < 2) { cerrar(); return; }
    temporizador = setTimeout(() => buscar(termino), 250);
  });

  input.addEventListener('focus', () => {
    if (input.value.trim().length >= 2) buscar(input.value.trim());
  });

  document.addEventListener('click', (e) => {
    if (!wrap.contains(e.target)) cerrar();
  });

  function buscar(termino) {
    const terminoMin = termino.toLowerCase();
    const grupos = [];

    const pacientes = DataStore.pacientes.filter(p =>
      p.nombre.toLowerCase().includes(terminoMin) || p.cedula.includes(termino)).slice(0, 5);
    if (pacientes.length) {
      grupos.push({
        titulo: 'Pacientes', icono: 'personal_injury',
        items: pacientes.map(p => ({ texto: p.nombre, subtexto: p.cedula, href: 'pacientes.html' })),
      });
    }

    const brigadas = DataStore.brigadas.filter(b => b.nombre.toLowerCase().includes(terminoMin)).slice(0, 5);
    if (brigadas.length) {
      grupos.push({
        titulo: 'Campañas', icono: 'groups',
        items: brigadas.map(b => ({ texto: b.nombre, subtexto: b.ubicacion, href: 'brigadas.html' })),
      });
    }

    const medicos = DataStore.medicos.filter(m => m.nombre.toLowerCase().includes(terminoMin)).slice(0, 5);
    if (medicos.length) {
      grupos.push({
        titulo: 'Médicos', icono: 'stethoscope',
        items: medicos.map(m => ({ texto: m.nombre, subtexto: m.especialidad, href: 'medicos.html' })),
      });
    }

    pintarResultadosBusqueda(grupos, termino);
    abrir();
  }

  function pintarResultadosBusqueda(grupos, termino) {
    if (!grupos.length) {
      panel.innerHTML = `<div class="search-result-empty">Sin resultados para "${termino}"</div>`;
      return;
    }
    panel.innerHTML = grupos.map(g => `
      <div class="search-result-group">
        <div class="search-result-group-label">${g.titulo}</div>
        ${g.items.map(it => `
          <a href="${it.href}" class="search-result-item">
            <span class="material-symbols-rounded">${g.icono}</span>
            <span class="search-result-item-text">
              <strong>${it.texto}</strong>
              ${it.subtexto ? `<span>${it.subtexto}</span>` : ''}
            </span>
          </a>`).join('')}
      </div>`).join('');
  }
}

function initScrollShadow() {
  const topbar = document.querySelector('.topbar');
  if (!topbar) return;
  window.addEventListener('scroll', () => {
    topbar.classList.toggle('is-scrolled', window.scrollY > 4);
  }, { passive: true });
}

document.addEventListener('DOMContentLoaded', () => {
  initSidebar();
  initPasswordToggle();
  initModals();
  initChipSelectors();
  initFilterChips();
  initScrollShadow();
  initUserMenu();
  initGlobalSearch();
});
