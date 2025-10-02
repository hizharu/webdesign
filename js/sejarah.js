// home.js

/* ====================================
   COUNTER ANIMATION
   Animates number counters in hero section
==================================== */
function animateCounters() {
  const counters = document.querySelectorAll('[id^="counter"]');
  const values = ["1000+", "500+", "2000+"];

  counters.forEach((counter, index) => {
    let start = 0;
    const end = parseInt(values[index]);
    const increment = end / 100;
    const timer = setInterval(() => {
      start += increment;
      counter.textContent = Math.floor(start) + "+";
      if (start >= end) {
        counter.textContent = values[index];
        clearInterval(timer);
      }
    }, 20);
  });
}

/* ====================================
   TRIGGER COUNTER ANIMATION ON SCROLL
   Starts counter animation when hero section is visible
==================================== */
function initializeCounterObserver() {
  const statsSection = document.querySelector("#home");
  if (!statsSection) return;

  const statsObserver = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        animateCounters();
        statsObserver.disconnect();
      }
    });
  });

  statsObserver.observe(statsSection);
}

/* ====================================
   INTERACTIVE TIMELINE DOTS
==================================== */
function initializeTimelineDots() {
  document.querySelectorAll(".timeline-dot").forEach((dot, index) => {
    dot.addEventListener("mouseenter", () => {
      dot.style.transform = "translateX(-50%) scale(1.3)";
      dot.style.backgroundColor = "#10b981";
    });

    dot.addEventListener("mouseleave", () => {
      dot.style.transform = "translateX(-50%) scale(1)";
      dot.style.backgroundColor = "#059669";
    });
  });
}

// Initialize home page specific functions
document.addEventListener("DOMContentLoaded", function () {
  initializeCounterObserver();
  initializeTimelineDots();
});
