$(function () {

    $('.jsEmptyLink').on('click', function (e) {
        e.preventDefault();
        $(this).parent().find('.jsHeaderMenu').toggle();
        $(this).parent().toggleClass('open');
    });

    $('.js-duration-left, .js-duration-right').on('click', function (e) {
        e.preventDefault();
        var $slider = $(this).parents('.duration__content').find('.duration__slider');
        var sliderWidth = $slider.width();
        var sliderLeft = $slider[0].scrollLeft;
        var step = Math.floor(sliderWidth / 32);

        if ($(this).hasClass('js-duration-right')) {
            $slider[0].scrollLeft = step * 32 + sliderLeft;
        }

        if ($(this).hasClass('js-duration-left')) {
            $slider[0].scrollLeft = sliderLeft - step * 32;
        }
    });

    var $slider = $('.duration__slider');
    $slider.each(function () {
        var $slider = $(this);
        var isDown = false;
        var startX;
        var scrollLeft;
        $slider.on('mousedown', function (e) {
            isDown = true;
            $slider.addClass('active');
            startX = e.pageX - $slider[0].offsetLeft;
            scrollLeft = $slider[0].scrollLeft;
        });
        $slider.on('mouseleave', function (e) {
            isDown = false;
        });
        $slider.on('mouseup', function (e) {
            isDown = false;
            $slider.removeClass('active');
        });
        $slider.on('mousemove', function (e) {
            if (!isDown) return;
            e.preventDefault();
            var x = e.pageX - $slider[0].offsetLeft;
            var walk = x - startX;
            $slider[0].scrollLeft = scrollLeft - walk;
        });
    });

    var controlChild = $('.js-control-child');
    controlChild.on('click', function (e) {
        e.preventDefault();
        $(this).parent().find('.jsDropDownChild').toggle();
    });
    controlChild.each(function () {
        $(this).parent().find('.jsDropDownItem').on('click', function (e) {
            e.preventDefault();
            $(this).closest('.custom-dropdown').find('.ellipsis-text').html($(this).text());
            $('.jsDropDownChild').hide();
        });
    });

    $('.form-callback .btn').on('click', function (e) {
        e.preventDefault();
        $(this).parents('.form-callback').find('.form-control, .custom-dropdown').addClass('invalid-control');
        $(this).parents('.form-callback').find('.validation').removeClass('field-validation-valid').addClass('field-validation-error');
    });

    $.fn.htmlNumberSpinner = function () {

        return this.each(function () {
            /* default value and variables and jquery elements*/
            var defaultValue = 0, inputValue;
            var numberInput$ = $(this).find('.js-number-input');
            var incrementerEl$ = $(this).find('.js-incrementer');
            var decrementerEl$ = $(this).find('.js-decrementer');


            /* props - dynamic attributes */
            var startValue = numberInput$.data('start');
            var minAttributeValue = numberInput$.attr("min");
            var maxAttributeValue = numberInput$.attr("max");
            var stepAttributeValue = numberInput$.attr("step");


            /* set the default value into the input */
            inputValue = startValue ? startValue : defaultValue;
            numberInput$.val(inputValue);

            /* incrementer functionality */
            incrementerEl$.on('click', function (e) {
                e.preventDefault();
                var parentEl = $(this).parent();
                inputValue = parentEl.find('.js-number-input').val();
                if (maxAttributeValue) {
                    if (maxAttributeValue == inputValue) {
                        return;
                    }
                }
                if (stepAttributeValue) {
                    inputValue = parentEl.find('.js-number-input').val();
                    parentEl.find('.js-number-input').val((+inputValue) + (+stepAttributeValue));
                    return;
                }
                inputValue = parentEl.find('.js-number-input').val();
                parentEl.find('.js-number-input').val(++inputValue);
                if (inputValue == maxAttributeValue && maxAttributeValue) {
                    $(this).addClass('disabled')
                }
                decrementerEl$.removeClass('disabled');

            });

            /* decrementer functionality */
            decrementerEl$.on('click', function (e) {
                e.preventDefault();
                var parentEl = $(this).parent();
                inputValue = parentEl.find('.js-number-input').val();
                if (minAttributeValue) {
                    if (minAttributeValue == inputValue) {
                        return;
                    }
                }
                if (stepAttributeValue) {
                    inputValue = parentEl.find('.js-number-input').val();
                    parentEl.find('.js-number-input').val((+inputValue) - (+stepAttributeValue));
                    return;
                }
                inputValue = parentEl.find('.js-number-input').val();
                parentEl.find('.js-number-input').val(--inputValue);
                if (inputValue == minAttributeValue && minAttributeValue) {
                    $(this).addClass('disabled');
                }
                incrementerEl$.removeClass('disabled');

            });

            numberInput$.on('change', function () {
                if (!maxAttributeValue || !minAttributeValue) return;
                var currentValue = $(this).val();
                if ((+currentValue) > (+maxAttributeValue)) {
                    $(this).val(maxAttributeValue);
                    return;
                }
                if ((+currentValue) < (+minAttributeValue)) {
                    $(this).val(minAttributeValue);
                    return;
                }
            })
            $.fn.getSpinnerValue = function () {
                return $(this).find('.js-number-input').val();
            }
        });

    };


    $('.js-counter').htmlNumberSpinner();

    $("#slider-range").slider({
        range: true,
        min: 0,
        max: 100000,
        values: [0, 100000],
        slide: function (event, ui) {
            $("#price-from").val(ui.values[0]);
            $("#price-to").val(ui.values[1]);
        },
    });
    $("#price-from").val($("#slider-range").slider("values", 0));
    $("#price-to").val($("#slider-range").slider("values", 1));

    var $selectedFilters = $('.js-selected-filters');
    $selectedFilters.on('click', '.jsSelectedFilterClose', function () {
        $(this).remove();
        if(!$selectedFilters.find('.jsSelectedFilterClose').length) {
            $selectedFilters.parent().slideUp().addClass('hide');
        }
    });
    $selectedFilters.find('.js-clearAll').on('click', function () {
        $selectedFilters.parent().slideUp().addClass('hide');
        $selectedFilters.find('.jsSelectedFilterClose').remove();
    });
    $('.jsHotToursVerticalFilter .vertical-filter__scroll .brand-checkbox input').on('change', function (e) {
        var textCheckbox = $(this).parent().text();
        $selectedFilters.find('span[data-group-id=""]:last-child').append('' +
            '<button class="selected-filters__item jsSelectedFilterClose">' + textCheckbox +
            '                <span class="selected-filters__close">\n' +
            '                    <svg class="n-svg-icon" width="24" height="24">\n' +
            '                        <use xmlns:xlink="http://www.w3.org/1999/xlink"\n' +
            '                             xlink:href="Images/icons-search.svg#arrow-close"></use>\n' +
            '                     </svg>\n' +
            '                </span>\n' +
            '            </button>');

        if($selectedFilters.parent().hasClass('hide')){
            $selectedFilters.parent().slideDown().removeClass('hide');
        }
    });


    var textCollapse = $('.text-collapse');
    if (textCollapse.outerHeight() >= 140) {
        textCollapse.on('click', function () {
            $(this).toggleClass('expanded');
        });
        textCollapse.addClass('text-collapse-load');
    } else {
        textCollapse.removeClass('text-collapse--shadow');
    }

    textCollapse.find('.btn-admin-edit').on('click', function (e) {
        e.stopPropagation();
    })

});