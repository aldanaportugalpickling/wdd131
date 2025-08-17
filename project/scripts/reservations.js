// scripts/reservations.js
document.addEventListener('DOMContentLoaded', () => {
  const form = document.getElementById('reservationForm');
  const confirmation = document.getElementById('confirmation');

  // Array of tour objects — using find/map/push
  const tours = [
    { id: 'machu', name: 'Machu Picchu Premium Tour', basePrice: 2500, durationDays: 2 },
    { id: 'sacsay', name: 'Sacsayhuamán Half-Day Tour', basePrice: 150, durationDays: 0.5 },
    { id: 'titicaca', name: 'Lake Titicaca Experience', basePrice: 1800, durationDays: 2 },
    { id: 'rainbow', name: 'Rainbow Mountain Adventure', basePrice: 900, durationDays: 1 }
  ];

  prefillForm(); // Prefill from localStorage (simple profile)

  form.addEventListener('submit', (e) => {
    e.preventDefault();

    const data = getFormData();
    // Extra validation (besides native required)
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

    saveReservation(reservation);              
    form.classList.add('hidden');
    renderConfirmation(confirmation, reservation); 
  });

  // ---- functions ----

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
    const guideFeePerPerson = wantsGuide ? 80 : 0; 
    let subtotal = (tourObj.basePrice + guideFeePerPerson) * guests;

    // Group discount condition
    if (guests >= 5) {
      subtotal *= 0.92; // 8% off
    }
    return Math.round(subtotal);
  }

  function saveReservation(reservation) {
    const key = 'reservations';
    const existing = JSON.parse(localStorage.getItem(key) || '[]');
    existing.push(reservation); 
    localStorage.setItem(key, JSON.stringify(existing));

    // Save simple profile for prefilling
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
      ? `<p><strong>VIP:</strong> Reservations of ${reservation.guests} travelers include priority service.</p>`
      : '';

    const when = reservation.date ? ` for <strong>${reservation.date}</strong>` : '';
    const formatted = reservation.price.toLocaleString('en-US', { style: 'currency', currency: 'USD' });

    container.innerHTML = `
      <h2>Thank you for your reservation, ${reservation.name}!</h2>
      <p>We have received your request${when} for the tour <strong>${reservation.tour}</strong> with bilingual guide: <strong>${reservation.guide}</strong>.</p>
      <p>Travelers: <strong>${reservation.guests}</strong> · Estimated Total: <strong>${formatted}</strong></p>
      ${vipNote}
      <p>A confirmation email will be sent to <strong>${reservation.email}</strong> soon.</p>
      <hr>
      <p><em>Registered at:</em> ${new Date(reservation.createdAt).toLocaleString()}</p>
    `;
    container.classList.remove('hidden');
  }
});
