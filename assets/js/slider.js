document.addEventListener('DOMContentLoaded', () => {
    const heroSwiper = new Swiper('.hero__swiper', {
        loop: true,
        autoplay: {
            delay: 5000,
            disableOnInteraction: false,
        },
        pagination: {
            el: '.hero__pagination',
            clickable: true,
        },
        effect: 'fade',
        fadeEffect: {
            crossFade: true
        },
        speed: 1000,
    });

    const header = document.querySelector('.header');
    
    window.addEventListener('scroll', () => {
        if (window.scrollY > 100) {
            header.classList.add('header--scrolled');
        } else {
            header.classList.remove('header--scrolled');
        }
    });

    // Dropdown menu functionality
    const dropdownItems = document.querySelectorAll('.header__item--dropdown');
    
    dropdownItems.forEach(item => {
        const link = item.querySelector('.header__link');
        const dropdown = item.querySelector('.header__dropdown');
        
        link.addEventListener('click', (e) => {
            e.preventDefault();
            dropdown.classList.toggle('header__dropdown--active');
            link.classList.toggle('header__link--active');
        });
        
        // Close dropdown when clicking outside
        document.addEventListener('click', (e) => {
            if (!item.contains(e.target)) {
                dropdown.classList.remove('header__dropdown--active');
                link.classList.remove('header__link--active');
            }
        });
    });
});
