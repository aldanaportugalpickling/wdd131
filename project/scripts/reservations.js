// scripts/reservations.js
document.addEventListener('DOMContentLoaded', () => {
  const form = document.getElementById('reservationForm');
  const confirmation = document.getElementById('confirmation');

  // Array de objetos (tours) — usaremos find/map/push
  const tours = [
    { id: 'machu', name: 'Machu Picchu Premium Tour', basePrice: 2500, durationDays: 2 },
    { id: 'sacsay', name: 'Sacsayhuamán Half-Day Tour', basePrice: 150, durationDays: 0.5 },
    { id: 'titicaca', name: 'Lake Titicaca Experience', basePrice: 1800, durationDays: 2 }
  ];

  prefillForm(); // Prefill desde localStorage (perfil simple)

  form.addEventListener('submit', (e) => {
    e.preventDefault();

    const data = getFormData();
    // Validación adicional (además del required nativo)
    if (data.name.length < 3) {
      alert('Please enter your full name (at least 3 characters).');
      return;
    }

    const selectedTour = tours.find(t => t.name === data.tour);
    const price = calculatePrice(selectedTour, data.guests, data.guide === 'Yes');

    const reservation = {
      ...data,
      price,
      createdAt: new Date().toISOString()
    };

    saveReservation(reservation);              // localStorage (array)
    form.classList.add('hidden');
    renderConfirmation(confirmation, reservation); // Output con template literals
  });

  // ---- funciones ----

  function getFormData() {
    const name = document.getElementById('name')?.value.trim() || '';
    const email = document.getElementById('email')?.value.trim() || '';
    const tour = document.getElementById('tour')?.value || '';
    const guide = (document.querySelector('input[name="guide"]:checked')?.value) || 'No';
    const guestsEl = document.getElementById('guests');
    const guests = guestsEl ? Math.max(1, parseInt(guestsEl.value, 10) || 1) : 1;
    const date = document.getElementById('date')?.value || '';
    return { name, email, tour, guide, guests, date };
  }

  function calculatePrice(tourObj, guests, wantsGuide) {
    if (!tourObj) return 0;
    const guideFeePerPerson = wantsGuide ? 80 : 0; // Condicional
    let subtotal = (tourObj.basePrice + guideFeePerPerson) * guests;

    // Condicional de grupo (VIP/Descuento)
    if (guests >= 5) {
      subtotal *= 0.92; // 8% off
    }
    return Math.round(subtotal);
  }

  function saveReservation(reservation) {
    const key = 'reservations';
    const existing = JSON.parse(localStorage.getItem(key) || '[]');
    existing.push(reservation); // método de array
    localStorage.setItem(key, JSON.stringify(existing));

    // Guarda perfil simple para prellenar
    localStorage.setItem('profile', JSON.stringify({
      name: reservation.name,
      email: reservation.email
    }));
  }

  function prefillForm() {
    const profile = JSON.parse(localStorage.getItem('profile') || 'null');
    if (profile) {
      const nameEl = document.getElementById('name');
      const emailEl = document.getElementById('email');
      if (nameEl) nameEl.value = profile.name || '';
      if (emailEl) emailEl.value = profile.email || '';
    }
  }

  function renderConfirmation(container, reservation) {
    const vipNote = reservation.guests >= 5
      ? `<p><strong>VIP:</strong> Reservas de ${reservation.guests} viajeros incluyen atención prioritaria.</p>`
      : '';

    const when = reservation.date ? ` para el <strong>${reservation.date}</strong>` : '';
    const formatted = reservation.price.toLocaleString('en-US', { style: 'currency', currency: 'USD' });

    container.innerHTML = `
      <h2>¡Gracias por tu reserva, ${reservation.name}!</h2>
      <p>Hemos recibido tu solicitud${when} para el tour <strong>${reservation.tour}</strong> con guía bilingüe: <strong>${reservation.guide}</strong>.</p>
      <p>Viajeros: <strong>${reservation.guests}</strong> · Total estimado: <strong>${formatted}</strong></p>
      ${vipNote}
      <p>Te enviaremos un correo de confirmación a <strong>${reservation.email}</strong> pronto.</p>
      <hr>
      <p><em>Fecha de registro:</em> ${new Date(reservation.createdAt).toLocaleString()}</p>
    `;
    container.classList.remove('hidden');
  }
});
