const header = document.getElementById("header");
const menuToggle = document.getElementById("menuToggle");
const navMenu = document.getElementById("navMenu");
const navLinks = document.querySelectorAll(".nav-link");
const sections = document.querySelectorAll("main section");

function closeMenu() {
  navMenu.classList.remove("open");
  menuToggle.setAttribute("aria-expanded", "false");
}

menuToggle.addEventListener("click", () => {
  const open = navMenu.classList.toggle("open");
  menuToggle.setAttribute("aria-expanded", open);
});

navLinks.forEach(link => {
  link.addEventListener("click", closeMenu);
});

window.addEventListener("scroll", () => {
  header.classList.toggle("scrolled", window.scrollY > 20);

  let current = "home";

  sections.forEach(section => {
    const sectionTop = section.offsetTop - 150;
    if (window.scrollY >= sectionTop) current = section.id;
  });

  navLinks.forEach(link => {
    link.classList.toggle(
      "active",
      link.getAttribute("href") === `#${current}`
    );
  });
});

const revealItems = document.querySelectorAll(".reveal");

const observer = new IntersectionObserver(
  entries => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add("visible");
        observer.unobserve(entry.target);
      }
    });
  },
  { threshold: 0.12 }
);

revealItems.forEach(item => observer.observe(item));

document.querySelectorAll(".video-media video").forEach(video => {
  const media = video.closest(".video-media");

  video.addEventListener("error", () => media.classList.add("video-error"));
  video.addEventListener("loadeddata", () => media.classList.remove("video-error"));
});

const contactForm = document.getElementById("contactForm");
const formNote = document.getElementById("formNote");

contactForm.addEventListener("submit", event => {
  event.preventDefault();

  const name = document.getElementById("name").value.trim();
  const email = document.getElementById("email").value.trim();
  const message = document.getElementById("message").value.trim();

  if (!name || !email || !message) {
    formNote.textContent = "Please complete all fields.";
    return;
  }

  const subject = encodeURIComponent(`Portfolio Contact from ${name}`);
  const body = encodeURIComponent(
    `Name: ${name}\nEmail: ${email}\n\nMessage:\n${message}`
  );

  window.location.href =
    `mailto:bothinaosama058@gmail.com?subject=${subject}&body=${body}`;

  formNote.textContent = "Opening your email app...";
  contactForm.reset();
});

// Keep the mobile menu closed when resizing back to desktop.
window.addEventListener("resize", () => {
  if (window.innerWidth > 780) closeMenu();
});
