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

// === Floating/pulsing animation for .float ===
const floatElements = document.querySelectorAll('.float');
floatElements.forEach(el => {
  let direction = 1;
  setInterval(() => {
    el.style.transform = `translateY(${direction * 5}px)`;
    direction *= -1;
  }, 1500);
});

// === Hero background radial pulse ===
const heroBg = document.querySelector('.hero-bg');
if(heroBg){
  let hue = 0;
  setInterval(() => {
    hue = (hue + 1) % 360;
    heroBg.style.background = `radial-gradient(circle at 50% 50%, hsl(${hue}, 70%, 60%), transparent 70%)`;
  }, 50);
}

// === Slight parallax for listings ===
const listings = document.querySelectorAll('.listing-card');
window.addEventListener('scroll', () => {
  const scrollY = window.scrollY;
  listings.forEach((card, i) => {
    card.style.transform = `translateY(${Math.sin(scrollY / 100 + i) * 10}px)`;
  });
});

// === Hero Particles ===
if(heroBg){
  const particleCount = 40;
  for(let i=0; i<particleCount; i++){
    const p = document.createElement('div');
    p.classList.add('particle');
    p.style.position = 'absolute';
    p.style.width = `${Math.random() * 4 + 2}px`;
    p.style.height = p.style.width;
    p.style.background = 'rgba(255,255,255,0.6)';
    p.style.borderRadius = '50%';
    p.style.top = `${Math.random() * 100}%`;
    p.style.left = `${Math.random() * 100}%`;
    p.style.pointerEvents = 'none';
    heroBg.appendChild(p);

    let direction = 1;
    setInterval(() => {
      let top = parseFloat(p.style.top);
      if(top > 100) direction = -1;
      if(top < 0) direction = 1;
      p.style.top = `${top + direction * 0.2}px`;
    }, 20);
  }
}
