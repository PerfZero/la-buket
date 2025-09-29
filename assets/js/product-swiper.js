document.addEventListener('DOMContentLoaded', function() {
    const productSwiper = new Swiper('.product-swiper', {
        spaceBetween: 10,
        navigation: {
            nextEl: '.swiper-button-next',
            prevEl: '.swiper-button-prev',
        },
        thumbs: {
            swiper: {
                el: '.product-thumbs',
                slidesPerView: 6,
                spaceBetween: 10,
            },
        },
    });

    const productThumbs = new Swiper('.product-thumbs', {
        spaceBetween: 10,
        slidesPerView: 6,
        freeMode: true,
        watchSlidesProgress: true,
    });

    productSwiper.controller.control = productThumbs;
    productThumbs.controller.control = productSwiper;
});

