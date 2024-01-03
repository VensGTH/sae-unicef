/*window.addEventListener('DOMContentLoaded', () => {
    window.sliderContainer = document.querySelector('.give__slider-container'),
        window.slider = document.querySelector('.give__slider'),
        window.giveSlide = document.getElementsByClassName('give__slide'),
        window.lnext = document.querySelector('.give1 #next1'),
        window.lprev = document.querySelector('.give1 #prev1');

    let isDragging = false;
    let offset = 0;
    const maxOffset = slider.offsetWidth;
    const minOffset = -876;

    let isPressed = false;
    let cursorX;

    const handleIcons = scrollVal => {
        let maxScrollableWidth = slider.scrollWidth - slider.clientWidth
        console.log(maxScrollableWidth);
    }

    const dragging = (e) => {
        if (!isDragging) return
        sliderContainer.classList.add('dragging');
        /*e.preventDefault();
        if (e.movementX < 0) {
            offset = (parseInt(offset) - sliderContainer.scrollWidth) + 'px';
            moves();
        }*/
/* }

 const dragStop = () => {
     isDragging = false
     sliderContainer.classList.remove('dragging')
 }

 function moves() {
     slider.style['transform'] = `translate3d(${offset}, 0, 0)`;
 }


 /*sliderContainer.addEventListener('mousedown', () => (isDragging = true))
 sliderContainer.addEventListener('mousemove', dragging)
 window.addEventListener('mouseup', dragStop)*/

/* sliderContainer.addEventListener("mousedown", (e) => {
     isPressed = true;
     cursorX = e.offsetX - slider.offsetLeft;
     sliderContainer.classList.add('dragging');
 });

 slider.addEventListener("mousemove", (e) => {
     if (!isPressed) return;
     e.preventDefault();
     /*slider.style.left = `${e.offsetX - cursorX}px`;*/
/*slider.style['transform'] = `translate3d(${e.offsetX - cursorX}px, 0, 0)`;
boundSlides();
});

window.addEventListener("mouseup", () => {
isPressed = false;
sliderContainer.classList.remove('dragging');
});

lnext.addEventListener('click', function () {
if (parseInt(offset) < maxOffset) {
    offset = (parseInt(offset) - (giveSlide[0].offsetWidth + 12)) + 'px';
    moves();
}
}, false)

lprev.addEventListener('click', function () {
if (parseInt(offset) < 0) {
    offset = (parseInt(offset) + (giveSlide[0].offsetWidth + 12)) + 'px';
    moves();
}
}, false)


function boundSlides() {
const containerRect = sliderContainer.getBoundingClientRect();
const cardsRect = slider.getBoundingClientRect();

if (parseInt(slider.style.left) > 0) {
    slider.style.left = 0;
} else if (cardsRect.right < containerRect.right) {
    slider.style.left = `-${cardsRect.width - containerRect.width}px`;
}
}
});*/

window.addEventListener('DOMContentLoaded', () => {
    const getStyle = (s) => window.getComputedStyle(s);
    const sliderContainer = document.querySelector('.give__slider-container'),
        slider = document.querySelector('.give__slider'),
        giveSlide = document.getElementsByClassName('give__slide'),
        lnext = document.querySelector('.give1 #next1'),
        lprev = document.querySelector('.give1 #prev1'),
        sl = giveSlide.length;

    const slideMargin = parseInt(getStyle(giveSlide[0]).marginLeft) + parseInt(getStyle(giveSlide[0]).marginRight);
    const slideWidth = giveSlide[0].offsetWidth;
    const offset = slideMargin + slideWidth;
    var leftSlideCount = 1,
        rightSlideCount = giveSlide.length,
        i = 0,
        d = 0;

    function slideNext() {
        if (leftSlideCount < sl && i <= slider.scrollWidth) {
            const t = document.getElementById('slider');
            (i += offset), (t.style['transform'] = `translate3d(${-i}px, 0, 0)`), (d = i), leftSlideCount++, (rightSlideCount = leftSlideCount);
        }
    }

    function slidePrev() {
        if (rightSlideCount > 0 && d > 0) {
            const t = document.getElementById('slider');
            (d -= offset), (t.style['transform'] = `translate3d(${-d}px, 0, 0)`), (i = d), rightSlideCount--, (leftSlideCount = rightSlideCount);
        }
    }

    lnext.addEventListener('click', slideNext, false);

    lprev.addEventListener('click', slidePrev, false);

    slider.addEventListener('mousedown', () => (isDragging = true));
    /*slider.addEventListener('mousemove', dragging)
    window.addEventListener('mouseup', dragStop)*/
});

/*var leftSlideCount = 1,
    rightSlideCount = 5,
    i = 0,
    d = 0;

function slidePrev() {
    if (leftSlideCount < 5 && i <= 1100) {
        const t = document.getElementById("slider");
        t.style.scrollBehavior = "smooth", t.style.position = "relative", i += 218, t.style.transitionDuration = "1s", t.style.marginLeft = -i + "px", d = i, leftSlideCount++, rightSlideCount = leftSlideCount
    }
}

function slideNext() {
    if (rightSlideCount > 0 && d > 0) {
        const t = document.getElementById("slider");
        t.style.scrollBehavior = "smooth", t.style.position = "relative", d -= 218, t.style.transitionDuration = "1s", t.style.marginLeft = -d + "px", i = d, rightSlideCount--, leftSlideCount = rightSlideCount
    }
}*/
