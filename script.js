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

    document.addEventListener('DOMContentLoaded', () => {

    const batasWaktu = new Date("2026-07-18T::+07:00");
    const sekarang = new Date();

    if (sekarang >= batasWaktu) {

    document.body.innerHTML = `
    <div style="
        display:flex;
        justify-content:center;
        align-items:center;
        height:100vh;
        background:#f8fafc;
        font-family:Poppins,sans-serif;
        text-align:center;
        padding:20px;
    ">
        <div>
            <h1 style="font-size:42px;color:#e63946;margin-bottom:15px;">
                🇮🇩 Pendaftaran akan segera dibuka
            </h1>
        </div>
    </div>
    `;

    document.body.innerHTML = `
    <div style="
        display:flex;
        justify-content:center;
        align-items:center;
        height:100vh;
        background:#f8fafc;
        font-family:Poppins,sans-serif;
        text-align:center;
        padding:20px;
    ">
    
    <div>
        <h1 style="font-size:20px;color:#e63946;margin-bottom:15px;">
            🇮🇩 Pendaftaran akan segera dibuka
        </h1>

        <p style="font-size:18px;color:#555;margin-bottom:30px;">
            Untuk informasi lebih lanjut silakan hubungi panitia.
        </p>

        <a href="https://wa.me/62895622082567?text=Halo%20Panitia,%20saya%20ingin%20bertanya%20tentang%20pendaftaran%20lomba."
           target="_blank"
           style="
               display:inline-block;
               padding:14px 28px;
               background:#25D366;
               color:white;
               text-decoration:none;
               border-radius:8px;
               font-weight:600;
               font-size:16px;
           ">
            <i class="fa-brands fa-whatsapp" style="margin-right:8px;"></i>Hubungi Panitia via WhatsApp
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
       2. DARK MODE TOGGLE & PERSISTENCE
       --------------------------------------------------------- */
    const darkModeToggle = document.getElementById('dark-mode-toggle');
    const currentTheme = localStorage.getItem('theme') || 'light';

    // Apply saved theme on load
    if (currentTheme === 'dark') {
        document.body.setAttribute('data-theme', 'dark');
    }

    if (darkModeToggle) {
        darkModeToggle.addEventListener('click', () => {
            let theme = 'light';
            if (document.body.getAttribute('data-theme') !== 'dark') {
                document.body.setAttribute('data-theme', 'dark');
                theme = 'dark';
            } else {
                document.body.removeAttribute('data-theme');
            }
            localStorage.setItem('theme', theme);
        });
    }


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

    if (regForm) {
        regForm.addEventListener('submit', (e) => {
            e.preventDefault();
            let isValid = true;

            // 1. Validate Fullname
            const fullname = document.getElementById('fullname');
            if (fullname.value.trim() === '') {
                showError(fullname, 'Nama lengkap wajib diisi.');
                isValid = false;
            } else {
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
                ===================================================== */
            
                nomorDoorprize = Number(result.nomorDoorprize); //=====> Fitur Doorprize

                console.log("NOMOR DOORPRIZE:", nomorDoorprize); //=====> Fitur Doorprize
            

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

        }

    // Close Modal Event Handler
    if (closeModalBtn && successModal) {
        closeModalBtn.addEventListener('click', () => {
        successModal.classList.remove('active');
        stopConfetti();
        
        /*
        =====================================================
                            Fitur Doorprize
        ===================================================== */
        
        doorprizeImage.src = `assets/${nomorDoorprize}.png`; //=====> Fitur Doorprize

        doorprizeModal.classList.add('active');             //=====> Fitur Doorprize
        });

    if (closeDoorprizeBtn && doorprizeModal) {              //=====> Fitur Doorprize
        closeDoorprizeBtn.addEventListener('click', () => { //=====> Fitur Doorprize
        doorprizeModal.classList.remove('active');          //=====> Fitur Doorprize
    });                                                     //=====> Fitur Doorprize
    }                                                       //=====> Fitur Doorprize
    
    /*
        =====================================================
                            Fitur Doorprize
        ===================================================== */
    
    
    if (downloadDoorprizeBtn) {
        downloadDoorprizeBtn.addEventListener('click', () => {
        const link = document.createElement('a');

        link.href = doorprizeImage.src;
        link.download = `${nomorDoorprize}.png`;

        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
    });
    }
    

        // Close modal when clicking on overlay
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
   --------------------------------------------------------- */
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
}
