"use strict";

const d = document;
const w = window;

d.addEventListener("DOMContentLoaded",e=>{

/** Menu responsive **/
let $btnHamburger = d.querySelectorAll('.hamburger');
let $navigation = d.querySelector('.navigation');

$btnHamburger.forEach((btn) => {
    btn.addEventListener("click", e => {
        $navigation.classList.toggle("navigation--active");
    })
});

/** Slider **/
const $slider = d.querySelector('.slider'),
$sliderContent = d.querySelector('.slider__content');
let $slides = d.querySelectorAll('.slider__slide'),
sliderWidth = $slider.offsetWidth,
totalWidth = sliderWidth * $slides.length,
countSlides = $slides.length,
isDragging = false,
isMoving = false,
startPosition = 0,
deltaX = 0,
currentIndex = 0;
const $arrowLeft = document.querySelector('.slider__arrow--left'),
$arrowRight = document.querySelector('.slider__arrow--right');

$slides.forEach((slide) => {
  slide.style.width = sliderWidth + "px";
  totalWidth += sliderWidth;
});

w.addEventListener("resize", () => {
  sliderWidth = $slider.offsetWidth;
  $slides.forEach((slide) => {
    slide.style.width = sliderWidth + "px";
  });
  totalWidth = sliderWidth * $slides.length;
  const newPosition = -currentIndex * sliderWidth;
  $sliderContent.style.transform = `translateX(${newPosition}px)`;
});

function startDrag(e, clientX) {
  isDragging = true;
  $slider.classList.add('grabbing');
  startPosition = clientX - $sliderContent.offsetLeft;
}

function isFinal(currentIndex, countSlides){
  let current = currentIndex + 2;
  if(current === countSlides){
    return true;
  }
  return false;
}

function isStart(currentIndex, countSlides){
  let current = currentIndex;
  if(current === 1){
    return true;
  }
  return false;
}

$slider.addEventListener('mousedown', (e) => startDrag(e, e.clientX));

d.addEventListener('mousemove', (e) => {
  if (!isDragging) return;
  e.preventDefault();
  const newPosition = e.clientX - startPosition;
  deltaX = newPosition;

  if (Math.abs(deltaX) < 10) {
    isMoving = true;
    return;
  }

  isMoving = true;
  $sliderContent.style.transform = `translateX(${newPosition}px)`;
});

d.addEventListener('mouseup', () => {

  isDragging = false;
  $slider.classList.remove('grabbing');

  if (isMoving) {
    if (deltaX < -sliderWidth / 4 && currentIndex < countSlides - 1) {
      currentIndex++;

    } else if (deltaX > sliderWidth / 4 && currentIndex > 0) {
      currentIndex--;
    }

    if(isStart(currentIndex + 1, countSlides)){
      $arrowLeft.classList.add("arrow-disable");
    }
    else{
      $arrowLeft.classList.remove("arrow-disable");
    }

    if(isFinal(currentIndex - 1, countSlides)){
      $arrowRight.classList.add("arrow-disable");
    }
    else{
      $arrowRight.classList.remove("arrow-disable");
    }

    const newPosition = -currentIndex * sliderWidth;
    $sliderContent.style.transform = `translateX(${newPosition}px)`;
  }
  isMoving = false;
});


$arrowLeft.addEventListener('click', () => {
    $arrowRight.classList.remove("arrow-disable");
    if(isStart(currentIndex, countSlides)){
      $arrowLeft.classList.add("arrow-disable");
    }
    else{
      $arrowLeft.classList.remove("arrow-disable");
    }
  if (currentIndex > 0) {
    currentIndex--;
    const newPosition = -currentIndex * sliderWidth;
    $sliderContent.style.transform = `translateX(${newPosition}px)`;

  }
});

$arrowRight.addEventListener('click', () => {
  $arrowLeft.classList.remove("arrow-disable");
  if(isFinal(currentIndex, countSlides)){
    $arrowRight.classList.add("arrow-disable");
  }
  else{
    $arrowRight.classList.remove("arrow-disable");
  }
  if (currentIndex < countSlides - 1) {
    currentIndex++;
    const newPosition = -currentIndex * sliderWidth;
    $sliderContent.style.transform = `translateX(${newPosition}px)`;
    
  }
  
});


/** Tabs **/

let $discountsOptions = d.querySelectorAll('.discounts__option');
$discountsOptions.forEach((option)=>{
  option.addEventListener("click", e => {

    $discountsOptions.forEach((option)=>{
      option.classList.remove("discounts__option--active");
    })

    option.classList.add("discounts__option--active");
})
})

})