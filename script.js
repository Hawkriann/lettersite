const CORRECT_PIN = "1009";

const pinScreen = document.getElementById('pin-screen');
const contentScreen = document.getElementById('content-screen');
const pinDisplay = document.getElementById('pin-display');
const pinError = document.getElementById('pin-error');
// Aksi Tiup Lilin
const cakeContainer = document.getElementById('cake-container');
const flame1 = document.getElementById('flame1');
const flame2 = document.getElementById('flame2');
const subMessage = document.getElementById('sub-message');

let blownCount = 0;

cakeContainer.addEventListener('click', function() {
    if (blownCount < 2) {
        flame1.classList.add('off');
        flame2.classList.add('off');
        blownCount = 2;
    }
});
let currentPin = "";
let isBlownOut = false;

function press(num) {
    if (currentPin.length < 4) {
        currentPin += num;
        updateDisplay();
        pinError.textContent = "";
    }
}

function resetPin() {
    currentPin = "";
    updateDisplay();
    pinError.textContent = "";
}

function updateDisplay() {
    let dots = "";
    for (let i = 0; i < currentPin.length; i++) {
        dots += "* ";
    }
    pinDisplay.textContent = dots;
}

function press(num) {
    if (currentPin.length < 4) {
        currentPin += num;
        updateDisplay();
        
        // Teks "coba lagi" baru hilang PAS doi mulai ngetik angka lagi
        pinError.textContent = ""; 
    }
}

let wrongCount = 0; // Menghitung berapa kali salah

function checkPin() {
    if (currentPin.length < 4) {
        pinError.textContent = "Isi 4 digit kodenya dulu yaa!";
        return;
    }

    if (currentPin === CORRECT_PIN) {
        wrongCount = 0;
        pinError.textContent = "";
        document.getElementById('clue-container').style.display = 'none';
        
        pinScreen.classList.add('hidden');
        setTimeout(() => {
            document.getElementById('gift-screen').classList.add('visible');
        }, 400);
    } else {
        wrongCount++;
        currentPin = "";
        updateDisplay();

        // Kalau sudah 3 kali (atau lebih) salah
        if (wrongCount >= 2) {
            pinError.textContent = "still wrongg 😚😚, cluee gaa??";
            document.getElementById('clue-container').style.display = 'block';
        } else {
            pinError.textContent = "Salahh nyakk, emm need clueee?? 😋";
        }
    }
}

// Fungsi kalau pencet "Yes"
function showClue() {
    // Ganti kodenya sesuai clue yang mau kamu kasih!
    pinError.textContent = "1111110001 (biner number)🤔🤔 ";
    document.getElementById('clue-container').style.display = 'none';
}

// Fungsi kalau pencet "No"
function hideClueOptions() {
    pinError.textContent = "yakinn kids👻👻";
    document.getElementById('clue-container').style.display = 'none';
}

function resetPin() {
    currentPin = "";
    updateDisplay();
    pinError.textContent = ""; // Hilang cuma kalau tombol X dipencet
}

cakeContainer.addEventListener('click', function() {
    if (!isBlownOut) {
        flame.classList.add('off');
        isBlownOut = true;
        subMessage.innerHTML = "<b>Permohonanmu sudah dicatat! ✨✨</b><br>Semoga semua impianmu terwujud di tahun ini ❤️";
    }
});

// 1. HILANGIN LAYAR PEMBUKA OTOMATIS SAAT WEB DIBUKA
window.addEventListener('load', function() {
    setTimeout(() => {
        const welcome = document.getElementById('welcome-overlay');
        if (welcome) welcome.classList.add('fade-out');
    }, 1500); // Tampil 1.5 detik lalu pudar
});

// FUNGSI LEDAKAN EMOJI BUNGA
function popEmojiBurst() {
    let container = document.getElementById('emoji-burst-container');
    if (!container) {
        container = document.createElement('div');
        container.id = 'emoji-burst-container';
        document.body.appendChild(container);
    }

    const emojis = ['🌸', '🌺', '🌻', '🌹', '🌷', '✨', '💐'];
    const totalEmojis = 70; // Ditambahin dari 45 jadi 70 biar layarnya penuh rapat!

    for (let i = 0; i < totalEmojis; i++) {
        const emojiEl = document.createElement('span');
        emojiEl.className = 'burst-emoji';
        emojiEl.textContent = emojis[Math.floor(Math.random() * emojis.length)];

        const angle = Math.random() * Math.PI * 2;
        
        // Jarak disesuaikan dengan ukuran layar monitor/HP biar menyebar full se-layar
        const maxDistance = Math.max(window.innerWidth, window.innerHeight) * 0.8;
        const distance = Math.random() * maxDistance + 150; 
        
        const tx = Math.cos(angle) * distance + 'px';
        const ty = Math.sin(angle) * distance + 'px';
        const rot = (Math.random() * 720 - 360) + 'deg';

        emojiEl.style.setProperty('--tx', tx);
        emojiEl.style.setProperty('--ty', ty);
        emojiEl.style.setProperty('--rot', rot);
        
        // Ukuran emoji bervariasi biar estetik
        emojiEl.style.fontSize = (Math.random() * 1.8 + 1.2) + 'rem';

        container.appendChild(emojiEl);

        setTimeout(() => emojiEl.remove(), 2500);
    }
}
// KLIK KADO -> BUNGANYA MELEDAK KE SEGALAH ARAH -> PINDAH KE SCREEN KUE
document.getElementById('gift-box').addEventListener('click', function() {
    // 1. Munculin efek ledakan emoji bunga
    popEmojiBurst();

    // 2. Langsung ganti layar & autoplay lagu
    setTimeout(() => {
        document.getElementById('gift-screen').style.display = 'none';
        document.getElementById('content-screen').classList.add('visible');

        const music = document.getElementById('bg-music');
        const playBtn = document.getElementById('music-btn');

        if (music) {
            music.play().then(() => {
                if (playBtn) playBtn.textContent = "⏸";
            }).catch(err => console.log("Autoplay dicegah browser:", err));
        }
    }, 300); // 0.3 detik biar pas bunga meledak layarnya langsung keisi kue
});
// DAFTAR LAGU (Bisa kamu tambah sepuasnya)
const playlist = [
    {
        title: "Best Part",
        artist: "Daniel Caesar",
        src: "music/bestpart.mp3",
        cover: "assets/bpart.jpg"
    },
    {
        title: "bad",
        artist: "Tulus",
        src: "music/bad.mp3",
        cover: "assets/w2e.jpg"
    },
    {
        title: "seasons",
        artist: "Wave to earth",
        src: "music/season.mp3",
        cover: "assets/w2e1.jpg"
    }
];

let currentSongIndex = 0;
const music = document.getElementById('bg-music');
const playBtn = document.getElementById('music-btn');

function renderPlaylist() {
    const listContainer = document.getElementById('playlist-list');
    listContainer.innerHTML = "";

    playlist.forEach((song, index) => {
        const item = document.createElement('div');
        item.className = `playlist-item ${index === currentSongIndex ? 'active' : ''}`;
        item.onclick = () => selectSong(index);

        item.innerHTML = `
            <div>
                <div class="item-title">${index + 1}. ${song.title}</div>
                <div style="font-size:0.7rem; color:#aaa;">${song.artist}</div>
            </div>
            <span>${index === currentSongIndex ? '▶' : ''}</span>
        `;
        listContainer.appendChild(item);
    });
}

function loadSong(index) {
    const song = playlist[index];
    document.getElementById('song-title').textContent = song.title;
    document.getElementById('song-artist').textContent = song.artist;
    document.getElementById('song-cover').src = song.cover;
    music.src = song.src;
    renderPlaylist();
}

function selectSong(index) {
    currentSongIndex = index;
    loadSong(currentSongIndex);
    music.play();
    playBtn.textContent = "⏸";
}

// Load pertama kali
loadSong(currentSongIndex);

function toggleMusic() {
    if (music.paused) {
        music.play();
        playBtn.textContent = "⏸";
    } else {
        music.pause();
        playBtn.textContent = "▶";
    }
}

function nextSong() {
    currentSongIndex = (currentSongIndex + 1) % playlist.length;
    loadSong(currentSongIndex);
    music.play();
    playBtn.textContent = "⏸";
}

function prevSong() {
    currentSongIndex = (currentSongIndex - 1 + playlist.length) % playlist.length;
    loadSong(currentSongIndex);
    music.play();
    playBtn.textContent = "⏸";
}

// SCRIPT COUNTDOWN OTOMATIS
function startBirthdayCountdown() {
    // Set tanggal ultah Jepp (Bulan 9 = September, Tanggal 10)
    const birthMonth = 9; // September
    const birthDay = 10;

    function updateCountdown() {
        const now = new Date();
        let currentYear = now.getFullYear();
        
        // Tentuin target ultah berikutnya
        let nextBirthday = new Date(currentYear, birthMonth - 1, birthDay);

        // Kalau ultah tahun ini udah lewat, hitung ke tahun depan
        if (now > nextBirthday) {
            nextBirthday = new Date(currentYear + 1, birthMonth - 1, birthDay);
        }

        const diff = nextBirthday - now;

        const days = Math.floor(diff / (1000 * 60 * 60 * 24));
        const hours = Math.floor((diff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
        const minutes = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60));
        const seconds = Math.floor((diff % (1000 * 60)) / 1000);

        document.getElementById('cd-days').textContent = String(days).padStart(2, '0');
        document.getElementById('cd-hours').textContent = String(hours).padStart(2, '0');
        document.getElementById('cd-minutes').textContent = String(minutes).padStart(2, '0');
        document.getElementById('cd-seconds').textContent = String(seconds).padStart(2, '0');
    }

    updateCountdown();
    setInterval(updateCountdown, 1000); // Jalan tiap detik
}

// Jalankan countdown otomatis
startBirthdayCountdown();

// FUNGSI HUJAN BUNGA CONTINUOUS DI BACKGROUND
function startContinuousPetals() {
    const container = document.getElementById('petals-bg-container');
    if (!container) return;

    const petalEmojis = ['🌸', '🌺', '🌷', '✨', '🌹', '🎂', '🕯', '💗'];

    // Bikin kelopak bunga baru setiap 400 milidetik
    setInterval(() => {
        const petal = document.createElement('span');
        petal.className = 'falling-petal';
        petal.textContent = petalEmojis[Math.floor(Math.random() * petalEmojis.length)];

        // Atur posisi X acak, durasi jatuh acak, dan ukuran acak
        const startLeft = Math.random() * 100; // Posisi horizontal (0% - 100%)
        const duration = Math.random() * 3 + 4; // Kecepatan jatuh (4 - 7 detik)
        const size = Math.random() * 0.8 + 0.8; // Ukuran (0.8rem - 1.6rem)

        petal.style.left = startLeft + '%';
        petal.style.animationDuration = duration + 's';
        petal.style.fontSize = size + 'rem';

        container.appendChild(petal);

        // Hapus elemen setelah selesai jatuh biar web gak lemot
        setTimeout(() => {
            petal.remove();
        }, duration * 1000);
    }, 400);
}

// JALANKAN HUJAN BUNGA PAS KADO DIKLIK (MASUK SCREEN KUE)
document.getElementById('gift-box').addEventListener('click', function() {
    // 1. Efek ledakan bunga pas diklik
    if (typeof popEmojiBurst === "function") popEmojiBurst();

    // 2. Pindah layar
    setTimeout(() => {
        document.getElementById('gift-screen').style.display = 'none';
        document.getElementById('content-screen').classList.add('visible');

        // Mulaikan hujan bunga background terus-menerus
        startContinuousPetals();

        // Play Musik
        const music = document.getElementById('bg-music');
        const playBtn = document.getElementById('music-btn');
        if (music) {
            music.play().then(() => {
                if (playBtn) playBtn.textContent = "⏸";
            }).catch(err => console.log(err));
        }
    }, 800);
});

// ==========================================
// 1. EFEK PERCIKAN API PAS LILIN DIKLIK
// ==========================================
function createCandleSparks(x, y) {
    const totalSparks = 30;
    for (let i = 0; i < totalSparks; i++) {
        const spark = document.createElement('div');
        spark.className = 'spark-particle';
        
        const angle = Math.random() * Math.PI * 2;
        const distance = Math.random() * 120 + 30;
        const tx = Math.cos(angle) * distance + 'px';
        const ty = Math.sin(angle) * distance + 'px';

        spark.style.left = x + 'px';
        spark.style.top = y + 'px';
        spark.style.setProperty('--tx', tx);
        spark.style.setProperty('--ty', ty);

        document.body.appendChild(spark);
        setTimeout(() => spark.remove(), 800);
    }
}

// ==========================================
// 1. FUNGSI PERCIKAN API LILIN (HARUS DI ATAS)
// ==========================================
function createCandleSparks(x, y) {
    const totalSparks = 30;
    for (let i = 0; i < totalSparks; i++) {
        const spark = document.createElement('div');
        spark.className = 'spark-particle';
        
        const angle = Math.random() * Math.PI * 2;
        const distance = Math.random() * 120 + 30;
        const tx = Math.cos(angle) * distance + 'px';
        const ty = Math.sin(angle) * distance + 'px';

        spark.style.left = x + 'px';
        spark.style.top = y + 'px';
        spark.style.setProperty('--tx', tx);
        spark.style.setProperty('--ty', ty);

        document.body.appendChild(spark);
        setTimeout(() => spark.remove(), 800);
    }
}

if (cakeContainer) {
    cakeContainer.addEventListener('click', function(e) {
        // Ambil titik koordinat klik
        const rect = cakeContainer.getBoundingClientRect();
        const clickX = e.clientX || (rect.left + rect.width / 2);
        const clickY = e.clientY || (rect.top + 20);

        // Percikan api selalu muncul tiap kali kue diklik
        createCandleSparks(clickX, clickY);

        // Cek lilin 1 dulu
        if (flame1 && !flame1.classList.contains('off')) {
            // TAP 1: Matiin lilin 1
            flame1.classList.add('off');
            if (subMessage) {
                subMessage.innerHTML = "<b>Satu lilin padam! 🕯️</b><br>Tap sekali lagi buat matiin lilin terakhir... ✨";
            }
        } 
        // Kalau lilin 1 udah mati, baru matiin lilin 2
        else if (flame2 && !flame2.classList.contains('off')) {
            // TAP 2: Matiin lilin 2
            flame2.classList.add('off');
            if (subMessage) {
                subMessage.innerHTML = "<b>Permohonanmu sudah dicatat! ✨✨</b><br>Semoga semua impianmu terwujud di tahun ini ❤️";
            }
        }
    });
}


// ==========================================
// KEMBANG API OTOMATIS (CUMA DI AREA LANGIT & ANTI-SCROLL)
// ==========================================
function setupAutomaticFireworks() {
    let canvas = document.getElementById('fireworks-canvas');
    if (!canvas) {
        canvas = document.createElement('canvas');
        canvas.id = 'fireworks-canvas';
        document.body.appendChild(canvas);
    }
    const ctx = canvas.getContext('2d');

    function resize() {
        canvas.width = window.innerWidth;
        canvas.height = window.innerHeight;
    }
    resize();
    window.addEventListener('resize', resize);

    let particles = [];
    const colors = ['#ff7675', '#fd79a8', '#ffeaa7', '#55efc4', '#74b9ff', '#a29bfe', '#ffbe76'];

    class FireworkParticle {
        constructor(x, y) {
            this.x = x;
            this.y = y;
            this.color = colors[Math.floor(Math.random() * colors.length)];
            const angle = Math.random() * Math.PI * 2;
            const speed = Math.random() * 5 + 2;
            this.vx = Math.cos(angle) * speed;
            this.vy = Math.sin(angle) * speed;
            this.alpha = 1;
            this.decay = Math.random() * 0.02 + 0.015;
        }
        update() {
            this.x += this.vx;
            this.y += this.vy;
            this.vy += 0.04;
            this.alpha -= this.decay;
        }
        draw() {
            ctx.save();
            ctx.globalAlpha = this.alpha;
            ctx.beginPath();
            ctx.arc(this.x, this.y, 2.5, 0, Math.PI * 2);
            ctx.fillStyle = this.color;
            ctx.shadowBlur = 8;
            ctx.shadowColor = this.color;
            ctx.fill();
            ctx.restore();
        }
    }

    function spawnExplosion(x, y) {
        for (let i = 0; i < 35; i++) {
            particles.push(new FireworkParticle(x, y));
        }
    }

    // 1. MELEDAK OTOMATIS (KHUSUS DI AREA LANGIT)
    setInterval(() => {
        const contentScreen = document.getElementById('content-screen');
        const cake = document.getElementById('cake-container');
        
        if (contentScreen && contentScreen.classList.contains('visible') && cake) {
            const cakeRect = cake.getBoundingClientRect();
            
            // Jarak aman meledak (minimal 100px di atas kue)
            const maxY = cakeRect.top - 100; 
            const safeMaxY = maxY > 50 ? maxY : canvas.height * 0.15;

            const randomX = Math.random() * (canvas.width - 100) + 50;
            const randomY = Math.random() * (safeMaxY - 20) + 20;
            
            spawnExplosion(randomX, randomY);
        }
    }, 700);

    // 2. DETEKSI KLIK (HANYA JIKA NGETAP DI AREA LANGIT)
    window.addEventListener('pointerdown', function(e) {
        const contentScreen = document.getElementById('content-screen');
        const cake = document.getElementById('cake-container');
        
        if (contentScreen && contentScreen.classList.contains('visible') && cake) {
            const cakeRect = cake.getBoundingClientRect();
            
            // CEK: Apakah Jepp ngetap DI ATAS area kue?
            // Kita kasih margin 50px di atas kue buat area aman ngetap langit
            if (e.clientY < (cakeRect.top - 50)) {
                spawnExplosion(e.clientX, e.clientY);
            }
        }
    });

    function animate() {
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        for (let i = particles.length - 1; i >= 0; i--) {
            particles[i].update();
            particles[i].draw();
            if (particles[i].alpha <= 0) particles.splice(i, 1);
        }
        requestAnimationFrame(animate);
    }
    animate();
}

setupAutomaticFireworks();

function toggleLetter() {
    const letter = document.querySelector('.letter-card-wrapper');
    letter.classList.toggle('open');
}

document.addEventListener("DOMContentLoaded", function () {
    const sections = document.querySelectorAll(".memory-section, .photostrip-section");

    const observer = new IntersectionObserver((entries) => {
        entries.forEach((entry) => {
            if (entry.isIntersecting) {
                // Munculkan saat masuk layar
                entry.target.classList.add("active");
            } else {
                // Sembunyikan lagi pas keluar layar biar bisa re-animate pas di-scroll balik
                entry.target.classList.remove("active");
            }
        });
    }, {
        threshold: 0.15, // Kapan animasi mulai terpicu (15% elemen masuk layar)
        rootMargin: "0px 0px -40px 0px"
    });

    sections.forEach((sec) => observer.observe(sec));
});

// ATUR TARGET TANGGAL & JAM 00.00
function checkUnlockTime() {
    const now = new Date();
    
    // Tentukan waktu target jam 00:00:00 (Tengah malam)
    const target = new Date();
    target.setHours(0, 0, 0, 0); // Atur ke 00:00:00 terdekat

    const diff = target - now;

    const pinGrid = document.getElementById("pin-grid");
    const lockBox = document.getElementById("lock-status-box");
    const timerDisplay = document.getElementById("countdown-timer");

    if (diff <= 0) {
        // SUDAH JAM 00.00 -> BUKA PIN!
        if (pinGrid) pinGrid.classList.remove("disabled-grid");
        if (lockBox) lockBox.style.display = "none"; // Sembunyikan box kunci
    } else {
        // BELUM JAM 00.00 -> KUNCI TOTAL PIN!
        if (pinGrid) pinGrid.classList.add("disabled-grid");

        // Hitung Sisa Waktu
        const hours = Math.floor((diff / (1000 * 60 * 60)) % 24);
        const minutes = Math.floor((diff / 1000 / 60) % 60);
        const seconds = Math.floor((diff / 1000) % 60);

        const pad = (n) => (n < 10 ? `0${n}` : n);

        if (timerDisplay) {
            timerDisplay.innerHTML = `${pad(hours)}:${pad(minutes)}:${pad(seconds)}`;
        }
    }
}

// Jalankan terus tiap detik
setInterval(checkUnlockTime, 1000);
checkUnlockTime();
