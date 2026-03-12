document.addEventListener('DOMContentLoaded', () => {
    
    // --- 1. Анимация появления блоков при скролле (Intersection Observer) ---
    const observerOptions = {
        root: null,
        rootMargin: '0px',
        threshold: 0.15
    };

    const observer = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
                observer.unobserve(entry.target); // Анимируем только один раз
            }
        });
    }, observerOptions);

    document.querySelectorAll('.container').forEach(container => {
        observer.observe(container);
    });

    // --- 2. Логика переключения тем (Светлая строгая <-> Яркая) ---
    const themeToggleBtn = document.getElementById('theme-toggle');
    const themeStyleLink = document.getElementById('theme-style');

    // Проверяем, сохранял ли пользователь тему ранее (в браузере)
    const currentSavedTheme = localStorage.getItem('portfolio-theme') || 'style.css';
    themeStyleLink.setAttribute('href', currentSavedTheme);

    themeToggleBtn.addEventListener('click', () => {
        // Получаем текущий файл стилей
        const currentTheme = themeStyleLink.getAttribute('href');
        
        // Меняем на противоположный
        const newTheme = currentTheme === 'style.css' ? 'style-vibrant.css' : 'style.css';
        
        // Применяем и сохраняем
        themeStyleLink.setAttribute('href', newTheme);
        localStorage.setItem('portfolio-theme', newTheme);
    });
});