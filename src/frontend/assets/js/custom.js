// Animations
document.addEventListener('DOMContentLoaded', () => {
    var wow = new WOW({
        boxClass: 'wow', // animated element css class (default is wow)
        animateClass: 'animated', // animation css class (default is animated)
        offset: 0, // distance to the element when triggering the animation (default is 0)
        mobile: false, // trigger animations on mobile devices (default is true)
        live: true, // act on asynchronously loaded content (default is true)
        callback: function (box) {
            // the callback is fired every time an animation is started
            // the argument that is passed in is the DOM node being animated
        },
        scrollContainer: null // optional scroll container selector, otherwise use window
    });
    wow.init();
});

$(function () {
    // countUp
    $('.counter').countUp({
        time: 2000,
        delay: 10
    });

    // Search bar
    $('.header-item-right .search').click(function (e) {
        $('.big-search').css('z-index', '99999');
        $('.big-search').toggleClass('is-open');
        /*$(".big-search").show();*/
    });

    $('.big-search__close-btn').click(function (e) {
        $('.big-search').toggleClass('is-open');
        $('.big-search').css('z-index', '');
        /*$(".big-search").hide();*/
    });

    // back to top
    $(window).scroll(function () {
        if ($(this).scrollTop() > 100) {
            $('.back-to-top').fadeIn();
        } else {
            $('.back-to-top').fadeOut();
        }
    });

    $('.back-to-top').click(function () {
        $('body, html').animate(
            {
                scrollTop: 0
            },
            800
        );
        return false;
    });

    // submenu
    $('.nav__item.nav-has-sub').click(function (e) {
        var childs = $(this).find('.nav__sub-item');
        console.log(childs);
        $(childs[0]).toggleClass('active');
        var icon = $(this).find('.arrow-icon');
        $(icon[0]).toggleClass('rotate');
        e.preventDefault();
    });

    /*$("#toggle-icon").click(function(){
        $("#menu").slideToggle();
        $(this).toggleClass('active-bar');
    })*/

    // reset click

    $('a[href="#"]').click(function (e) {
        e.preventDefault ? e.preventDefault() : (e.returnValue = false);
    });
});

// EVENTS CAROUSEL

var swiper = new Swiper('.event-item-wrapper', {
    slidesPerView: 2,
    spaceBetween: 20,
    centeredSlides: false,
    loop: true,
    /*effect: "fade",
    fadeEffect: {           // added
        crossFade: true     // added(resolve the overlapping of the slides)
    },*/
    autoplay: {
        delay: 2000,
        disableOnInteraction: true,
        pauseOnMouseEnter: true
    },
    navigation: {
        nextEl: '.event-btn-next',
        prevEl: '.event-btn-prev'
    },
    breakpoints: {
        320: {
            slidesPerView: 1,
            spaceBetween: 20
        },
        767: {
            spaceBetween: 20,
            slidesPerView: 1
        },
        1280: {
            slidesPerView: 2
        }
    }
});

/* ============== intersection observe Swiper ============== */
const observerSwiper = new IntersectionObserver(
    function (entries, self) {
        entries.forEach((entry) => {
            let elid;
            //console.log(entry);
            if (!entry.isIntersecting) {
                //console.log(entry.target.id + ' is not interesecting'); // stop other swiper
                return swiper.autoplay.stop();
            }
            elid = entry.target.id;
            let elsSwiper = document.querySelectorAll('#events__swiper');
            elsSwiper.forEach((e) => {
                if (e.id === elid) {
                    //console.log(e.id + ' interesecting'); // play this swiper here
                    swiper.autoplay.start();
                } else {
                    //console.log(e.id + ' is not interesecting'); // stop other swiper
                    swiper.autoplay.stop();
                }
            });
        });
    },
    {
        root: null,
        threshold: 0.75,
        rootMargin: '0px'
    }
);

/* ============== intersection observe Swiper: init ============== */
const initOberverReveal = () => {
    let elsSwiper = document.querySelectorAll('#events__swiper');
    //console.log(elsSwiper)
    elsSwiper.forEach((el) => {
        observerSwiper.observe(el);
    });
};
window.addEventListener('load', initOberverReveal);

//mobile menu
const menu = document.querySelector('.menu');
const menuSection = menu.querySelector('.menu-section');
const menuArrow = menu.querySelector('.menu-mobile-arrow');
const menuClosed = menu.querySelector('.menu-mobile-close');
const menuTrigger = document.querySelector('.menu-mobile-trigger');
const menuOverlay = document.querySelector('.overlay');
let subMenu;

menuSection.addEventListener('click', (e) => {
    if (!menu.classList.contains('active')) {
        return;
    }

    if (e.target.closest('.menu-item-has-children')) {
        const hasChildren = e.target.closest('.menu-item-has-children');
        showSubMenu(hasChildren);
    }
});

menuArrow.addEventListener('click', () => {
    hideSubMenu();
});

menuTrigger.addEventListener('click', () => {
    toggleMenu();
});

menuClosed.addEventListener('click', () => {
    toggleMenu();
});

menuOverlay.addEventListener('click', () => {
    toggleMenu();
});

function toggleMenu() {
    menu.classList.toggle('active');
    menuOverlay.classList.toggle('active');
}

function showSubMenu(hasChildren) {
    subMenu = hasChildren.querySelector('.menu-subs');
    subMenu.classList.add('active');
    subMenu.style.animation = 'slideLeft 0.5s ease forwards';
    const menuTitle = hasChildren.querySelector('i').parentNode.childNodes[0].textContent;
    menu.querySelector('.menu-mobile-title').innerHTML = menuTitle;
    menu.querySelector('.menu-mobile-header').classList.add('active');
}

function hideSubMenu() {
    subMenu.style.animation = 'slideRight 0.5s ease forwards';
    setTimeout(() => {
        subMenu.classList.remove('active');
    }, 300);

    menu.querySelector('.menu-mobile-title').innerHTML = '';
    menu.querySelector('.menu-mobile-header').classList.remove('active');
}

window.onresize = function () {
    if (this.innerWidth > 991) {
        if (menu.classList.contains('active')) {
            toggleMenu();
        }
    }
};
