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

document.addEventListener("DOMContentLoaded", () => {
  lucide.createIcons();
  setupFaq();
  setupNav();

  const year = document.getElementById("footer-year");
  if (year) {
    year.textContent = new Date().getFullYear();
  }
});
