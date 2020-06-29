$(function () {

    var isMobileDevice = $('body').hasClass('mobile');

    var sliderBig = $('.js-gallery-big').slick({
        slidesToShow: 1,
        arrows: true,
        rows: 0,
        infinite: true,
        swipeToSlide: true,
        speed: 100,
        asNavFor: '#galleryThumbnail'
    });

    var sliderThumbnail = $('.js-gallery-thumbnail').slick({
        slide: '.tour-gallery-nav__item',
        vertical: false,
        slidesToShow: 9,
        arrow: false,
        focusOnSelect: true,
        rows: 0,
        infinite: true,
        swipeToSlide: true,
        speed: 100,
        asNavFor: '#galleryBig'
    });

    $.ajax({
        method: "GET",
        url: "./js/image.json",
        dataType: 'json',
    }).done(function (jsonResponse) {
        sliderBig.data('json', jsonResponse);
        sliderThumbnail.data('json', jsonResponse);
        // if (jsonResponse.image.length) {
        //     $('.js-current-slide').text('1/' + jsonResponse.image.length).show();
        // }
    });


    var createSlides = function (slider, slick) {
        var slideData = slider.data('json');
        var slideClass = slider.hasClass('tour-gallery-slider') ? 'tour-gallery__item ' : 'tour-gallery-nav__item';
        slideData.image.forEach(function (item, index) {
            if (index > 8) {
                slider.slick('slickAdd', '<div class="' + slideClass + '" data-fancybox-index="' + index + '"><img class="lazyload" data-src="' + item.src + '"/></div>');
            }
        });
        slider.data('load', 'true');
    };
    sliderBig.on('afterChange', function (event, slick) {
        var slider = slick.$slider;
        var images = slider.data('json');
        // $('.js-current-slide').text(slick.slickCurrentSlide() + 1 + '/' + images.image.length);
        if (slick.slickCurrentSlide() === 8 && images && !slider.data('load')) {
            createSlides(slider, slick);
        }
    });
    sliderThumbnail.on('afterChange', function (event, slick) {
        var slider = slick.$slider;
        var images = slider.data('json');
        if (slick.slickCurrentSlide() === 8 && images && !slider.data('load')) {
            createSlides(slider, slick);
            slider.find('.tour-gallery-nav__old').removeClass('tour-gallery-nav__old');
        }
    });
    $(document).on('click', '.tour-gallery__item', function (e) {
        e.preventDefault();
        var $links = sliderBig.data('json');
        var index = $(this).data('fancybox-index');

        $.fancybox.open($links.image, {
            baseClass: "js-gallery-big-fancybox fancybox-horizontal-thumbs",
            arrows: true,
            toolbar: true,
            loop: true,
            thumbs: {
                autoStart: false,
                axis: isMobileDevice ? 'x' : 'y'
            },
            buttons: [
                "slideShow",
                "fullScreen",
                "thumbs",
                "close"
            ]
        }, index);
    });
    $(document).on('beforeShow.fb', function (e, instance, slide) {
        if ($(e.target).hasClass('js-gallery-big-fancybox')) {
            sliderBig.slick('slickGoTo', instance.currIndex, true);
        }
    });
    $(document).on('resize', function () {
        sliderThumbnail.refresh();
    });


    $('.jsTouristCommentReadMore').on('click', function (e) {
        e.preventDefault();
        $(this).parent().find(".jsTouristCommentAnnouncement").hide();
        $(this).hide()
    });

    $('.radial-progress-bar').on('click', function (e) {
        $(this).nextAll('.reviews-section__review-rating').show();
    });
    $(document).on('click', function (e) {
        if ($(window).width() <= 991 && $('.reviews-section__review-rating').is(':visible') && $(e.target).closest('.radial-progress-bar').length == 0) {
            $('.reviews-section__review-rating').hide();
        }
    });

    if (isMobileDevice) {
        function slickToursCarousel() {
            $('.js-detail-tours-carousel').each(function () {
                var slider = $(this);
                slider.slick({
                    slide: '.slick-carousel-item',
                    slidesToShow: 4,
                    slidesToScroll: 4,
                    arrows: true,
                    dots: false,
                    rows: 0,
                    infinite: false,
                    speed: 100,
                    appendArrows: slider.parent().find('.slick-navigation'),
                    //appendDots: slider.parent().find('.js-dots'),

                    responsive: [
                        {
                            breakpoint: 1199,
                            settings: {
                                slidesToShow: 3,
                                slidesToScroll: 3
                            }
                        }, {
                            breakpoint: 992,
                            settings: {
                                slidesToShow: 2,
                                slidesToScroll: 2
                            }
                        },
                        {
                            breakpoint: 576,
                            settings: {
                                slidesToShow: 1,
                                slidesToScroll: 1
                            }
                        }
                    ]
                });
            });
        }

        slickToursCarousel();

        function slickBusToursCarousel() {
            $('.js-detail-bus-tours-carousel').each(function () {
                var slider = $(this);
                slider.slick({
                    slide: '.slick-carousel-item',
                    slidesToShow: 4,
                    slidesToScroll: 4,
                    arrows: true,
                    dots: true,
                    rows: 0,
                    infinite: false,
                    speed: 100,
                    appendArrows: slider.parent().find('.slick-navigation'),
                    appendDots: slider.parent().find('.js-dots'),

                    responsive: [
                        {
                            breakpoint: 1199,
                            settings: {
                                slidesToShow: 3,
                                slidesToScroll: 3
                            }
                        }, {
                            breakpoint: 992,
                            settings: {
                                slidesToShow: 2,
                                slidesToScroll: 2
                            }
                        },
                        {
                            breakpoint: 576,
                            settings: {
                                slidesToShow: 1,
                                slidesToScroll: 1
                            }
                        }
                    ]
                });
            });
        }

        slickBusToursCarousel();

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
                    responsive: [{
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
                    }]
                });
            });
        }

        slickHotelsSliders();
    }

    function slickBuyTourliders() {
        $('.js-buy-tours-slider').each(function () {
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
                        slidesToShow: 3,
                        slidesToScroll: 3
                    }
                },{
                    breakpoint: 991,
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

    slickBuyTourliders();

    $('.buy-tour__title .jsDropDownItem').on('click', function () {
        $('body').removeClass('m-dropdown-open');
        enableScroll();
        $(this).parents('.b-dropdown').hide();
        $(this).parents('.custom-dropdown').find('.ellipsis-text').text($(this).text());
        var $slider = $('.js-buy-tours-slider');
        $slider.addClass('start-loading');
        $.ajax({
            method: "GET",
            url: "./js/response-by-tour.html",
            dataType: 'html',
        }).done(function (response) {
            $slider.slick('unslick');
            $slider.find('.slick-carousel-item').remove();
            $slider.append(response);
            slickBuyTourliders();
            $slider.removeClass('start-loading');
        });
    });




    function slickReviewsCarousel() {
        $('.js-detail-reviews-carousel').each(function () {
            var slider = $(this);
            slider.slick({
                slidesToShow: 5,
                slidesToScroll: 5,
                arrows: true,
                dots: true,
                rows: 0,
                infinite: false,
                speed: 100,
                appendArrows: slider.parent().find('.slick-navigation'),
                appendDots: slider.parent().find('.js-dots'),

                responsive: isMobileDevice ? [
                    {
                        breakpoint: 992,
                        settings: {
                            slidesToShow: 4,
                            slidesToScroll: 4
                        }
                    }, {
                        breakpoint: 768,
                        settings: {
                            slidesToShow: 3,
                            slidesToScroll: 3
                        }
                    },
                    {
                        breakpoint: 576,
                        settings: {
                            slidesToShow: 2,
                            slidesToScroll: 2
                        }
                    }
                ] : ''
            });
        });
    }

    slickReviewsCarousel();


    $('.js-adv-feedback-fancybox').fancybox({
        baseClass: 'fancybox-horizontal-thumbs',
        backFocus: false,
        loop: true,
        thumbs: {
            autoStart: false,
            axis: isMobileDevice ? 'x' : 'y'
        }
    });
    if (isMobileDevice) {
        var fixedButton = function () {
            var $buttonsOrder = $('.js-mobile-popup-order');
            var $topOffsetEl = $('.js-fixed-mobile-order-offset-top');
            var currentTopOffset = null;
            if($topOffsetEl.length > 1) {
                currentTopOffset = $topOffsetEl.eq(1).offset().top + 600;
            } else {
                currentTopOffset = $topOffsetEl.eq(0).offset().top + 150;
            }

            var $bottomOffsetEl = $('.js-fixed-mobile-order-offset-bottom').offset();
            $(window).on('scroll', function () {
                var scrollTop = $(this).scrollTop();
                if (scrollTop > currentTopOffset && scrollTop < $bottomOffsetEl.top - 600) {
                    $buttonsOrder.addClass('fixed');
                } else {
                    $buttonsOrder.removeClass('fixed');
                }
            });
        };
        fixedButton();
        $(window).on('resize', function () {
            fixedButton();
        });
    }


    //for modal reviews

    function HotelCommentFormSend(validationGroup) {
        Page_ClientValidate(validationGroup);
        if (Page_IsValid) {
            CommonTrackClick(TRACKID.HotelDetailCommentSend);
            return PreSendOrder('preSendComment', validationGroup);
        }
        return false;
    }

    $(".b-rank-regular-tetragon div").on("hover", function () {
        MarkCriterion(this, false);
    });

    $(".b-rank-regular-tetragon div").on("click", function () {
        MarkCriterion(this, true);
    });

    $(".b-rank-regular-tetragon").on("mouseleave", function () {
        var container = $(this).closest('.b-select-rating');
        var position = $.trim(container.find("input[type='hidden']").val());

        if (position == '') {
            $(this).children("div").removeClass("active");
            container.find(".b-sel-r-result").html('&nbsp;');
        }
        else
            MarkCriterion($(this).children("div:eq(" + position + ")"), false);
    });

    function OpenThankYouDialog(eventId, userName, userEmail) {
        $(document).ready(function () {
            $('.jstThankYouDialog').show();

            if (typeof iCognesia != "undefined") {
                iCognesia.RegisterForm(
                    eventId,
                    userName,
                    userEmail,
                    "",
                    []
                );
            }
        });
    }

    function MarkCriterion(obj, savePosition) {
        var container = $(obj).closest('.b-select-rating');

        $(obj).addClass("active");
        $(obj).prevAll("div").addClass("active");
        $(obj).nextAll("div").removeClass("active");

        var resultText = container.find(".b-sel-r-result");

        var position = $(obj).index();
        switch (position) {
            case 0:
                resultText.text("Ужасно");
                break;
            case 1:
                resultText.text("Плохо");
                break;
            case 2:
                resultText.text("Обычно");
                break;
            case 3:
                resultText.text("Хорошо");
                break;
            case 4:
                resultText.text("Отлично");
                break;
        }

        if (savePosition)
            container.find("input[type='hidden']").val(position);
    }

    function MarksValidate(source, arguments) {
        var isValid = true;
        $('.jsMarksHolder').find("input[type='hidden']").each(function () {
            if ($.trim($(this).val()) == '' && isValid)
                isValid = false;
        });
        arguments.IsValid = isValid;
    }

    //end




    $('.js-smooth-scroll a[href*="#"]')
        .not('[href="#"]')
        .not('[href="#0"]')
        .on('click', function(e) {
                e.preventDefault();
                var menuOffset = isMobileDevice ? 0 : 110;
                $('html, body').stop().animate({
                    scrollTop: $($(this).attr('href')).offset().top - menuOffset
                }, 1000, 'linear');
        });

});

