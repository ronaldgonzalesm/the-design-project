"use strict";

const d = document;

/** Menu responsive */
let $btnHamburger = d.querySelectorAll('.hamburger');
let $navigation = d.querySelector('.navigation');

$btnHamburger.forEach((btn) => {
    btn.addEventListener("click", e => {
        $navigation.classList.toggle("navigation--active");
    })
});

/** Triangles textures **/

let sectionBenefits = d.querySelector('.benefits');
let triangleTop = d.querySelector('.benefits__triangle-top > div');
window.addEventListener("scroll", e => {
    let scroll = window.scrollY;
    let scrollBenefits = sectionBenefits.scrollTop;
    console.log(scrollBenefits);
    if(scroll >= scrollBenefits){
        triangleTop.style.transform = 'translateY(-' + scroll / 10 + 'px)';
        //console.log(triangleTop.scrollTop);
        console.log(scroll);
    }
})