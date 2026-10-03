(() => {
  'use strict';
  const $ = (s, c = document) => c.querySelector(s);
  const $$ = (s, c = document) => [...c.querySelectorAll(s)];
  const reduce = matchMedia('(prefers-reduced-motion: reduce)').matches;

  const projects = {
    'website-deals': {
      title: 'Website Deals', category: 'Marketplace and client websites',
      role: 'UI Designer & Partner', tools: 'Figma', status: 'Full case study coming soon',
      image: 'assets/project-01.jpg',
      about: 'As a partner at Website Deals, I design website layouts, UI screens and interactive prototypes in Figma for clients. I also co-manage the marketplace, project delivery and client communication.'
    },
    'client-website': {
      title: 'Client website design', category: 'Web design and prototyping',
      role: 'UI Designer', tools: 'Figma', status: 'Full case study coming soon',
      image: 'assets/project-02.jpg',
      about: 'I work directly with clients to understand what they need, then turn it into clear, user-friendly layouts and clickable prototypes they can review before development.'
    },
    'masters': {
      title: 'MA UX Design projects', category: 'User research and usability testing',
      role: 'Student', tools: 'Figma', status: 'Projects added as the course progresses',
      image: 'assets/project-03.jpg',
      about: 'I am studying for a Master\'s degree in UX Design at the London School of Design and Marketing (2026 to 2027). Research, wireframing and usability testing projects will appear here.'
    }
  };

  /* Loader */
  const ready = () => setTimeout(() => document.body.classList.add('page-ready'), 250);
  document.readyState === 'complete' ? ready() : addEventListener('load', ready);

  $('#year').textContent = new Date().getFullYear();

  /* Missing images: keep the soft colour block instead of a broken icon */
  $$('img').forEach(img => {
    const hide = () => { img.style.display = 'none'; };
    if (img.complete && img.naturalWidth === 0 && img.getAttribute('src')) hide();
    img.addEventListener('error', hide);
  });

  /* Mobile menu */
  const btn = $('.menu-btn'), nav = $('#navLinks');
  const setMenu = open => {
    btn.classList.toggle('open', open); nav.classList.toggle('open', open);
    btn.setAttribute('aria-expanded', String(open));
    btn.setAttribute('aria-label', open ? 'Close menu' : 'Open menu');
  };
  btn.addEventListener('click', () => setMenu(!nav.classList.contains('open')));
  $$('.nav-links a').forEach(a => a.addEventListener('click', () => setMenu(false)));

  /* Header and progress */
  const header = $('.site-header'), bar = $('.scroll-progress span');
  let last = scrollY;
  const onScroll = () => {
    const y = scrollY, max = document.documentElement.scrollHeight - innerHeight;
    header.classList.toggle('scrolled', y > 30);
    header.classList.toggle('nav-hidden', y > 180 && y > last && !nav.classList.contains('open'));
    bar.style.width = (max > 0 ? Math.min(100, y / max * 100) : 0) + '%';
    last = y;
  };
  addEventListener('scroll', onScroll, { passive: true }); onScroll();

  /* Reveal */
  const items = $$('.reveal');
  if ('IntersectionObserver' in window) {
    const io = new IntersectionObserver(es => es.forEach(e => {
      if (e.isIntersecting) { e.target.classList.add('visible'); io.unobserve(e.target); }
    }), { threshold: .12, rootMargin: '0px 0px -40px 0px' });
    items.forEach(i => io.observe(i));
  } else items.forEach(i => i.classList.add('visible'));

  /* Active nav link */
  const links = $$('.nav-links a[href^="#"]');
  if ('IntersectionObserver' in window) {
    const so = new IntersectionObserver(es => es.forEach(e => {
      if (e.isIntersecting) links.forEach(l => l.classList.toggle('active', l.getAttribute('href') === '#' + e.target.id));
    }), { rootMargin: '-25% 0px -55% 0px' });
    $$('main section[id]').forEach(s => so.observe(s));
  }

  /* Case modal */
  const modal = $('#caseModal'), dialog = $('.case-dialog'), img = $('#caseImage');
  let opener = null;
  const open = (key, trigger) => {
    const d = projects[key]; if (!d) return;
    opener = trigger;
    img.style.display = ''; img.src = d.image; img.alt = '';
    $('#caseTitle').textContent = d.title; $('#caseCategory').textContent = d.category;
    $('#caseRole').textContent = d.role; $('#caseTools').textContent = d.tools;
    $('#caseStatus').textContent = d.status; $('#caseAbout').textContent = d.about;
    modal.classList.add('open'); modal.setAttribute('aria-hidden', 'false');
    document.body.classList.add('modal-open'); dialog.scrollTop = 0;
    setTimeout(() => $('.case-close').focus(), 300);
  };
  const close = () => {
    modal.classList.remove('open'); modal.setAttribute('aria-hidden', 'true');
    document.body.classList.remove('modal-open'); opener && opener.focus();
  };
  $$('[data-project]').forEach(t => t.addEventListener('click', () => open(t.dataset.project, t)));
  $$('[data-close]').forEach(t => t.addEventListener('click', close));
  addEventListener('keydown', e => {
    if (e.key !== 'Escape') return;
    if (modal.classList.contains('open')) close(); else setMenu(false);
  });
  addEventListener('resize', () => { if (innerWidth > 800) setMenu(false); });
})();
