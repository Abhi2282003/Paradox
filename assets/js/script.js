'use strict';



/**
 * Add event listener on multiple elements
 */

const addEventOnElements = function (elements, eventType, callback) {
  for (let i = 0, len = elements.length; i < len; i++) {
    elements[i].addEventListener(eventType, callback);
  }
}



/**
 * MOBILE NAVBAR TOGGLER
 */

const navbar = document.querySelector("[data-navbar]");
const navTogglers = document.querySelectorAll("[data-nav-toggler]");

const toggleNav = () => {
  navbar.classList.toggle("active");
  document.body.classList.toggle("nav-active");
}

addEventOnElements(navTogglers, "click", toggleNav);



/**
 * HEADER ANIMATION
 * When scrolled donw to 100px header will be active
 */

const header = document.querySelector("[data-header]");
const backTopBtn = document.querySelector("[data-back-top-btn]");

window.addEventListener("scroll", () => {
  if (window.scrollY > 100) {
    header.classList.add("active");
    backTopBtn.classList.add("active");
  } else {
    header.classList.remove("active");
    backTopBtn.classList.remove("active");
  }
});



/**
 * SLIDER
 */

const slider = document.querySelector("[data-slider]");
const sliderContainer = document.querySelector("[data-slider-container]");
const sliderPrevBtn = document.querySelector("[data-slider-prev]");
const sliderNextBtn = document.querySelector("[data-slider-next]");

let totalSliderVisibleItems = Number(getComputedStyle(slider).getPropertyValue("--slider-items"));
let totalSlidableItems = sliderContainer.childElementCount - totalSliderVisibleItems;

let currentSlidePos = 0;

const moveSliderItem = function () {
  sliderContainer.style.transform = `translateX(-${sliderContainer.children[currentSlidePos].offsetLeft}px)`;
}

/**
 * NEXT SLIDE
 */

const slideNext = function () {
  const slideEnd = currentSlidePos >= totalSlidableItems;

  if (slideEnd) {
    currentSlidePos = 0;
  } else {
    currentSlidePos++;
  }

  moveSliderItem();
}

sliderNextBtn.addEventListener("click", slideNext);

/**
 * PREVIOUS SLIDE
 */

const slidePrev = function () {
  if (currentSlidePos <= 0) {
    currentSlidePos = totalSlidableItems;
  } else {
    currentSlidePos--;
  }

  moveSliderItem();
}

sliderPrevBtn.addEventListener("click", slidePrev);

/**
 * RESPONSIVE
 */
window.addEventListener("resize", function () {
  totalSliderVisibleItems = Number(getComputedStyle(slider).getPropertyValue("--slider-items"));
  totalSlidableItems = sliderContainer.childElementCount - totalSliderVisibleItems;

  moveSliderItem();
});

document.addEventListener('DOMContentLoaded', function () {
  // Auto-advancing slider
  const sliderContainer = document.querySelector('[data-slider-container]');
  const sliderItems = document.querySelectorAll('.slider-item');
  const totalItems = sliderItems.length;
  let currentIndex = 0;

  function moveSliderItem() {
    sliderContainer.style.transform = `translateX(-${sliderItems[currentIndex].offsetLeft}px)`;
  }

  function nextSlide() {
    sliderItems[currentIndex].classList.remove('active');
    currentIndex = (currentIndex + 1) % totalItems;
    sliderItems[currentIndex].classList.add('active');
    moveSliderItem();

    // If it's the last slide, loop back to the first one
    if (currentIndex === 0) {
      setTimeout(() => {
        sliderContainer.style.transition = 'none'; // Disable transition for the immediate jump
        currentIndex = 1;
        moveSliderItem();
        sliderContainer.offsetHeight; // Trigger reflow to apply the immediate jump
        sliderContainer.style.transition = ''; // Re-enable transition for the next slides
      }, 1000); // Set the timeout to match your autoAdvanceInterval
    }
  }

  // Interval for auto-advancing (change the value in milliseconds as needed)
  const autoAdvanceInterval = 3000; // 1 second

  let autoAdvance = setInterval(nextSlide, autoAdvanceInterval);

  // Stop auto-advancing on hover (optional)
  sliderContainer.addEventListener('mouseenter', function () {
    clearInterval(autoAdvance);
  });

  // Resume auto-advancing on mouse leave (optional)
  sliderContainer.addEventListener('mouseleave', function () {
    autoAdvance = setInterval(nextSlide, autoAdvanceInterval);
  });

  // Rest of your existing code (navbar toggler, header animation, slider navigation, responsive code) goes here
});


document.addEventListener('DOMContentLoaded', function () {
  const recentPosts = document.querySelectorAll('.recent-post-card');

  function showAllPosts() {
    recentPosts.forEach(post => {
      post.style.display = 'block';
    });
  }

  // Initial display
  showAllPosts();
});
