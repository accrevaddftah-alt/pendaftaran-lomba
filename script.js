/* ==========================================================================
   JAVASCRIPT - WEBSITE PENDAFTARAN LOMBA 17 AGUSTUS 2026
   ========================================================================== */

/* Data lomba per kategori */
const COMPETITION_DATA = {
    'PAUD dibawah TK': [
        'Memindahkan Bola dengan Sendok',
        'Mengumpulkan Karet',
        'Memindahkan Air ke Dalam Botol'
    ],
    'TK': [
        'Berjalan Menggunakan Kardus',
        'Menumpukan Gelas dengan Sumpit',
        'Makan Kerupuk'
    ],
    'SD 1-3': [
        'Memasukkan Sedotan ke Dalam Botol',
        'Meniup Gelas Terbang',
        'Makan Kerupuk'
    ],
    'SD 4-6': [
        'Memindahkan Karet Pakai Sedotan',
        'Cukurukuk',
        'Makan Kerupuk'
    ],
    'SMP Kelas 1': [
        'Memasukan Pensil Kedalam Botol',
        'Tiup Balon dalam Gelas',
        'Makan Kerupuk dengan Pancingan'
    ]
};


/* =========================================================
   SIMULASI FITUR DINAMIS KELUARGA (MEMUNCULKAN FORM)
   ========================================================= */
const dropdownJumlah = document.getElementById('jumlah-peserta');
const wadahPeserta = document.getElementById('wadah-peserta-dinamis');

if (dropdownJumlah) {
    dropdownJumlah.addEventListener('change', function() {
        const jumlah = parseInt(this.value);
        wadahPeserta.innerHTML = ''; // Kosongkan area bawah setiap kali angka diganti

        // Skenario 1: Jika pilih 0 (Hanya Doorprize)
        if (jumlah === 0) {
            wadahPeserta.innerHTML = `
                <div style="background: rgba(230,57,70,0.05); border-left: 3px solid var(--primary-color); padding: 12px; font-size: 13.5px; color: var(--text-muted); margin-bottom: 20px;">
                    <i class="fa-solid fa-circle-info" style="color: var(--primary-color);"></i> 
                    Keluarga ini hanya akan mendapatkan kupon Doorprize dan tidak terdaftar di lomba anak-anak.
                </div>`;
            return;
        }

        // Skenario 2: Jika pilih 1, 2, 3, dst (Mencetak form otomatis)
        let htmlForm = '';
        for (let i = 1; i <= jumlah; i++) {
            htmlForm += `
                <div class="peserta-box" style="border: 1px solid var(--border-color); padding: 20px; border-radius: 12px; margin-bottom: 20px; background-color: var(--bg-alt-color);">
                    <h4 style="margin-bottom: 16px; color: var(--primary-color); font-size: 15px; border-bottom: 1px dashed var(--border-color); padding-bottom: 8px;">
                        Data Peserta Ke-${i}
                    </h4>
                    
                    <div class="form-group">
                        <label>Nama Peserta ${i} <span class="required">*</span></label>
                        <input type="text" id="nama-peserta-${i}" placeholder="Masukkan nama peserta..." required>
                    </div>

                    <div class="form-group">
                        <label>Kategori Lomba Peserta ${i} <span class="required">*</span></label>
                        <select class="dynamic-category" data-index="${i}" required>
                            <option value="" disabled selected>Pilih kategori lomba</option>
                            <option value="PAUD dibawah TK">PAUD / Di Bawah TK</option>
                            <option value="TK">TK</option>
                            <option value="SD 1-3">SD Kelas 1–3</option>
                            <option value="SD 4-6">SD Kelas 4–6</option>
                            <option value="SMP Kelas 1">SMP Kelas 1</option>
                        </select>
                    </div>

                    <div class="form-group">
                        <label>Pilih Lomba untuk Peserta ${i} <span class="required">*</span></label>
                        <div id="opsi-lomba-${i}" class="lomba-checkbox-group">
                            <p style="font-size: 12.5px; color: var(--text-muted);">Pilih kategori di atas terlebih dahulu.</p>
                        </div>
                    </div>
                </div>
            `;
        }
        
        // Tampilkan kotak-kotak HTML yang sudah dirakit ke layar
        wadahPeserta.innerHTML = htmlForm;
        
        // Aktifkan fungsi agar kategori yang dipilih bisa memunculkan lomba yang sesuai
        jalankanLogikaKategori();
    });
}

function jalankanLogikaKategori() {
    const semuaPilihanKategori = document.querySelectorAll('.dynamic-category');
    
    semuaPilihanKategori.forEach(selectDropdown => {
        selectDropdown.addEventListener('change', function() {
            const index = this.getAttribute('data-index');
            const kategoriDipilih = this.value;
            const wadahCentangLomba = document.getElementById(`opsi-lomba-${index}`);
            
            wadahCentangLomba.innerHTML = ''; // Kosongkan centang sebelumnya
            
            // Cocokkan dengan data perlombaan di atas
            if (COMPETITION_DATA[kategoriDipilih]) {
                COMPETITION_DATA[kategoriDipilih].forEach((namaLomba) => {
                    wadahCentangLomba.innerHTML += `
                        <label class="lomba-checkbox-item">
                            <input type="checkbox" name="lomba-peserta-${index}" value="${namaLomba}">
                            <span>${namaLomba}</span>
                        </label>
                    `;
                });
            }
        });
    });
}

const renderLombaOptions = (category, preselected = []) => {
    const lombaOptionsContainer = document.getElementById('lomba-options');
    const lombaHint = document.getElementById('lomba-hint');
    if (!lombaOptionsContainer) return;

    lombaOptionsContainer.innerHTML = '';

    if (!category || !COMPETITION_DATA[category]) {
        if (lombaHint) {
            lombaHint.textContent = 'Pilih kategori lomba terlebih dahulu untuk melihat pilihan lomba.';
            lombaHint.style.display = 'block';
        }
        return;
    }

    if (lombaHint) {
        lombaHint.textContent = 'Pilih satu atau lebih lomba yang ingin diikuti:';
        lombaHint.style.display = 'block';
    }

    COMPETITION_DATA[category].forEach((lombaName, index) => {
        const label = document.createElement('label');
        label.className = 'lomba-checkbox-item';
        label.setAttribute('for', `lomba-${index}`);

        const checkbox = document.createElement('input');
        checkbox.type = 'checkbox';
        checkbox.name = 'lomba';
        checkbox.id = `lomba-${index}`;
        checkbox.value = lombaName;

        if (preselected.includes(lombaName)) {
            checkbox.checked = true;
        }

        const span = document.createElement('span');
        span.textContent = lombaName;

        label.appendChild(checkbox);
        label.appendChild(span);
        lombaOptionsContainer.appendChild(label);

        checkbox.addEventListener('change', () => {
            const lombaFormGroup = document.getElementById('lomba-form-group');
            if (lombaFormGroup) {
                lombaFormGroup.classList.remove('error');
            }
        });
    });
};

/*  ========================================================
    LOGIKA MODAL GACHA + MODAL PIN CUSTOM + MEMORI LOCALSTORAGE
    ======================================================== */
    document.addEventListener('DOMContentLoaded', () => {
    const SCRIPT_URL = "https://script.google.com/macros/s/AKfycbwa2TvP4dMh-ubK1ZbwjiRhs1uf7HPGj5vBj5rtAr6Ui6GLdWmPqIBQZWYLSV27DEqOVQ/exec"; 

    const gachaModal = document.getElementById('gacha-modal');
    const gachaTriggerFab = document.getElementById('gacha-trigger-fab');
    const gachaCloseBtn = document.getElementById('gacha-close-btn');
    const spinBtn = document.getElementById('gacha-spin-btn');
    
    const minInput = document.getElementById('gacha-min-no');
    const maxInput = document.getElementById('gacha-max-no');
    
    const resultImg = document.getElementById('gacha-result-img');
    const resultText = document.getElementById('gacha-result-text');

    const PIN_PANITIA = "19452026"; // PIN Rahasia

    // Variabel Penyimpanan Lokal
    let availableNumbers = []; 

    // ==========================================
    // ELEMEN MODAL PIN & ALERT CUSTOM
    // ==========================================
    const pinModal = document.getElementById('pinModal');
    const pinInput = document.getElementById('adminPinInput');
    const btnPinCancel = document.getElementById('btnPinCancel');
    const btnPinSubmit = document.getElementById('btnPinSubmit');

    // Elemen Modal Alert Custom
    const alertModal = document.getElementById('alertModal');
    const btnAlertClose = document.getElementById('btnAlertClose');

    // --- Fungsi Buka/Tutup Modal PIN ---
    function openPinModal() {
        if (!pinModal) return;
        pinModal.classList.add('active');
        if (pinInput) {
            pinInput.value = '';
            pinInput.focus();
        }
    }

    function closePinModal() {
        if (!pinModal) return;
        pinModal.classList.remove('active');
    }

    // --- Fungsi Buka/Tutup Modal Alert PIN Salah ---
    function showAlertModal() {
        if (alertModal) {
            alertModal.classList.add('active');
        }
    }

    function closeAlertModal() {
        if (alertModal) {
            alertModal.classList.remove('active');
            if (pinInput) {
                pinInput.value = '';
                pinInput.focus();
            }
        }
    }

    // Event Listener Modal Alert Custom
    if (btnAlertClose) {
        btnAlertClose.addEventListener('click', closeAlertModal);
    }

    if (alertModal) {
        alertModal.addEventListener('click', (e) => {
            if (e.target === alertModal) closeAlertModal();
        });
    }

    // --- Verifikasi PIN Panitia ---
    function executePinVerification() {
        if (!pinInput) return;
        const enteredPin = pinInput.value;

        if (enteredPin === PIN_PANITIA) {
            closePinModal();
            // PIN Benar -> Buka Modal Gacha
            if (gachaModal) {
                gachaModal.classList.add('active');
                gachaModal.setAttribute('aria-hidden', 'false');
                
                // Muat angka range terakhir & data dari Google Sheets
                loadSavedGachaRange();
                loadAvailableNumbers();
            }
        } else {
            // PIN Salah -> Efek Getar pada Modal PIN + Popup Alert Custom
            const modalContent = pinModal ? pinModal.querySelector('.modal-content') : null;
            if (modalContent) {
                modalContent.classList.add('shake');
                setTimeout(() => modalContent.classList.remove('shake'), 400);
            }

            // Tampilkan Popup Alert Custom
            showAlertModal();
        }
    }

    // Event Listener untuk Tombol-tombol di Modal PIN
    if (btnPinSubmit) {
        btnPinSubmit.addEventListener('click', executePinVerification);
    }

    if (btnPinCancel) {
        btnPinCancel.addEventListener('click', closePinModal);
    }

    if (pinInput) {
        pinInput.addEventListener('keypress', (e) => {
            if (e.key === 'Enter') executePinVerification();
        });
    }

    if (pinModal) {
        pinModal.addEventListener('click', (e) => {
            if (e.target === pinModal) closePinModal();
        });
    }

    // ==========================================
    // SIMPAN & MUAT RANGE GACHA (LOCALSTORAGE)
    // ==========================================
    function loadSavedGachaRange() {
        if (minInput) {
            const savedMin = localStorage.getItem('gacha_min_no');
            if (savedMin !== null) minInput.value = savedMin;
        }
        if (maxInput) {
            const savedMax = localStorage.getItem('gacha_max_no');
            if (savedMax !== null) maxInput.value = savedMax;
        }
    }

    if (minInput) {
        minInput.addEventListener('input', () => {
            localStorage.setItem('gacha_min_no', minInput.value);
        });
    }

    if (maxInput) {
        maxInput.addEventListener('input', () => {
            localStorage.setItem('gacha_max_no', maxInput.value);
        });
    }

    // Ambil nomor yang BELUM DIUNDI dari Google Sheets
    async function loadAvailableNumbers() {
        if (!spinBtn) return;
        spinBtn.disabled = true;
        spinBtn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Memuat Data...';

        try {
            // 1. Kirim data ke Google Sheets
            const response = await fetch(SCRIPT_URL, {
                method: 'POST',
                body: formData,
                redirect: 'follow'
            });

            // 2. Baca balasan Google sebagai teks mentah terlebih dahulu (PELINDUNG ERROR HTML)
            const textResponse = await response.text(); 
            let data;

            try {
                // 3. Coba ubah teks tersebut menjadi format JSON
                data = JSON.parse(textResponse);
            } catch (parseError) {
                // 4. Jika gagal (Google membalas HTML), tangkap error-nya di sini
                console.error("Google mengembalikan HTML, bukan JSON:", textResponse);
                throw new Error("Sistem Google sedang memproses atau sesi kedaluwarsa.");
            }

            // 5. Jika aman dan berhasil jadi JSON, lanjutkan logika sukses Anda
            if (data.result === 'success' || data.success) {
                // ... (Masukkan kode ketika pendaftaran berhasil di sini) ...
            }

            // Jika sukses menjadi JSON, jalankan logikanya
            if (data.success) {
                availableNumbers = data.numbers; // Mengambil array angka dari server
                console.log("Nomor yang tersedia untuk diundi:", availableNumbers);
            } else {
                console.error("Gagal memuat nomor:", data.message);
            }
        
        } catch (err) {
            console.error("Gagal terhubung ke Google Sheets:", err);
            
            // Tampilkan pesan error yang ramah ke panitia
            showCustomAlert(
                "Koneksi Sibuk", 
                "Mohon maaf, sistem Google sedang sibuk atau sesi Anda kedaluwarsa. Silakan refresh (muat ulang) halaman ini ya!"
            );
        
        } finally {
            // Kembalikan tombol seperti semula
            spinBtn.disabled = false;
            spinBtn.innerHTML = '<i class="fas fa-arrows-rotate"></i> Acak Sekarang!';
        }
    }

    // =========================================================
    // Trigger Buka Modal Utama
    // =========================================================
    if (gachaTriggerFab) {
        gachaTriggerFab.addEventListener('click', () => {
            openPinModal();
        });
    }

    // Tutup Modal Gacha Utama
    if (gachaCloseBtn && gachaModal) {
        gachaCloseBtn.addEventListener('click', () => {
            // Hilangkan fokus dari tombol sebelum menutup modal
            gachaCloseBtn.blur(); 
            
            gachaModal.classList.remove('active');
            gachaModal.setAttribute('aria-hidden', 'true');
        });
    }

    // Update Status di Google Sheets
    async function updateStatusInSheets(nomorPemenang) {
        const formData = new URLSearchParams();
        formData.append("action", "claimDoorprize");
        formData.append("nomor", nomorPemenang);
        formData.append("status", "SUDAH DIUNDI");

        try {
            await fetch(SCRIPT_URL, {
                method: 'POST',
                mode: 'no-cors',
                body: formData
            });
            console.log(`Nomor #${nomorPemenang} berhasil di-update di Sheets.`);
        } catch (err) {
            console.error("Gagal update status:", err);
        }
    }

    // Proses Spin Gacha
    if (spinBtn) {
        spinBtn.addEventListener('click', () => {
            
            // 1. Validasi Input Kosong
            if (!minInput.value || !maxInput.value) {
                showCustomAlert("Perhatian!", "Harap isi Nomor Awal dan Nomor Akhir terlebih dahulu sebelum mengacak.");
                return; // Hentikan proses jalannya fungsi
            }

            const min = parseInt(minInput.value);
            const max = parseInt(maxInput.value);

            // 2. Validasi Logika Angka (Mencegah error jika min lebih besar dari max)
            if (min > max) {
                showCustomAlert("Input Tidak Valid", "Nomor Awal tidak boleh lebih besar dari Nomor Akhir.");
                return;
            }

            // 3. Pelindung: Pastikan data benar-benar berwujud Array agar tidak error saat difilter
            let daftarNomor = Array.isArray(availableNumbers) ? availableNumbers : [];
            const validPool = daftarNomor.filter(n => n >= min && n <= max);
            
            if (validPool.length === 0) {
                showCustomAlert("Semua Nomor Sudah Diundi!", "Semua nomor dalam jangkauan ini sudah diundi.");
                return;
            }

            spinBtn.disabled = true;
            spinBtn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Mengacak...';

            let duration = 5000;
            let intervalTime = 80;
            let elapsed = 0;

            const timer = setInterval(() => {
                const randomVisualNum = Math.floor(Math.random() * (max - min + 1)) + min;
                const formattedNum = `#${randomVisualNum.toString().padStart(3, '0')}`;

                if (resultImg) resultImg.src = `assets/${randomVisualNum}.png`;
                if (resultText) resultText.textContent = formattedNum;

                elapsed += intervalTime;

                if (elapsed >= duration) {
                    clearInterval(timer);

                    const randomIndex = Math.floor(Math.random() * validPool.length);
                    const winnerNum = validPool[randomIndex];
                    const formattedWinner = `#${winnerNum.toString().padStart(3, '0')}`;

                    if (resultImg) resultImg.src = `assets/${winnerNum}.png`;
                    if (resultText) resultText.textContent = formattedWinner;

                    availableNumbers = availableNumbers.filter(num => num !== winnerNum);

                    spinBtn.disabled = false;
                    spinBtn.innerHTML = '<i class="fas fa-arrows-rotate"></i> Acak Lagi!';

                    if (typeof startConfetti === 'function') {
                        startConfetti();
                    }

                    updateStatusInSheets(winnerNum);
                }
            }, intervalTime);
        });
    }
    // =========================================================
    // TAMBAHKAN FUNGSI ANIMASI KONFETI DI SINI
    // =========================================================
    function triggerConfetti() {
        if (typeof confetti === 'function') {
            // Pemicu ledakan confetti warna-warni
            confetti({
                particleCount: 120,
                spread: 80,
                origin: { y: 0.6 }
            });

            // Efek tambahan semburan dari kiri & kanan
            confetti({
                particleCount: 50,
                angle: 60,
                spread: 55,
                origin: { x: 0 }
            });
            confetti({
                particleCount: 50,
                angle: 120,
                spread: 55,
                origin: { x: 1 }
            });
        }
    }

}); // <-- Ini baris penutup dari document.addEventListener

    document.addEventListener('DOMContentLoaded', () => {

    const batasWaktu = new Date("2026-08-17T07:00:00+07:00");
    const sekarang = new Date();

    if (sekarang >= batasWaktu) {

    // Izinkan scroll kembali agar fitur pull-to-refresh di HP berfungsi
    document.documentElement.style.height = "auto";
    document.documentElement.style.overflowY = "auto";
    document.body.style.minHeight = "100vh";
    document.body.style.margin = "0";
    document.body.style.padding = "0";
    document.body.style.overflowY = "auto";

    document.body.innerHTML = `
    <!-- Container Utama dengan Background Gambar -->
    <div style="
        display: flex;
        justify-content: center;
        align-items: center;
        min-height: 100vh;
        width: 100%;
        background: url('image/image.png') center/cover no-repeat fixed;
        font-family: 'Poppins', sans-serif;
        text-align: center;
        padding: 60px 20px; /* Padding atas-bawah ditambah sedikit agar area scroll lebih terasa */
        box-sizing: border-box;
        position: relative;
    ">
        <!-- Overlay Gelap Tipis agar Teks & Card Lebih Kontras -->
        <div style="
            position: absolute;
            inset: 0;
            background: rgba(0, 0, 0, 0.35);
            z-index: 0;
        "></div>

        <!-- KOTAK / CARD TRANSPARAN (GLASSMORPHISM) -->
        <div style="
            position: relative;
            z-index: 2;
            background: rgba(15, 23, 42, 0.5);
            border: 1px solid rgba(255, 255, 255, 0.18);
            border-radius: 20px;
            padding: 40px 28px;
            max-width: 420px;
            width: 100%;
            box-shadow: 0 15px 35px rgba(0, 0, 0, 0.4);
            backdrop-filter: blur(12px);
            -webkit-backdrop-filter: blur(12px);
            box-sizing: border-box;
        ">
            <!-- Bendera Indonesia -->
            <div style="font-size: 42px; margin-bottom: 12px;">🇮🇩</div>

            <!-- Judul -->
            <h1 style="
                font-size: 22px;
                font-weight: 700;
                color: #ff4d4d;
                margin-bottom: 14px;
                line-height: 1.3;
                text-shadow: 0 2px 4px rgba(0,0,0,0.5);
            ">
                Pendaftaran Akan Segera Dibuka
            </h1>

            <!-- Deskripsi -->
            <p style="
                font-size: 13.5px;
                color: #e2e8f0;
                margin-bottom: 28px;
                line-height: 1.6;
                text-shadow: 0 1px 3px rgba(0,0,0,0.6);
            ">
                Untuk informasi lebih lanjut mengenai tentang Perlombaan dan lain-lain, silakan hubungi panitia melalui WhatsApp.
            </p>

            <!-- Tombol WhatsApp -->
            <a href="https://wa.me/62895622082567?text=Halo%20Panitia,%20saya%20ingin%20bertanya%20tentang%20pendaftaran%20lomba."
            target="_blank"
            style="
                display: inline-flex;
                align-items: center;
                justify-content: center;
                gap: 10px;
                width: 100%;
                padding: 14px 20px;
                background-color: #25D366;
                color: #ffffff;
                text-decoration: none;
                border-radius: 10px;
                font-weight: 600;
                font-size: 14.5px;
                box-shadow: 0 4px 15px rgba(37, 211, 102, 0.35);
                box-sizing: border-box;
            ">
                <i class="fa-brands fa-whatsapp" style="font-size: 19px;"></i>
                Hubungi Panitia via WhatsApp
            </a>
        </div>
    </div>
    `;
    return;
    }

    /* ---------------------------------------------------------
       1. PRELOADER & LOADING SCREEN
       --------------------------------------------------------- */
    const preloader = document.getElementById('preloader');
    
    // Hide the loader once window is fully loaded
    window.addEventListener('load', () => {
        setTimeout(() => {
            if (preloader) {
                preloader.classList.add('fade-out');
            }
        }, 500); // 500ms brief delay for aesthetic feeling
    });

    // Fallback: in case window load event already fired or fails
    setTimeout(() => {
        if (preloader && !preloader.classList.contains('fade-out')) {
            preloader.classList.add('fade-out');
        }
    }, 3000);
    
    /* ---------------------------------------------------------
       3. RESPONSIVE MOBILE NAVIGATION
       --------------------------------------------------------- */
    const hamburgerBtn = document.getElementById('hamburger-btn');
    const navMenu = document.getElementById('nav-menu');
    const navLinks = document.querySelectorAll('.nav-link');

    if (hamburgerBtn && navMenu) {
        // Toggle menu visibility
        hamburgerBtn.addEventListener('click', (e) => {
            e.stopPropagation();
            hamburgerBtn.classList.toggle('active');
            navMenu.classList.toggle('active');
        });

        // Close menu when clicking outside
        document.addEventListener('click', (e) => {
            if (navMenu.classList.contains('active') && !navMenu.contains(e.target) && e.target !== hamburgerBtn) {
                hamburgerBtn.classList.remove('active');
                navMenu.classList.remove('active');
            }
        });

        // Close menu when clicking any nav links
        navLinks.forEach(link => {
            link.addEventListener('click', () => {
                hamburgerBtn.classList.remove('active');
                navMenu.classList.remove('active');
            });
        });
    }


    /* ---------------------------------------------------------
       4. STICKY NAVBAR & NAVIGATION HIGHLIGHT ON SCROLL
       --------------------------------------------------------- */
    const navbar = document.getElementById('navbar');
    const sections = document.querySelectorAll('section');

    window.addEventListener('scroll', () => {
        // Sticky class toggle
        if (window.scrollY > 50) {
            navbar.classList.add('scrolled');
        } else {
            navbar.classList.remove('scrolled');
        }

        // Active link indicator highlights based on scroll position
        let currentSectionId = '';
        sections.forEach(section => {
            const sectionTop = section.offsetTop - 120;
            const sectionHeight = section.offsetHeight;
            if (window.scrollY >= sectionTop && window.scrollY < sectionTop + sectionHeight) {
                currentSectionId = section.getAttribute('id');
            }
        });

        if (currentSectionId) {
            navLinks.forEach(link => {
                link.classList.remove('active');
                if (link.getAttribute('href') === `#${currentSectionId}`) {
                    link.classList.add('active');
                }
            });
        }
    });


    /* ---------------------------------------------------------
       5. COUNTDOWN TIMER TO AUGUST 17, 2026
       --------------------------------------------------------- */
    const countdownDate = new Date('August 17, 2026 00:00:00').getTime();

    const updateCountdown = () => {
        const now = new Date().getTime();
        const distance = countdownDate - now;

        // Elements
        const daysEl = document.getElementById('days');
        const hoursEl = document.getElementById('hours');
        const minutesEl = document.getElementById('minutes');
        const secondsEl = document.getElementById('seconds');

        if (distance < 0) {
            // If the date has passed
            if (daysEl) daysEl.innerHTML = '00';
            if (hoursEl) hoursEl.innerHTML = '00';
            if (minutesEl) minutesEl.innerHTML = '00';
            if (secondsEl) secondsEl.innerHTML = '00';
            
            const countdownTitle = document.querySelector('.countdown-title');
            if (countdownTitle) countdownTitle.innerHTML = 'Acara Sedang Berlangsung!';
            return;
        }

        // Calculation
        const days = Math.floor(distance / (1000 * 60 * 60 * 24));
        const hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
        const minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
        const seconds = Math.floor((distance % (1000 * 60)) / 1000);

        // Render with leading zero helper
        if (daysEl) daysEl.innerHTML = days.toString().padStart(2, '0');
        if (hoursEl) hoursEl.innerHTML = hours.toString().padStart(2, '0');
        if (minutesEl) minutesEl.innerHTML = minutes.toString().padStart(2, '0');
        if (secondsEl) secondsEl.innerHTML = seconds.toString().padStart(2, '0');
    };

    // Run immediately and update every second
    updateCountdown();
    setInterval(updateCountdown, 1000);


    /* ---------------------------------------------------------
       6. FADE-UP ENTRY ANIMATIONS (INTERSECTION OBSERVER)
       --------------------------------------------------------- */
    const fadeUpElements = document.querySelectorAll('.fade-up-init');

    if ('IntersectionObserver' in window) {
        const observerOptions = {
            threshold: 0.1,
            rootMargin: '0px 0px -50px 0px'
        };

        const fadeUpObserver = new IntersectionObserver((entries, observer) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('fade-up-active');
                    observer.unobserve(entry.target); // Stop tracking once animated
                }
            });
        }, observerOptions);

        fadeUpElements.forEach(el => {
            fadeUpObserver.observe(el);
        });
    } else {
        // Fallback for browsers that don't support IntersectionObserver
        fadeUpElements.forEach(el => {
            el.classList.add('fade-up-active');
        });
    }


    /* ---------------------------------------------------------
       7. BACK TO TOP BUTTON
       --------------------------------------------------------- */
    const backToTopBtn = document.getElementById('back-to-top');

    if (backToTopBtn) {
        window.addEventListener('scroll', () => {
            if (window.scrollY > 400) {
                backToTopBtn.classList.add('visible');
            } else {
                backToTopBtn.classList.remove('visible');
            }
        });

        backToTopBtn.addEventListener('click', () => {
            window.scrollTo({
                top: 0,
                behavior: 'smooth'
            });
        });
    }


    /* ---------------------------------------------------------
       8. FAQ ACCORDION
       --------------------------------------------------------- */
    const faqTriggers = document.querySelectorAll('.faq-trigger');

    faqTriggers.forEach(trigger => {
        trigger.addEventListener('click', () => {
            const content = trigger.nextElementSibling;
            const isExpanded = trigger.getAttribute('aria-expanded') === 'true';

            // Close all other FAQ items for a clean UI
            faqTriggers.forEach(otherTrigger => {
                if (otherTrigger !== trigger) {
                    otherTrigger.setAttribute('aria-expanded', 'false');
                    otherTrigger.nextElementSibling.style.maxHeight = null;
                }
            });

            // Toggle current item
            if (isExpanded) {
                trigger.setAttribute('aria-expanded', 'false');
                content.style.maxHeight = null;
            } else {
                trigger.setAttribute('aria-expanded', 'true');
                content.style.maxHeight = content.scrollHeight + 'px';
            }
        });
    });


    /* ---------------------------------------------------------
       9. DYNAMIC LOMBA OPTIONS & FORM VALIDATION
       --------------------------------------------------------- */
    const regForm = document.getElementById('registration-form');
    
    const successModal = document.getElementById('success-modal');
    const closeModalBtn = document.getElementById('close-modal-btn');

    const doorprizeModal = document.getElementById('doorprize-modal');
    const doorprizeImage = document.getElementById('doorprize-image');
    const closeDoorprizeBtn = document.getElementById('close-doorprize-btn');
    const downloadDoorprizeBtn = document.getElementById('download-doorprize-btn');

    let nomorDoorprize = null;

    const submitBtn = regForm ? regForm.querySelector('.btn-submit') : null;
    const categorySelect = document.getElementById('category');
    const lombaFormGroup = document.getElementById('lomba-form-group');

    if (categorySelect) {
        categorySelect.addEventListener('change', () => {
            renderLombaOptions(categorySelect.value);
            if (lombaFormGroup) {
                lombaFormGroup.classList.remove('error');
            }
        });
    }

    // Helper: Mark field as error
    const showError = (inputEl, message) => {
        const formGroup = inputEl.closest('.form-group');
        if (formGroup) {
            formGroup.classList.add('error');
            const errorSpan = formGroup.querySelector('.error-msg');
            if (errorSpan) {
                errorSpan.textContent = message;
            }
        }
    };

    // Helper: Clear field error
    const clearError = (inputEl) => {
        const formGroup = inputEl.closest('.form-group');
        if (formGroup) {
            formGroup.classList.remove('error');
        }
    };

    // Real-time input listener to clear errors
    if (regForm) {
        const inputs = regForm.querySelectorAll('input:not([type="checkbox"]), select, textarea');
        inputs.forEach(input => {
            input.addEventListener('input', () => clearError(input));
            input.addEventListener('change', () => clearError(input));
        });
    }

    /*if (regForm) {
        regForm.addEventListener('submit', (e) => {
            e.preventDefault();
            let isValid = true;

            // 1. Validate Fullname
            const fullname = document.getElementById('fullname');
            const val = fullname.value.trim();

            if (val === '') {
                showError(fullname, 'Nama lengkap wajib diisi.');
                isValid = false;
            } else {
                // Otomatis ubah setiap awal kata menjadi Huruf Besar (Title Case)
                fullname.value = val.replace(/\b\w/g, (char) => char.toUpperCase());
                clearError(fullname);
            }

            // 2. Validate Category
            if (categorySelect.value === '') {
                showError(categorySelect, 'Kategori lomba wajib dipilih.');
                isValid = false;
            } else {
                clearError(categorySelect);
            }

            // 3. Validate Lomba (at least one checkbox)
            const selectedLomba = regForm.querySelectorAll('input[name="lomba"]:checked');
            if (selectedLomba.length === 0) {
                if (lombaFormGroup) {
                    lombaFormGroup.classList.add('error');
                    const errorSpan = document.getElementById('lomba-error');
                    if (errorSpan) {
                        errorSpan.textContent = 'Minimal satu lomba wajib dipilih.';
                    }
                }
                isValid = false;
            } else {
                if (lombaFormGroup) {
                    lombaFormGroup.classList.remove('error');
                }
            }

            // 4. Validate Gang
            const gang = document.getElementById("gang");
            const houseNumber = document.getElementById("houseNumber");

            if (gang.value === "") {
                showError(gang, "Silakan pilih gang.");
                isValid = false;
            } else {
                clearError(gang);
            }

            // 5. Validate Nomor Rumah
            if (houseNumber.value.trim() === "") {
                showError(houseNumber, "Nomor rumah wajib diisi.");
                isValid = false;
            } else {
                // Otomatis ubah inputan menjadi huruf besar semua (misal: "j1/54" -> "J1/54")
                houseNumber.value = houseNumber.value.toUpperCase();
                clearError(houseNumber);
            }

            // Focus on first error if invalid
            if (!isValid) {
                const firstError = regForm.querySelector('.form-group.error input:not([type="checkbox"]), .form-group.error select, .form-group.error textarea');
                if (firstError) {
                    firstError.focus();
                } else if (lombaFormGroup && lombaFormGroup.classList.contains('error')) {
                    const firstCheckbox = document.querySelector('#lomba-options input[type="checkbox"]');
                    if (firstCheckbox) firstCheckbox.focus();
                }
                return;
            }

            // Collect selected lomba names
            const lombaNames = Array.from(selectedLomba).map(cb => cb.value);

            // Loading button
            if (submitBtn) {
                submitBtn.classList.add("loading");
                submitBtn.disabled = true;
            }

            const formData = new FormData();

            const alamatLengkap =
                gang.value + " " + houseNumber.value.trim();

            formData.append("nama", fullname.value.trim());
            formData.append("kategori", categorySelect.value);
            formData.append("lomba", lombaNames.join(", "));
            formData.append("alamat", alamatLengkap);
            formData.append("pertanyaan", notes.value.trim());

            console.log("SEBELUM FETCH");

            fetch("https://script.google.com/macros/s/AKfycbw5eG8ztj5eiwl7ylX8-vVLrvbHPLDwNpP-MJVmFhGaKFxZHNAUGF1S9Ub-IX03Tfgf/exec", {
                method: "POST",
                body: formData,
                redirect: "follow"
            })

            .then(response => response.json())

            .then(result => {

            if (!result.success) {
                throw new Error(result.message || "Pendaftaran gagal.");
            }

            /*
            =====================================================
                                Fitur Doorprize
            =====================================================

            nomorDoorprize = Number(result.nomorDoorprize); //=====> Fitur Doorprize

            console.log("NOMOR DOORPRIZE:", nomorDoorprize); //=====> Fitur Doorprize

            // --- OPTIMASI: PRELOAD GAMBAR DI BACKGROUND AGAR TIDAK DELAY ---
            if (nomorDoorprize && doorprizeImage) {
                const imgPreload = new Image();
                imgPreload.src = `assets/${nomorDoorprize}.png`; // Jalankan download di background
                doorprizeImage.src = imgPreload.src;            // Pasang ke elemen gambar
            }


            document.getElementById("registered-name").textContent = fullname.value;
            document.getElementById("registered-category").textContent = categorySelect.value;
            document.getElementById("registered-competition").textContent = lombaNames.join(", ");

            successModal.classList.add("active");

            startConfetti();

            regForm.reset();
            renderLombaOptions("");

        })

        .catch(err => {

            console.error(err);
            alert(err);

        })
        .finally(() => {

            submitBtn.classList.remove("loading");
            submitBtn.disabled = false;

        });

        });

        }*/

        if (regForm) {
        regForm.addEventListener('submit', (e) => {
            e.preventDefault();
            let isValid = true;

            // 1. Validasi Nama Perwakilan
            const namaPerwakilan = document.getElementById('nama-perwakilan');
            if (namaPerwakilan.value.trim() === '') {
                showError(namaPerwakilan, 'Nama perwakilan wajib diisi.');
                isValid = false;
            } else {
                namaPerwakilan.value = namaPerwakilan.value.trim().replace(/\b\w/g, (c) => c.toUpperCase());
                clearError(namaPerwakilan);
            }

            // 2. Validasi Total Anggota Keluarga
            const totalKeluarga = document.getElementById('total-keluarga');
            if (totalKeluarga.value.trim() === '' || parseInt(totalKeluarga.value) < 1) {
                showError(totalKeluarga, 'Total keluarga wajib diisi minimal 1.');
                isValid = false;
            } else {
                clearError(totalKeluarga);
            }

            // 3. Validasi Jumlah Peserta Lomba
            const jumlahPesertaSelect = document.getElementById('jumlah-peserta');
            if (jumlahPesertaSelect.value === '') {
                // Beri penanda error manual
                isValid = false;
                alert('Silakan pilih jumlah anggota yang ikut lomba.');
            }

            // 4. Validasi Gang & Nomor Rumah (Menggunakan elemen lama Anda)
            const gang = document.getElementById("gang");
            const houseNumber = document.getElementById("houseNumber");

            if (gang.value === "") {
                showError(gang, "Silakan pilih gang.");
                isValid = false;
            } else {
                clearError(gang);
            }

            if (houseNumber.value.trim() === "") {
                showError(houseNumber, "Nomor rumah wajib diisi.");
                isValid = false;
            } else {
                houseNumber.value = houseNumber.value.toUpperCase();
                clearError(houseNumber);
            }

            // 5. Validasi Kotak Dinamis Peserta (Jika memilih >= 1 peserta)
            const jumlahPeserta = parseInt(jumlahPesertaSelect.value) || 0;
            let dataPesertaList = [];

            for (let i = 1; i <= jumlahPeserta; i++) {
                const inputNamaPeserta = document.getElementById(`nama-peserta-${i}`);
                const selectKategori = document.querySelector(`.dynamic-category[data-index="${i}"]`);
                const kotakCentangLomba = document.querySelectorAll(`input[name="lomba-peserta-${i}"]:checked`);

                if (!inputNamaPeserta || inputNamaPeserta.value.trim() === '') {
                    alert(`Nama untuk Peserta Ke-${i} wajib diisi.`);
                    isValid = false;
                    break;
                }

                if (!selectKategori || selectKategori.value === '') {
                    alert(`Kategori lomba untuk Peserta Ke-${i} wajib dipilih.`);
                    isValid = false;
                    break;
                }

                if (kotakCentangLomba.length === 0) {
                    alert(`Minimal pilih satu lomba untuk Peserta Ke-${i}.`);
                    isValid = false;
                    break;
                }

                // Kumpulkan nama-nama lomba yang dicentang
                let namaLombaDipilih = Array.from(kotakCentangLomba).map(cb => cb.value);

                // Masukkan ke dalam daftar data peserta
                dataPesertaList.push({
                    nama: inputNamaPeserta.value.trim(),
                    kategori: selectKategori.value,
                    lomba: namaLombaDipilih.join(", ")
                });
            }

            if (!isValid) return;

            // Jika lolos semua validasi, aktifkan animasi loading tombol
            if (submitBtn) {
                submitBtn.classList.add("loading");
                submitBtn.disabled = true;
            }

            // Gabungkan alamat rumah
            const alamatLengkap = gang.value + " " + houseNumber.value.trim();

            // Rancang data yang akan dikirim ke Google Apps Script
            const formData = new FormData();
            formData.append("namaPerwakilan", namaPerwakilan.value.trim());
            formData.append("totalKeluarga", totalKeluarga.value);
            formData.append("alamat", alamatLengkap);
            formData.append("pertanyaan", notes ? notes.value.trim() : '');
            
            // 1. Teks Lengkap (Untuk Sheet SEMUA PESERTA)
            let ringkasanDetailPeserta = dataPesertaList.length > 0 
                ? dataPesertaList.map((p, idx) => `${idx + 1}. ${p.nama} (${p.kategori}: ${p.lomba})`).join(" | ")
                : "Hanya Kupon Doorprize / Jalan Santai";

            // 2. Teks Ringkas Tanpa Lomba & Tanpa Nama Anak (Untuk Sheet DOORPRIZE)
            // Jika ada anak yang ikut lomba, cetak "Mengikuti semua acara". Jika nol, cetak "Hanya Jalan Santai"
            let ringkasanDoorprize = dataPesertaList.length > 0 
                ? "Mengikuti semua acara"
                : "Hanya Kupon Doorprize / Jalan Santai";

            formData.append("detailDoorprize", ringkasanDoorprize); 
            formData.append("dataPesertaJSON", JSON.stringify(dataPesertaList)); 
            
            // 3. Kirim Data Mentah JSON (Agar Panitia bisa memisahkannya ke Sheet Kategori)
            formData.append("dataPesertaJSON", JSON.stringify(dataPesertaList));

            // Proses Fetch ke Google Sheets Backend Anda
            fetch("https://script.google.com/macros/s/AKfycbwa2TvP4dMh-ubK1ZbwjiRhs1uf7HPGj5vBj5rtAr6Ui6GLdWmPqIBQZWYLSV27DEqOVQ/exec", {
                method: "POST",
                body: formData,
                redirect: "follow"
            })
            .then(response => response.json())
            .then(result => {
                if (!result.success) {
                    throw new Error(result.message || "Pendaftaran gagal.");
                }

                nomorDoorprize = Number(result.nomorDoorprize);

                // 4. Preload gambar doorprize BERDASARKAN TOTAL KELUARGA
                // Memunculkan gambar kupon SESUAI nomor urut dari Google Sheets
                const containerKupon = document.getElementById('doorprize-image-container');
                if (containerKupon) {
                    containerKupon.innerHTML = ''; // Kosongkan wadah
                    const jumlahKupon = parseInt(totalKeluarga.value) || 1;
                    
                    for (let i = 0; i < jumlahKupon; i++) {
                        // nomorDoorprize adalah nomor pertama yang dikirim dari server
                        // Kita tambahkan i (0, 1, 2, dst) untuk nomor kupon selanjutnya
                        const nomorKuponAktual = nomorDoorprize + i;
                        
                        containerKupon.innerHTML += `<img src="assets/${nomorKuponAktual}.png" class="doorprize-image" style="width: 100%; max-width: 380px; border-radius: 10px; object-fit: contain;" alt="Kupon ${nomorKuponAktual}">`;
                    }
                }

                // Tampilkan data di Modal Sukses
                document.getElementById("registered-name").textContent = namaPerwakilan.value;
                document.getElementById("registered-category").textContent = `Total Keluarga: ${totalKeluarga.value} Orang`;
                document.getElementById("registered-competition").textContent = jumlahPeserta > 0 ? `${jumlahPeserta} Anak Terdaftar Lomba` : "Pendaftaran Kupon Doorprize Saja";

                successModal.classList.add("active");
                startConfetti();

                // Reset form
                regForm.reset();
                wadahPeserta.innerHTML = '';
            })
            .catch(err => {
                console.error(err);
                alert(err);
            })
            .finally(() => {
                submitBtn.classList.remove("loading");
                submitBtn.disabled = false;
            });
        });
    }

        // Close Modal Event Handler (Dioptimasi)
        if (closeModalBtn && successModal) {
            closeModalBtn.addEventListener('click', () => {
                // 1. Tutup modal sukses & hentikan efek confetti
                successModal.classList.remove('active');
                stopConfetti();

                /*
                =====================================================
                                    Fitur Doorprize
                ===================================================== */

                // 2. Beri jeda 100ms agar animasi tutup selesai & modal Doorprize muncul mulus
                setTimeout(() => {
                    if (doorprizeModal) {
                        doorprizeModal.classList.add('active'); //=====> Fitur Doorprize
                    }
                }, 100);
            });
        }

        if (closeDoorprizeBtn && doorprizeModal) {              //=====> Fitur Doorprize
            closeDoorprizeBtn.addEventListener('click', () => { //=====> Fitur Doorprize
                doorprizeModal.classList.remove('active');      //=====> Fitur Doorprize
            });                                                 //=====> Fitur Doorprize
        }                                                       //=====> Fitur Doorprize

        /*
        =====================================================
                            Fitur Doorprize
        ===================================================== */

        if (downloadDoorprizeBtn) {
            downloadDoorprizeBtn.addEventListener('click', () => {
                const containerKupon = document.getElementById('doorprize-image-container');
                if (!containerKupon) return;
                
                const images = containerKupon.querySelectorAll('img');
                
                images.forEach((img, index) => {
                    // Diberi jeda waktu agar browser tidak memblokirnya sebagai spam/popup
                    setTimeout(() => {
                        const link = document.createElement('a');
                        link.href = img.src;
                        link.download = `Kupon-Doorprize-${index + 1}.png`;
                        document.body.appendChild(link);
                        link.click();
                        document.body.removeChild(link);
                    }, index * 400); // jeda 400 milidetik per gambar
                });
            });
        }


        // Close modal when clicking on overlay
        if (successModal) {
            successModal.addEventListener('click', (e) => {
                if (e.target === successModal) {
                    successModal.classList.remove('active');
                    stopConfetti();
                }
            });
        }


    /* ---------------------------------------------------------
       10. CUSTOM SELF-CONTAINED CONFETTI SYSTEM
       --------------------------------------------------------- */
    const canvas = document.getElementById('confetti-canvas');
    let ctx = null;
    let confettiActive = false;
    let confettiList = [];
    let animationFrameId = null;

    const colors = [
        '#e63946', // Modern Red
        '#ffffff', // Clean White
        '#ffb703', // Golden Amber
        '#023e8a', // Deep Blue
        '#ff7096'  // Accent Pink
    ];

    class ConfettiPiece {
        constructor() {
            this.x = Math.random() * window.innerWidth;
            this.y = Math.random() * -window.innerHeight - 20;
            this.size = Math.random() * 8 + 6;
            this.color = colors[Math.floor(Math.random() * colors.length)];
            this.speedX = Math.random() * 4 - 2;
            this.speedY = Math.random() * 3 + 4;
            this.rotation = Math.random() * 360;
            this.rotationSpeed = Math.random() * 6 - 3;
            this.shape = Math.random() > 0.5 ? 'rect' : 'circle';
        }

        update() {
            this.x += this.speedX;
            this.y += this.speedY;
            this.rotation += this.rotationSpeed;

            // Recyclability if falling past screen
            if (this.y > window.innerHeight) {
                this.y = -20;
                this.x = Math.random() * window.innerWidth;
            }
        }

        draw() {
            ctx.save();
            ctx.translate(this.x, this.y);
            ctx.rotate((this.rotation * Math.PI) / 180);
            ctx.fillStyle = this.color;
            ctx.strokeStyle = this.color;
            ctx.lineWidth = 1;

            if (this.shape === 'rect') {
                ctx.fillRect(-this.size / 2, -this.size / 2, this.size, this.size);
            } else {
                ctx.beginPath();
                ctx.arc(0, 0, this.size / 2, 0, Math.PI * 2);
                ctx.fill();
            }
            ctx.restore();
        }
    }

    const resizeCanvas = () => {
        if (canvas) {
            canvas.width = window.innerWidth;
            canvas.height = window.innerHeight;
        }
    };

    const animateConfetti = () => {
        if (!confettiActive) return;
        ctx.clearRect(0, 0, canvas.width, canvas.height);

        confettiList.forEach(piece => {
            piece.update();
            piece.draw();
        });

        animationFrameId = requestAnimationFrame(animateConfetti);
    };

    const startConfetti = () => {
        if (!canvas) return;
        ctx = canvas.getContext('2d');
        confettiActive = true;
        confettiList = [];
        resizeCanvas();

        window.addEventListener('resize', resizeCanvas);

        // Spawn 150 particles
        for (let i = 0; i < 150; i++) {
            confettiList.push(new ConfettiPiece());
        }

        animateConfetti();

        // Automatically stop generating or clear confetti after 5 seconds to save battery
        setTimeout(stopConfetti, 6000);
    };

    const stopConfetti = () => {
        confettiActive = false;
        if (animationFrameId) {
            cancelAnimationFrame(animationFrameId);
        }
        if (ctx) {
            ctx.clearRect(0, 0, canvas.width, canvas.height);
        }
        window.removeEventListener('resize', resizeCanvas);
    };

});

/* ---------------------------------------------------------
   11. GLOBAL CARD HELPER (Lomba Selection Link to Form)
   --------------------------------------------------------- 
function selectCompetition(category, competitionName) {
    const categorySelect = document.getElementById('category');

    if (categorySelect) {
        categorySelect.value = category;
        renderLombaOptions(category, [competitionName]);

        const formGroup = categorySelect.closest('.form-group');
        if (formGroup) {
            formGroup.classList.remove('error');
        }

        const lombaFormGroup = document.getElementById('lomba-form-group');
        if (lombaFormGroup) {
            lombaFormGroup.classList.remove('error');
        }
    }
} */

// Fungsi Helper untuk Menampilkan Custom Alert
function showCustomAlert(title, message) {
    const modal = document.getElementById('customAlertModal');
    const modalTitle = modal.querySelector('.custom-modal-title');
    const modalDesc = modal.querySelector('.custom-modal-desc');
    const closeBtn = document.getElementById('customModalBtn');

    if (title) modalTitle.textContent = title;
    if (message) modalDesc.textContent = message;

    // Tampilkan modal
    modal.classList.add('active');

    // Listener tombol tutup
    closeBtn.onclick = function() {
        modal.classList.remove('active');
    };
}

/* =========================================================
   LOGIKA FITUR GALERI (GAMBAR & VIDEO + DOWNLOAD)
   ========================================================= */
document.addEventListener('DOMContentLoaded', () => {
    // Menangkap semua elemen dengan class gallery-img (baik tag <img> maupun <video>)
    const galleryMedia = document.querySelectorAll('.gallery-img'); 
    
    const lightboxModal = document.getElementById('lightbox-modal');
    const lightboxImg = document.getElementById('lightbox-img');
    const lightboxVideo = document.getElementById('lightbox-video');
    const closeBtn = document.getElementById('close-lightbox-btn');
    const downloadBtn = document.getElementById('download-btn');
    
    // Pelindung
    if (!lightboxModal || (!lightboxImg && !lightboxVideo)) return;

    // Buka popup jika media (gambar/video) diklik
    galleryMedia.forEach(media => {
        media.addEventListener('click', () => {
            // Mengecek apakah yang di-klik adalah Video atau Gambar
            const isVideo = media.tagName.toLowerCase() === 'video';

            if (isVideo) {
                // JIKA VIDEO:
                lightboxImg.style.display = 'none';          // Sembunyikan gambar
                lightboxVideo.style.display = 'block';       // Munculkan video
                lightboxVideo.src = media.src;               // Ambil sumber video
                lightboxVideo.play();                        // Putar video (suara otomatis menyala karena ada 'controls' di HTML)
                
                downloadBtn.style.display = 'none';          // Sembunyikan tombol Download
            } else {
                // JIKA GAMBAR:
                lightboxVideo.style.display = 'none';        // Sembunyikan video
                lightboxVideo.pause();                       // Hentikan pemutaran
                lightboxVideo.src = "";                      // Kosongkan sumber video
                
                lightboxImg.style.display = 'block';         // Munculkan gambar
                lightboxImg.src = media.src;                 // Ambil sumber gambar
                
                downloadBtn.style.display = 'flex';          // Munculkan tombol Download
                downloadBtn.href = media.src;
                const filename = media.src.substring(media.src.lastIndexOf('/') + 1);
                downloadBtn.download = filename || "Kenangan-17-Agustus.jpg";
            }

            // Tampilkan Popup Lightbox
            lightboxModal.classList.add('active');
            document.body.style.overflow = 'hidden';
        });
    });

    // Fungsi Tutup Popup
    const closeLightbox = () => {
        lightboxModal.classList.remove('active');
        document.body.style.overflow = 'auto';

        // Pastikan video berhenti berputar dan suaranya mati saat popup ditutup
        if (lightboxVideo) {
            lightboxVideo.pause();
            lightboxVideo.src = ""; 
        }
    };

    if (closeBtn) closeBtn.addEventListener('click', closeLightbox);

    // Tutup jika area gelap di luar gambar diklik
    lightboxModal.addEventListener('click', (e) => {
        if (e.target === lightboxModal || e.target.classList.contains('lightbox-content-wrapper') || e.target.classList.contains('lightbox-image-container')) {
            closeLightbox();
        }
    });

    // Tutup menggunakan tombol ESC di keyboard
    document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape' && lightboxModal.classList.contains('active')) {
            closeLightbox();
        }
    });
});