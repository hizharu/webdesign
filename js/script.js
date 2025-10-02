// global.js

/* ====================================
   MOBILE MENU FUNCTIONALITY
   Handles responsive navigation menu
==================================== */
function initializeMobileMenu() {
  const mobileMenuBtn = document.getElementById("mobile-menu-btn");
  const navbar = document.getElementById("navbar");

  if (!mobileMenuBtn || !navbar) return;

  // Create mobile menu element
  const mobileMenu = document.createElement("div");
  mobileMenu.className =
    "absolute top-16 left-0 w-full md:hidden bg-white shadow-lg rounded-lg p-4 space-y-2 hidden";
  mobileMenu.innerHTML = `
        <a href="index.html" class="block text-green-700 hover:text-green-900 py-2">Beranda</a>
        <a href="sejarah.html" class="block text-green-700 hover:text-green-900 py-2">Sejarah Jamu</a>
        <a href="katalog.html" class="block text-green-700 hover:text-green-900 py-2">Katalog Jamu</a>
        <a href="pageai.html" class="block text-green-700 hover:text-green-900 py-2">Asisten AI</a>
    `;

  navbar.appendChild(mobileMenu);

  // Toggle menu
  mobileMenuBtn.addEventListener("click", () => {
    mobileMenu.classList.toggle("hidden");
  });

  return mobileMenu;
}

/* ====================================
   NAVBAR SCROLL EFFECT
==================================== */
function initializeNavbarScroll() {
  const navbar = document.getElementById("navbar");
  if (!navbar) return;

  window.addEventListener("scroll", () => {
    if (window.scrollY > 50) {
      navbar.classList.add("bg-white/95", "shadow-lg");
      navbar.classList.remove("glass-effect");
    } else {
      navbar.classList.remove("bg-white/95", "shadow-lg");
      navbar.classList.add("glass-effect");
    }
  });
}

/* ====================================
   SMOOTH SCROLLING NAVIGATION
   Enables smooth scroll for anchor links
==================================== */
function initializeSmoothScroll(mobileMenu = null) {
  document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
    anchor.addEventListener("click", function (e) {
      e.preventDefault();
      const target = document.querySelector(this.getAttribute("href"));
      if (target) {
        target.scrollIntoView({
          behavior: "smooth",
          block: "start",
        });
        // Close mobile menu if open
        if (mobileMenu) {
          mobileMenu.classList.add("hidden");
        }
      }
    });
  });
}

/* ====================================
   INTERSECTION OBSERVER FOR ANIMATIONS
   Handles fade-in animations when elements come into view
==================================== */
function initializeAnimations() {
  const observerOptions = {
    threshold: 0.1,
    rootMargin: "0px 0px -50px 0px",
  };

  const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add("visible");
      }
    });
  }, observerOptions);

  document.querySelectorAll(".fade-in").forEach((element) => {
    observer.observe(element);
  });
}

/* ====================================
   PARALLAX EFFECT FOR FLOATING ELEMENTS
   Creates subtle parallax movement on scroll
==================================== */
function initializeParallax() {
  window.addEventListener("scroll", () => {
    const scrolled = window.pageYOffset;
    const parallax = document.querySelectorAll(
      ".floating-animation, .floating-delay"
    );
    const speed = 0.3;

    parallax.forEach((element) => {
      const yPos = -(scrolled * speed);
      element.style.transform = `translateY(${yPos}px)`;
    });
  });
}

/* ====================================
   PAGE LOADING ANIMATION
   Smooth page entrance effect
==================================== */
function initializePageLoading() {
  window.addEventListener("load", () => {
    document.body.style.opacity = "0";
    document.body.style.transition = "opacity 0.6s ease-in-out";

    setTimeout(() => {
      document.body.style.opacity = "1";
    }, 100);
  });
}

/* ====================================
   ADD CUSTOM CSS ANIMATIONS
   Define additional animations for enhanced UX
==================================== */
function addCustomAnimations() {
  const style = document.createElement("style");
  style.textContent = `
        @keyframes fadeInUp {
            from {
                opacity: 0;
                transform: translateY(30px);
            }
            to {
                opacity: 1;
                transform: translateY(0);
            }
        }
        
        @keyframes pulse {
            0%, 100% { opacity: 1; }
            50% { opacity: 0.7; }
        }
        
        .pulse-animation {
            animation: pulse 2s ease-in-out infinite;
        }
        
        .typing-animation {
            animation: pulse 1.5s ease-in-out infinite;
        }
    `;
  document.head.appendChild(style);
}

/* ====================================
   INITIALIZE ALL GLOBAL FUNCTIONS
   Start all global functionality when DOM is ready
==================================== */
document.addEventListener("DOMContentLoaded", function () {
  const mobileMenu = initializeMobileMenu();
  initializeNavbarScroll();
  initializeSmoothScroll(mobileMenu);
  initializeAnimations();
  initializeParallax();
  addCustomAnimations();
  initializePageLoading();

  console.log("Jamu Indonesia - Global scripts loaded successfully! 🌿");
});
