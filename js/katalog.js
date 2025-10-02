document.addEventListener("DOMContentLoaded", () => {
  const cards = Array.from(document.querySelectorAll(".jamu-card"));
  const searchInput = document.getElementById("search-input");
  const searchBtn = document.getElementById("search-btn");
  const filterButtons = document.querySelectorAll(".filter-btn");
  const showMoreBtn = document.getElementById("show-more");

  let visibleCount = 6; // default tampil 6
  const INCREMENT = 6;

  const norm = (s) => (s || "").toString().trim().toLowerCase();

  function updateCards() {
    const q = norm(searchInput.value);
    const activeBtn = document.querySelector(".filter-btn.active");
    let category = activeBtn ? norm(activeBtn.dataset.category) : "semua";
    // normalize english/indonesian variants
    if (category === "all") category = "semua";

    // cari semua card yang match kategori + search
    const matched = cards.filter((card) => {
      const name =
        norm(card.dataset.name) || norm(card.querySelector("h3")?.innerText);
      const categories = norm(card.dataset.category);
      const matchCategory =
        category === "semua" || categories.includes(category);
      const matchSearch = !q || name.includes(q);
      return matchCategory && matchSearch;
    });

    // tampilkan matched sampai visibleCount, sembunyikan sisanya
    matched.forEach((card, idx) => {
      card.style.display = idx < visibleCount ? "" : "none";
    });

    // sembunyikan card yang tidak match
    cards
      .filter((c) => !matched.includes(c))
      .forEach((c) => (c.style.display = "none"));

    // toggle tombol Show More berdasarkan jumlah matched
    if (matched.length > visibleCount) {
      showMoreBtn.style.display = "inline-block";
    } else {
      showMoreBtn.style.display = "none";
    }
  }

  // filter button click
  filterButtons.forEach((btn) => {
    btn.addEventListener("click", () => {
      filterButtons.forEach((b) => b.classList.remove("active"));
      btn.classList.add("active");
      visibleCount = INCREMENT; // reset visible saat ganti kategori
      updateCards();
      // scroll ke katalog (opsional)
      document
        .getElementById("katalog")
        ?.scrollIntoView({ behavior: "smooth", block: "start" });
    });
  });

  // live search (setiap ketik)
  searchInput.addEventListener("input", () => {
    visibleCount = INCREMENT;
    updateCards();
  });

  // Enter key triggers search (prevent default jika di dalam form)
  searchInput.addEventListener("keydown", (e) => {
    if (e.key === "Enter") {
      e.preventDefault();
      visibleCount = INCREMENT;
      updateCards();
    }
  });

  // click tombol search
  if (searchBtn) {
    searchBtn.addEventListener("click", () => {
      visibleCount = INCREMENT;
      updateCards();
    });
  }

  // show more click
  if (showMoreBtn) {
    showMoreBtn.addEventListener("click", () => {
      visibleCount += INCREMENT;
      updateCards();
      // optional: smooth scroll to show new items
      // matched terakhir muncul => biar user tahu ada item baru
    });
  }

  // initial render
  updateCards();
});
// katalog.js

/* ====================================
   JAMU FILTER FUNCTIONALITY
   Handles category filtering for jamu cards
==================================== */
function initializeJamuFilters() {
  const filterButtons = document.querySelectorAll(".filter-btn");
  const jamuCards = document.querySelectorAll(".jamu-card");

  if (filterButtons.length === 0 || jamuCards.length === 0) return;

  filterButtons.forEach((button) => {
    button.addEventListener("click", () => {
      // Remove active class from all buttons
      filterButtons.forEach((btn) => btn.classList.remove("active"));
      // Add active class to clicked button
      button.classList.add("active");

      const category = button.getAttribute("data-category");

      jamuCards.forEach((card) => {
        if (category === "semua") {
          // Show all cards
          card.style.display = "block";
          // Add animation
          card.style.animation = "fadeInUp 0.6s ease-out";
        } else {
          // Check if card has the selected category
          const cardCategories = card.getAttribute("data-category").split(" ");
          if (cardCategories.includes(category)) {
            card.style.display = "block";
            card.style.animation = "fadeInUp 0.6s ease-out";
          } else {
            card.style.display = "none";
          }
        }
      });
    });
  });
}

/* ====================================
   INGREDIENT HOVER EFFECTS
   Enhanced interactions for ingredient circles
==================================== */
function initializeIngredientEffects() {
  document.querySelectorAll(".ingredient-circle").forEach((circle) => {
    circle.addEventListener("mouseenter", function () {
      this.style.transform = "scale(1.1) rotate(5deg)";
    });

    circle.addEventListener("mouseleave", function () {
      this.style.transform = "scale(1) rotate(0deg)";
    });
  });
}

/* ====================================
   JAMU CARD ENHANCED INTERACTIONS
   Advanced hover effects for jamu cards
==================================== */
function initializeJamuCardInteractions() {
  document.querySelectorAll(".jamu-card").forEach((card) => {
    card.addEventListener("mouseenter", function () {
      // Add subtle glow effect
      this.style.boxShadow = "0 25px 50px rgba(16, 185, 129, 0.15)";
      // Animate badges
      const badges = this.querySelectorAll('[class*="badge-"]');
      badges.forEach((badge) => {
        badge.style.transform = "scale(1.05)";
      });
    });

    card.addEventListener("mouseleave", function () {
      this.style.boxShadow = "0 20px 40px rgba(0, 0, 0, 0.1)";
      const badges = this.querySelectorAll('[class*="badge-"]');
      badges.forEach((badge) => {
        badge.style.transform = "scale(1)";
      });
    });
  });
}

/* ====================================
   SEARCH FUNCTIONALITY
   Simple search for jamu names
==================================== */
function initializeSearchFunctionality() {
  // Create search input if it doesn't exist
  let searchContainer = document.getElementById("search-container");
  if (!searchContainer) {
    searchContainer = document.createElement("div");
    searchContainer.id = "search-container";
    searchContainer.className = "w-full max-w-md mx-auto mb-8";

    const searchInput = document.createElement("input");
    searchInput.type = "text";
    searchInput.placeholder = "Cari jamu...";
    searchInput.className =
      "w-full px-4 py-3 rounded-full border-2 border-green-300 focus:border-green-500 focus:outline-none shadow-sm";

    searchContainer.appendChild(searchInput);

    // Insert search container before the filter buttons
    const filterSection = document.querySelector(".filter-section");
    if (filterSection) {
      filterSection.parentNode.insertBefore(searchContainer, filterSection);
    }

    searchInput.addEventListener("input", function () {
      const searchTerm = this.value.toLowerCase();
      const jamuCards = document.querySelectorAll(".jamu-card");

      jamuCards.forEach((card) => {
        const jamuName = card.querySelector("h3").textContent.toLowerCase();
        if (jamuName.includes(searchTerm)) {
          card.style.display = "block";
          card.style.animation = "fadeInUp 0.6s ease-out";
        } else {
          card.style.display = "none";
        }
      });
    });
  }
}

// Initialize katalog page specific functions
document.addEventListener("DOMContentLoaded", function () {
  initializeJamuFilters();
  initializeIngredientEffects();
  initializeJamuCardInteractions();
  // Uncomment the line below if you want to enable search functionality
  // initializeSearchFunctionality();
});
