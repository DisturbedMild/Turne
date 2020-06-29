$(function () {
    $verticalFilter = $('.vertical-filter');
    var scrollToFillter = function (scrollScopeSelector, additionalOffset) {
        var $scrollScope = $(scrollScopeSelector);
        $scrollScope.on('hide.custom.dropdown', function () {
            var offsetFilter = $scrollScope.offset();
            if (($(window).scrollTop() + 110) > offsetFilter.top) {
                $('body').addClass('scroll');
                var propertiesAnimate = offsetFilter.top - 110 - additionalOffset;
                $('html, body').animate({scrollTop: propertiesAnimate}, 500, 'swing', function () {
                    $(window).trigger('scroll');
                    $('body').removeClass('scroll');
                });
            }
        });
    };
    scrollToFillter($verticalFilter, 20);

    var $popoverVerticalFilter = $('.vertical-filter .brand-checkbox');
    $popoverVerticalFilter.each(function () {
        var $item = $(this);
        $item.popover({
            trigger: 'manual',
            placement: 'right',
            boundary: 'window',
            content: 'Показать',
            container: $item.parents('.vertical-filter__content'),
            template: '<div class="popover fade popover-orange popover-filter" ><div class="arrow"></div><div class="popover-body"></div></div>'
        });
    });

    $popoverVerticalFilter.on('click', function () {
        if(!$(this).hasClass('.js-slider')){
            $popoverVerticalFilter.popover('hide');
            $(this).popover('show');
        }
    });

    $(document).on('click', '.popover-filter', function (e) {
        $verticalFilter.trigger('hide.custom.dropdown');
        $popoverVerticalFilter.popover('hide');
    });
    $(document).on('click', function (e) {
        if ($(e.target).closest($verticalFilter).length == 0) {
            $popoverVerticalFilter.popover('hide');
        }
    });
});