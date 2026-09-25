// Deepstream Standalone JavaScript

document.addEventListener("DOMContentLoaded", () => {
  // 1. Header scroll effect
  const header = document.querySelector(".header");
  window.addEventListener("scroll", () => {
    if (window.scrollY > 20) {
      header?.classList.add("scrolled");
    } else {
      header?.classList.remove("scrolled");
    }
  });

  // 2. Mobile Menu Toggle
  const mobileToggle = document.querySelector(".mobile-toggle");
  const navLinks = document.querySelector(".nav-links");
  mobileToggle?.addEventListener("click", () => {
    if (navLinks) {
      navLinks.style.display =
        navLinks.style.display === "flex" ? "none" : "flex";
      navLinks.style.flexDirection = "column";
      navLinks.style.position = "absolute";
      navLinks.style.top = "100%";
      navLinks.style.left = "0";
      navLinks.style.right = "0";
      navLinks.style.background = "#072136";
      navLinks.style.padding = "1.5rem";
    }
  });

  // 3. Featured Slider
  const slides = [
    {
      tag: "Strategic Advisory",
      iconInner:
        '<rect x="2" y="7" width="20" height="14" rx="2" ry="2"></rect><path d="M16 21V5a2 2 0 0 0-2-2h-4a2 2 0 0 0-2 2v16"></path>',
      title: "Business Consulting",
      desc: "Bespoke operational and technical advisory tailored to unlock organizational velocity and digital ROI.",
    },
    {
      tag: "Talent Augmentation",
      iconInner:
        '<path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"></path><circle cx="9" cy="7" r="4"></circle><path d="M23 21v-2a4 4 0 0 0-3-3.87"></path><path d="M16 3.13a4 4 0 0 1 0 7.75"></path>',
      title: "IT Staffing Augmentation",
      desc: "Skilled full-stack developers and tech leads who seamlessly extend your sprint capacity in 48 hours.",
    },
    {
      tag: "Flexible Staffing",
      iconInner:
        '<polygon points="12 2 2 7 12 12 22 7 12 2"></polygon><polyline points="2 17 12 22 22 17"></polyline><polyline points="2 12 12 17 22 12"></polyline>',
      title: "Contract Staffing",
      desc: "Flexible contract talent for specialized, time-sensitive and mission-critical engineering initiatives.",
    },
    {
      tag: "Managed Teams",
      iconInner:
        '<path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"></path>',
      title: "Global Outsourcing",
      desc: "Reliable managed operations and dedicated software pods built around your precise technical SLAs.",
    },
    {
      tag: "Full-Cycle Engineering",
      iconInner:
        '<polyline points="16 18 22 12 16 6"></polyline><polyline points="8 6 2 12 8 18"></polyline>',
      title: "Software Development",
      desc: "Dependable, scalable cloud architectures and AI systems designed around your users and high throughput.",
    },
    {
      tag: "Revenue & Growth",
      iconInner:
        '<polyline points="23 6 13.5 15.5 8.5 10.5 1 18"></polyline><polyline points="17 6 23 6 23 12"></polyline>',
      title: "Digital Marketing",
      desc: "Focused conversion funnels and inbound engines that expand your market reach and qualified pipeline.",
    },
  ];

  let currentSlide = 0;
  const slideTag = document.getElementById("slide-tag");
  const slideIcon = document.getElementById("slide-icon");
  const slideCount = document.getElementById("slide-count");
  const slideTitle = document.getElementById("slide-title");
  const slideDesc = document.getElementById("slide-desc");
  const dots = document.querySelectorAll(".dot");
  const prevBtn = document.getElementById("slider-prev");
  const nextBtn = document.getElementById("slider-next");
  const svg = document.createElement("svg");

  function renderSlide(idx) {
    currentSlide = (idx + slides.length) % slides.length;
    if (slideTag) slideTag.textContent = slides[currentSlide].tag;
    if (slideIcon)
      slideIcon.innerHTML = `<svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="#ffffff" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round">${slides[currentSlide].iconInner}</svg>`;
    if (slideCount)
      slideCount.textContent = `Slide ${currentSlide + 1} of ${slides.length}`;
    if (slideTitle) slideTitle.textContent = slides[currentSlide].title;
    if (slideDesc) slideDesc.textContent = slides[currentSlide].desc;
    dots.forEach((d, i) => {
      d.classList.toggle("active", i === currentSlide);
    });
  }

  prevBtn?.addEventListener("click", () => renderSlide(currentSlide - 1));
  nextBtn?.addEventListener("click", () => renderSlide(currentSlide + 1));
  dots.forEach((dot) => {
    dot.addEventListener("click", () => {
      const idx = parseInt(dot.getAttribute("data-index") || "0", 10);
      renderSlide(idx);
    });
  });

  let slideInterval = setInterval(() => renderSlide(currentSlide + 1), 4500);
  const sliderCard = document.querySelector(".hero-slider-card");
  sliderCard?.addEventListener("mouseenter", () =>
    clearInterval(slideInterval),
  );
  sliderCard?.addEventListener("mouseleave", () => {
    slideInterval = setInterval(() => renderSlide(currentSlide + 1), 4500);
  });

  // 4. Process Tabs
  const tabBtns = document.querySelectorAll(".tab-btn");
  const consultingSteps = document.getElementById("consulting-steps");
  const developingSteps = document.getElementById("developing-steps");

  tabBtns.forEach((btn) => {
    btn.addEventListener("click", () => {
      tabBtns.forEach((b) => b.classList.remove("active"));
      btn.classList.add("active");
      const tab = btn.getAttribute("data-tab");
      if (tab === "consulting") {
        if (consultingSteps) consultingSteps.style.display = "grid";
        if (developingSteps) developingSteps.style.display = "none";
      } else {
        if (consultingSteps) consultingSteps.style.display = "none";
        if (developingSteps) developingSteps.style.display = "grid";
      }
    });
  });

  // 5. Contact Form Handler

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
          contactStatus.innerHTML = `
        <div style="padding: 1rem; border-radius: 8px; background: #ecfdf5; border: 1px solid #10b981; color: #065f46; margin-bottom: 1rem; font-size: 0.85rem;">
          <strong>Thank you, ${name}!</strong> Your inquiry has been received. Our solutions engineering team will reach out within 4 business hours.
        </div>
      `;

          // Remove message after 3 seconds
          setTimeout(() => {
            contactStatus.textContent = "";
            contactStatus.className = "contact__status"; // reset to neutral
          }, 5000);
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
});
