window.addEventListener('DOMContentLoaded', () => {
    $('.counter').countUp({
        time: 2000,
        delay: 10
    });
});

// Mobile Menu
document.addEventListener('DOMContentLoaded', () => {
    const hamburgerButton = document.querySelector('.hamburger');
    const mobileMenu = document.querySelector('.mobile-menu');

    hamburgerButton.addEventListener('click', () => {
        hamburgerButton.classList.toggle('is-active');
        mobileMenu.classList.toggle('active');
    });
});

$(document).ready(function () {
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
});

// Search bar
$(document).ready(function () {
    $('.nav-right__items .search').click(function (e) {
        $('.big-search').css('z-index', '99999');
        $('.big-search').toggleClass('is-open');
        /*$(".big-search").show();*/
    });

    $('.big-search__close-btn').click(function (e) {
        $('.big-search').toggleClass('is-open');
        $('.big-search').css('z-index', '');
        /*$(".big-search").hide();*/
    });
});

// Animations
document.addEventListener('DOMContentLoaded', () => {
    var wow = new WOW({
        boxClass: 'wow', // animated element css class (default is wow)
        animateClass: 'animated', // animation css class (default is animated)
        offset: 0, // distance to the element when triggering the animation (default is 0)
        mobile: true, // trigger animations on mobile devices (default is true)
        live: true, // act on asynchronously loaded content (default is true)
        callback: function (box) {
            // the callback is fired every time an animation is started
            // the argument that is passed in is the DOM node being animated
        },
        scrollContainer: null // optional scroll container selector, otherwise use window
    });
    wow.init();
});

// back to top btn
let btp_btn = document.querySelector('.back-to-top');
document.addEventListener('scroll', () => {
    if (window.top.scrollY > 50) {
        btp_btn.style.display = 'inline-flex';
    } else {
        btp_btn.style.display = 'none';
    }
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
            console.log(entry);
            if (!entry.isIntersecting) {
                console.log(entry.target.id + ' is not interesecting'); // stop other swiper
                return swiper.autoplay.stop();
            }
            elid = entry.target.id;
            let elsSwiper = document.querySelectorAll('#events__swiper');
            elsSwiper.forEach((e) => {
                if (e.id === elid) {
                    console.log(e.id + ' interesecting'); // play this swiper here
                    swiper.autoplay.start();
                } else {
                    console.log(e.id + ' is not interesecting'); // stop other swiper
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
    console.log(elsSwiper);
    elsSwiper.forEach((el) => {
        observerSwiper.observe(el);
    });
};
window.addEventListener('load', initOberverReveal);

/* navbar shadow */
let navBar = document.querySelector('.navbar');
document.addEventListener('scroll', () => {
    if (window.top.scrollY > 50) {
        navBar.classList.add('scrolled');
    } else {
        navBar.classList.remove('scrolled');
    }
});
