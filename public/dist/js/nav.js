const navBtn = document.querySelector(".nav-btn");
const burger = document.querySelector(".burger");
const nav = document.querySelector(".nav");
const overlay = document.querySelector(".overlay");
let displayMenu = false;

// Handlle overlay operations
const openOverlay = () => overlay.classList.add("open");
const closeOverlay = () => overlay.classList.remove("open");

navBtn.addEventListener("click", () => {
  if (!displayMenu) {
    // Open the navigation menu
    openOverlay();
    nav.classList.add("open");
    burger.classList.add("open");
    displayMenu = true;
  } else if (displayMenu) {
    // Close the navigation menu
    closeOverlay();
    nav.classList.remove("open");
    burger.classList.remove("open");
    displayMenu = false;
  }
});
