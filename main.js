// main.js

// === Fade-in sections on scroll ===
const fadeElements = document.querySelectorAll('.fade-in');
const observer = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if(entry.isIntersecting){
      entry.target.style.opacity = 1;
      entry.target.style.transform = 'translateY(0)';
      observer.unobserve(entry.target);
    }
  });
}, { threshold: 0.2 });

fadeElements.forEach(el => observer.observe(el));

// === Floating/pulsing animation for CTA buttons ===
const floatElements = document.querySelectorAll('.float');
floatElements.forEach(el => {
  let direction = 1;
  setInterval(() => {
    el.style.transform = `translateY(${direction * 5}px)`;
    direction *= -1;
  }, 1500);
});

// === Hero background subtle pulse ===
const heroBg = document.querySelector('.hero-bg');
if(heroBg){
  let hue = 0;
  setInterval(() => {
    hue = (hue + 1) % 360;
    heroBg.style.background = `radial-gradient(circle at 50% 50%, hsl(${hue}, 70%, 60%), transparent 70%)`;
  }, 50);
}

// === Optional: Slight parallax for listings ===
const listings = document.querySelectorAll('.listing-card');
window.addEventListener('scroll', () => {
  const scrollY = window.scrollY;
  listings.forEach((card, i) => {
    card.style.transform = `translateY(${Math.sin(scrollY / 100 + i) * 10}px)`;
  });
});
