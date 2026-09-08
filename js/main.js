function loadComponent(id, file) {
  fetch(file)
    .then((response) => response.text())
    .then((data) => (document.getElementById(id).innerHTML = data));
}

loadComponent("header", "components/header.html");
loadComponent("footer", "components/footer.html");

function updateHeaderOnScroll() {
  const header = document.querySelector(".header");

  if (header) {
    header.classList.toggle("header--scrolled", window.scrollY > 10);
  }
}

window.addEventListener("scroll", updateHeaderOnScroll);
updateHeaderOnScroll();

const menuToggle = document.getElementById("menu-toggle");
const navLinks = document.getElementById("nav-links");

if (menuToggle && navLinks) {
  menuToggle.addEventListener("click", () => {
    navLinks.classList.toggle("show");
  });
}

document.querySelectorAll(".process__tab-btn").forEach((button) => {
  button.addEventListener("click", () => {
    const tabId = button.getAttribute("data-tab");

    // Remove active state from all buttons
    document
      .querySelectorAll(".process__tab-btn")
      .forEach((btn) => btn.classList.remove("process__tab-btn--active"));
    button.classList.add("process__tab-btn--active");

    // Hide all tab contents
    document
      .querySelectorAll(".process__tab-content")
      .forEach((content) =>
        content.classList.remove("process__tab-content--active"),
      );

    // Show selected tab
    document
      .getElementById(tabId)
      .classList.add("process__tab-content--active");
  });
});

const heroSlider = document.querySelector(".hero-slider");

if (heroSlider) {
  const track = heroSlider.querySelector(".hero-slider__track");
  const slides = heroSlider.querySelectorAll(".hero-slider__slide");
  const dots = heroSlider.querySelectorAll(".hero-slider__dot");
  const arrowButtons = heroSlider.querySelectorAll("[data-slider-direction]");
  let currentSlide = 0;
  let autoSlide;

  function showSlide(index) {
    currentSlide = (index + slides.length) % slides.length;
    track.style.transform = `translateX(-${currentSlide * 100}%)`;

    slides.forEach((slide, slideIndex) => {
      slide.classList.toggle(
        "hero-slider__slide--active",
        slideIndex === currentSlide,
      );
    });
    dots.forEach((dot, dotIndex) => {
      dot.classList.toggle(
        "hero-slider__dot--active",
        dotIndex === currentSlide,
      );
    });
  }

  function restartAutoSlide() {
    window.clearInterval(autoSlide);
    autoSlide = window.setInterval(() => showSlide(currentSlide + 1), 5000);
  }

  arrowButtons.forEach((button) => {
    button.addEventListener("click", () => {
      const direction = button.dataset.sliderDirection === "next" ? 1 : -1;
      showSlide(currentSlide + direction);
      restartAutoSlide();
    });
  });

  dots.forEach((dot) => {
    dot.addEventListener("click", () => {
      showSlide(Number(dot.dataset.slide));
      restartAutoSlide();
    });
  });

  heroSlider.addEventListener("mouseenter", () =>
    window.clearInterval(autoSlide),
  );
  heroSlider.addEventListener("mouseleave", restartAutoSlide);
  heroSlider.addEventListener("focusin", () => window.clearInterval(autoSlide));
  heroSlider.addEventListener("focusout", restartAutoSlide);
  showSlide(0);
  restartAutoSlide();
}

const contactForm = document.getElementById("contact-form");
const contactStatus = document.getElementById("contact-status");

if (contactForm && contactStatus) {
  contactForm.addEventListener("reset", () => {
    contactStatus.textContent = "";
    contactStatus.className = "contact__status";
  });

  contactForm.addEventListener("submit", (event) => {
    event.preventDefault();

    if (!contactForm.checkValidity()) {
      contactForm.reportValidity();
      return;
    }

    const formData = new FormData(contactForm);
    const submission = Object.fromEntries(formData.entries());

    emailjs
      .send("service_o7kwwbq", "template_ueccszl", submission)
      .then(() => {
        contactForm.reset();
        contactStatus.textContent = `Thanks ${submission.user_name}. Your message has been sent!`;
        contactStatus.className = "contact__status contact__status--success";

        // Remove message after 3 seconds
        setTimeout(() => {
          contactStatus.textContent = "";
          contactStatus.className = "contact__status"; // reset to neutral
        }, 3000);
      })
      .catch((error) => {
        contactStatus.textContent = "Oops! Something went wrong.";
        contactStatus.className = "contact__status contact__status--error";

        // Remove error after 3 seconds
        setTimeout(() => {
          contactStatus.textContent = "";
          contactStatus.className = "contact__status";
        }, 3000);

        console.error("EmailJS error:", error);
      });

    console.log(submission);
  });
}
