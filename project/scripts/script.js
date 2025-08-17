// scripts/script.js
document.addEventListener('DOMContentLoaded', () => {
  initMenu();
  updateFooterDates();
});

function initMenu() {
  const hamButton = document.querySelector('#menu-button');
  const nav = document.querySelector('nav');
  if (!hamButton || !nav) return;

  const setIcon = (open) => {
    hamButton.innerHTML = open ? '&times;' : '&#9776;';
    hamButton.setAttribute('aria-expanded', open ? 'true' : 'false');
    hamButton.setAttribute('aria-label', open ? 'Cerrar menú' : 'Abrir menú');
  };

  hamButton.addEventListener('click', () => {
    nav.classList.toggle('show');
    const open = nav.classList.contains('show');
    setIcon(open);
  });

  // Cierra el menú al tocar un enlace en móvil
  nav.addEventListener('click', (e) => {
    if (e.target.tagName === 'A' && window.innerWidth < 768) {
      nav.classList.remove('show');
      setIcon(false);
    }
  });

  setIcon(false);
}

function updateFooterDates() {
  const yearEl = document.querySelector('#currentyear');
  const modEl = document.querySelector('#lastModified');
  if (yearEl) yearEl.textContent = new Date().getFullYear();
  if (modEl) modEl.textContent = `Last Modified: ${document.lastModified}`;
}
