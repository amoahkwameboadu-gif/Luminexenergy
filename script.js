// ==========================================================
// Luminex Energy Solutions — site behavior
// Handles: current year, scroll header shadow, mobile menu,
// scroll-reveal animations, the quote form, the newsletter
// form, and the animated hero stat counter.
// ==========================================================
(function () {
  // Year
  document.getElementById('year').textContent = new Date().getFullYear();

  // Header shadow on scroll
  const header = document.getElementById('siteHeader');
  const onScroll = () => header.classList.toggle('header-scrolled', window.scrollY > 10);
  onScroll(); window.addEventListener('scroll', onScroll, { passive: true });

  // Mobile menu
  const menuBtn = document.getElementById('menuBtn');
  const mobileMenu = document.getElementById('mobileMenu');
  const iconOpen = document.getElementById('iconOpen');
  const iconClose = document.getElementById('iconClose');
  const setMenu = (open) => {
    mobileMenu.dataset.open = String(open);
    mobileMenu.setAttribute('aria-hidden', String(!open));
    menuBtn.setAttribute('aria-expanded', String(open));
    menuBtn.setAttribute('aria-label', open ? 'Close menu' : 'Open menu');
    iconOpen.classList.toggle('hidden', open);
    iconClose.classList.toggle('hidden', !open);
    document.body.style.overflow = open ? 'hidden' : '';
  };
  menuBtn.addEventListener('click', () => setMenu(mobileMenu.dataset.open !== 'true'));
  mobileMenu.querySelectorAll('.mobile-link').forEach(a => a.addEventListener('click', () => setMenu(false)));
  document.addEventListener('keydown', e => { if (e.key === 'Escape' && mobileMenu.dataset.open === 'true') { setMenu(false); menuBtn.focus(); } });
  window.matchMedia('(min-width: 768px)').addEventListener('change', e => { if (e.matches) setMenu(false); });

  // Reveal on scroll
  const revealEls = document.querySelectorAll('.reveal');
  if ('IntersectionObserver' in window) {
    const io = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) { entry.target.classList.add('is-visible'); io.unobserve(entry.target); }
      });
    }, { threshold: 0.12, rootMargin: '0px 0px -40px 0px' });
    revealEls.forEach(el => io.observe(el));
  } else {
    revealEls.forEach(el => el.classList.add('is-visible'));
  }

  // Quote form
  const form = document.getElementById('quoteForm');
  const formError = document.getElementById('formError');
  const success = document.getElementById('formSuccess');
  form.addEventListener('submit', (e) => {
    e.preventDefault();
    const name = form.name.value.trim();
    const phone = form.phone.value.trim();
    const service = form.service.value;
    const email = form.email.value.trim();
    let msg = '';
    if (!name) msg = 'Please enter your full name.';
    else if (!/^[+\d][\d\s\-()]{7,}$/.test(phone)) msg = 'Please enter a valid phone number.';
    else if (email && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) msg = 'Please enter a valid email address.';
    else if (!service) msg = 'Please select the service you need.';
    if (msg) {
      formError.textContent = msg; formError.classList.remove('hidden');
      const firstInvalid = !name ? form.name : (!/^[+\d][\d\s\-()]{7,}$/.test(phone) ? form.phone : (!service ? form.service : form.email));
      firstInvalid.focus();
      return;
    }
    formError.classList.add('hidden');
    const btn = form.querySelector('button[type="submit"]');
    btn.disabled = true; btn.textContent = 'Sending…';
    setTimeout(() => {
      form.classList.add('hidden'); success.classList.remove('hidden'); success.focus();
      btn.disabled = false; btn.textContent = 'Send My Request';
    }, 700);
  });
  document.getElementById('resetForm').addEventListener('click', () => {
    form.reset(); success.classList.add('hidden'); form.classList.remove('hidden'); form.name.focus();
  });

  // Newsletter
  const nl = document.getElementById('newsletterForm');
  const nlMsg = document.getElementById('newsletterMsg');
  nl.addEventListener('submit', (e) => {
    e.preventDefault();
    const val = nl.email.value.trim();
    nlMsg.classList.remove('hidden', 'text-red-700', 'text-moss');
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(val)) {
      nlMsg.textContent = 'Please enter a valid email address.'; nlMsg.classList.add('text-red-700'); nl.email.focus(); return;
    }
    nlMsg.textContent = 'You’re in! Watch your inbox for your first energy-saving tip.'; nlMsg.classList.add('text-moss'); nl.reset();
  });

  // Hero count-up (respects reduced motion)
  const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  const counter = document.querySelector('[data-count]');
  if (counter && !reduce) {
    const target = parseInt(counter.dataset.count, 10); const start = performance.now(); const dur = 1600;
    const step = (t) => { const p = Math.min(1, (t - start) / dur); const ease = 1 - Math.pow(1 - p, 3); counter.textContent = Math.round(target * ease) + '+'; if (p < 1) requestAnimationFrame(step); };
    requestAnimationFrame(step);
  }
})();
