var scrollPage = null;
function disableScroll() {
    var $body = $('body');
    if (!$body.hasClass('disableScroll')) {
        $body.addClass('disableScroll');
        scrollPage = $(document).scrollTop();
        $body.css('top', -scrollPage);
    }
}

function enableScroll() {
    var $body = $('body');
    if ($body.hasClass('disableScroll') && !$body.hasClass('m-filter-open') && !$body.hasClass('m-dropdown-open') && !$body.hasClass('modal-open')) {
        $body.removeClass('disableScroll');
        $(document).scrollTop(scrollPage);
        $('body').css('top', 'auto');
        scrollPage = null
    }
}
$(function () {
    var isMobileDevice = $('body').hasClass('mobile');
    /*----- mobile hamburger start ----*/
    $('.hamburger').on('click', function (e) {
        e.preventDefault();
        $(this).toggleClass('is-active');
    });
    /*----- mobile hamburger end ----*/


    if (isMobileDevice) {
        $(document).on("show.bs.modal", ".modal", function() {
            disableScroll();
        });
        $(document).on("hidden.bs.modal", ".modal", function() {
            enableScroll();
        })
    }

    $(document).on('click', function (e) {
        if (!$(e.target).parents('.custom-dropdown').length) {
            $('.jsDropDownOptions').hide();
            $('.custom-dropdown').removeClass('select-open');
            $('.js-search-control').find('.custom-dropdown__search').hide();
            $('.js-search-control').find('.custom-dropdown__text').show();
        }
    });


    $('.custom-dropdown__control').on('click', function (e) {
        e.preventDefault();
        if (!$(e.target).hasClass('ui-autocomplete-input')) {

            if ($(this).parent().find('.jsDropDownOptions').is(':visible')) {
                $(this).parent().removeClass('select-open');
                $('body').removeClass('m-dropdown-open');
                enableScroll();
                $(this).parent().find('.jsDropDownOptions').hide();
                return false;
            } else if (!$(this).hasClass('js-control-child')) {
                $('body').removeClass('m-dropdown-open');
                enableScroll();
                $('.custom-dropdown').removeClass('select-open');
                $('.jsDropDownOptions').hide();
            }
            $('.custom-dropdown').removeClass('select-open');
            $('.js-search-control').find('.custom-dropdown__search').hide();
            $('.js-search-control').find('.custom-dropdown__text').show();
            disableScroll();
            $('body').addClass('m-dropdown-open');
            $(this).parent().find('.jsDropDownOptions').show();
            $(this).parent().addClass('select-open');
        }
        var text = $(this).find('.custom-dropdown__text');
        var search = $(this).find('.custom-dropdown__search');
        if (search.length) {
            text.hide();

            search.show();
            search.find('.ui-autocomplete-input').focus();
        }
    });

    $('.m-dropdown .jsMultiSelectDone, .jsControlPanel .btn').on('click', function (e) {
        e.preventDefault();
        $('.m-dropdown').hide();
        $(this).closest('.custom-dropdown').removeClass('select-open');
        $('body').removeClass('m-dropdown-open');
        enableScroll();
    });


    var filter = $('.b-dropdown--filter');
    filter.each(function () {
        var filter = $(this);
        filter.find('.left-list input').on('click', function (e) {

            //$filter.find('header').hide();
            setTimeout(function () {
                filter.find('.b-dropdown--filter-step').removeClass('step-country show').addClass('step-resort show-footer');
                $('.b-dropdown--filter-step').addClass('show');
            }, 40);
        });
        $('.js-prev').on('click', function (e) {
            e.preventDefault();
            filter.find('.b-dropdown--filter-step').removeClass('step-resort show show-footer').addClass('step-country');


        });

        $('.ui-autocomplete-input').on("keyup", function () {
            var filter = $(this).parents('.b-dropdown--filter');
            if ($(this).val() != "") {
                filter.find('.center-list').show();
                filter.find('.left-list').hide();
                filter.find('.right-list').hide();
                filter.find('.b-dropdown--filter-step').addClass('step-search show-footer');
            } else {
                filter.find('.center-list').hide();
                filter.find('.left-list').show();
                filter.find('.right-list').show();
                filter.find('.b-dropdown--filter-step').removeClass('step-search show-footer');
            }
            return false;
        });


        $('.js-prev-search').on('click', function (e) {
            e.preventDefault();
            filter.find('.b-dropdown--filter-step').removeClass('step-search step-resort').addClass('step-country');
            filter.find('.ui-autocomplete-input').val('');
            filter.find('.center-list').hide();
            filter.find('.left-list').show();
            filter.find('.right-list').show();
        });


        function filterClose() {
            filter.hide();
            filter.find('.ui-autocomplete-input').val('');
            filter.find('.center-list').hide();
            filter.find('.left-list').show();
            filter.find('.right-list').show();
            filter.find('.b-dropdown--filter-step').removeClass('step-resort show step-search');
            $('body').removeClass('m-dropdown-open');
        }

        filter.find('.close').on('click', function (e) {
            e.preventDefault();
            filterClose();
        });
        filter.find('.js-select-filter').on('click', function (e) {
            e.preventDefault();
            filterClose();
        });
        filter.find('.js-select-filter').on('click', function (e) {
            e.preventDefault();
            filterClose();
        });
        filter.find('.js-reset-filter-resort').on('click', function (e) {
            e.preventDefault();
            filter.find('.right-list input:checked').prop("checked", false)
        });
        filter.find('.js-reset-filter-all').on('click', function (e) {
            e.preventDefault();
            filter.find('.left-list input:checked, .center-list input:checked').prop("checked", false);
            filter.find('.left-list input').eq(0).prop("checked", true);

            filter.find('.b-dropdown--filter-step').removeClass('step-search');
            filter.find('.ui-autocomplete-input').val('');
            filter.find('.center-list').hide();
            filter.find('.left-list').show();
            filter.find('.right-list').show();
        });
    });



    var $verticalFilterWrap = $('.jsHotToursVerticalFilter');
    $('.jsHotToursFiltersOpen').on('click', function (e) {
        e.preventDefault();
        $verticalFilterWrap.addClass('open animation');
        disableScroll();
        $('body').addClass('m-filter-open');
    });

    var verticalFilterClose = function () {
        $verticalFilterWrap.removeClass('open');
        $('body').removeClass('m-filter-open');
        enableScroll();
        var transitionEnd = 'webkitTransitionEnd otransitionend oTransitionEnd msTransitionEnd transitionend';
        $verticalFilterWrap.one(transitionEnd, function () {
            if (!$(this).hasClass('open')) {
                $(this).removeClass('animation');
            }
        });
    };

    $verticalFilterWrap.find('.jsCloseFilters, .jsApplyAllFilters, .jsBottomClearAllFilters').on('click', function () {
        verticalFilterClose();
        $('body').removeClass('m-filter-open');
        enableScroll();
    });
    $verticalFilterWrap.find('.brand-checkbox').on('click', function () {
        $('.filters-btn__choice-text').text('Фильтры: 5');
        $('.filters-btn__choice-text').addClass('select-filter');
    });


});