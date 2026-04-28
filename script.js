document.addEventListener('DOMContentLoaded', () => {
    initAnimations();
    initCarousel();
    initMenu();
});

// === 1. ANIMAZIONI & HERO ===
function initAnimations() {
    // Hero opacità
    const hero = document.querySelector(".hero");
    if (hero) {
        window.addEventListener("load", () => {
            hero.style.opacity = 1;
        });
    }

    // Fade-up Observer
    const faders = document.querySelectorAll('.fade-up');
    if (faders.length === 0) return;

    const observer = new IntersectionObserver(entries => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
                observer.unobserve(entry.target); // Ottimizzazione: smette di osservare dopo l'animazione
            }
        });
    });

    faders.forEach(el => observer.observe(el));
}

// === 2. CAROSELLO ===
function initCarousel() {
    const track = document.getElementById('carouselTrack');
    const carouselWrapper = document.querySelector('.carousel-wrapper');
    
    // Controllo di sicurezza: se non c'è il carosello in questa pagina, interrompi la funzione
    if (!track || !carouselWrapper) return; 

    const slides = document.querySelectorAll('.carousel-slide');
    const prevBtn = document.getElementById('prevBtn');
    const nextBtn = document.getElementById('nextBtn');
    const dotsContainer = document.getElementById('dotsContainer');

    let currentIndex = 0;
    const totalSlides = slides.length;

    // Crea i pallini
    slides.forEach((_, index) => {
        const dot = document.createElement('div');
        dot.classList.add('dot');
        if (index === 0) dot.classList.add('active');
        dot.addEventListener('click', () => goToSlide(index));
        if (dotsContainer) dotsContainer.appendChild(dot);
    });

    const dots = document.querySelectorAll('.dot');

    function updateCarousel() {
        track.style.transform = `translateX(-${currentIndex * 100}%)`;
        dots.forEach((dot, index) => {
            dot.classList.toggle('active', index === currentIndex);
        });
    }

    function goToSlide(index) {
        currentIndex = index;
        updateCarousel();
    }

    function nextSlide() {
        currentIndex = (currentIndex + 1) % totalSlides;
        updateCarousel();
    }

    function prevSlide() {
        currentIndex = (currentIndex - 1 + totalSlides) % totalSlides;
        updateCarousel();
    }

    if (prevBtn) prevBtn.addEventListener('click', prevSlide);
    if (nextBtn) nextBtn.addEventListener('click', nextSlide);

    // Auto-play
    let autoPlay = setInterval(nextSlide, 4000);

    carouselWrapper.addEventListener('mouseenter', () => clearInterval(autoPlay));
    carouselWrapper.addEventListener('mouseleave', () => autoPlay = setInterval(nextSlide, 5000));

    // Touch per mobile
    let startX = 0;
    let endX = 0;

    carouselWrapper.addEventListener('touchstart', (e) => {
        startX = e.touches[0].clientX;
    });

    carouselWrapper.addEventListener('touchend', (e) => {
        endX = e.changedTouches[0].clientX;
        if (startX - endX > 50) nextSlide();
        if (endX - startX > 50) prevSlide();
    });
}

// === 3. MENU HAMBURGER ===
function initMenu() {
    const hamburger = document.getElementById('hamburger');
    const nav = document.querySelector('.navbar nav'); // Assicurati che il selettore corrisponda al tuo HTML

    // Controllo di sicurezza
    if (!hamburger || !nav) return;

    hamburger.addEventListener('click', () => {
        nav.classList.toggle('active');
        hamburger.classList.toggle('toggle'); // Utile per animare l'icona a "X"
    });

    // Chiude il menu quando si clicca su un link (utile su mobile)
    const navLinks = document.querySelectorAll('.navbar nav a');
    navLinks.forEach(link => {
        link.addEventListener('click', () => {
            nav.classList.remove('active');
            hamburger.classList.remove('toggle');
        });
    });
}
