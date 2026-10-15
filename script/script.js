document.addEventListener("DOMContentLoaded", () => {
    // Seleccionamos las secciones que queremos animar al hacer scroll
    const secciones = document.querySelectorAll('.services, .about');

    const cargarSeccion = (entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
                observer.unobserve(entry.target); // Deja de observar una vez ejecutado
            }
        });
    };

    const observer = new IntersectionObserver(cargarSeccion, {
        root: null,
        threshold: 0.1 // Se activa cuando se asoma el 10% de la sección
    });

    secciones.forEach(seccion => {
        // Preparación inicial oculta para una animación sutil
        seccion.style.opacity = '0';
        seccion.style.transform = 'translateY(20px)'; 
        seccion.style.transition = 'opacity 0.8s ease-out, transform 0.8s ease-out';
        seccion.style.willChange = 'opacity, transform'; // Optimiza el rendimiento en el móvil
        observer.observe(seccion);
    });
});
