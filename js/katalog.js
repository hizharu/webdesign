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
    const matched = cards.filter(card => {
      const name = norm(card.dataset.name) || norm(card.querySelector("h3")?.innerText);
      const categories = norm(card.dataset.category);
      const matchCategory = category === "semua" || categories.includes(category);
      const matchSearch = !q || name.includes(q);
      return matchCategory && matchSearch;
    });

    // tampilkan matched sampai visibleCount, sembunyikan sisanya
    matched.forEach((card, idx) => {
      card.style.display = idx < visibleCount ? "" : "none";
    });

    // sembunyikan card yang tidak match
    cards.filter(c => !matched.includes(c)).forEach(c => c.style.display = "none");

    // toggle tombol Show More berdasarkan jumlah matched
    if (matched.length > visibleCount) {
      showMoreBtn.style.display = "inline-block";
    } else {
      showMoreBtn.style.display = "none";
    }
  }

  // filter button click
  filterButtons.forEach(btn => {
    btn.addEventListener("click", () => {
      filterButtons.forEach(b => b.classList.remove("active"));
      btn.classList.add("active");
      visibleCount = INCREMENT; // reset visible saat ganti kategori
      updateCards();
      // scroll ke katalog (opsional)
      document.getElementById("katalog")?.scrollIntoView({ behavior: "smooth", block: "start" });
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
