const menuEquipe = document.getElementById("menu-equipe");
const submenu = menuEquipe.querySelector(".nav__submenu");

let closeTimeout;

// Quand on survole "Équipe"
menuEquipe.addEventListener("mouseenter", () => {
  clearTimeout(closeTimeout);
  submenu.style.opacity = "1";
  submenu.style.transform = "translateY(0)";
  submenu.style.pointerEvents = "auto";
});

// Quand on quitte "Équipe"
menuEquipe.addEventListener("mouseleave", () => {
  clearTimeout(closeTimeout);

  closeTimeout = setTimeout(() => {
    submenu.style.opacity = "0";
    submenu.style.transform = "translateY(6px)";
    submenu.style.pointerEvents = "none";
  }, 500);
});

document.addEventListener("DOMContentLoaded", function () {
  const siteHeader = document.querySelector(".site-header");
  if (!siteHeader) return;

  function updateHeaderOnScroll() {
    if (window.scrollY > 40) {
      siteHeader.classList.add("site-header--scrolled");
    } else {
      siteHeader.classList.remove("site-header--scrolled");
    }
  }

  updateHeaderOnScroll();
  window.addEventListener("scroll", updateHeaderOnScroll);
});

