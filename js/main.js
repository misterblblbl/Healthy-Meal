
var menuToggle = document.querySelector('.main-nav__toggle');
var menuWrapper = document.querySelector('.main-nav__wrapper');

menuToggle.addEventListener('click', function(){
    menuWrapper.classList.toggle('main-nav__wrapper--closed');
    if (menuToggle.classList.contains('main-nav__toggle--closed')) {
        menuToggle.classList.remove('main-nav__toggle--closed');
        menuToggle.classList.add('main-nav__toggle--opened');
        menuWrapper.classList.add('main-nav__wrapper--opened');
    } else if (menuToggle.classList.contains('main-nav__toggle--opened')) {
        menuToggle.classList.remove('main-nav__toggle--opened');
        menuToggle.classList.add('main-nav__toggle--closed');
        menuWrapper.classList.remove('main-nav__wrapper--opened');
        menuWrapper.classList.add('main-nav__wrapper--closed');
    }
});

$(document).ready(function(){
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
});



