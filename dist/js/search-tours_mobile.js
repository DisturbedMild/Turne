$(function () {
    var fixedSearch = $('.js-collapse-search-fixed');
    var lastScrollTop = 0;
    var delta = 60;
    var deltaDown = 10;
    var screenBlock = fixedSearch.parents('.screen-search');
    var scrollOffset = screenBlock.innerHeight() + screenBlock.scrollTop() + 20;

    $(window).on('scroll', function () {
        console.log(scrollOffset);
        var st = $(this).scrollTop();
        if (st < lastScrollTop && st > scrollOffset && !$('body').hasClass('scroll')) {
            if (Math.abs(lastScrollTop - st) <= delta)
                return;


            fixedSearch.addClass('search-fixed');
            setTimeout(function () {
                fixedSearch.addClass('animate');
            }, 20);
        } else {
            if (Math.abs(lastScrollTop - st) < deltaDown)
                return;
            fixedSearch.removeClass('search-fixed animate');
        }

        lastScrollTop = st;
    });
    $(window).on('resize', function () {
        scrollOffset = screenBlock.height() + screenBlock.scrollTop() + 20;
    });


    $('.collapse-search').on('click', function (e) {
        e.preventDefault();
        $('.collapse-search').parent().removeClass('visible');
        $('body').addClass('scroll');
        $('html, body').animate({scrollTop: 0}, 500, 'swing', function () {
            $(window).trigger('scroll');
            $('body').removeClass('scroll');
        });
        scrollOffset = screenBlock.innerHeight() + screenBlock.scrollTop() + 20;
    });


    $('.vertical-filter-search input').on('keyup', function () {
        $(this).parents('.custom-dropdown').find('.jsDropDownOptions').show();
        $(this).parents('.custom-dropdown').addClass('select-open');
    })
});