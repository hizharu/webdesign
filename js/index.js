/* ====================================
           MOBILE MENU FUNCTIONALITY
           Handles responsive navigation menu
        ==================================== */
const mobileMenuBtn = document.getElementById("mobile-menu-btn");
const navbar = document.getElementById("navbar");

// bikin elemen menu
const mobileMenu = document.createElement("div");
mobileMenu.className =
  "absolute top-16 left-0 w-full md:hidden bg-white shadow-lg rounded-lg p-4 space-y-2 hidden";
mobileMenu.innerHTML = `
            <a href="index.html" class="block px-4 py-2 text-green-800 hover:bg-green-100">Beranda</a>
            <a href="sejarah.html" class="block px-4 py-2 text-green-800 hover:bg-green-100">Sejarah Jamu</a>
            <a href="katalog.html" class="block px-4 py-2 text-green-800 hover:bg-green-100">Katalog Jamu</a>
            <a href="pageai.html" class="block px-4 py-2 text-green-800 hover:bg-green-100">Asisten AI</a>
        `;

navbar.appendChild(mobileMenu);

// toggle menu
mobileMenuBtn.addEventListener("click", () => {
  mobileMenu.classList.toggle("hidden");
});

/* ====================================
           NAVBAR SCROLL EFFECT
           Changes navbar appearance on scroll
        ==================================== */
window.addEventListener("scroll", () => {
  if (window.scrollY > 50) {
    navbar.classList.add("bg-white/95", "shadow-lg");
    navbar.classList.remove("glass-effect");
  } else {
    navbar.classList.remove("bg-white/95", "shadow-lg");
    navbar.classList.add("glass-effect");
  }
});

/* ====================================
           SMOOTH SCROLLING FOR NAVIGATION
           Enables smooth scroll for anchor links
        ==================================== */
document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
  anchor.addEventListener("click", function (e) {
    e.preventDefault();
    const target = document.querySelector(this.getAttribute("href"));
    if (target) {
      target.scrollIntoView({
        behavior: "smooth",
        block: "start",
      });
      // Close mobile menu
      mobileMenu.style.display = "none";
    }
  });
});

/* ====================================
           INTERSECTION OBSERVER FOR ANIMATIONS
           Handles fade-in animations when scrolling
        ==================================== */
const observerOptions = {
  threshold: 0.1,
  rootMargin: "0px 0px -50px 0px",
};

const observer = new IntersectionObserver((entries) => {
  entries.forEach((entry) => {
    if (entry.isIntersecting) {
      entry.target.classList.add("visible");

      // Handle statistics animation
      if (entry.target.id && entry.target.id.startsWith("stat")) {
        animateStatistic(entry.target);
      }
    }
  });
}, observerOptions);

/* ====================================
           STATISTICS ANIMATION
           Animates the counting of statistics
        ==================================== */
function animateStatistic(element) {
  const finalValue = element.textContent;
  const numericValue = parseInt(finalValue.replace(/\D/g, ""));
  const suffix = finalValue.replace(/[\d]/g, "");

  let currentValue = 0;
  const increment = Math.ceil(numericValue / 60);
  const duration = 2000;
  const stepTime = duration / (numericValue / increment);

  const timer = setInterval(() => {
    currentValue += increment;
    if (currentValue >= numericValue) {
      element.textContent = finalValue;
      clearInterval(timer);
    } else {
      element.textContent = currentValue + suffix;
    }
  }, stepTime);
}

/* ====================================
           INITIALIZE OBSERVERS
           Start observing elements for animations
        ==================================== */
document.querySelectorAll('.fade-in, [id^="stat"]').forEach((element) => {
  observer.observe(element);
});

/* ====================================
           PARALLAX EFFECT
           Subtle parallax movement for floating elements
        ==================================== */
window.addEventListener("scroll", () => {
  const scrolled = window.pageYOffset;
  const parallaxElements = document.querySelectorAll(
    ".floating-animation, .floating-delay, .floating-slow"
  );

  parallaxElements.forEach((element, index) => {
    const speed = 0.2 + index * 0.1;
    const yPos = -(scrolled * speed);
    element.style.transform = `translateY(${yPos}px)`;
  });
});

/* ====================================
           ENHANCED HOVER EFFECTS
           Additional interactions for better UX
        ==================================== */
document.querySelectorAll(".hover-lift").forEach((element) => {
  element.addEventListener("mouseenter", () => {
    element.style.transform = "translateY(-8px) scale(1.02)";
  });

  element.addEventListener("mouseleave", () => {
    element.style.transform = "translateY(0) scale(1)";
  });
});

/* ====================================
           PAGE LOADING ANIMATION
           Smooth page entrance effect
        ==================================== */
window.addEventListener("load", () => {
  document.body.style.opacity = "0";
  document.body.style.transition = "opacity 0.6s ease-in-out";

  setTimeout(() => {
    document.body.style.opacity = "1";
  }, 100);
});

/* ====================================
           INGREDIENT HOVER EFFECTS
           Interactive herb ingredient displays
        ==================================== */
document
  .querySelectorAll('[class*="text-center p-4"]')
  .forEach((ingredient) => {
    if (ingredient.querySelector(".text-3xl")) {
      ingredient.addEventListener("mouseenter", () => {
        ingredient.style.transform = "scale(1.05) rotate(2deg)";
      });

      ingredient.addEventListener("mouseleave", () => {
        ingredient.style.transform = "scale(1) rotate(0deg)";
      });
    }
  });

/* ====================================
           CONSOLE WELCOME MESSAGE
           Fun easter egg for developers
        ==================================== */
console.log(`
        🌿 Selamat datang di JamuSehat! 🌿
        
        Website ini dibuat untuk melestarikan tradisi jamu Indonesia.
        Terima kasih telah mengunjungi warisan budaya Nusantara!
        
        💚 Salam sehat alami! 💚
        `);

/* ====================================
           ACCESSIBILITY IMPROVEMENTS
           Better keyboard navigation and focus management
        ==================================== */
document.addEventListener("keydown", (e) => {
  // Close mobile menu on Escape key
  if (e.key === "Escape" && mobileMenu.style.display !== "none") {
    mobileMenu.style.display = "none";
  }
});

// tunggu sampai halaman selesai loading
window.addEventListener("load", () => {
  const preloader = document.getElementById("preloader");
  const content = document.getElementById("content");

  preloader.style.display = "none"; // sembunyikan loader
  content.classList.remove("hidden"); // tampilkan konten

  // trigger animasi elemen-elemen dengan fade-in
  document.querySelectorAll(".fade-in").forEach((el) => {
    setTimeout(() => el.classList.add("show"), 100);
  });
});

// Focus management for better accessibility
const focusableElements = document.querySelectorAll(
  "a, button, input, textarea, select"
);
focusableElements.forEach((element) => {
  element.addEventListener("focus", () => {
    // element.style.outline = '2px solid #10b981';
    // element.style.outlineOffset = '2px';
  });

  element.addEventListener("blur", () => {
    element.style.outline = "none";
  });
});
