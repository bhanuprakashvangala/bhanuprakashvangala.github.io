// Reveal email address when user clicks the envelope icon

document.addEventListener('DOMContentLoaded', () => {
  document.querySelectorAll('.author-email').forEach(el => {
    const email = el.dataset.email;
    if (!email) return;
    el.title = 'Click to reveal email';
    el.style.cursor = 'pointer';
    let revealed = false;
    el.addEventListener('click', () => {
      if (!revealed) {
        el.appendChild(document.createTextNode(' ' + email));
        revealed = true;
      }
    });
  });
});
