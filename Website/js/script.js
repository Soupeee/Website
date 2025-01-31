let currentSlide = 0;
const slides = document.querySelectorAll(".carousel-slide");

function showSlide(slideIndex) {
    if (slideIndex >= slides.length) {
        currentSlide = 0;
    } else if (slideIndex < 0) {
        currentSlide = slides.length - 1;
    } else {
        currentSlide = slideIndex;
    }
    const offset = -currentSlide * 100;
    document.querySelector(".carousel").style.transform = `translateX(${offset}%)`;
}

function moveSlide(direction) {
    showSlide(currentSlide + direction);
}

// Initialize the carousel with the first slide
showSlide(currentSlide);

// Optional: Auto-slide every 5 seconds
setInterval(() => {
    moveSlide(1);
}, 5000);
