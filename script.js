document.addEventListener('DOMContentLoaded', () => {
    // ---------------------------------------------
    // 1. Dil Değiştirme (TR/EN)
    // ---------------------------------------------
    let currentLang = 'tr';
    const texts = document.querySelectorAll('[data-tr]');
    const downloadButton = document.getElementById('download-button');
    const mainTitleSpan = document.querySelector('h1 span[data-tr]');

    window.toggleLanguage = () => {
        currentLang = currentLang === 'tr' ? 'en' : 'tr';
        
        // Görev çubuğu dil etiketi
        document.querySelector('.language-switch').textContent = currentLang === 'tr' ? '[ TR / EN ]' : '[ EN / TR ]';

        // Tüm data-tr/data-en etiketlerini güncelle
        texts.forEach(element => {
            if (element === mainTitleSpan) {
                element.textContent = element.getAttribute(`data-${currentLang}`);
            } else {
                element.innerHTML = element.getAttribute(`data-${currentLang}`);
            }
        });

        // İndir butonunu güncelle
        downloadButton.textContent = downloadButton.getAttribute(`data-${currentLang}`);
        
        // Yılan oyunu başlığını güncelle
        document.getElementById('snake-title').textContent = document.getElementById('snake-title').getAttribute(`data-${currentLang}`);

        // Neofetch çıktısını yeniden yükle (dil değişince güncellenmesi için)
        loadNeofetch();
    };

    // Sayfa yüklenince ilk dili ayarla (TR)
    mainTitleSpan.textContent = mainTitleSpan.getAttribute('data-tr');


    // ---------------------------------------------
    // 2. Neofetch ASCII ve Random Değişim
    // ---------------------------------------------
    const asciiArts = [
        `
        .,ad88888ba,.
      .,ad8888888888888a,
    d8P"""98888P"""98888b,
    9b    d8888,    '9888B
  ,d88aaa8888888b,,,d888P'
  d8888888888888888888888b
  d888888P""98888888888888P
  88888P'    9888888888888
  '98P'      9888888888P'
               '"9888P"'
                  "'"

OS: WeArch Linux
Host: WeArch-VM
Kernel: 6.9.1-arch-we (optimized)
Uptime: 1h 23m
Packages: 1560 (pacman)
Shell: zsh 5.9
WM: Hyprland (Optimized)
Theme: MorNeon
CPU: WeCore i9 (16)
GPU: AMD/Intel/NVIDIA
Memory: 32G / 64G
        `,
        `
            *** ***
          ***....** **...***
          **........** **.......**
  *** **..........*.........** ***
**.....** **..................** **.....**
**.........** **..............** **.........**
*..............* *..........* *..............*
 **..............* *......* *..............**
   **..............** *....* **..............**
     *......................................*
   **..............**........**..............**
**..............* *....* *..............**
*..............* *....* *..............*
 **.........** *....* **.........**
   **.....** *....* **.....**
     *** **....* ***
                   ** * * *

OS: WeArch Linux
Release: Stable v1.0
Codename: Gemini
Desktop: Hyprland (Warp speed)
Terminal: WeTerm
Browser: Floorp/Librewolf
Sound: PipeWire
Network: Wired/WiFi
Disk: 1.2T / 2T (60%)
        `,
        `
⣇⣿⠘⣿⣿⣿⡿⡿⣟⣟⢟⢟⢝⠵⡝⣿⡿⢂⣼⣿⣷⣌⠩⡫⡻⣝⠹⢿⣿⣷
⡆⣿⣆⠱⣝⡵⣝⢅⠙⣿⢕⢕⢕⢕⢝⣥⢒⠅⣿⣿⣿⡿⣳⣌⠪⡪⣡⢑⢝⣇
⡆⣿⣿⣦⠹⣳⣳⣕⢅⠈⢗⢕⢕⢕⢕⢕⢈⢆⠟⠋⠉⠁⠉⠉⠁⠈⠼⢐⢕⢽
⡗⢰⣶⣶⣦⣝⢝⢕⢕⠅⡆⢕⢕⢕⢕⢕⣴⠏⣠⡶⠛⡉⡉⡛⢶⣦⡀⠐⣕⢕
⡝⡄⢻⢟⣿⣿⣷⣕⣕⣅⣿⣔⣕⣵⣵⣿⣿⢠⣿⢠⣮⡈⣌⠨⠅⠹⣷⡀⢱⢕
⡝⡵⠟⠈⢀⣀⣀⡀⠉⢿⣿⣿⣿⣿⣿⣿⣿⣼⣿⢈⡋⠴⢿⡟⣡⡇⣿⡇⡀⢕
⡝⠁⣠⣾⠟⡉⡉⡉⠻⣦⣻⣿⣿⣿⣿⣿⣿⣿⣿⣧⠸⣿⣦⣥⣿⡇⡿⣰⢗⢄
⠁⢰⣿⡏⣴⣌⠈⣌⠡⠈⢻⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣬⣉⣉⣁⣄⢖⢕⢕⢕
⡀⢻⣿⡇⢙⠁⠴⢿⡟⣡⡆⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣷⣵⣵⣿
⡻⣄⣻⣿⣌⠘⢿⣷⣥⣿⠇⣿⣿⣿⣿⣿⣿⠛⠻⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿
⣷⢄⠻⣿⣟⠿⠦⠍⠉⣡⣾⣿⣿⣿⣿⣿⣿⢸⣿⣦⠙⣿⣿⣿⣿⣿⣿⣿⣿⠟
⡕⡑⣑⣈⣻⢗⢟⢞⢝⣻⣿⣿⣿⣿⣿⣿⣿⠸⣿⠿⠃⣿⣿⣿⣿⣿⣿⡿⠁⣠
⡝⡵⡈⢟⢕⢕⢕⢕⣵⣿⣿⣿⣿⣿⣿⣿⣿⣿⣶⣶⣿⣿⣿⣿⣿⠿⠋⣀⣈⠙
⡝⡵⡕⡀⠑⠳⠿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⠿⠛⢉⡠⡲⡫⡪⡪⡣

User: ArchMaster
Distro: WeArch
Shell: Fish
Resolution: 2560x1440
Monitor: Gaming Display
Battery: 99%
Power: Optimized
        `,
        `
⣿⣿⣿⣿⣿⣷⣿⣿⣿⡅⡹⢿⠆⠙⠋⠉⠻⠿⣿⣿⣿⣿⣿⣿⣮⠻⣦⡙⢷⡑⠘⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣷⣌⠡⠌⠂⣙⠻⣛⠻⠷⠐⠈⠛⢱⣮⣷⣽⣿
⣿⣿⣿⣿⡇⢿⢹⣿⣶⠐⠁⠀⣀⣠⣤⠄⠀⠀⠈⠙⠻⣿⣿⣿⣦⣵⣌⠻⣷⢝⠦⠚⢿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⢟⣻⣿⣊⡃⠀⣙⠿⣿⣿⣿⣎⢮⡀⢮⣽⣿⣿
⢿⣿⣿⣿⣧⡸⡎⡛⡩⠖⠀⣴⣿⣿⣿⠀⠀⠀⠀⠸⠇⠀⠙⢿⣿⣿⣿⣷⣌⢷⣑⢷⣄⠻⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⡿⣫⠶⠛⠉⠀⠁⠀⠈⠈⠀⠠⠜⠻⣿⣆⢿⣼⣿⣿⣿
⢐⣿⣿⣿⣿⣧⢧⣧⢻⣦⢀⣹⣿⣿⣿⣇⠀⠄⠀⠀⠀⡀⠀⠈⢻⣿⣿⣿⣿⣷⣝⢦⡹⠷⡙⢿⣿⣿⣿⣿⣿⣿⣿⣿⠈⠁⠀⠀⠀⠁⠀⠀⠀⠱⣶⣄⡀⠀⠈⠛⠜⣿⣿⣿⣿
⠀⠊⢫⣿⣏⣿⡌⣼⣄⢫⡌⣿⣿⣿⣿⣿⣦⡈⠲⣄⣤⣤⡡⢀⣠⣿⣿⣿⣿⣿⣿⣷⣼⣍⢬⣦⡙⣿⣿⣿⣿⣿⣯⢁⡄⠀⡀⡀⠀⠄⢈⣠⢪⠀⣿⣿⣿⣦⠀⢉⢂⠹⡿⣿⣿
⠀⠀⠄⢹⢃⢻⣟⠙⣿⣦⠱⢻⣿⣿⣿⣿⣿⣿⣷⣬⣍⣭⣥⣾⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣶⡙⢿⣼⡿⣿⣿⣿⣿⣿⣷⣄⠘⣱⢦⣤⡴⡿⢈⣼⣿⣿⣿⣇⣴⣶⣮⣅⢻⣿⡏
⠀⠀⠈⠹⣇⢡⢿⡆⠻⣿⣷⠀⢻⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣷⣍⡻⣿⣟⣻⣿⣿⣿⣿⣷⣦⣥⣬⣤⣴⣾⣿⣿⣿⣿⣷⣿⣿⣿⣿⣷⡜⠃
⠀⠀⠀⢀⣘⠈⢂⠃⣧⡹⣿⣷⡄⠙⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣮⣅⡙⢿⣟⠿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⠋⡕⠂
⠀⠀⠀⠀⠀⠀⠛⢷⣜⢷⡌⠻⣿⣿⣦⣝⣻⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣯⣹⣷⣦⣹⢿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⠿⠉⠃⠀

WeArch Stats:
CPU Load: 5%
Memory: 1.2G/16G
SWAP: 0B
Temps: 35°C
Network: 1000Mbps
Security: SecureBoot Disabled
        `,
        `
⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⢀⣤⣾⡿⠿⢿⣦⡀⠀⠀⠀⠀⠀⠀
⠀⠀⢀⣶⣿⣶⣶⣶⣦⣤⣄⡀⠀⠀⠀⠀⠀⠀⠀⠀⠀⣰⣿⠟⠁⣀⣤⡄⢹⣷⡀⠀⠀⠀⠀⠀
⠀⠀⢸⣿⡧⠤⠤⣌⣉⣩⣿⡿⠶⠶⠒⠛⠛⠻⠿⠶⣾⣿⣣⠔⠉⠀⠀⠙⡆⢻⣷⠀⠀⠀⠀⠀
⠀⠀⢸⣿⠀⠀⢠⣾⠟⠋⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⣾⣿⡃⠀⠀⠀⠀⠀⢻⠘⣿⡀⠀⠀⠀⠀
⠀⠀⠘⣿⡀⣴⠟⠁⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠉⠛⠻⢶⣤⣀⠀⢘⠀⣿⡇⠀⠀⠀⠀
⠀⠀⠀⢿⣿⠋⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠈⠉⠛⢿⣴⣿⠀⠀⠀⠀⠀
⠀⠀⠀⣸⡟⠀⠀⠀⣴⡆⠀⠀⠀⠀⠀⠀⠀⣷⡀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠻⣷⡀⠀⠀⠀⠀
⠀⠀⢰⣿⠁⠀⠀⣰⠿⣇⠀⠀⠀⠀⠀⠀⠀⢻⣷⡀⠀⢠⡄⠀⠀⠀⠀⠀⡀⠀⠹⣷⠀⠀⠀⠀
⠀⠀⣾⡏⠀⢀⣴⣿⣤⢿⡄⠀⠀⠀⠀⠀⠀⠸⣿⣷⡀⠘⣧⠀⠀⠀⠀⠀⣷⣄⠀⢻⣇⠀⠀⠀
⠀⠀⢻⣇⠀⢸⡇⠀⠀⠀⢻⣄⠀⠀⠀⠀⠀⣤⡯⠈⢻⣄⢻⡄⠀⠀⠀⠀⣿⡿⣷⡌⣿⡄⠀⠀
⠀⢀⣸⣿⠀⢸⡷⣶⣶⡄⠀⠙⠛⠛⠛⠛⠛⠃⣠⣶⣄⠙⠿⣧⠀⠀⠀⢠⣿⢹⣻⡇⠸⣿⡄⠀
⢰⣿⢟⣿⡴⠞⠀⠘⢿⡿⠀⠀⠀⠀⠀⠀⠀⠀⠈⠻⣿⡇⠀⣿⡀⢀⣴⠿⣿⣦⣿⠃⠀⢹⣷⠀
⠀⢿⣿⠁⠀⠀⠀⠀⠀⠀⠀⢠⣀⣀⡀⠀⡀⠀⠀⠀⠀⠀⠀⣿⠛⠛⠁⠀⣿⡟⠁⠀⠀⢀⣿⠂
⠀⢠⣿⢷⣤⣀⠀⠀⠀⠀⠀⠀⠉⠉⠉⠛⠉⠀⠀⠀⠀⠀⢠⡿⢰⡟⠻⠞⠛⣧⣠⣦⣀⣾⠏⠀
⠀⢸⣿⠀⠈⢹⡿⠛⢶⡶⢶⣤⣤⣤⣤⣤⣤⣤⣤⣶⠶⣿⠛⠷⢾⣧⣠⡿⢿⡟⠋⠛⠋⠁⠀⠀
⠀⣾⣧⣤⣶⣟⠁⠀⢸⣇⣸⠹⣧⣠⡾⠛⢷⣤⡾⣿⢰⡟⠀⠀⠀⣿⠋⠁⢈⣿⣄⠀⠀⠀⠀⠀
⠀⠀⠀⣼⡏⠻⢿⣶⣤⣿⣿⠀⠈⢉⣿⠀⢸⣏⠀⣿⠈⣷⣤⣤⣶⡿⠶⠾⠋⣉⣿⣦⣀⠀⠀⠀
⠀⠀⣼⡿⣇⠀⠀⠙⠻⢿⣿⠀⠀⢸⣇⠀⠀⣻⠀⣿⠀⣿⠟⠋⠁⠀⠀⢀⡾⠋⠉⠙⣿⡆⠀⠀
⠀⠀⢻⣧⠙⢷⣤⣦⠀⢸⣿⡄⠀⠀⠉⠳⣾⠏⠀⢹⣾⡇⠀⠀⠙⠛⠶⣾⡁⠀⠀⠀⣼⡇⠀⠀
⠀⠀⠀⠙⠛⠛⣻⡟⠀⣼⣿⣇⣀⣀⣀⡀⠀⠀⠀⣸⣿⣇⠀⠀⠀⠀⠀⠈⢛⣷⠶⠿⠋⠀⠀⠀
⠀⠀⠀⠀⠀⢠⣿⣅⣠⣿⠛⠋⠉⠉⠛⠻⠛⠛⠛⠛⠋⠻⣧⡀⣀⣠⢴⠾⠉⣿⣆⠀⠀⠀⠀⠀
⠀⠀⠀⠀⠀⣼⡏⠉⣿⡟⠁⠀⠀⠀⢀⠀⠀⠀⠀⠀⠀⠀⠙⠿⣿⣌⠁⠀⠀⠈⣿⡆⠀⠀⠀⠀
⠀⠀⠀⠀⠀⣿⣇⣠⣿⣿⡶⠶⠶⣶⣿⣷⡶⣶⣶⣶⣶⡶⠶⠶⢿⣿⡗⣀⣤⣾⠟⠁⠀⠀⠀⠀
⠀⠀⠀⠀⠀⠈⠙⠛⢻⣿⡇⠀⠀⣿⡟⠛⠷⠶⠾⢿⣧⠁⠀⠀⣸⡿⠿⠟⠉⠀⠀⠀⠀⠀⠀⠀
⠀⠀⠀⠀⠀⠀⠀⠀⠀⢿⣷⣦⣤⡿⠀⠀⠀⠀⠀⠀⢿⣧⣤⣼⣿⠇⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀

Build Date: 2025-12-15
Compiler: GCC 14.1
Init: Systemd
Boot Time: 3.5s (Fast!)
Maintainer: WeArch Team
Status: Active Development
        `
    ];
    
    const asciiOutput = document.getElementById('ascii-output');

    const loadNeofetch = () => {
        const selectedAscii = asciiArts[Math.floor(Math.random() * asciiArts.length)];
        let translatedAscii = selectedAscii;

        if (currentLang === 'en') {
            // Basit çeviri (daha kapsamlı yapılabilir)
            translatedAscii = translatedAscii
                .replace('En Yüksek Optimizasyon', 'Highest Optimization')
                .replace('Kaya Gibi Stabil Çalışma', 'Rock-Solid Stability')
                .replace('Arch Temelli Sade Güç', 'Arch-Based Pure Power')
                .replace('Mor Neon Tema', 'Purple Neon Theme')
                .replace('Optimized', 'Optimized')
                .replace('Stable', 'Stable')
                .replace('Arch Based', 'Arch Based')
                .replace('Purple Neon Theme', 'Purple Neon Theme')
                .replace('Optimized', 'Optimized');
        }

        asciiOutput.textContent = translatedAscii;
    };

    // İlk yüklemede çalıştır
    loadNeofetch();
    // Her 5 saniyede bir Neofetch çıktısını değiştir
    setInterval(loadNeofetch, 5000);


    // ---------------------------------------------
    // 3. Müzik ve Terminal Ses Göstergesi
    // ---------------------------------------------
    const iframe = document.querySelector('iframe');
    const volBarContainer = document.getElementById('volume-indicator');
    let isMuted = true;
    
    window.toggleAudio = () => {
        isMuted = !isMuted;
        const newSrc = isMuted 
            ? iframe.src.replace('mute=0', 'mute=1')
            : iframe.src.replace('mute=1', 'mute=0');
        
        iframe.src = newSrc; // Yeni URL ile sesi kontrol et
        
        const segments = volBarContainer.querySelectorAll('.vol-bar-segment');
        segments.forEach((seg, index) => {
            if (isMuted) {
                seg.classList.remove('active');
            } else {
                // Sesi açınca rastgele 4 segmenti aktif et (görsel olarak)
                if (index < 4) {
                    seg.classList.add('active');
                } else {
                    seg.classList.remove('active');
                }
            }
        });

        // Kullanıcıya bilgi ver
        const volText = document.getElementById('vol-text');
        volText.textContent = isMuted ? 'MUTE' : 'VOL';
    };

    // ---------------------------------------------
    // 4. Matrix Efekti
    // ---------------------------------------------
    const canvas = document.getElementById('matrix-canvas');
    const ctx = canvas.getContext('2d');

    let W = window.innerWidth;
    let H = window.innerHeight;
    canvas.width = W;
    canvas.height = H;

    const font_size = 16;
    const columns = Math.floor(W / font_size);
    const drops = [];

    for (let i = 0; i < columns; i++) {
        drops[i] = H;
    }

    const characters = 'WeArch01!@#$%^&*()_+-=[]{};:.,<>/?|\\~`asdfghjklzxcvbnm';

    function drawMatrix() {
        // Yarı saydam siyah arkaplan (iz bırakmak için)
        ctx.fillStyle = 'rgba(10, 10, 26, 0.05)';
        ctx.fillRect(0, 0, W, H);

        ctx.fillStyle = '#BB86FC'; // Neon Mor rengi
        ctx.font = font_size + 'px monospace';

        for (let i = 0; i < drops.length; i++) {
            const text = characters[Math.floor(Math.random() * characters.length)];
            const x = i * font_size;
            const y = drops[i];

            ctx.fillText(text, x, y);

            // Damlayı resetle
            if (y * Math.random() > H) {
                drops[i] = 0;
            }

            // Damlayı düşür
            drops[i] = y + font_size;
        }
    }
    
    // Pencere boyutu değiştiğinde Matrix'i yeniden boyutlandır
    window.addEventListener('resize', () => {
        W = window.innerWidth;
        H = window.innerHeight;
        canvas.width = W;
        canvas.height = H;
        columns = Math.floor(W / font_size);
        drops.length = columns;
        for (let i = 0; i < columns; i++) {
            drops[i] = 0;
        }
    });

    setInterval(drawMatrix, 50);

    // ---------------------------------------------
    // 5. Yılan Oyunu (Snake Game)
    // ---------------------------------------------
    const gameContainer = document.getElementById('snake-game-container');
    const gameCanvas = document.getElementById('snake-canvas');
    const gameCtx = gameCanvas.getContext('2d');
    const gameSize = 20; // Kare boyutu
    let snake, food, dx, dy, score, gameLoop;

    const initGame = () => {
        // Başlangıç değerleri
        snake = [{ x: 10 * gameSize, y: 10 * gameSize }];
        dx = gameSize; // Başlangıçta sağa git
        dy = 0;
        score = 0;
        
        // Rastgele bir yiyecek konumu belirle
        createFood();
    };

    const createFood = () => {
        const maxCols = gameCanvas.width / gameSize;
        const maxRows = gameCanvas.height / gameSize;
        let foodX, foodY;

        do {
            foodX = Math.floor(Math.random() * maxCols) * gameSize;
            foodY = Math.floor(Math.random() * maxRows) * gameSize;
            // Yılanın üzerinde olmadığından emin ol
        } while (snake.some(segment => segment.x === foodX && segment.y === foodY));

        food = { x: foodX, y: foodY };
    };

    const drawSnake = () => {
        snake.forEach((segment, index) => {
            gameCtx.fillStyle = index === 0 ? '#BB86FC' : '#8A2BE2'; // Kafa mor, gövde koyu mor
            gameCtx.fillRect(segment.x, segment.y, gameSize, gameSize);
            gameCtx.strokeStyle = '#000';
            gameCtx.strokeRect(segment.x, segment.y, gameSize, gameSize);
        });
    };

    const drawFood = () => {
        gameCtx.fillStyle = '#00FF41'; // Yiyecek (Matrix Yeşili)
        gameCtx.fillRect(food.x, food.y, gameSize, gameSize);
    };

    const updateGame = () => {
        const head = { x: snake[0].x + dx, y: snake[0].y + dy };

        // Sınır Kontrolü
        if (head.x < 0 || head.x >= gameCanvas.width || head.y < 0 || head.y >= gameCanvas.height) {
            endGame();
            return;
        }

        // Kendine Çarpma Kontrolü
        if (snake.some((segment, index) => index > 0 && segment.x === head.x && segment.y === head.y)) {
            endGame();
            return;
        }

        // Yeni kafayı ekle
        snake.unshift(head);

        // Yiyecek yendi mi?
        if (head.x === food.x && head.y === food.y) {
            score++;
            createFood();
        } else {
            // Yemediysen kuyruğu sil
            snake.pop();
        }

        // Çizim
        gameCtx.clearRect(0, 0, gameCanvas.width, gameCanvas.height);
        drawFood();
        drawSnake();

        // Skoru göster
        gameCtx.fillStyle = '#BB86FC';
        gameCtx.font = '20px Roboto Mono';
        gameCtx.fillText(`Score: ${score}`, 10, 30);
    };

    const endGame = () => {
        clearInterval(gameLoop);
        gameCtx.fillStyle = '#BB86FC';
        gameCtx.font = '40px Roboto Mono';
        gameCtx.fillText('GAME OVER!', gameCanvas.width / 2 - 120, gameCanvas.height / 2);
        gameCtx.font = '20px Roboto Mono';
        gameCtx.fillText(`Final Score: ${score}`, gameCanvas.width / 2 - 80, gameCanvas.height / 2 + 40);
        gameCanvas.focus(); // Oyunun bitmesinden sonra tekrar ESC ile kapatmak için odaklanma
    };

    const changeDirection = (event) => {
        const LEFT = 37, UP = 38, RIGHT = 39, DOWN = 40;
        const keyPressed = event.keyCode;
        
        // Mevcut yönün tersine gitmeyi engelle
        const goingUp = dy === -gameSize;
        const goingDown = dy === gameSize;
        const goingRight = dx === gameSize;
        const goingLeft = dx === -gameSize;

        if (keyPressed === LEFT && !goingRight) { dx = -gameSize; dy = 0; }
        if (keyPressed === UP && !goingDown) { dx = 0; dy = -gameSize; }
        if (keyPressed === RIGHT && !goingLeft) { dx = gameSize; dy = 0; }
        if (keyPressed === DOWN && !goingUp) { dx = 0; dy = gameSize; }
    };
    
    const startGame = () => {
        gameContainer.classList.remove('hidden');
        document.body.classList.add('hidden-overflow'); // Kaydırmayı engelle
        initGame();
        // Oyun hızını ayarla (ms cinsinden)
        gameLoop = setInterval(updateGame, 100); 
        document.addEventListener('keydown', changeDirection);
    };

    // İndirme Tuşu Olayı
    document.getElementById('download-button').addEventListener('click', startGame);

    // ESC Tuşu ile Oyunu Kapatma
    document.addEventListener('keydown', (event) => {
        if (event.key === 'Escape' && !gameContainer.classList.contains('hidden')) {
            clearInterval(gameLoop);
            gameContainer.classList.add('hidden');
            document.body.classList.remove('hidden-overflow');
            document.removeEventListener('keydown', changeDirection);
        }
    });

});
