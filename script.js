document.addEventListener('DOMContentLoaded', () => {
    // ---------------------------------------------
    // 1. Dil Değiştirme (TR/EN)
    // ---------------------------------------------
    let currentLang = 'tr';
    const texts = document.querySelectorAll('[data-tr]');
    const downloadButton = document.getElementById('download-button');

    window.toggleLanguage = () => {
        currentLang = currentLang === 'tr' ? 'en' : 'tr';
        
        texts.forEach(element => {
            element.textContent = element.getAttribute(`data-${currentLang}`);
        });

        downloadButton.textContent = downloadButton.getAttribute(`data-${currentLang}`);
        
        document.querySelector('.subtitle').textContent = currentLang === 'tr' 
            ? "- En Optimize Arch Linux Distrosu -" 
            : "- The Most Optimized Arch Linux Distro -";
    };

    // İlk yüklemede başlıkları doğru dilde ayarla
    document.querySelector('.subtitle').textContent = "- En Optimize Arch Linux Distrosu -";


    // ---------------------------------------------
    // 2. Müzik ve Terminal Ses Göstergesi
    // ---------------------------------------------
    const iframe = document.getElementById('bg-music');
    const volBarContainer = document.getElementById('volume-indicator');
    let isMuted = true;
    
    window.toggleAudio = () => {
        isMuted = !isMuted;
        const newSrc = isMuted 
            ? iframe.src.replace('mute=0', 'mute=1')
            : iframe.src.replace('mute=1', 'mute=0');
        
        iframe.src = newSrc; 
        
        const segments = volBarContainer.querySelectorAll('.vol-bar-segment');
        segments.forEach((seg, index) => {
            if (isMuted) {
                seg.classList.remove('active');
            } else {
                if (index < 4) { 
                    seg.classList.add('active');
                } else {
                    seg.classList.remove('active');
                }
            }
        });
    };

    // ---------------------------------------------
    // 3. Matrix Efekti (Neon Yeşil)
    // ---------------------------------------------
    const canvas = document.getElementById('matrix-canvas');
    const ctx = canvas.getContext('2d');

    let W = window.innerWidth;
    let H = document.body.scrollHeight; 
    canvas.width = W;
    canvas.height = H;

    const font_size = 16;
    let columns = Math.floor(W / font_size);
    const drops = [];

    for (let i = 0; i < columns; i++) {
        drops[i] = 0;
    }

    const characters = '01!@#$%^&*()_+-=[]{};:.,<>/?|\\~`WeArchLinuxWearchlinux';

    function drawMatrix() {
        ctx.fillStyle = 'rgba(0, 0, 0, 0.05)'; // Siyah arkaplan ve iz
        ctx.fillRect(0, 0, W, H);

        ctx.fillStyle = '#00FF41'; // Neon Yeşil rengi
        ctx.font = font_size + 'px VT323'; 

        for (let i = 0; i < drops.length; i++) {
            const text = characters[Math.floor(Math.random() * characters.length)];
            const x = i * font_size;
            const y = drops[i];

            ctx.fillText(text, x, y);

            if (y * Math.random() > H * 1.5) { 
                drops[i] = 0;
            }

            drops[i] = y + font_size;
        }
    }
    
    window.addEventListener('resize', () => {
        W = window.innerWidth;
        H = document.body.scrollHeight;
        canvas.width = W;
        canvas.height = H;
        columns = Math.floor(W / font_size);
        drops.length = columns;
        for (let i = 0; i < columns; i++) {
            drops[i] = 0;
        }
    });

    window.addEventListener('scroll', () => {
        H = document.body.scrollHeight;
        canvas.height = H;
    });

    setInterval(drawMatrix, 50);

    // ---------------------------------------------
    // 4. Saat ve Sistem İstatistikleri (Simülasyon)
    // ---------------------------------------------
    const updateStats = () => {
        const now = new Date();
        const hours = String(now.getHours()).padStart(2, '0');
        const minutes = String(now.getMinutes()).padStart(2, '0');
        const seconds = String(now.getSeconds()).padStart(2, '0');
        document.getElementById('current-time').textContent = `${hours}:${minutes}:${seconds}`;

        // CPU ve RAM simülasyonu
        const cpu = Math.floor(Math.random() * 5) + 3; 
        const memUsed = (1.2 + Math.random() * 0.3).toFixed(1); 
        document.getElementById('cpu-load').textContent = `${cpu}%`;
        document.getElementById('mem-usage').textContent = `${memUsed}G/16G`;
    };

    updateStats();
    setInterval(updateStats, 1000);

    // ---------------------------------------------
    // 5. Yılan Oyunu (Snake Game)
    // ---------------------------------------------
    // İndirme Butonu Olayı (Simülasyon)
    document.getElementById('download-button').addEventListener('click', () => {
        alert("WeArch Linux indirme işlemi başlatıldı. (Simülasyon)");
    });

    // ESC Tuşu ile Oyunu Kapatma
    const gameContainer = document.getElementById('snake-game-container');
    document.addEventListener('keydown', (event) => {
        if (event.key === 'Escape' && !gameContainer.classList.contains('hidden')) {
            // clearInterval(gameLoop); // Eğer oyun döngüsü varsa
            gameContainer.classList.add('hidden');
            document.body.classList.remove('hidden-overflow');
        }
    });
});
