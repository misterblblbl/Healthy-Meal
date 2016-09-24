/*
 * Third party
 */
//= libs/jquery-3.1.0.min.js
//= libs/slick.min.js



$(document).ready(function(){
    var menuToggle = $('.main-nav__toggle');
    var menuWrapper = $('.main-nav__wrapper');


    menuToggle.on('click', function(){
        menuWrapper.toggleClass('main-nav__wrapper--closed');
        if (menuToggle.hasClass('main-nav__toggle--closed')) {
            menuToggle.removeClass('main-nav__toggle--closed');
            menuToggle.addClass('main-nav__toggle--opened');
            menuWrapper.addClass('main-nav__wrapper--opened');
        } else if (menuToggle.hasClass('main-nav__toggle--opened')) {
            menuToggle.removeClass('main-nav__toggle--opened');
            menuToggle.addClass('main-nav__toggle--closed');
            menuWrapper.removeClass('main-nav__wrapper--opened');
            menuWrapper.addClass('main-nav__wrapper--closed');
        }
    });

    $("#menu").on("click","a", function (event) {
        //отменяем стандартную обработку нажатия по ссылке
        event.preventDefault();
        //забираем идентификатор бока с атрибута href
        var id  = $(this).attr('href'),
        //узнаем высоту от начала страницы до блока на который ссылается якорь
            top = $(id).offset().top;
        //анимируем переход на расстояние - top за 1500 мс
        $('body,html').animate({scrollTop: top}, 1000);
    });

    var popupLink = $('.footer__links');
    var popup = $('.modal');
    var popupCloseButton = $('.modal__close');

    popupLink.on('click', function (event) {
        event.preventDefault();
        popup.removeClass('visually-hidden');

        var top = $(popup).offset().top;
        $('body,html').animate({scrollTop: top}, 1000);
    });

    popupCloseButton.on('click', function(event) {
        event.preventDefault();
        popup.addClass('visually-hidden');
    });

    $(document).keydown(function(event) {
        if (event.keyCode == 27) {
            popup.addClass('visually-hidden');
     }
    });

    $('.tastes-slider__items').slick({
        infinite: true,
        speed: 300,
        swipeToSlide: true,
        slidesToShow: 1,
        slidesToScroll: 1,
        variableWidth: true,
        prevArrow: $('.tastes-slider__controls--left'),
        nextArrow: $('.tastes-slider__controls--right')
    });
});



