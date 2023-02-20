"use strict";

const menuButton = document.querySelector(".main-header__menu-button");
const menu = document.querySelector(".main-header__menu");

menuButton.addEventListener("click", (e) => {
  let target = e.target.closest("button");
  for (const svg of target.children) {
    svg.classList.toggle("main-header__btn-svg--hidden");
  }
  menu.classList.toggle("main-header__menu--open");
});

document.addEventListener("click", (e) => {
  let target = e.target;
  if (
    !menu.contains(target) &&
    !(target.closest("button") === menuButton) &&
    menu.classList.contains("main-header__menu--open")
  ) {
    for (const svg of menuButton.children) {
      svg.classList.toggle("main-header__btn-svg--hidden");
    }
    menu.classList.remove("main-header__menu--open");
  }
});
