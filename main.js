document.addEventListener("DOMContentLoaded", function () {
  /* HEADER : changement au scroll */
  const siteHeader = document.querySelector(".site-header");

  function updateHeaderOnScroll() {
    if (!siteHeader) return;
    if (window.scrollY > 40) {
      siteHeader.classList.add("site-header--scrolled");
    } else {
      siteHeader.classList.remove("site-header--scrolled");
    }
  }

  updateHeaderOnScroll();
  window.addEventListener("scroll", updateHeaderOnScroll);

  /* MENU BURGER MOBILE */
  const burger = document.querySelector(".header__burger");
  const nav = document.querySelector(".header__nav");

  if (burger && nav) {
    burger.addEventListener("click", () => {
      const isOpen = nav.classList.toggle("header__nav--open");
      burger.setAttribute("aria-expanded", isOpen ? "true" : "false");
    });
  }

  /* ANNÉE AUTOMATIQUE DANS LE FOOTER */
  const yearSpan = document.getElementById("year");
  if (yearSpan) {
    yearSpan.textContent = new Date().getFullYear();
  }

  /* MODAL PROFIL AVOCATS (one-page) */
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
      langues:
        "Français et anglais, compréhension du bambara et de l’espagnol.",
      linkedinUrl: "#", // TODO: mettre l’URL réelle du profil LinkedIn
      bio: `Aminatou KONÉ, originaire de Paris, est avocate aux Barreaux de Luxembourg et de Paris.
Elle est titulaire d’une Licence en droit privé (Université Paris 2 Panthéon-Assas), d’un Master 2 en droit pénal
et sciences criminelles ainsi que d’un Diplôme universitaire de criminologie (Université de Lorraine – Nancy).
Formée à l’École de Formation du Barreau de Paris (EFB), elle a effectué ses stages d’élève-avocate au Luxembourg
en 2020, où elle s’est formée aux particularités du droit luxembourgeois pendant deux ans.
Après avoir prêté serment à Paris le 31 janvier 2022 avec autorisation d’exercer à l’étranger, elle a été admise au
Barreau de Luxembourg le 17 février 2022.
Elle a ensuite exercé dans deux cabinets reconnus en contentieux au Luxembourg avant de co-fonder le cabinet
ASK Avocats aux côtés de Maître Shana SI ABDALLAH.
Aminatou KONÉ est également membre du Conseil d’administration de l’Association Luxembourgeoise des Avocats
Pénalistes (ALAP).`,
      matieres: [
        "Droit pénal",
        "Droit routier / permis de conduire",
        "Droit du travail et de la sécurité sociale",
        "Droit de l’immigration et de l’asile",
        "Droits de l’Homme et libertés publiques",
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
      linkedinUrl: "#", // TODO: mettre l’URL réelle du profil LinkedIn
      bio: `Shana SI ABDALLAH est avocate au Barreau de Luxembourg depuis 2020.
Elle est titulaire d’une Licence en droit public – parcours droit des pays de Common Law (Université de Lorraine – Nancy),
et d’un Master 2 en droit public interne et international (Université de Lorraine – Nancy).
Après avoir exercé dans deux cabinets reconnus en contentieux au Luxembourg, elle a co-fondé l’étude ASK Avocats aux
côtés de Maître Aminatou KONÉ.
Shana SI ABDALLAH est membre du Comité éditorial de l’Institut Luxembourgeois des Droits de l’Homme (ILDH) et membre
de l’Association Luxembourgeoise des Avocats pénalistes (ALAP).`,
      matieres: [
        "Droit pénal",
        "Droit routier / permis de conduire",
        "Droit de l’immigration et de l’asile",
        "Droits de l’Homme et libertés publiques",
        "Droit de la famille",
        "Contentieux en matière de bail"
      ],
      photo: "./photos/shana.jpg"
    }
  };

  function openLawyerModal(key) {
    if (
      !lawyerModal ||
      !modalName ||
      !modalRole ||
      !modalEmail ||
      !modalLangues ||
      !modalBio ||
      !modalMatieres ||
      !modalPhoto
    )
      return;

    const data = lawyerData[key];
    if (!data) return;

    modalName.textContent = data.name;
    modalRole.textContent = data.role;
    modalEmail.textContent = `E-mail : ${data.email}`;
    modalLangues.textContent = `Langues : ${data.langues}`;
    modalBio.textContent = data.bio;

    if (modalLinkedin) {
      modalLinkedin.href = data.linkedinUrl || "#";
    }

    modalMatieres.innerHTML = "";
    data.matieres.forEach((m) => {
      const li = document.createElement("li");
      li.textContent = m;
      modalMatieres.appendChild(li);
    });

    modalPhoto.style.backgroundImage = `url("${data.photo}")`;

    lawyerModal.classList.add("lawyer-modal--active");
    lawyerModal.setAttribute("aria-hidden", "false");
    document.body.style.overflow = "hidden";
  }

  function closeLawyerModal() {
    if (!lawyerModal) return;
    lawyerModal.classList.remove("lawyer-modal--active");
    lawyerModal.setAttribute("aria-hidden", "true");
    document.body.style.overflow = "";
  }

  if (modalBackdrop) {
    modalBackdrop.addEventListener("click", closeLawyerModal);
  }
  if (modalClose) {
    modalClose.addEventListener("click", closeLawyerModal);
  }
  document.addEventListener("keydown", (e) => {
    if (e.key === "Escape") {
      closeLawyerModal();
    }
  });

  /* Clic sur les cartes et sur le bouton "Voir le profil" */
  const lawyerCards = document.querySelectorAll(".lawyer-card");
  lawyerCards.forEach((card) => {
    const key = card.getAttribute("data-lawyer");
    const overlay = card.querySelector(".lawyer-overlay");
    const linkBtn = card.querySelector(".lawyer-card__link");

    if (overlay) {
      overlay.addEventListener("click", () => {
        if (key) openLawyerModal(key);
      });
    }

    if (linkBtn) {
      linkBtn.addEventListener("click", () => {
        if (key) openLawyerModal(key);
      });
    }
  });
});
