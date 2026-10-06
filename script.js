document.addEventListener('DOMContentLoaded', () => {

    /* ===== Переключение вкладок каталога ===== */
    const tabButtons = document.querySelectorAll('.tab-btn');
    const tabPanes = document.querySelectorAll('.tab-pane');

    tabButtons.forEach(btn => {
        btn.addEventListener('click', () => {
            tabButtons.forEach(b => b.classList.remove('active'));
            tabPanes.forEach(p => p.classList.remove('active'));

            btn.classList.add('active');
            const target = document.getElementById(btn.dataset.tab);
            if (target) target.classList.add('active');
        });
    });

    /* ===== Слайдер акций ===== */
    const track = document.getElementById('sliderTrack');
    const slides = track.querySelectorAll('.slide');
    const prevBtn = document.getElementById('prevBtn');
    const nextBtn = document.getElementById('nextBtn');
    const dotsContainer = document.getElementById('sliderDots');

    let currentSlide = 0;
    const totalSlides = slides.length;

    // Создаём точки
    slides.forEach((_, i) => {
        const dot = document.createElement('span');
        if (i === 0) dot.classList.add('active');
        dot.addEventListener('click', () => goToSlide(i));
        dotsContainer.appendChild(dot);
    });

    const dots = dotsContainer.querySelectorAll('span');

    function goToSlide(index) {
        currentSlide = (index + totalSlides) % totalSlides;
        track.style.transform = `translateX(-${currentSlide * 100}%)`;
        dots.forEach((d, i) => d.classList.toggle('active', i === currentSlide));
    }

    prevBtn.addEventListener('click', () => goToSlide(currentSlide - 1));
    nextBtn.addEventListener('click', () => goToSlide(currentSlide + 1));

    // Автопрокрутка каждые 5 секунд
    setInterval(() => goToSlide(currentSlide + 1), 5000);

    /* ===== Слайдер отзывов ===== */
    const testimonialCards = document.querySelectorAll('.testimonial-card');
    const testimonialDots = document.getElementById('testimonialDots');

    let currentTestimonial = 0;
    const totalTestimonials = testimonialCards.length;

    testimonialCards.forEach((_, i) => {
        const dot = document.createElement('span');
        if (i === 0) dot.classList.add('active');
        dot.addEventListener('click', () => showTestimonial(i));
        testimonialDots.appendChild(dot);
    });

    const tDots = testimonialDots.querySelectorAll('span');

    function showTestimonial(index) {
        currentTestimonial = (index + totalTestimonials) % totalTestimonials;
        testimonialCards.forEach((card, i) => {
            card.classList.toggle('active', i === currentTestimonial);
        });
        tDots.forEach((d, i) => d.classList.toggle('active', i === currentTestimonial));
    }

    // Автопрокрутка отзывов каждые 4 секунды
    setInterval(() => showTestimonial(currentTestimonial + 1), 4000);

    /* ===== Форма обратной связи ===== */
    const form = document.getElementById('feedbackForm');
    const status = document.getElementById('formStatus');

    form.addEventListener('submit', (e) => {
        e.preventDefault();

        const name = document.getElementById('userName').value.trim();
        const phone = document.getElementById('userPhone').value.trim();

        if (!name || !phone) {
            status.textContent = 'Пожалуйста, заполните имя и телефон.';
            status.style.color = '#e74c3c';
            return;
        }

        status.textContent = `Спасибо, ${name}! Мы свяжемся с вами по номеру ${phone}.`;
        status.style.color = '#27ae60';
        form.reset();

        // Сброс сообщения через 5 секунд
        setTimeout(() => {
            status.textContent = '';
        }, 5000);
    });

    /* ===== Плавная прокрутка по якорям ===== */
    document.querySelectorAll('a[href^="#"]').forEach(link => {
        link.addEventListener('click', (e) => {
            e.preventDefault();
            const target = document.querySelector(link.getAttribute('href'));
            if (target) {
                target.scrollIntoView({ behavior: 'smooth' });
            }
        });
    });

    console.log('Сайт «Огонь Вода» загружен ✅');
});