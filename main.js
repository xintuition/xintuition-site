// main.js - Xintuition 2026 modern interactivity

// 1️⃣ Smooth scrolling for internal links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
  anchor.addEventListener('click', e => {
    e.preventDefault();
    const target = document.querySelector(anchor.getAttribute('href'));
    if (target) target.scrollIntoView({ behavior: 'smooth', block: 'start' });
  });
});

// 2️⃣ Fade-in sections on scroll
const faders = document.querySelectorAll('section, .fade-in');
const appearOptions = { threshold: 0.25, rootMargin: "0px 0px -50px 0px" };
const appearOnScroll = new IntersectionObserver((entries, observer) => {
  entries.forEach(entry => {
    if (!entry.isIntersecting) return;
    entry.target.classList.add('appear');
    observer.unobserve(entry.target);
  });
}, appearOptions);

faders.forEach(fader => appearOnScroll.observe(fader));

// 3️⃣ Logo hover + click effect
const logo = document.querySelector('header img');
if (logo) {
  logo.style.transition = 'transform 0.3s ease, filter 0.3s ease';
  logo.addEventListener('mouseenter', () => {
    logo.style.transform = 'scale(1.2) rotate(5deg)';
    logo.style.filter = 'drop-shadow(0 0 15px rgba(255,255,255,0.8))';
  });
  logo.addEventListener('mouseleave', () => {
    logo.style.transform = 'scale(1) rotate(0deg)';
    logo.style.filter = 'none';
  });
  logo.addEventListener('click', () => {
    alert('Welcome to Xintuition!');
  });
}

// 4️⃣ Button hover effect
document.querySelectorAll('button, .cta').forEach(btn => {
  btn.addEventListener('mouseenter', () => btn.classList.add('hovered'));
  btn.addEventListener('mouseleave', () => btn.classList.remove('hovered'));
});

// 5️⃣ Dynamic footer year
const footerYear = document.querySelector('footer p');
if (footerYear) {
  const year = new Date().getFullYear();
  footerYear.textContent = `© ${year} Xintuition`;
}

// 6️⃣ Floating elements animation
const floatEls = document.querySelectorAll('.float');
floatEls.forEach(el => {
  let pos = 0, dir = 1;
  setInterval(() => {
    pos += dir * 0.5;
    if (pos > 10 || pos < -10) dir *= -1;
    el.style.transform = `translateY(${pos}px)`;
  }, 30);
});
