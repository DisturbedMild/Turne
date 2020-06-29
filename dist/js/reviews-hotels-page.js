$(document).ready(function () {
    var isMobileDevice = $('body').hasClass('mobile');

    $('.ui-autocomplete-input').on('input', function () {
        $(this).parents('.ui-front').find('.ui-autocomplete').show();
    });
    $('.js-autocomplite .ui-menu-item').on('click', function () {
        $(this).parents('.ui-autocomplete').hide();
    });
    if (!isMobileDevice) {
        $(document).on('click', function (e) {
            if (!$(e.target).closest('.ui-autocomplete').length) {
                $('.ui-autocomplete').hide();
            }
        });
    } else {
        $('.ui-autocomplete .ui-menu-item').on('click', function () {
            $(this).parents('.m-dropdown').hide();
        });
    }

    function slickSearchCardSliders() {
        $('.js-search-card-slider').each(function () {
            var slider = $(this);
            slider.slick({
                slide: '.slick-carousel-item',
                infinite: true,
                slidesToShow: 1,
                slidesToScroll: 1,
                rows: 0,
                dots: true,
                appendArrows: slider.parent().find('.slick-navigation'),
                appendDots: slider.parent().find('.js-dots'),
                responsive: isMobileDevice ? [{
                    breakpoint: 1200,
                    settings: {
                        slidesToShow: 1,
                        slidesToScroll: 1
                    }
                }, {
                    breakpoint: 992,
                    settings: {
                        slidesToShow: 2,
                        slidesToScroll: 2
                    }
                }, {
                    breakpoint: 768,
                    settings: {
                        slidesToShow: 1,
                        slidesToScroll: 1
                    }
                }] : null
            });
        });
    }

    slickSearchCardSliders();

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
                        slidesToScroll: 1
                    }
                }] : null
            });
        });
    }

    slickHotelsSliders();

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
});
