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

d.addEventListener("click",e=>{
  if(!e.target.matches(".navigation a")) return false;
  $navigation.classList.toggle("navigation--active");
});

/** Items menu active **/
const sections = d.querySelectorAll("section");
const navLinks = d.querySelectorAll(".navigation__link");
d.addEventListener("scroll", e => {
  let current = "";
  sections.forEach((section) => {
    const sectionTop = section.offsetTop;
    if (w.scrollY >= sectionTop - 100) {
      current = section.getAttribute("id");
    }
  });

  // Remove class 'navigation__link--active' all items menu
  navLinks.forEach((navLink) => {
    navLink.classList.remove("navigation__link--active");
  });

  // Add class 'navigation__link--active' item current menu
  if (current) {
    const activeNavLink = d.querySelector(`.navigation__link[href="#${current}"]`);
    if (activeNavLink) {
      activeNavLink.classList.add("navigation__link--active");
    }
  }
});


/** Header sticky **/
let $header = d.querySelector(".header"),
headerHeight = $header.offsetHeight;
w.addEventListener("scroll", (e)=>{
  let currentScroll = w.scrollY;
  if(currentScroll >= headerHeight){
    $header.classList.add("header--sticky");
    setTimeout(()=>{
      $header.classList.add("header--showed");
    }, 100);
  }
  else{
    $header.classList.remove("header--sticky");
    $header.classList.remove("header--showed");
  }
})


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

let $discountsOptions = d.querySelectorAll('.discounts__option'),
$tabs = d.querySelectorAll('.tab'),
formatNumber = new Intl.NumberFormat('en-US');

$discountsOptions.forEach((option)=>{
  option.addEventListener("click", e => {

    $discountsOptions.forEach((option)=>{
      option.classList.remove("discounts__option--active");
    })

    option.classList.add("discounts__option--active");
    let discount = option.querySelector(".discounts__percentage") !== null;
    if(discount){
      let percentage = option.querySelector(".discounts__percentage").getAttribute("data-percentage");
      $tabs.forEach((tab)=>{
        let tabPrice = tab.querySelector(".tab__price"),
        tabDiscount = tab.querySelector(".tab__discount"),
        price = tab.querySelector(".tab__price").getAttribute("data-price"),
        priceDiscount = parseInt(price - ( price * percentage / 100)),
        priceTotal = formatNumber.format(priceDiscount);
        tabPrice.textContent = `$${priceTotal}`;
        tabDiscount.classList.add("tab__discount--active");
      })
    }
    else{
      $tabs.forEach((tab)=>{
        let tabPrice = tab.querySelector(".tab__price"),
        tabDiscount = tab.querySelector(".tab__discount"),
        price = formatNumber.format(tab.querySelector(".tab__price").getAttribute("data-price"));
        tabPrice.textContent = `$${price}`;
        tabDiscount.classList.remove("tab__discount--active");
      })
    }
})
})

/** Alternator tabs **/
let $alternatorOptions = d.querySelectorAll('.alternator__option'),
$mytabs = d.querySelectorAll('.tab');

$alternatorOptions.forEach((option)=>{
  option.addEventListener("click", e => {
    $alternatorOptions.forEach((option)=>{
      option.classList.remove("alternator__option--active");
      option.setAttribute("aria-selected", "false");
    })

    option.classList.add("alternator__option--active");
    option.setAttribute("aria-selected", "true");
    let optionId = option.id.replace(/-tab/g, '');

    $mytabs.forEach((tab)=>{
      let dataTab = tab.getAttribute("data-tab");
      tab.classList.remove("tab--active");
      if(optionId === dataTab){
        tab.classList.add("tab--active");
      }
    })
    
})
})

let $accordion = d.querySelector('.accordion');

if($accordion !== 'undefined' && $accordion != null){

    const $accordions = d.querySelectorAll('.accordion__item');
    $accordions.forEach(accordion => {
      let accordionContent = accordion.querySelector(".accordion__info");
      let accordionTitle = accordion.querySelector(".accordion__title");
      accordionTitle.addEventListener("click", e => {
        let isOpened = accordionContent.classList.contains("opened");
        $accordions.forEach(item => {
            let contentItem = item.querySelector(".accordion__info");
            let contentTitle = item.querySelector(".accordion__title");
            
            contentItem.classList.remove("opened");
            contentItem.style.maxHeight = "0";
            contentTitle.classList.remove("accordion__title--active");
        });  
        if (!isOpened) {
            accordionContent.classList.add("opened");
            accordionContent.style.maxHeight = accordionContent.scrollHeight + "px";
            accordionTitle.classList.add("accordion__title--active");
        }
      });
    });

}

})