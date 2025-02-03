document.addEventListener("DOMContentLoaded", function () {
    const menuToggle = document.getElementById("menu-toggle");
    const navMenu = document.getElementById("nav-menu");

    if (!menuToggle || !navMenu) {
        console.error("menu-toggle eller nav-menu saknas i HTML!");
        return;
    }

    menuToggle.addEventListener("click", function () {
        navMenu.classList.toggle("show-menu");
    });

    document.addEventListener("click", function (event) {
        if (!navMenu.contains(event.target) && !menuToggle.contains(event.target)) {
            navMenu.classList.remove("show-menu");
        }
    });
});
