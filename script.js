document.addEventListener("DOMContentLoaded", function () {
    const menuToggle = document.querySelector("#menu-toggle");
    const navMenu = document.querySelector("#nav-menu");

    menuToggle.addEventListener("click", function () {
        navMenu.classList.toggle("show-menu");
    });

    document.addEventListener("click", function (event) {
        if (!navMenu.contains(event.target) && !menuToggle.contains(event.target)) {
            navMenu.classList.remove("show-menu");
        }
    });

    menuToggle.addEventListener("click", function() {
        menuToggle.classList.toggle("active");
    });
});
