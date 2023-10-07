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

})