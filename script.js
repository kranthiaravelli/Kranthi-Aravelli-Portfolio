const menuToggle = document.getElementById("menu-toggle");
const navElements = document.getElementById("nav-elements");

menuToggle.addEventListener("click", () => {
    navElements.classList.toggle("active");
})