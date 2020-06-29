$(document).ready(function () {
    function slickStandartSliders() {
        $('.js-standart-slick-slider').each(function () {
            var slider = $(this);
            slider.slick({
                infinite: true,
                slidesToShow: 4,
                slidesToScroll: 4,
                dots: true,
                appendArrows: slider.parent().find('.slick-navigation'),
                appendDots: slider.parent().find('.js-dots'),
                responsive: [{breakpoint: 1200, settings: {slidesToShow: 4, slidesToScroll: 4,}}, {
                    breakpoint: 960,
                    settings: {slidesToShow: 3, slidesToScroll: 3,}
                }, {breakpoint: 768, settings: {rows: 2, slidesToShow: 2, slidesToScroll: 2,}},],
            });
        });
    }

    slickStandartSliders();

    function slickHotelsSliders() {
        $('.js-hotels-slider').each(function () {
            var slider = $(this);
            slider.slick({
                slide: '.slick-carousel-item',
                infinite: true,
                slidesToShow: 4,
                slidesToScroll: 4,
                rows: 0,
                dots: true,
                appendArrows: slider.parent().find('.slick-navigation'),
                appendDots: slider.parent().find('.js-dots'),
                responsive: [{breakpoint: 1200, settings: {slidesToShow: 2, slidesToScroll: 2,}}, {
                    breakpoint: 768,
                    settings: {slidesToShow: 1, slidesToScroll: 1, dots: true}
                },],
            });
        });
    }

    slickHotelsSliders();

    function slickReviewsSliders() {
        $('.js-reviews-slider').each(function () {
            var slider = $(this);
            slider.slick({
                slide: '.slick-carousel-item',
                infinite: true,
                slidesToShow: 3,
                slidesToScroll: 3,
                rows: 0,
                dots: true,
                arrows: true,
                appendArrows: slider.parent().find('.slick-navigation'),
                appendDots: slider.parent().find('.js-dots'),
                responsive: [{breakpoint: 1200, settings: {slidesToShow: 2, slidesToScroll: 2,}}, {
                    breakpoint: 768,
                    settings: {slidesToShow: 1, slidesToScroll: 1, dots: true}
                },],
            });
        });
    }

    slickReviewsSliders();
});