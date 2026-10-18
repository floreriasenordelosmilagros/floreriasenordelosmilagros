/* Florería Señor de los Milagros — interacciones */
document.addEventListener('DOMContentLoaded', () => {

    const WHATSAPP = '51988796986';

    /* ---------- Menú de celular ---------- */
    const toggle = document.querySelector('.menu-toggle');
    const menu = document.querySelector('.nav-links');
    if (toggle && menu) {
        toggle.addEventListener('click', () => {
            const abierto = menu.classList.toggle('abierto');
            toggle.setAttribute('aria-expanded', abierto);
        });
        menu.querySelectorAll('a').forEach(a => a.addEventListener('click', () => {
            menu.classList.remove('abierto');
            toggle.setAttribute('aria-expanded', 'false');
        }));
    }

    /* ---------- Sombra en la barra al bajar ---------- */
    const navbar = document.querySelector('.navbar');
    const sombra = () => navbar && navbar.classList.toggle('con-sombra', window.scrollY > 10);
    window.addEventListener('scroll', sombra, { passive: true });
    sombra();

    /* ---------- Año automático en el pie ---------- */
    document.querySelectorAll('.anio').forEach(el => el.textContent = new Date().getFullYear());

    /* ---------- Aparición suave al hacer scroll ---------- */
    const elementos = document.querySelectorAll('.revelar');
    if ('IntersectionObserver' in window) {
        const obs = new IntersectionObserver((entradas) => {
            entradas.forEach(e => {
                if (e.isIntersecting) {
                    e.target.classList.add('visible');
                    obs.unobserve(e.target);
                }
            });
        }, { threshold: 0.12, rootMargin: '0px 0px -40px 0px' });
        elementos.forEach((el, i) => {
            el.style.transitionDelay = (el.dataset.retraso || 0) + 'ms';
            obs.observe(el);
        });
    } else {
        elementos.forEach(el => el.classList.add('visible'));
    }

    /* ---------- Visor de fotos (galerías) ---------- */
    const items = Array.from(document.querySelectorAll('.foto-item'));
    const visor = document.querySelector('.visor');
    if (!items.length || !visor) return;

    const imgVisor = visor.querySelector('img');
    const contador = visor.querySelector('.visor-contador');
    const pedir = visor.querySelector('.visor-pedir');
    let actual = 0;
    let ultimoFoco = null;

    const mostrar = (i) => {
        actual = (i + items.length) % items.length;
        const item = items[actual];
        const img = item.querySelector('img');
        imgVisor.src = img.src;
        imgVisor.alt = img.alt;
        contador.textContent = `Código ${item.dataset.codigo} · ${actual + 1} de ${items.length}`;
        // El mismo enlace del botón de la foto: pregunta + código + link con la imagen
        pedir.href = item.querySelector('.foto-precio').href;
    };

    const abrir = (i) => {
        ultimoFoco = document.activeElement;
        mostrar(i);
        visor.classList.add('abierto');
        visor.setAttribute('aria-hidden', 'false');
        document.body.style.overflow = 'hidden';
        visor.querySelector('.visor-cerrar').focus();
    };

    const cerrar = () => {
        visor.classList.remove('abierto');
        visor.setAttribute('aria-hidden', 'true');
        document.body.style.overflow = '';
        if (ultimoFoco) ultimoFoco.focus();
    };

    items.forEach((it, i) => it.querySelector('.foto-card').addEventListener('click', () => abrir(i)));
    visor.querySelector('.visor-cerrar').addEventListener('click', cerrar);
    visor.querySelector('.visor-prev').addEventListener('click', () => mostrar(actual - 1));
    visor.querySelector('.visor-next').addEventListener('click', () => mostrar(actual + 1));
    visor.addEventListener('click', (e) => { if (e.target === visor) cerrar(); });

    document.addEventListener('keydown', (e) => {
        if (!visor.classList.contains('abierto')) return;
        if (e.key === 'Escape') cerrar();
        if (e.key === 'ArrowLeft') mostrar(actual - 1);
        if (e.key === 'ArrowRight') mostrar(actual + 1);
    });

    /* Deslizar con el dedo en celular */
    let inicioX = null;
    visor.addEventListener('touchstart', (e) => { inicioX = e.touches[0].clientX; }, { passive: true });
    visor.addEventListener('touchend', (e) => {
        if (inicioX === null) return;
        const dif = e.changedTouches[0].clientX - inicioX;
        if (Math.abs(dif) > 50) mostrar(actual + (dif < 0 ? 1 : -1));
        inicioX = null;
    });
});
