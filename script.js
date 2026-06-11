// Theme toggle
const root = document.documentElement;
const toggle = document.getElementById('theme-toggle');
const saved = localStorage.getItem('theme') || 'light';
root.setAttribute('data-theme', saved);

// Move knob based on theme (CSS also handles this, but keeping initial nudge)
if (saved === 'dark') toggle.querySelector('.knob').style.transform = 'translateX(20px)';

// --- NEW: keep the moon/sun icon in sync with theme ---
const moon = document.querySelector('.moon-icon');
function updateThemeUI() {
  const isDark = root.getAttribute('data-theme') === 'dark';
  if (!moon) return;
  // Swap moon/sun
  moon.classList.toggle('fa-moon', !isDark);
  moon.classList.toggle('fa-sun', isDark);
  // Update title / aria
  const label = isDark ? 'Switch to light mode' : 'Switch to dark mode';
  moon.title = label;
  moon.setAttribute('aria-label', label);
}
updateThemeUI(); // run once on load

toggle.addEventListener('click', () => {
  const next = root.getAttribute('data-theme') === 'light' ? 'dark' : 'light';
  root.setAttribute('data-theme', next);
  localStorage.setItem('theme', next);
  updateThemeUI();
});

// Typed line
document.addEventListener('DOMContentLoaded', () => {
  new Typed('#typed-text', {
    strings: ['PhD Student', 'LLM & dLLM Researcher', 'Teaching Staff', 'Research Assistant'],
    typeSpeed: 38,      
    backSpeed: 18,      
    backDelay: 1600,    // pause a bit longer
    loop: true,
    smartBackspace: true,
  });
});

// Moon/Sun icon also toggles theme
if (moon){
  moon.addEventListener('click', () => {
    const isDark = root.getAttribute('data-theme') === 'dark';
    const next = isDark ? 'light' : 'dark';
    root.setAttribute('data-theme', next);
    try{ localStorage.setItem('theme', next); }catch(_){}
    updateThemeUI();
  });
}


try{
  const again = localStorage.getItem('theme');
  if(again) document.documentElement.setAttribute('data-theme', again);
  updateThemeUI();
}catch(_){}


// Interactive background (About) with tsParticles
(async () => {
  const dark = () => getComputedStyle(document.documentElement).getPropertyValue('--bg').trim() !== '#f6f7fb';
  const colors = () => ({
    links: getComputedStyle(document.documentElement).getPropertyValue('--accent-2').trim(),
    dots: getComputedStyle(document.documentElement).getPropertyValue('--accent').trim()
  });

  const loadParticles = async () => {
    const c = colors();
    await tsParticles.load({
      id: 'about-bg',
      options: {
        fullScreen: { enable: false },
        background: { color: { value: 'transparent' } },
        particles: {
          number: { value: 55, density: { enable: true, area: 800 } },
          color: { value: c.dots },
          links: { enable: true, distance: 110, color: c.links, opacity: 0.45, width: 1 },
          move: { enable: true, speed: 1.0, outModes: { default: 'bounce' } },
          size: { value: { min: 1, max: 4 } },
          opacity: { value: { min: 0.35, max: 0.8 } }
        },
        detectRetina: true
      }
    });
  };

  await loadParticles();
  // Update particles when theme changes
  const mo = new MutationObserver(loadParticles);
  mo.observe(document.documentElement, { attributes: true, attributeFilter: ['data-theme'] });
})().catch(() => {
  // graceful fallback
});

// Modal for abstracts
const modal = document.getElementById('modal');
const modalTitle = document.getElementById('modal-title');
const modalBody = document.getElementById('modal-body');
const openModal = (title, body) => {
  modalTitle.textContent = title || "";
  modalBody.textContent = body || "";
  modal.classList.add('show');
  modal.setAttribute('aria-hidden', 'false');
};

const closeModal = () => {
  modal.classList.remove('show');
  modal.setAttribute('aria-hidden', 'true');
};

document.addEventListener('click', (e) => {
  const openBtn = e.target.closest('.open-abs');
  if (openBtn) {
    openModal(openBtn.dataset.title, openBtn.dataset.abstract);
  }
  if (e.target.matches('[data-close]')) closeModal();
});

document.addEventListener('keydown', (e) => {
  if (e.key === 'Escape' && modal.classList.contains('show')) closeModal();
});

// Year
document.getElementById('year').textContent = new Date().getFullYear();
