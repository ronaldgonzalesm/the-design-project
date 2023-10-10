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

window.addEventListener("resize", (e) => {
    sliderWidth = $slider.offsetWidth;
    slide.style.width = sliderWidth + "px";
});

$slides.forEach(( slide, index )=> {
    slide.style.width = sliderWidth + "px";
    if(index === 0){
        slide.classList.add("slider__slide--active");
    }
})


})