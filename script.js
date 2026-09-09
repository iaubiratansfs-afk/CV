document.addEventListener('DOMContentLoaded', () => {
  const html = document.documentElement;
  const themeToggle = document.getElementById('themeToggle');
  const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  const email = 'ubiratan@aureum.adv.br';

  if (themeToggle) {
    themeToggle.addEventListener('click', () => {
      const current = html.getAttribute('data-theme') || 'dark';
      const next = current === 'light' ? 'dark' : 'light';
      html.setAttribute('data-theme', next);
      localStorage.setItem('cv-theme', next);
    });
  }

  const toast = document.getElementById('toast');
  const toastMsg = document.getElementById('toastMsg');
  let toastTimer;

  const showToast = (message) => {
    if (!toast) return;
    if (toastMsg) toastMsg.textContent = message;
    toast.classList.add('show');
    clearTimeout(toastTimer);
    toastTimer = setTimeout(() => toast.classList.remove('show'), 2200);
  };

  const copyEmailBtn = document.getElementById('copyEmail');
  if (copyEmailBtn) {
    copyEmailBtn.addEventListener('click', async () => {
      try {
        await navigator.clipboard.writeText(email);
        showToast('E-mail copiado');
      } catch {
        showToast('Não foi possível copiar');
      }
    });
  }

  const bars = document.querySelectorAll('.lang-bar span');
  const fillBars = () => {
    bars.forEach((bar) => {
      bar.style.width = (bar.dataset.level || 0) + '%';
    });
  };

  if (reducedMotion) {
    fillBars();
    document.querySelectorAll('[data-animate]').forEach((el) => el.classList.add('visible'));
    return;
  }

  const reveal = document.querySelectorAll('[data-animate]');
  const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (!entry.isIntersecting) return;
      entry.target.classList.add('visible');
      observer.unobserve(entry.target);
    });
  }, { threshold: 0.16, rootMargin: '0px 0px -32px 0px' });

  reveal.forEach((el) => observer.observe(el));

  const langBlock = document.getElementById('idiomas');
  if (langBlock) {
    const langObserver = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (!entry.isIntersecting) return;
        fillBars();
        langObserver.unobserve(entry.target);
      });
    }, { threshold: 0.3 });
    langObserver.observe(langBlock);
  }
});
