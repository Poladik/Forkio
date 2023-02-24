"use strict";

const menuButton = document.querySelector(".main-header__menu-button");
const menu = document.querySelector(".main-header__menu");

menuButton.addEventListener("click", (e) => {
  let target = e.target.closest("button");
  target.children[0].classList.toggle("main-header__menu-button-line-1--hidden");
  target.children[1].classList.toggle("main-header__menu-button-line-2--anim");
  target.children[2].classList.toggle("main-header__menu-button-line-3--anim");
  menu.classList.toggle("main-header__menu--open");
});

document.addEventListener("click", (e) => {
  let target = e.target;
  if (
    !menu.contains(target) &&
    !(target.closest("button") === menuButton) &&
    menu.classList.contains("main-header__menu--open")
  ) {
    menuButton.click();
  }
});
