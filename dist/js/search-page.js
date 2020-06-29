$(document).ready(function () {
    var isMobileDevice = $('body').hasClass('mobile');

    function slickToursSliders() {
        $('.js-tours-carousel').each(function () {
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
                responsive: isMobileDevice ? [{
                    breakpoint: 1200,
                    settings: {
                        slidesToShow: 2,
                        slidesToScroll: 2
                    }
                }, {
                    breakpoint: 768,
                    settings: {
                        slidesToShow: 1,
                        slidesToScroll: 1,
                        dots: true
                    }
                }] : ''
            });
        });
    }

    slickToursSliders();

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
                responsive: isMobileDevice ? [{
                    breakpoint: 1200,
                    settings: {
                        slidesToShow: 4,
                        slidesToScroll: 4,
                    }
                }, {
                    breakpoint: 960,
                    settings: {
                        slidesToShow: 3,
                        slidesToScroll: 3
                    }
                }, {
                    breakpoint: 768,
                    settings: {
                        rows: 2,
                        slidesToShow: 2,
                        slidesToScroll: 2
                    }
                }] : ''
            });
        });
    }

    slickStandartSliders();


});