var DATEPICKER_VIEWMODE = {
    GENERAL: "GENERAL",
    HOT_TOUR: "HOT_TOUR"
};

//Date and duration picker
var datepickerDateFormat = 'dd.mm';
var datepickerButtonCssClass = 'btn btn--brand--orange m-ttu';
var DatepickerViewMode = DATEPICKER_VIEWMODE.GENERAL;
var DatepickerOnSelectedCallback;
scopeSelector = $(".js-control[data-toggle='datepicker']");
$(function () {
    RegisterPicker($("[data-toggle='datepicker']").parent());

    $("[data-toggle='datepicker']").on("click", function () {
        $(this).parent().find(".b-datepicker").toggle().toggleClass("slideIn active");
        $(this).toggleClass('vf-dropdown-close'); //add class
        // $(this).toggleClass("m-expanded");
    });

    $(document).on("mousedown", function (e) {
        if ($(e.target).closest("[data-toggle='datepicker'], .b-datepicker, .ui-datepicker-next, .ui-datepicker-prev").length) return;
        if ($(".b-datepicker:visible").length > 0) {
            HidePicker();

            if (DatepickerOnSelectedCallback) {
                DatepickerOnSelectedCallback();
            }

            e.stopPropagation();
        }
    });
});

function RegisterPicker(scopeSelector) {
    $.datepicker.regional.ru = {
        closeText: 'Закрыть',
        prevText: '&nbsp;',
        nextText: '&nbsp;',
        currentText: 'Сегодня',
        monthNames: ['Январь', 'Февраль', 'Март', 'Апрель', 'Май', 'Июнь',
            'Июль', 'Август', 'Сентябрь', 'Октябрь', 'Ноябрь', 'Декабрь'],
        monthNamesShort: ['Янв', 'Фев', 'Мар', 'Апр', 'Май', 'Июн',
            'Июл', 'Авг', 'Сен', 'Окт', 'Ноя', 'Дек'],
        dayNames: ['воскресенье', 'понедельник', 'вторник', 'среда', 'четверг', 'пятница', 'суббота'],
        dayNamesShort: ['вск', 'пнд', 'втр', 'срд', 'чтв', 'птн', 'сбт'],
        dayNamesMin: ['Вс', 'Пн', 'Вт', 'Ср', 'Чт', 'Пт', 'Сб'],
        weekHeader: 'Не',
        dateFormat: datepickerDateFormat,
        firstDay: 1,
        isRTL: false,
        showMonthAfterYear: false,
        yearSuffix: ''
    };

    $.datepicker.setDefaults($.datepicker.regional.ru);

    var divDatePicker = $(scopeSelector).find(".b-datepicker");
    var spanDateFrom = $(scopeSelector).find("[id$='spanDateFrom']");
    var hdnDateFrom = $(scopeSelector).find("input[id$='hdDepartureDateFrom']");
    var spanDateTo = $(scopeSelector).find("[id$='spanDateTo']");
    var hdnDateTo = $(scopeSelector).find("input[id$='hdDepartureDateTo']");
    var fullDateFormat = 'dd.mm.yy';

    if ((divDatePicker.length > 0) && (spanDateFrom.length > 0) && (spanDateTo.length > 0) && (hdnDateFrom.length > 0) && (hdnDateTo.length > 0)) {
        var oneDay = 1000 * 60 * 60 * 24;
        //var i = 0;
        divDatePicker.datepicker({
            numberOfMonths: 2,
            showButtonPanel: false,
            autoSize: true,
            minDate: 0,
            maxDate: "+12M",
            beforeShowDay: function (date) {

                var dateFrom = $.datepicker.parseDate(fullDateFormat, hdnDateFrom.val());
                var dateTo = $.datepicker.parseDate(fullDateFormat, hdnDateTo.val());
                if (dateFrom && ((date.getTime() === dateFrom.getTime()) || (dateTo && date >= dateFrom && date <= dateTo))) {
                    return [true, "dp-highlight"];
                }

                return [true];

            },
            onSelect: function (dateFormatted, inst) {
                var dateFrom = $.datepicker.parseDate(fullDateFormat, hdnDateFrom.val());
                var dateTo = $.datepicker.parseDate(fullDateFormat, hdnDateTo.val());
                var selectedDate = new Date(inst.selectedYear, inst.selectedMonth, inst.selectedDay);

                if (dateTo == null) {
                    var diffDays = Math.round(Math.abs(dateFrom - selectedDate) / oneDay) + 1;
                    if (diffDays > 10 && DatepickerViewMode == DATEPICKER_VIEWMODE.GENERAL) {
                        alert("Максимальный период дат выезда 10 дней.");
                        if (dateFrom < selectedDate) {
                            selectedDate = new Date(dateFrom);
                            selectedDate.setDate(selectedDate.getDate() + 9);
                        } else {
                            dateFrom = new Date(selectedDate);
                            dateFrom.setDate(dateFrom.getDate() + 9);
                        }
                    }
                } else {
                    var diff10Days = Math.round(Math.abs(dateFrom - dateTo) / oneDay) + 1;
                    if (diff10Days == 10) {
                        if (selectedDate < dateFrom) {
                            dateFrom = new Date(selectedDate);
                            dateTo = new Date(dateFrom);
                            dateTo.setDate(dateFrom.getDate() + 9);
                            spanDateFrom.text($.datepicker.formatDate($.datepicker.regional.ru.dateFormat, dateFrom));
                            hdnDateFrom.val($.datepicker.formatDate(fullDateFormat, dateFrom));
                            spanDateTo.text($.datepicker.formatDate($.datepicker.regional.ru.dateFormat, dateTo));
                            hdnDateTo.val($.datepicker.formatDate(fullDateFormat, dateTo));
                            $(this).datepicker();
                            SetDateDurationPickerSummaryLabel(scopeSelector);
                            return;
                        }
                    }
                }
                var selectedDateFormatted = $.datepicker.formatDate($.datepicker.regional.ru.dateFormat, selectedDate);
                var selectedDateStr = $.datepicker.formatDate(fullDateFormat, selectedDate);
                var dateFromStr = $.datepicker.formatDate(fullDateFormat, dateFrom);
                var dateFromFormatted = $.datepicker.formatDate($.datepicker.regional.ru.dateFormat, dateFrom);
                if ((dateFrom != null) && (dateTo != null)) {
                    spanDateFrom.text(selectedDateFormatted);
                    hdnDateFrom.val(selectedDateStr);
                    spanDateTo.text("");
                    hdnDateTo.val("");
                    $(this).datepicker();
                } else {
                    if (dateFrom != null) {
                        if (selectedDate < dateFrom) {
                            spanDateTo.text(dateFromFormatted);
                            hdnDateTo.val(dateFromStr);
                            spanDateFrom.text(selectedDateFormatted);
                            hdnDateFrom.val(selectedDateStr);
                            $(this).datepicker();
                        } else {
                            spanDateTo.text(selectedDateFormatted);
                            hdnDateTo.val(selectedDateStr);
                            $(this).datepicker();
                        }
                    }
                }
                SetDateDurationPickerSummaryLabel(scopeSelector);
            }
        });
    }

    var durationSpansStr = '';
    for (var i = 1; i < 22; i++)
        durationSpansStr += "<span>" + i + "</span>";
    divDatePicker.prepend("<header>Дата вылета — выберите несколько</header>").append("<footer class='duration modal-fix-bottom'>" +
        "<div class='duration__heading'>Длительность, ночей</div>" +
        "<div class='duration__content'>" +
        "<i class='arrow-icon arrow-icon--left js-duration-left '></i>" +
        "<div class='duration__slider'>" +

        "<div class='duration__days'>" + durationSpansStr + "</div>" +

        "</div>" +
        "<i class='arrow-icon arrow-icon--right js-duration-right'></i>" +
        "<div class='duration-btn-wrap'><input type=\"button\" class=\"btn btn--brand-red m-ttu jsPickerClose\" value=\"Выбрать\"></div>"+
        "</div>" +
        "</footer>");


    var spanDurationFrom = $(scopeSelector).find("[id$='spanDurationFrom']");
    var hdnDurationFrom = $(scopeSelector).find("[id$='hdnDurationFrom']");
    var spanDurationTo = $(scopeSelector).find("[id$='spanDurationTo']");
    var hdnDurationTo = $(scopeSelector).find("[id$='hdnDurationTo']");
    var durationSpans = divDatePicker.find("footer span");
    if ((spanDurationFrom.length > 0) && (spanDurationTo.length > 0) && (hdnDurationFrom.length > 0) && (hdnDurationTo.length > 0)) {
        durationSpans.on("click", function () {
            var currentDurationFromStr = spanDurationFrom.text();
            var currentDurationToStr = spanDurationTo.text();
            if ((currentDurationFromStr != '') && (currentDurationToStr != '')) {
                spanDurationFrom.text($(this).text());
                hdnDurationFrom.val($(this).text());
                spanDurationTo.text("");
                hdnDurationTo.val("");
                $(this).siblings().removeClass("m-select");
                $(this).addClass("m-select");
            } else {
                if (currentDurationFromStr != '') {
                    var currentSelectedDuration = parseInt($(this).text());
                    var currentDurationFrom = parseInt(currentDurationFromStr);
                    if (currentSelectedDuration > currentDurationFrom) {
                        spanDurationFrom.text(currentDurationFrom);
                        hdnDurationFrom.val(currentDurationFrom);
                        spanDurationTo.text(currentSelectedDuration);
                        hdnDurationTo.val(currentSelectedDuration);
                    } else {
                        spanDurationFrom.text(currentSelectedDuration);
                        hdnDurationFrom.val(currentSelectedDuration);
                        spanDurationTo.text(currentDurationFrom);
                        hdnDurationTo.val(currentDurationFrom);
                    }
                    durationSpans.filter(function () {
                        HightlightDurations(this, spanDurationFrom, spanDurationTo);
                    });
                }
            }
            SetDateDurationPickerSummaryLabel(scopeSelector);
        }).filter(function () {
            HightlightDurations(this, spanDurationFrom, spanDurationTo);
        });
    }

    $(scopeSelector).find(".jsPickerClose").click(function () {
        if ($(".b-datepicker:visible").length > 0) {
            HidePicker();
            if (DatepickerOnSelectedCallback) {
                DatepickerOnSelectedCallback();
            }
        }
    });
}
RegisterPicker(scopeSelector);
function HidePicker() {
    if ($(".b-datepicker:visible").length > 0) {
        $(".b-datepicker").hide();
        $("[data-toggle='datepicker']").removeClass("m-expanded");
        $("[data-toggle='datepicker']").addClass('vf-dropdown-open');
    }
}

function HightlightDurations(obj, spanDurationFrom, spanDurationTo) {
    var currentDuration = parseInt($(obj).text());
    if ((currentDuration >= parseInt(spanDurationFrom.text())) && (currentDuration <= parseInt(spanDurationTo.text())))
        $(obj).addClass("m-select");
}

function SetDateDurationPickerSummaryLabel(scopeSelector) {
    if ($(scopeSelector).find('.jsSummary').length == 0)
        return;

    $(scopeSelector).find('.jsSummary').val($.trim($(scopeSelector).find('.jsDetails').text()));
}

function SetDurationRange(scopeSelector, durationFrom, durationTo) {
    var durationSpans = $(scopeSelector).find(".b-datepicker").find("footer span");
    var spanDurationFrom = $(scopeSelector).find("[id$='spanDurationFrom']");
    var hdnDurationFrom = $(scopeSelector).find("[id$='hdnDurationFrom']");
    var spanDurationTo = $(scopeSelector).find("[id$='spanDurationTo']");
    var hdnDurationTo = $(scopeSelector).find("[id$='hdnDurationTo']");

    spanDurationFrom.text(durationFrom);
    hdnDurationFrom.val(durationFrom);
    spanDurationTo.text(durationTo);
    hdnDurationTo.val(durationTo);

    durationSpans.siblings().removeClass("m-select");
    durationSpans.slice(parseInt(durationFrom) - 1, parseInt(durationTo)).addClass("m-select");
    SetDateDurationPickerSummaryLabel(scopeSelector);
}