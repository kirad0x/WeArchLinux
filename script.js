document.addEventListener('DOMContentLoaded', () => {
    // ---------------------------------------------
    // 1. Dil Değiştirme (TR/EN)
    // ---------------------------------------------
    let currentLang = 'tr';
    const texts = document.querySelectorAll('[data-tr]');
    const downloadButton = document.getElementById('download-button');
    const titleP = document.querySelector('.content-header p');
    const h2Title = document.querySelector('.text-section h2');
    const h3Title = document.querySelector('.features-list h3');

    window.toggleLanguage = () => {
        currentLang = currentLang === 'tr' ? 'en' : 'tr';
        
        document.querySelector('.language-switch').textContent = currentLang === 'tr' ? '[ TR / EN ]' : '[ EN / TR ]';

        texts.forEach(element => {
            if (element === titleP || element === h2Title || element === h3Title) {
                element.textContent = element.getAttribute(`data-${currentLang}`);
            } else {
                element.innerHTML = element.getAttribute(`data-${currentLang}`);
            }
        });

        downloadButton.textContent = downloadButton.getAttribute(`data-${currentLang}`);
        document.getElementById('snake-title').textContent = document.getElementById('snake-title').getAttribute(`data-${currentLang}`);
    };

    // İlk yüklemede başlıkları doğru dilde ayarla
    titleP.textContent = titleP.getAttribute('data-tr');
    h2Title.textContent = h2Title.getAttribute('data-tr');
    h3Title.textContent = h3Title.getAttribute('data-tr');


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
                if (index < 4) { // Dört çubuk aktif
                    seg.classList.add('active');
                } else {
                    seg.classList.remove('active');
                }
            }
        });
    };

    // ---------------------------------------------
    // 3. Matrix Efekti (Mor renkli Matrix)
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
        drops[i] = 0; // Başlangıçta hepsi en üstten başlasın
    }

    const characters = 'WeArch01!@#$%^&*()_+-=[]{};:.,<>/?|\\~`asdfghjklzxcvbnm';

    function drawMatrix() {
        ctx.fillStyle = 'rgba(10, 10, 26, 0.1)'; // Koyu mor arkaplan ve iz
        ctx.fillRect(0, 0, W, H);

        ctx.fillStyle = '#BB86FC'; // Neon Mor rengi
        ctx.font = font_size + 'px VT323'; // Terminal fontunu kullan

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
        const cpu = Math.floor(Math.random() * 5) + 3; // %3-7 arası
        const memUsed = (1.2 + Math.random() * 0.3).toFixed(1); // 1.2G-1.5G arası
        document.getElementById('cpu-load').textContent = `${cpu}%`;
        document.getElementById('mem-usage').textContent = `${memUsed}G/16G`;
    };

    updateStats();
    setInterval(updateStats, 1000);

    // ---------------------------------------------
    // 5. Yılan Oyunu (Snake Game) - Önceki koddan aynı şekilde eklenebilir.
    // ---------------------------------------------
    // (Kod uzun olmaması için bu kısım yukarıdaki 3. maddedeki script.js'ten buraya kopyalanmalıdır.)

    // Örnek: İndirme Butonu Olayı (Yılan oyununu başlatır)
    // document.getElementById('download-button').addEventListener('click', startGame);

    // Örnek: ESC Tuşu ile Oyunu Kapatma
    // document.addEventListener('keydown', (event) => {
    //     if (event.key === 'Escape' && !gameContainer.classList.contains('hidden')) { ... }
    // });
});
