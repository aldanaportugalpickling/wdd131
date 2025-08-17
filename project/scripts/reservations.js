document.addEventListener('DOMContentLoaded', () => {
  const form = document.getElementById('reservationForm');
  const confirmation = document.getElementById('confirmation');

  const tours = [
    { id: 'machu', name: 'Machu Picchu Premium Tour', basePrice: 2500, durationDays: 2 },
    { id: 'sacsay', name: 'Sacred Valley of the Incas Half-Day Tour', basePrice: 150, durationDays: 0.5 },
    { id: 'titicaca', name: 'Lake Titicaca Experience', basePrice: 1800, durationDays: 2 },
    { id: 'rainbow', name: 'Rainbow Mountain Luxury Trek', basePrice: 900, durationDays: 1 }
  ];

  prefillForm();

  form.addEventListener('submit', (e) => {
    e.preventDefault();
    const data = getFormData();

    if (data.name.length < 3) {
      alert('Please enter your full name (at least 3 characters).');
      return;
    }

    const selectedTour = tours.find(t => t.name === data.tour);
    const price = calculatePrice(selectedTour, data.guests, data.guide === 'Yes');

    const reservation = { ...data, price, createdAt: new Date().toISOString() };

    saveReservation(reservation);
    form.classList.add('hidden');
    renderConfirmation(confirmation, reservation);
  });

  function getFormData() {
    return {
      name: document.getElementById('name')?.value.trim() || '',
      email: document.getElementById('email')?.value.trim() || '',
      tour: document.getElementById('tour')?.value || '',
      guide: (document.querySelector('input[name="guide"]:checked')?.value) || 'No',
      guests: Math.max(1, parseInt(document.getElementById('guests')?.value, 10) || 1),
      date: document.getElementById('date')?.value || ''
    };
  }

  function calculatePrice(tourObj, guests, wantsGuide) {
    if (!tourObj) return 0;
    const guideFee = wantsGuide ? 80 : 0;
    let subtotal = (tourObj.basePrice + guideFee) * guests;
    if (guests >= 5) subtotal *= 0.92;
    return Math.round(subtotal);
  }

  function saveReservation(reservation) {
    const key = 'reservations';
    const existing = JSON.parse(localStorage.getItem(key) || '[]');
    existing.push(reservation);
    localStorage.setItem(key, JSON.stringify(existing));
    localStorage.setItem('profile', JSON.stringify({ name: reservation.name, email: reservation.email }));
  }

  function prefillForm() {
    const profile = JSON.parse(localStorage.getItem('profile') || 'null');
    if (profile) {
      if (document.getElementById('name')) document.getElementById('name').value = profile.name || '';
      if (document.getElementById('email')) document.getElementById('email').value = profile.email || '';
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
