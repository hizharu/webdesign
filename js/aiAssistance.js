// ai-assistant.js

/* ====================================
   QUICK SYMPTOM FUNCTIONALITY
==================================== */
function setQuickSymptom(symptom) {
  document.getElementById("inputGejala").value = symptom;
  document.getElementById("inputGejala").focus();
}

/* ====================================
   MAIN AI FUNCTIONALITY - GROQ API
   Fungsi utama untuk mendapatkan rekomendasi jamu dari AI
==================================== */
async function getRekomendasi() {
  const gejala = document.getElementById("inputGejala").value.trim();
  const hasil = document.getElementById("hasil");

  // Validasi input
  if (!gejala) {
    alert("Mohon masukkan gejala yang Anda alami terlebih dahulu");
    return;
  }

  // Show loading state
  hasil.classList.remove("hidden");
  hasil.innerHTML = `
        <div class="flex items-center justify-center space-x-3 py-12">
            <div class="w-3 h-3 bg-green-600 rounded-full typing-animation"></div>
            <div class="w-3 h-3 bg-green-600 rounded-full typing-animation" style="animation-delay: 0.2s"></div>
            <div class="w-3 h-3 bg-green-600 rounded-full typing-animation" style="animation-delay: 0.4s"></div>
        </div>
        <p class="text-center text-green-700 font-medium">AI sedang menganalisis gejala Anda...</p>
    `;

  try {
    // Call Groq API
    const response = await fetch(
      "https://api.groq.com/openai/v1/chat/completions",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization:
            "Bearer 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",
        },
        body: JSON.stringify({
          model: "llama-3.1-8b-instant",
          messages: [
            {
              role: "system",
              content:
                "Kamu adalah seorang ahli jamu tradisional Indonesia. Berikan rekomendasi jamu berdasarkan gejala yang diberikan. Sertakan: 1) Nama jamu yang direkomendasikan, 2) Alasan pemilihan jamu tersebut, 3) Bahan-bahan yang dibutuhkan, 4) Cara membuat jamu dengan detail, 5) Cara penyajian dan konsumsi. Format jawaban dengan jelas dan terstruktur.",
            },
            {
              role: "user",
              content: gejala,
            },
          ],
        }),
      }
    );

    // Check response status
    if (!response.ok) {
      throw new Error(
        `API error: ${response.status} - ${await response.text()}`
      );
    }

    // Parse response
    const data = await response.json();
    let output = data.choices[0].message.content;

    // Format output untuk tampilan yang lebih baik
    output = output
      .replace(/\*\*(.*?)\*\*/g, '<strong class="text-green-800">$1</strong>') // Bold text
      .replace(/\n\n/g, '</p><p class="mb-4">') // Paragraphs
      .replace(/\n- /g, '<li class="ml-6">') // Bullet points
      .replace(/\n\d+\.\s/g, '<li class="ml-6">') // Numbered lists
      .replace(/\n/g, "<br>") // Line breaks
      .replace(/<li>(.*?)($|<br>|<p)/g, '<li class="mb-2">$1</li>$2'); // Close list items

    // Display result with nice formatting
    hasil.innerHTML = `
            <div class="bg-white rounded-2xl p-6 shadow-lg">
                <div class="flex items-center space-x-3 mb-6">
                    <div class="w-12 h-12 bg-green-600 rounded-full flex items-center justify-center">
                        <i class="fas fa-robot text-white text-xl"></i>
                    </div>
                    <div>
                        <h2 class="text-2xl font-serif font-bold text-green-800">Rekomendasi Jamu untuk Anda</h2>
                        <p class="text-sm text-gray-500">Berdasarkan analisis AI</p>
                    </div>
                </div>
                <div class="prose prose-green max-w-none">
                    <p class="mb-4">${output}</p>
                </div>
            </div>
            
            <div class="mt-6 grid md:grid-cols-2 gap-4">
                <div class="bg-white rounded-xl p-4 shadow">
                    <h4 class="font-semibold text-green-800 mb-2 flex items-center">
                        <i class="fas fa-lightbulb mr-2 text-yellow-500"></i> Tips Tambahan
                    </h4>
                    <p class="text-sm text-gray-600">
                        Konsumsi jamu secara rutin untuk hasil optimal. Jika gejala berlanjut lebih dari 3 hari, konsultasikan dengan dokter.
                    </p>
                </div>
                <div class="bg-white rounded-xl p-4 shadow">
                    <h4 class="font-semibold text-green-800 mb-2 flex items-center">
                        <i class="fas fa-book mr-2 text-blue-500"></i> Pelajari Lebih Lanjut
                    </h4>
                    <a href="katalog.html" class="text-sm text-green-600 hover:text-green-800 font-medium flex items-center">
                        Lihat katalog jamu lengkap kami <i class="fas fa-arrow-right ml-1 text-sm"></i>
                    </a>
                </div>
            </div>
            
            <div class="mt-6 text-center">
                <button onclick="resetForm()" class="bg-green-600 hover:bg-green-700 text-white px-6 py-3 rounded-xl font-semibold transition-colors flex items-center justify-center mx-auto">
                    <i class="fas fa-redo-alt mr-2"></i> Coba Gejala Lain
                </button>
            </div>
        `;

    // Scroll to result
    hasil.scrollIntoView({ behavior: "smooth", block: "nearest" });
  } catch (error) {
    // Error handling with user-friendly message
    hasil.innerHTML = `
            <div class="bg-red-50 border-l-4 border-red-500 p-6 rounded-r-xl">
                <div class="flex items-start space-x-3">
                    <i class="fas fa-exclamation-triangle text-red-500 text-xl mt-1"></i>
                    <div>
                        <h3 class="font-bold text-red-800 mb-2">Terjadi Kesalahan</h3>
                        <p class="text-red-700 text-sm mb-4">${error.message}</p>
                        <p class="text-red-600 text-xs">
                            Mohon coba lagi dalam beberapa saat. Jika masalah berlanjut, silakan hubungi kami.
                        </p>
                        <button onclick="getRekomendasi()" class="mt-4 bg-red-600 hover:bg-red-700 text-white px-4 py-2 rounded-lg text-sm font-semibold transition-colors flex items-center">
                            <i class="fas fa-sync-alt mr-2"></i> Coba Lagi
                        </button>
                    </div>
                </div>
            </div>
        `;
  }
}

/* ====================================
   RESET FORM FUNCTION
   Clear input and hide results
==================================== */
function resetForm() {
  document.getElementById("inputGejala").value = "";
  document.getElementById("hasil").classList.add("hidden");
  document.getElementById("inputGejala").focus();
  window.scrollTo({ top: 0, behavior: "smooth" });
}

/* ====================================
   KEYBOARD SHORTCUTS
   Enter to submit (Ctrl/Cmd + Enter)
==================================== */
function initializeKeyboardShortcuts() {
  const inputGejala = document.getElementById("inputGejala");
  if (!inputGejala) return;

  inputGejala.addEventListener("keydown", (e) => {
    if (e.key === "Enter" && (e.ctrlKey || e.metaKey)) {
      e.preventDefault();
      getRekomendasi();
    }
  });
}

/* ====================================
   CONSOLE WELCOME MESSAGE
==================================== */
console.log(`
 Asisten AI Jamu - Powered by Groq

Website ini menggunakan Groq AI (Llama 3.1) untuk memberikan
rekomendasi jamu tradisional Indonesia berdasarkan gejala.

 Salam sehat alami! 
`);

// Initialize AI assistant specific functions
document.addEventListener("DOMContentLoaded", function () {
  initializeKeyboardShortcuts();
});
