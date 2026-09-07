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
