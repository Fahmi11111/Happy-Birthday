document.addEventListener("DOMContentLoaded", () => {
  // Countdown
  const timer = setInterval(updateCountdown, 1000);
  updateCountdown();

  function updateCountdown() {
    const now = new Date();
    const birthday = new Date(2025, 7, 1); // 1 Agustus 2025

    const diff = birthday - now;

    if (diff <= 0) {
      ["days", "hours", "minutes", "seconds"].forEach((id) => {
        const el = document.getElementById(id);
        if (el) el.textContent = "0";
      });

      const msg = document.getElementById("birthdayMessage");
      if (msg) {
        msg.classList.remove("hidden");

        // Klik popup untuk menutup
        msg.addEventListener("click", () => {
          msg.classList.add("hidden");
        });

        // Putar musik jika ada
        const music = document.getElementById("bgMusic");
        if (music) music.play().catch(() => {});
      }

      clearInterval(timer);
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

  // Musik
  const bgMusic = document.getElementById("bgMusic");
  const musicBtn = document.getElementById("musicBtn");
  const musicIcon = document.getElementById("musicIcon");
  let isMusicPlaying = false;

  if (musicBtn && bgMusic && musicIcon) {
    musicBtn.addEventListener("click", () => {
      if (bgMusic.paused) {
        bgMusic.play().then(() => {
          isMusicPlaying = true;
          musicIcon.className = "fas fa-volume-up text-xl";
        });
      } else {
        bgMusic.pause();
        isMusicPlaying = false;
        musicIcon.className = "fas fa-volume-mute text-xl";
      }
    });
  }

  // Tema
  const themeBtn = document.getElementById("themeBtn");
  const themeIcon = document.getElementById("themeIcon");
  let isDarkMode = false;

  if (themeBtn && themeIcon) {
    themeBtn.addEventListener("click", () => {
      isDarkMode = !isDarkMode;
      document.body.classList.toggle("bg-gray-900", isDarkMode);
      document.body.classList.toggle("text-gray-100", isDarkMode);
      themeIcon.className = isDarkMode
        ? "fas fa-sun text-xl"
        : "fas fa-moon text-xl";
    });
  }

  // Scroll down
  const scrollDownBtn = document.getElementById("scrollDownBtn");
  if (scrollDownBtn) {
    scrollDownBtn.addEventListener("click", () => {
      document.getElementById("specialMessage")?.scrollIntoView({
        behavior: "smooth",
      });
    });
  }

  // Kotak hadiah
  const giftBox = document.getElementById("giftBox");
  const messageContent = document.getElementById("messageContent");
  if (giftBox && messageContent) {
    giftBox.addEventListener("click", () => {
      messageContent.classList.toggle("hidden");
      giftBox.classList.add("animate-bounce");
      setTimeout(() => giftBox.classList.remove("animate-bounce"), 1000);
    });
  }

  // Tombol hati
  const heartBtn = document.getElementById("heartBtn");
  const heartCount = document.getElementById("heartCount");
  const heartText = document.getElementById("heartText");
  let heartsSent = 0;

  if (heartBtn) {
    heartBtn.addEventListener("click", () => {
      heartsSent++;
      if (heartCount) heartCount.textContent = heartsSent;
      if (heartText) {
        heartText.textContent =
          heartsSent === 1
            ? "Kamu dikasih cinta!"
            : `${heartsSent}x Cinta dikirim`;
      }
      createConfetti();
    });
  }

  function createConfetti() {
    const colors = ["#f0f", "#0ff", "#ff0", "#f80", "#8f0"];
    for (let i = 0; i < 40; i++) {
      const confetti = document.createElement("div");
      confetti.className = "confetti";
      confetti.style.backgroundColor =
        colors[Math.floor(Math.random() * colors.length)];
      confetti.style.left = Math.random() * window.innerWidth + "px";
      confetti.style.top = "-10px";
      document.body.appendChild(confetti);

      const duration = Math.random() * 3 + 2;
      const rotation = Math.random() * 360;
      const endLeft =
        (Math.random() - 0.5) * 200 + parseFloat(confetti.style.left);

      confetti.style.transition = `all ${duration}s linear`;
      confetti.style.transform = `rotate(${rotation}deg)`;

      setTimeout(() => {
        confetti.style.top = window.innerHeight + "px";
        confetti.style.left = endLeft + "px";
        confetti.style.opacity = "0";
        setTimeout(() => confetti.remove(), duration * 1000);
      }, 10);
    }
  }

  // Slider memori
  const memories = document.querySelectorAll(".memory");
  const memoryDots = document.querySelectorAll(".memory-dot");
  const prevMemoryBtn = document.getElementById("prevMemory");
  const nextMemoryBtn = document.getElementById("nextMemory");
  let currentMemoryIndex = 0;

  function showMemory(index) {
    memories.forEach((m) => m.classList.remove("active"));
    memoryDots.forEach((d) => d.classList.remove("active-dot"));
    memories[index].classList.add("active");
    memoryDots[index].classList.add("active-dot");
    currentMemoryIndex = index;
  }

  if (prevMemoryBtn) {
    prevMemoryBtn.addEventListener("click", () => {
      showMemory((currentMemoryIndex - 1 + memories.length) % memories.length);
    });
  }

  if (nextMemoryBtn) {
    nextMemoryBtn.addEventListener("click", () => {
      showMemory((currentMemoryIndex + 1) % memories.length);
    });
  }

  memoryDots.forEach((dot) => {
    dot.addEventListener("click", () => {
      showMemory(parseInt(dot.dataset.index));
    });
  });

  // Pesan personal
  const updateBtn = document.getElementById("updateMessageBtn");
  if (updateBtn) {
    updateBtn.addEventListener("click", () => {
      const userName = document.getElementById("userName").value || "Kekasihmu";
      const partnerName =
        document.getElementById("partnerName").value || "Sayangku";
      const personalMessage =
        document.getElementById("personalMessage").value ||
        "Selamat ulang tahun! Semoga hari ini penuh cinta.";

      document.getElementById("namaSayang").textContent = partnerName;
      document.getElementById("namaSayangMessage").textContent = partnerName;

      const msgContainer = document.querySelector(
        "#messageContent > div.text-left"
      );
      if (msgContainer) {
        msgContainer.innerHTML = `
          <p>${personalMessage}</p>
          <p class="mt-4">Dengan cinta, ${userName}</p>
        `;
      }

      alert("Pesan telah diperbarui!");
    });
  }

  // Anchor smooth scroll
  document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
    anchor.addEventListener("click", function (e) {
      e.preventDefault();
      const targetId = this.getAttribute("href");
      if (!targetId || targetId === "#") return;
      const target = document.querySelector(targetId);
      if (target) target.scrollIntoView({ behavior: "smooth" });
    });
  });
});
