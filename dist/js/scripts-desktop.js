$(function () {
    /*----- polyfills desktop start ----*/
    svg4everybody();
    var someImages = document.querySelectorAll('.objectFitCover');
    objectFitImages(someImages, {watchMQ: true});
    /*----- polyfills desktop end ----*/

    /*----- scroll menu desktop start ----*/
    $(window).on("scroll", function () {
        var left = $(this).scrollLeft();
        $('.header__content').css('left', -left);
    });
    /*----- scroll menu desktop end ----*/


    // Hide Header on on scroll down
    var lastScrollTop = 0;
    var delta = 100;
    var deltaDown = 50;
    var fixedSearch = $('.js-search--fixed');
    var screenBlock = fixedSearch.parents('.screen-search');
    var scrollOffset = screenBlock.innerHeight() + screenBlock.scrollTop() + 20;

    $(window).on('scroll', function () {
        var st = $(this).scrollTop();
        if (st < lastScrollTop && st > scrollOffset && !$('body').hasClass('scroll')) {
            if (Math.abs(lastScrollTop - st) <= delta) {
                return;
            }

            fixedSearch.addClass('search-fixed');
            setTimeout(function () {
                fixedSearch.addClass('animate');
            }, 20);
        } else {
            if (Math.abs(lastScrollTop-st) < deltaDown) {
                return;
            }
            fixedSearch.removeClass('search-fixed animate');
        }

        lastScrollTop = st;
    });
    $(window).on('resize', function () {
        scrollOffset = screenBlock.height() + screenBlock.scrollTop() + 20;
    });

    $(".jsCallBackShow").on("click", function(e) {
        e.preventDefault();
        $(this).next(".jsCallBackForm").toggle();
    });
    $(document).click(function(t) {
        var i = $(document).find(".jsCallBackForm");
        $(t.target).hasClass("jsCallBackShow") || $(t.target).closest(i).length || i.is(":visible") && (i.hide(),
            t.stopPropagation())
    });


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
                $(this).parent().find('.jsDropDownOptions').hide();
                return false;
            } else if (!$(this).hasClass('js-control-child')) {
                $('.custom-dropdown').removeClass('select-open');
                $('.jsDropDownOptions').hide();
            }
            $('.custom-dropdown').removeClass('select-open');
            $('.js-search-control').find('.custom-dropdown__search').hide();
            $('.js-search-control').find('.custom-dropdown__text').show();
            $(this).parent().find('.jsDropDownOptions').show();
            $(this).parent().toggleClass('select-open')
        }
        var text = $(this).find('.custom-dropdown__text');
        var search = $(this).find('.custom-dropdown__search');
        if (search.length) {
            text.hide();

            search.show();
            search.find('.ui-autocomplete-input').focus();
        }
    });

    $('.ui-autocomplete-input').on("keyup", function (e) {
        e.preventDefault();
        var filter = $(this).parents('.custom-dropdown').find('.b-dropdown--filter');
        if ($(this).val() != "") {
            filter.find('.center-list').show();
            filter.find('.left-list').hide();
            filter.find('.right-list').hide();
        } else {
            filter.find('.center-list').hide();
            filter.find('.left-list').show();
            filter.find('.right-list').show();
        }
    });


});