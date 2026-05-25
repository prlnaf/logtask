document.addEventListener("DOMContentLoaded", () => {

    // =====================
    // Header Menu
    // =====================
    const menuButton = document.querySelector(".header__menu");
    const nav = document.querySelector("#global-nav");
  
    if (menuButton && nav) {
      menuButton.addEventListener("click", () => {
        const isOpen = menuButton.getAttribute("aria-expanded") === "true";
  
        menuButton.setAttribute("aria-expanded", String(!isOpen));
        menuButton.classList.toggle("is-open", !isOpen);
        nav.classList.toggle("is-open", !isOpen);
        document.body.classList.toggle("is-menu-open", !isOpen);
      });
  
      const navLinks = nav.querySelectorAll("a");
  
      navLinks.forEach((link) => {
        link.addEventListener("click", () => {
          menuButton.setAttribute("aria-expanded", "false");
          menuButton.classList.remove("is-open");
          nav.classList.remove("is-open");
          document.body.classList.remove("is-menu-open");
        });
      });
    }
  
  });