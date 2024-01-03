// FAQ Accordion
document.addEventListener('DOMContentLoaded', () => {
    const faqContainer = document.querySelector('.faq-content');

    if (faqContainer) {
        faqContainer.addEventListener('click', (e) => {
            const groupHeader = e.target.closest('.faq-group-header');

            if (!groupHeader) return;

            const group = groupHeader.parentElement;
            const groupBody = group.querySelector('.faq-group-body');
            const icon = groupHeader.querySelector('i');

            // Toggle icon
            icon.classList.toggle('fa-plus');
            icon.classList.toggle('fa-minus');

            // Toggle visibility of body
            groupBody.classList.toggle('open');

            // Close other open FAQ bodies
            const otherGroups = faqContainer.querySelectorAll('.faq-group');

            otherGroups.forEach((otherGroup) => {
                if (otherGroup !== group) {
                    const otherGroupBody = otherGroup.querySelector('.faq-group-body');
                    const otherIcon = otherGroup.querySelector('.faq-group-header i');

                    otherGroupBody.classList.remove('open');
                    otherIcon.classList.remove('fa-minus');
                    otherIcon.classList.add('fa-plus');
                }
            });
        });
    }
});

// Mobile Menu
/*document.addEventListener('DOMContentLoaded', () => {
  const hamburgerButton = document.querySelector('.hamburger-button');
  const mobileMenu = document.querySelector('.mobile-menu');

  hamburgerButton.addEventListener('click', () =>
    mobileMenu.classList.toggle('active')
  );
});*/

document.addEventListener('DOMContentLoaded', () => {
    const donateButton = document.getElementById('donate-btn');
    donateButton.addEventListener('click', () => (location.href = 'donations.html'));
});

const bannerFade = new Swiper('.hero-swiper', {
    // Optional parameters
    /*direction: "horizontal",*/
    loop: true,
    autoplay: true,
    effect: 'fade',
    fadeEffect: {
        crossFade: true
    },
    speed: 3000,
    autoplay: {
        delay: 5000,
        disableOnInteraction: false
    },

    // If we need pagination
    pagination: {
        el: '.swiper-pagination',
        type: 'bullets',
        clickable: true
    },

    // Navigation arrows
    navigation: {
        nextEl: '.hero-btn-next',
        prevEl: '.hero-btn-prev'
    }

    // And if we need scrollbar
    /*scrollbar: {
        el: '.swiper-scrollbar',
      },*/
});
