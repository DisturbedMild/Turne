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
                appendDots: slider.parent().find('.js-dots')
            });
        });
    }

    slickStandartSliders();

    // function slickHotelsSliders() {
    //     $('.js-hotels-slider').each(function () {
    //         var slider = $(this);
    //         slider.slick({
    //             slide: '.slick-carousel-item',
    //             infinite: true,
    //             slidesToShow: 4,
    //             slidesToScroll: 4,
    //             rows: 0,
    //             dots: true,
    //             appendArrows: slider.parent().find('.slick-navigation'),
    //             appendDots: slider.parent().find('.js-dots')
    //         });
    //     });
    // }
    //
    // slickHotelsSliders();

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
                appendDots: slider.parent().find('.js-dots')
            });
        });
    }

    slickReviewsSliders();

    // function slickOperatorsHeaderSliders() {
    //     $('.js-operator-header-carousel').each(function () {
    //         var slider = $(this);
    //         slider.slick({
    //             slide: '.slick-carousel-item',
    //             rows: 0,
    //             infinite: true,
    //             slidesToShow: 3,
    //             slidesToScroll: 3,
    //             dots: false,
    //             arrows: true,
    //             //centerMode: true,
    //             //variableWidth: true
    //         });
    //     });
    // }
    //
    // slickOperatorsHeaderSliders();

});