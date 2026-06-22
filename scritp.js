/* HERO ANIMATE-IN */
window.addEventListener('load', () => {
    document.querySelectorAll('.animate-in').forEach((el, i) => {
        setTimeout(() => el.classList.add('on'), 180 + i * 270);
    });
});

/* BACKGROUND PARTICLES */
(() => {
    const wrap = document.getElementById('particles');
    const cols = ['#d4af37', '#f3da9f', '#8a2538', '#faf3e6', '#a8842a'];
    for (let i = 0; i < 22; i++) {
        const p = document.createElement('div');
        p.className = 'particle';
        const s = Math.random() * 6 + 3;
        p.style.cssText = `width:${s}px;height:${s}px;left:${Math.random() * 100}%;background:${cols[~~(Math.random() * cols.length)]};animation-duration:${Math.random() * 10 + 8}s;animation-delay:${Math.random() * 7}s;`;
        wrap.appendChild(p);
    }
})();

/* CONFETTI BURST */
function burst(el, count = 50) {
    const cols = ['#d4af37', '#f3da9f', '#fff', '#8a2538', '#a8842a'];
    for (let i = 0; i < count; i++) {
        const p = document.createElement('div');
        p.className = 'cp';
        const s = Math.random() * 7 + 4;
        p.style.cssText = `left:${Math.random() * 100}%;top:${Math.random() * 20}%;background:${cols[~~(Math.random() * cols.length)]};width:${s}px;height:${s}px;border-radius:${Math.random() > 0.5 ? '50%' : '2px'};animation-duration:${Math.random() * 2 + 1.4}s;animation-delay:${Math.random() * 0.5}s;`;
        el.appendChild(p);
        setTimeout(() => p.remove(), 3800);
    }
}

/* UNBUCKLE THE BELT */
const buckle = document.getElementById('buckle');
const beltWrap = document.getElementById('beltWrap');
const wishBox = document.getElementById('wishBox');
let unlocked = false;

function unbuckle() {
    if (unlocked) return;
    unlocked = true;

    buckle.classList.add('unlocked');
    document.querySelectorAll('.belt-strap').forEach((s) => s.classList.add('undone'));

    setTimeout(() => {
        burst(beltWrap, 55);
        setTimeout(() => {
            wishBox.classList.add('on');
        }, 300);
    }, 500);
}

buckle.addEventListener('click', unbuckle);
buckle.addEventListener('touchend', (e) => { e.preventDefault(); unbuckle(); }, { passive: false });

/* SCROLL REVEAL */
const ro = new IntersectionObserver((ens) => {
    ens.forEach((e) => { if (e.isIntersecting) e.target.classList.add('on'); });
}, { threshold: 0.1 });
document.querySelectorAll('.reveal').forEach((el) => ro.observe(el));

/* FOOTER CONFETTI */
const fo = new IntersectionObserver((ens) => {
    if (ens[0].isIntersecting) {
        burst(document.getElementById('fc'), 50);
        fo.disconnect();
    }
}, { threshold: 0.25 });
fo.observe(document.querySelector('.footer'));

/* SPARKLE CLICK ON PHOTOS */
const ks = document.createElement('style');
ks.textContent = '@keyframes hUp{0%{opacity:1;transform:translate(-50%,-50%) scale(1);}100%{opacity:0;transform:translate(-50%,-240%) scale(1.7);}}';
document.head.appendChild(ks);
document.querySelectorAll('.photo-card').forEach((card) => {
    card.addEventListener('click', (e) => {
        const h = document.createElement('span');
        h.textContent = ['🏆', '✦', '🥊', '🏀', '⭐'][~~(Math.random() * 5)];
        h.style.cssText = `position:absolute;font-size:1.4rem;pointer-events:none;left:${e.offsetX}px;top:${e.offsetY}px;transform:translate(-50%,-50%);animation:hUp 1.1s ease forwards;z-index:99;`;
        card.appendChild(h);
        setTimeout(() => h.remove(), 1100);
    });
});

/* PARALLAX HERO (desktop only) */
if (window.innerWidth > 600) {
    window.addEventListener('scroll', () => {
        const hc = document.querySelector('.hero-content');
        const y = window.scrollY;
        if (y < window.innerHeight) {
            hc.style.transform = `translateY(${y * 0.28}px)`;
            hc.style.opacity = Math.max(0, 1 - y / (window.innerHeight * 0.78));
        }
    }, { passive: true });
}