"use strict";

const d = document;

d.addEventListener("DOMContentLoaded",e=>{

/** Menu responsive */
let $btnHamburger = d.querySelectorAll('.hamburger');
let $navigation = d.querySelector('.navigation');

$btnHamburger.forEach((btn) => {
    btn.addEventListener("click", e => {
        $navigation.classList.toggle("navigation--active");
    })
});

/** Slider **/

const $slider = document.querySelector('.slider');
const $sliderContent = document.querySelector('.slider__content');
let $slides = d.querySelectorAll('.slider__slide');
let sliderWidth = $slider.offsetWidth;
let totalWidth = sliderWidth * $slides.length;
let countSlides = $slides.length;

let isDragging = false;
let startPosition = 0;
let deltaX = 0;
let currentIndex = 0;

$slides.forEach(( slide, index )=> {
    slide.style.width = sliderWidth + "px";
    if(index === 0){
        slide.classList.add("slider__slide--active");
    }

    totalWidth += sliderWidth;

    window.addEventListener("resize", (e) => {
        totalWidth = 0;
        sliderWidth = $slider.offsetWidth;
        slide.style.width = sliderWidth + "px";
        totalWidth = sliderWidth * (index + 1);
    });

})

$slider.addEventListener('mousedown', (e) => {
    isDragging = true;
    $slider.classList.add('grabbing');
    startPosition = e.clientX - $sliderContent.offsetLeft;
  });
  
  document.addEventListener('mousemove', (e) => {
    if (!isDragging) return;
    e.preventDefault();
    const newPosition = e.clientX - startPosition;
    deltaX = newPosition;
    $sliderContent.style.transform = `translateX(${newPosition}px)`;
  });
  
  document.addEventListener('mouseup', () => {
    if (!isDragging) return;
    isDragging = false;
    $slider.classList.remove('grabbing');
  
    // Determina si debes avanzar o retroceder al soltar el clic
    
    if (deltaX < -sliderWidth / 4 && currentIndex < countSlides - 1) {
      currentIndex++;
    } else if (deltaX > sliderWidth / 4 && currentIndex > 0) {
      currentIndex--;
    }

    // Mueve el slider al índice actual
    const newPosition = -currentIndex * sliderWidth;
    $sliderContent.style.transform = `translateX(${newPosition}px)`;
  });


  $slider.addEventListener('touchstart', (e) => {
    isDragging = true;
    $slider.classList.add('grabbing');
    startPosition = e.touches[0].clientX - $sliderContent.offsetLeft;
});



document.addEventListener('touchmove', (e) => {
    if (!isDragging) return;
    e.preventDefault();
    const newPosition = e.touches[0].clientX - startPosition;
    deltaX = newPosition;
    $sliderContent.style.transform = `translateX(${newPosition}px)`;
});

document.addEventListener('touchend', () => {
    if (!isDragging) return;
    isDragging = false;
    $slider.classList.remove('grabbing');
  
    // Determina si debes avanzar o retroceder al soltar el dedo
    if (deltaX < -sliderWidth / 4 && currentIndex < countSlides - 4) {
      currentIndex++;
    } else if (deltaX > sliderWidth / 4 && currentIndex > 0) {
      currentIndex--;
    }
  
    // Mueve el slider al índice actual
    const newPosition = -currentIndex * sliderWidth;
    $sliderContent.style.transform = `translateX(${newPosition}px)`;
});


})