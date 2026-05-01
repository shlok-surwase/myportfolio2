/* ===== CURSOR ===== */
const cursor = document.getElementById('cursor');
document.addEventListener('mousemove', e => {
  cursor.style.left = e.clientX + 'px';
  cursor.style.top = e.clientY + 'px';
});
document.querySelectorAll('a,button,.cert-row,.gal-item,.project-btn,.chip').forEach(el => {
  el.addEventListener('mouseenter', () => document.body.classList.add('cursor-big'));
  el.addEventListener('mouseleave', () => document.body.classList.remove('cursor-big'));
});

/* ===== MAGNETIC HERO PHOTO ===== */
const heroPhoto = document.getElementById('heroPhoto');
if(heroPhoto){
  document.addEventListener('mousemove', e => {
    const rect = heroPhoto.getBoundingClientRect();
    const cx = rect.left + rect.width/2;
    const cy = rect.top + rect.height/2;
    const dx = (e.clientX - cx) / window.innerWidth * 18;
    const dy = (e.clientY - cy) / window.innerHeight * 18;
    heroPhoto.style.transform = `translate(${dx}px,${dy}px) scale(1.03)`;
  });
  document.addEventListener('mouseleave', () => {
    heroPhoto.style.transform = '';
  });
}

/* ===== MENU OVERLAY ===== */
const menuOverlay = document.getElementById('menuOverlay');
const menuImg = document.getElementById('menuImg');
const menuCaption = document.getElementById('menuCaption');

const menuData = {
  home:     { img: './assets/profile2.png', cap: 'BBA Student & Aspiring Data Analyst' },
  about:    { img: './assets/profile.jpg',  cap: 'Passionate about crafting data-driven decisions' },
  projects: { img: './assets/project-roseai.png', cap: 'Featured Project: RoseAI' },
  achievements: { img: './assets/cert-cisco.jpg', cap: 'Cisco Netacad — Introduction to Modern AI' },
  contact:  { img: './assets/profile2.png', cap: "Let's build something together" },
};

function toggleMenu(){
  menuOverlay.classList.toggle('open');
}
function goTo(id){
  toggleMenu();
  setTimeout(()=>{
    document.getElementById(id)?.scrollIntoView({behavior:'smooth'});
  }, 400);
}

// Change menu image on hover
document.querySelectorAll('.menu-links a').forEach(a => {
  a.addEventListener('mouseenter', () => {
    const href = a.getAttribute('href').replace('#','');
    if(menuData[href]){
      menuImg.style.opacity = '0';
      setTimeout(()=>{
        menuImg.src = menuData[href].img;
        menuCaption.textContent = menuData[href].cap;
        menuImg.style.opacity = '1';
      }, 200);
    }
  });
});
menuImg.style.transition = 'opacity .3s';

// Close on Escape
document.addEventListener('keydown', e => {
  if(e.key === 'Escape'){
    menuOverlay.classList.remove('open');
    closeCert();
  }
});

/* ===== SCROLL REVEAL ===== */
const reveals = document.querySelectorAll('.reveal');
const ro = new IntersectionObserver(entries => {
  entries.forEach(e => { if(e.isIntersecting) e.target.classList.add('visible'); });
}, { threshold: 0.1, rootMargin: '0px 0px -50px 0px' });
reveals.forEach(el => ro.observe(el));

/* ===== ADD REVEAL CLASSES DYNAMICALLY ===== */
const revealTargets = [
  '.about-wrap > *',
  '.project-row',
  '.archive-box',
  '.cert-row',
  '.gal-item',
  '.contact-wrap > *',
  '.achievements-left',
  '.projects-intro',
];
revealTargets.forEach(sel => {
  document.querySelectorAll(sel).forEach((el, i) => {
    el.classList.add('reveal');
    if(i===1) el.classList.add('reveal-d1');
    if(i===2) el.classList.add('reveal-d2');
    ro.observe(el);
  });
});

/* ===== HERO TEXT REVEAL on load ===== */
window.addEventListener('load', () => {
  document.querySelectorAll('.hero-line, .hero-img-wrap, .hero-tagline, .hero-scroll-hint').forEach((el, i) => {
    el.style.opacity = '0';
    el.style.transform = 'translateY(40px)';
    el.style.transition = 'opacity .9s ease, transform .9s ease';
    setTimeout(() => {
      el.style.opacity = '1';
      el.style.transform = 'translateY(0)';
    }, 200 + i * 180);
  });
});

/* ===== NAVBAR SCROLL ===== */
const nav = document.getElementById('nav');
window.addEventListener('scroll', () => {
  if(window.scrollY > 60){
    nav.style.backdropFilter = 'blur(16px)';
    nav.style.background = 'rgba(250,250,248,0.88)';
    nav.style.borderBottom = '1px solid rgba(0,0,0,0.07)';
  } else {
    nav.style.backdropFilter = '';
    nav.style.background = '';
    nav.style.borderBottom = '';
  }
});

/* ===== CERT LIGHTBOX ===== */
function openCert(src, caption){
  const lb = document.getElementById('lightbox');
  document.getElementById('lbImg').src = src;
  document.getElementById('lbCaption').textContent = caption || '';
  lb.classList.add('open');
  document.body.style.overflow = 'hidden';
}
function closeCert(){
  document.getElementById('lightbox').classList.remove('open');
  document.body.style.overflow = '';
}

/* ===== CONTACT CHIPS ===== */
function setChip(btn, text){
  document.querySelectorAll('.chip').forEach(c => c.classList.remove('active'));
  btn.classList.add('active');
  const email = 'gmail.surwaseshlok@gmail.com';
  const sub = encodeURIComponent(text + ' — Shlok Surwase Portfolio');
  window.location.href = `mailto:${email}?subject=${sub}`;
}

/* ===== COPY EMAIL ===== */
function copyEmail(){
  navigator.clipboard.writeText('gmail.surwaseshlok@gmail.com').then(()=>{
    const note = document.getElementById('copyNote');
    note.textContent = '✓ Copied to clipboard!';
    setTimeout(()=>{ note.textContent=''; }, 3000);
  });
}

/* ===== SMOOTH UNDERLINE on hero text ===== */
document.querySelectorAll('.hero-line').forEach(el => {
  el.addEventListener('mouseenter', () => {
    el.style.textDecoration = 'underline';
    el.style.textDecorationThickness = '3px';
    el.style.textUnderlineOffset = '8px';
  });
  el.addEventListener('mouseleave', () => {
    el.style.textDecoration = '';
  });
});
