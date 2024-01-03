let navbar = document.querySelector('.navbar');
document.addEventListener('scroll', () => {
    if (window.top.scrollY > 10) {
        navbar.classList.add('scroll');
    } else {
        navbar.classList.remove('scroll');
        navbar.style.transition = '.4s ease';
    }
});
