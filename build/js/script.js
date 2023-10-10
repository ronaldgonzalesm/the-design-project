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

let isDragging = false;
let startPosition = 0;
let deltaX = 0;

$slides.forEach(( slide, index )=> {
    slide.style.width = sliderWidth + "px";
    if(index === 0){
        slide.classList.add("slider__slide--active");
    }

    console.log(index);

    addEventListener("resize", (e) => {
        sliderWidth = $slider.offsetWidth;
        slide.style.width = sliderWidth + "px";
    });

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
        if (deltaX < -576) {
          // Avanzar al siguiente slide
          // Puedes agregar lógica para determinar el siguiente slide aquí
          $sliderContent.style.transform = `translateX(-1152px)`;
        } else {
          // Volver al slide actual
          $sliderContent.style.transform = 'translateX(0)';
        }
    });

})

})