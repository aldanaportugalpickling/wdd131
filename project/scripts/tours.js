document.addEventListener('DOMContentLoaded', () => {
  initTourDetails();
});


document.querySelectorAll('.details-btn').forEach(button => {
    button.addEventListener('click', () => {
        const details = button.nextElementSibling;
        details.classList.toggle('hidden');
        button.textContent = details.classList.contains('hidden') ? 'View Details' : 'Hide Details';
    });
});
