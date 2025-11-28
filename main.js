document.addEventListener("DOMContentLoaded", function () {
  /* ------------------------------------------------------------- */
  /* HEADER : menu visible seulement après la zone grise du HERO    */
  /* ------------------------------------------------------------- */
  const siteHeader = document.querySelector(".site-header");
  const hero = document.getElementById("hero");

  function updateHeaderOnScroll() {
    if (!siteHeader) return;

    // Pages SANS hero (mentions légales, politique, etc.)
    if (!hero) {
      siteHeader.classList.add("site-header--scrolled");
      siteHeader.classList.add("site-header--logo-visible");
      return;
    }

    const heroHeight = hero.offsetHeight || 0;
    const threshold = heroHeight - 80; // limite exacte où le menu doit apparaître

    if (window.scrollY > threshold) {
      siteHeader.classList.add("site-header--scrolled");
      siteHeader.classList.add("site-header--logo-visible");
    } else {
      siteHeader.classList.remove("site-header--scrolled");
      siteHeader.classList.remove("site-header--logo-visible");
    }
  }

  updateHeaderOnScroll();
  window.addEventListener("scroll", updateHeaderOnScroll);

  /* ------------------------------------------------------------- */
  /* MENU BURGER MOBILE                                             */
  /* ------------------------------------------------------------- */
  const burger = document.querySelector(".header__burger");
  const nav = document.querySelector(".header__nav");

  if (burger && nav) {
    burger.addEventListener("click", () => {
      const isOpen = nav.classList.toggle("header__nav--open");
      burger.setAttribute("aria-expanded", isOpen ? "true" : "false");
    });
  }

  /* ------------------------------------------------------------- */
  /* ANNÉE AUTOMATIQUE DANS LE FOOTER                              */
  /* ------------------------------------------------------------- */
  const yearSpan = document.getElementById("year");
  if (yearSpan) {
    yearSpan.textContent = new Date().getFullYear();
  }

  /* ------------------------------------------------------------- */
  /* HERO : ANIMATION LETTRE PAR LETTRE BASÉE SUR LE TEXTE HTML   */
  /* ------------------------------------------------------------- */
  const baselineSpan = document.getElementById("hero-baseline-text");

  if (baselineSpan) {
    const fullText = baselineSpan.textContent.trim();
    baselineSpan.textContent = ""; // on efface tout au début

    let i = 0;
    const speed = 45; // vitesse de frappe

    function typeLetter() {
      if (i <= fullText.length) {
        baselineSpan.textContent = fullText.substring(0, i);
        i++;
        setTimeout(typeLetter, speed);
      }
    }

    // Petit délai pour laisser le logo apparaître avant
    setTimeout(typeLetter, 300);
  }

  /* ------------------------------------------------------------- */
  /* MODAL PROFIL AVOCATS (one-page)                               */
  /* ------------------------------------------------------------- */
  const lawyerModal = document.getElementById("lawyer-modal");
  const modalBackdrop = lawyerModal?.querySelector(".lawyer-modal__backdrop");
  const modalClose = lawyerModal?.querySelector(".lawyer-modal__close");
  const modalName = document.getElementById("modal-name");
  const modalRole = document.getElementById("modal-role");
  const modalEmail = document.getElementById("modal-email");
  const modalLangues = document.getElementById("modal-langues");
  const modalLinkedin = document.getElementById("modal-linkedin");
  const modalBio = document.getElementById("modal-bio");
  const modalMatieres = document.getElementById("modal-matieres");
  const modalPhoto = lawyerModal?.querySelector(".lawyer-modal__photo");

  const lawyerData = {
    aminatou: {
      name: "Maître Aminatou KONÉ",
      role: "Avocat à la Cour – Associée",
      email: "kone@ask-avocats.lu",
      langues: "Français et anglais, compréhension du bambara et de l’espagnol.",
      linkedinUrl: "#",
      bio: `Aminatou KONÉ, originaire de Paris, est avocate aux Barreaux de Luxembourg et de Paris.
Elle est titulaire d’une Licence en droit privé (Université Paris 2 Panthéon-Assas), d’un Master 2 en droit pénal
et sciences criminelles ainsi que d’un Diplôme universitaire de criminologie (Université de Lorraine – Nancy).
Formée à l’EFB, elle a effectué ses stages au Luxembourg pendant deux ans avant de co-fonder ASK Avocats.`,
      matieres: [
        "Droit pénal",
        "Droit routier / permis de conduire",
        "Droit du travail et de la sécurité sociale",
        "Droit de l’immigration et de l’asile",
        "Droits de l’Homme",
        "Droit de la famille",
        "Droit civil général",
        "Droit commercial"
      ],
      photo: "./photos/aminatou.jpg"
    },

    shana: {
      name: "Maître Shana SI ABDALLAH",
      role: "Avocat – Associée",
      email: "siabdallah@ask-avocats.lu",
      langues: "Français, anglais et espagnol.",
      linkedinUrl: "#",
      bio: `Shana SI ABDALLAH est avocate au Barreau de Luxembourg depuis 2020.
Elle est titulaire d’une Licence en droit public et d’un Master 2 en droit public interne et international.
Après avoir exercé dans deux cabinets reconnus, elle co-fonde ASK Avocats.`,
      matieres: [
        "Droit pénal",
        "Droit routier",
        "Droit de l’immigration",
        "Droits de l’Homme",
        "Droit de la famille",
        "Contentieux bail"
      ],
      photo: "./photos/shana.jpg"
    }
  };

  function openLawyerModal(key) {
    const data = lawyerData[key];
    if (!data) return;

    modalName.textContent = data.name;
    modalRole.textContent = data.role;
    modalEmail.textContent = `E-mail : ${data.email}`;
    modalLangues.textContent = `Langues : ${data.langues}`;
    modalBio.textContent = data.bio;

    if (modalLinkedin) modalLinkedin.href = data.linkedinUrl;

    // Matières
    modalMatieres.innerHTML = "";
    data.matieres.forEach((m) => {
      const li = document.createElement("li");
      li.textContent = m;
      modalMatieres.appendChild(li);
    });

    modalPhoto.style.backgroundImage = `url("${data.photo}")`;

    // Ouverture
    lawyerModal.classList.add("lawyer-modal--active");
    lawyerModal.setAttribute("aria-hidden", "false");
    document.body.style.overflow = "hidden";
  }

  function closeLawyerModal() {
    lawyerModal.classList.remove("lawyer-modal--active");
    lawyerModal.setAttribute("aria-hidden", "true");
    document.body.style.overflow = "";
  }

  if (modalBackdrop) modalBackdrop.addEventListener("click", closeLawyerModal);
  if (modalClose) modalClose.addEventListener("click", closeLawyerModal);

  document.addEventListener("keydown", (e) => {
    if (e.key === "Escape") closeLawyerModal();
  });

  /* Gestion des cartes avocats */
  const lawyerCards = document.querySelectorAll(".lawyer-card");
  lawyerCards.forEach((card) => {
    const key = card.getAttribute("data-lawyer");

    card.addEventListener("click", () => {
      if (key) openLawyerModal(key);
    });
  });
});
