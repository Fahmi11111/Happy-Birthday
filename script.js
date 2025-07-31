function updateCountdown() {
  const now = new Date();
  const birthday = new Date(2025, 7, 1); // 1 Agustus 2025 (bulan 7 = Agustus)

  const diff = birthday - now;

  // Jika ulang tahun sudah lewat, tampilkan ucapan dan hentikan timer
  if (diff <= 0) {
    document.getElementById("days").textContent = 0;
    document.getElementById("hours").textContent = 0;
    document.getElementById("minutes").textContent = 0;
    document.getElementById("seconds").textContent = 0;

    const msg = document.getElementById("birthdayMessage");
    if (msg) msg.classList.remove("hidden");

    clearInterval(timer); // stop interval
    return;
  }

  const days = Math.floor(diff / (1000 * 60 * 60 * 24));
  const hours = Math.floor((diff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
  const minutes = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60));
  const seconds = Math.floor((diff % (1000 * 60)) / 1000);

  document.getElementById("days").textContent = days;
  document.getElementById("hours").textContent = hours;
  document.getElementById("minutes").textContent = minutes;
  document.getElementById("seconds").textContent = seconds;
}

// Jalankan timer
updateCountdown();
const timer = setInterval(updateCountdown, 1000);

// Musik background
const bgMusic = document.getElementById("bgMusic");
const musicBtn = document.getElementById("musicBtn");
const musicIcon = document.getElementById("musicIcon");
let isMusicPlaying = false;

// Fungsi untuk mulai musik dengan interaksi pengguna (karena autoplay biasanya diblokir)
function toggleMusic() {
  if (bgMusic.paused) {
    bgMusic
      .play()
      .then(() => {
        isMusicPlaying = true;
        musicIcon.className = "fas fa-volume-up text-xl";
      })
      .catch((error) => {
        console.error("Autoplay prevented:", error);
        // Beri tahu pengguna untuk mengklik untuk memulai musik
        alert("Silakan klik tombol musik untuk memutar musik latar.");
      });
  } else {
    bgMusic.pause();
    isMusicPlaying = false;
    musicIcon.className = "fas fa-volume-mute text-xl";
  }
}

musicBtn.addEventListener("click", toggleMusic);

// Toggle tema gelap/terang
const themeBtn = document.getElementById("themeBtn");
const themeIcon = document.getElementById("themeIcon");
let isDarkMode = false;

themeBtn.addEventListener("click", () => {
  isDarkMode = !isDarkMode;

  if (isDarkMode) {
    document.body.classList.add("bg-gray-900", "text-gray-100");
    themeIcon.className = "fas fa-sun text-xl";
  } else {
    document.body.classList.remove("bg-gray-900", "text-gray-100");
    themeIcon.className = "fas fa-moon text-xl";
  }
});

// Scroll down button
document.getElementById("scrollDownBtn").addEventListener("click", () => {
  document
    .getElementById("specialMessage")
    .scrollIntoView({ behavior: "smooth" });
});

// Gift box message
const giftBox = document.getElementById("giftBox");
const messageContent = document.getElementById("messageContent");

giftBox.addEventListener("click", () => {
  messageContent.classList.toggle("hidden");

  // Animasi gift box saat diklik
  giftBox.classList.add("animate-bounce");
  setTimeout(() => {
    giftBox.classList.remove("animate-bounce");
  }, 1000);
});

// Tombol hati
const heartBtn = document.getElementById("heartBtn");
const heartCount = document.getElementById("heartCount");
const heartText = document.getElementById("heartText");
let heartsSent = 0;

heartBtn.addEventListener("click", () => {
  heartsSent++;
  heartCount.textContent = heartsSent;

  // Update teks tombol
  if (heartsSent === 1) {
    heartText.textContent = "Kamu dikasih cinta!";
  } else {
    heartText.textContent = `${heartsSent}x Cinta dikirim`;
  }

  // Buat efek confetti
  createConfetti();
});

// Fungsi untuk membuat confetti
function createConfetti() {
  const colors = ["#f0f", "#0ff", "#ff0", "#f80", "#8f0"];

  for (let i = 0; i < 50; i++) {
    const confetti = document.createElement("div");
    confetti.className = "confetti";
    confetti.style.backgroundColor =
      colors[Math.floor(Math.random() * colors.length)];
    confetti.style.left = Math.random() * window.innerWidth + "px";
    confetti.style.top = "-10px";
    confetti.style.opacity = "1";

    document.body.appendChild(confetti);

    // Animasi confetti jatuh
    const animationDuration = Math.random() * 3 + 2;
    const rotation = Math.random() * 360;
    const endLeft =
      (Math.random() - 0.5) * 200 + parseFloat(confetti.style.left);

    confetti.style.transition = `all ${animationDuration}s linear`;
    confetti.style.transform = `rotate(${rotation}deg)`;

    setTimeout(() => {
      confetti.style.top = window.innerHeight + "px";
      confetti.style.left = endLeft + "px";
      confetti.style.opacity = "0";

      // Hapus confetti setelah animasi selesai
      setTimeout(() => {
        confetti.remove();
      }, animationDuration * 1000);
    }, 10);
  }
}

// Slider kenangan
const memories = document.querySelectorAll(".memory");
const prevMemoryBtn = document.getElementById("prevMemory");
const nextMemoryBtn = document.getElementById("nextMemory");
const memoryDots = document.querySelectorAll(".memory-dot");
let currentMemoryIndex = 0;

function showMemory(index) {
  memories.forEach((memory) => memory.classList.remove("active"));
  memoryDots.forEach((dot) => dot.classList.remove("active-dot"));

  memories[index].classList.add("active");
  memoryDots[index].classList.add("active-dot");
  currentMemoryIndex = index;
}

prevMemoryBtn.addEventListener("click", () => {
  let newIndex = currentMemoryIndex - 1;
  if (newIndex < 0) newIndex = memories.length - 1;
  showMemory(newIndex);
});

nextMemoryBtn.addEventListener("click", () => {
  let newIndex = currentMemoryIndex + 1;
  if (newIndex >= memories.length) newIndex = 0;
  showMemory(newIndex);
});

// Dot navigation
memoryDots.forEach((dot) => {
  dot.addEventListener("click", () => {
    showMemory(parseInt(dot.dataset.index));
  });
});

// Update pesan personal
document.getElementById("updateMessageBtn").addEventListener("click", () => {
  const userName = document.getElementById("userName").value || "Kekasihmu";
  const partnerName =
    document.getElementById("partnerName").value || "Sayangku";
  const personalMessage =
    document.getElementById("personalMessage").value ||
    "Selamat ulang tahun! Semoga hari ini penuh kebahagiaan dan keceriaan. Aku sayang kamu!";

  // Update nama di berbagai bagian
  document.getElementById("namaSayang").textContent = partnerName;
  document.getElementById("namaSayangMessage").textContent = partnerName;

  // Update pesan utama
  const messageContainer = document.querySelector(
    "#messageContent > div.text-left"
  );
  messageContainer.innerHTML = `
                <p>${personalMessage}</p>
                <p class="mt-4">Dengan cinta, ${userName}</p>
            `;

  // Tampilkan konfirmasi
  alert("Pesan telah diperbarui!");
});

// Auto scroll halus untuk semua link
document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
  anchor.addEventListener("click", function (e) {
    e.preventDefault();

    const targetId = this.getAttribute("href");
    if (targetId === "#") return;

    const targetElement = document.querySelector(targetId);
    if (targetElement) {
      targetElement.scrollIntoView({
        behavior: "smooth",
      });
    }
  });
});
