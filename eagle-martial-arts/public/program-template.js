function setupFaq() {
  document.querySelectorAll(".faq-item").forEach((item) => {
    const button = item.querySelector(".faq-question");

    if (!button) {
      return;
    }

    button.addEventListener("click", () => {
      const isOpen = item.classList.contains("open");

      document.querySelectorAll(".faq-item").forEach((faqItem) => {
        faqItem.classList.remove("open");
        faqItem.querySelector(".faq-question").setAttribute("aria-expanded", "false");
        const icon = faqItem.querySelector(".faq-question i");
        if (icon) {
          icon.setAttribute("data-lucide", "plus");
        }
      });

      if (!isOpen) {
        item.classList.add("open");
        button.setAttribute("aria-expanded", "true");
        const icon = button.querySelector("i");
        if (icon) {
          icon.setAttribute("data-lucide", "minus");
        }
      }

      lucide.createIcons();
    });
  });
}

function setupNav() {
  const nav = document.getElementById("nav");

  if (!nav) {
    return;
  }

  window.addEventListener("scroll", () => {
    nav.classList.toggle("scrolled", window.scrollY > 24);
  });
}

function setupMobileMenu() {
  const toggle = document.querySelector(".nav-toggle");
  const menu = document.getElementById("mobileMenu");
  if (!toggle || !menu) return;

  toggle.addEventListener("click", (e) => {
    e.stopPropagation();
    const open = toggle.getAttribute("aria-expanded") === "true";
    toggle.setAttribute("aria-expanded", String(!open));
    menu.setAttribute("data-open", String(!open));
  });

  menu.querySelectorAll("a").forEach((a) => {
    a.addEventListener("click", () => {
      toggle.setAttribute("aria-expanded", "false");
      menu.setAttribute("data-open", "false");
    });
  });

  document.addEventListener("click", (e) => {
    if (
      !toggle.contains(e.target) &&
      !menu.contains(e.target) &&
      menu.getAttribute("data-open") === "true"
    ) {
      toggle.setAttribute("aria-expanded", "false");
      menu.setAttribute("data-open", "false");
    }
  });
}

document.addEventListener("DOMContentLoaded", () => {
  lucide.createIcons();
  setupFaq();
  setupNav();
  setupMobileMenu();

  const year = document.getElementById("footer-year");
  if (year) {
    year.textContent = new Date().getFullYear();
  }
});
