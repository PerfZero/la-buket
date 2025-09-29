document.addEventListener('DOMContentLoaded', function() {
    const burgerMenu = document.getElementById('burger-menu');
    const mobileMenu = document.getElementById('mobile-menu');
    const closeMenu = document.getElementById('close-menu');
    const overlay = document.querySelector('.mobile-menu__overlay');

    if (burgerMenu && mobileMenu) {
        burgerMenu.addEventListener('click', function() {
            mobileMenu.classList.add('active');
            document.body.style.overflow = 'hidden';
        });
    }

    if (closeMenu && mobileMenu) {
        closeMenu.addEventListener('click', function() {
            mobileMenu.classList.remove('active');
            document.body.style.overflow = '';
        });
    }

    if (overlay && mobileMenu) {
        overlay.addEventListener('click', function() {
            mobileMenu.classList.remove('active');
            document.body.style.overflow = '';
        });
    }

    const mobileMenuItems = document.querySelectorAll('.mobile-menu__item');
    
    mobileMenuItems.forEach(item => {
        const link = item.querySelector('.mobile-menu__link');
        const sublist = item.querySelector('.mobile-menu__sublist');
        
        if (sublist && link) {
            link.addEventListener('click', function(e) {
                e.preventDefault();
                item.classList.toggle('mobile-menu__item--expanded');
            });
        }
    });
});
