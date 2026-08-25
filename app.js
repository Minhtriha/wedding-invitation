const cfg = typeof WEDDING_CONFIG !== 'undefined' ? WEDDING_CONFIG : {};

function initWeddingData() {
    const brideShort = cfg.bride?.shortName || "Bảo Trân";
    const groomShort = cfg.groom?.shortName || "Minh Trí";
    const coupleCombined = `${brideShort} & ${groomShort}`;
    document.title = `Thiệp Mời Cưới — ${coupleCombined}`;
    const envCouple = document.getElementById('envelopeCoupleNames');
    if (envCouple) envCouple.textContent = coupleCombined;
    const bannerCouple = document.getElementById('bannerCoupleBillboard');
    if (bannerCouple) bannerCouple.textContent = coupleCombined.toUpperCase();

    const bgAudio = document.getElementById('weddingBgMusic');
    const musicSource = document.getElementById('musicSource');
    if (cfg.music?.src && musicSource && bgAudio) {
        musicSource.src = cfg.music.src;
        bgAudio.load();
    }

    const heroImg = document.getElementById('heroIllustrationImg');
    if (cfg.images?.heroIllustration && heroImg) heroImg.src = cfg.images.heroIllustration;

    const brideParents = document.getElementById('brideParents');
    if (cfg.bride?.parents && brideParents) brideParents.innerHTML = cfg.bride.parents;
    const brideAddress = document.getElementById('brideAddress');
    if (cfg.bride?.address && brideAddress) brideAddress.textContent = cfg.bride.address;
    const groomParents = document.getElementById('groomParents');
    if (cfg.groom?.parents && groomParents) groomParents.innerHTML = cfg.groom.parents;
    const groomAddress = document.getElementById('groomAddress');
    if (cfg.groom?.address && groomAddress) groomAddress.textContent = cfg.groom.address;

    const groomFullName = document.getElementById('groomFullName');
    if (cfg.groom?.fullName && groomFullName) groomFullName.textContent = cfg.groom.fullName;
    const groomTitle = document.getElementById('groomTitle');
    if (cfg.groom?.title && groomTitle) groomTitle.textContent = cfg.groom.title;
    const brideFullName = document.getElementById('brideFullName');
    if (cfg.bride?.fullName && brideFullName) brideFullName.textContent = cfg.bride.fullName;
    const brideTitle = document.getElementById('brideTitle');
    if (cfg.bride?.title && brideTitle) brideTitle.textContent = cfg.bride.title;

    if (cfg.ceremony) {
        const cTime = document.getElementById('ceremonyTime');
        if (cTime) cTime.textContent = cfg.ceremony.time || "09:00";
        const cDayOfWeek = document.getElementById('ceremonyDayOfWeek');
        if (cDayOfWeek) cDayOfWeek.textContent = cfg.ceremony.dayOfWeek || "Thứ Bảy";
        const cDay = document.getElementById('ceremonyDay');
        if (cDay) cDay.textContent = cfg.ceremony.day || "19";
        const cMonth = document.getElementById('ceremonyMonth');
        if (cMonth) cMonth.textContent = `Tháng ${cfg.ceremony.month || "09"}`;
        const cYear = document.getElementById('ceremonyYear');
        if (cYear) cYear.textContent = cfg.ceremony.year || "2026";
        const cLunar = document.getElementById('ceremonyLunarDate');
        if (cLunar) cLunar.textContent = `(${cfg.ceremony.lunarDate || ""})`;
    }

    if (cfg.reception) {
        const rTime = document.getElementById('receptionTime');
        if (rTime) rTime.textContent = cfg.reception.time || "18:00";
        const rDayOfWeek = document.getElementById('receptionDayOfWeek');
        if (rDayOfWeek) rDayOfWeek.textContent = cfg.reception.dayOfWeek || "Thứ Bảy";
        const rDay = document.getElementById('receptionDay');
        if (rDay) rDay.textContent = cfg.reception.day || "19";
        const rMonth = document.getElementById('receptionMonth');
        if (rMonth) rMonth.textContent = `Tháng ${cfg.reception.month || "09"}`;
        const rYear = document.getElementById('receptionYear');
        if (rYear) rYear.textContent = cfg.reception.year || "2026";
        const rLunar = document.getElementById('receptionLunarDate');
        if (rLunar) rLunar.textContent = `(${cfg.reception.lunarDate || ""})`;
        const rGuest = document.getElementById('receptionGuestTime');
        if (rGuest) rGuest.textContent = cfg.reception.guestTime || "17:00";
        const rFeast = document.getElementById('receptionFeastTime');
        if (rFeast) rFeast.textContent = cfg.reception.feastTime || "18:00";
        const vName = document.getElementById('venueName');
        if (vName) vName.textContent = cfg.reception.venueName || "Trung Tâm Tiệc Cưới";
        const vHall = document.getElementById('venueHall');
        if (vHall) vHall.textContent = cfg.reception.hall || "";
        const vAddress = document.getElementById('venueAddress');
        if (vAddress) vAddress.textContent = cfg.reception.address || "";
        const vIframe = document.getElementById('venueMapIframe');
        if (cfg.reception.mapEmbedUrl && vIframe) vIframe.src = cfg.reception.mapEmbedUrl;
        const vMapBtn = document.getElementById('venueDirectMapBtn');
        if (cfg.reception.mapUrl && vMapBtn) vMapBtn.href = cfg.reception.mapUrl;
    }

    const addCalBtn = document.getElementById('addToCalendarBtn');
    if (addCalBtn) {
        const calTitle = encodeURIComponent(`Đám Cưới ${coupleCombined}`);
        const calLocation = encodeURIComponent(`${cfg.reception?.venueName || ''}, ${cfg.reception?.address || ''}`);
        addCalBtn.href = `https://calendar.google.com/calendar/render?action=TEMPLATE&text=${calTitle}&dates=20260919T100000Z/20260919T140000Z&details=Tiệc+cưới+${calTitle}&location=${calLocation}`;
    }

    const giftGroomTitle = document.getElementById('giftGroomShortTitle');
    if (giftGroomTitle) giftGroomTitle.innerHTML = `Chú Rể<br>${groomShort}`;
    const giftBrideTitle = document.getElementById('giftBrideShortTitle');
    if (giftBrideTitle) giftBrideTitle.innerHTML = `Cô Dâu<br>${brideShort}`;

    if (cfg.groom?.bank) {
        const gBank = document.getElementById('groomBankName');
        if (gBank) gBank.textContent = cfg.groom.bank.bankName || "";
        const gAcc = document.getElementById('groomAccountName');
        if (gAcc) gAcc.textContent = cfg.groom.bank.accountName || "";
        const gStk = document.getElementById('groomStk');
        if (gStk) gStk.textContent = cfg.groom.bank.accountNumber || "";
        const gQr = document.getElementById('groomQrImg');
        if (gQr) gQr.src = cfg.groom.bank.qrUrl || "";
        const gBtn = document.getElementById('btnCopyGroomStk');
        if (gBtn) gBtn.onclick = () => copyText(cfg.groom.bank.accountNumber, "Đã sao chép số tài khoản Chú Rể!");
    }

    if (cfg.bride?.bank) {
        const bBank = document.getElementById('brideBankName');
        if (bBank) bBank.textContent = cfg.bride.bank.bankName || "";
        const bAcc = document.getElementById('brideAccountName');
        if (bAcc) bAcc.textContent = cfg.bride.bank.accountName || "";
        const bStk = document.getElementById('brideStk');
        if (bStk) bStk.textContent = cfg.bride.bank.accountNumber || "";
        const bQr = document.getElementById('brideQrImg');
        if (bQr) bQr.src = cfg.bride.bank.qrUrl || "";
        const bBtn = document.getElementById('btnCopyBrideStk');
        if (bBtn) bBtn.onclick = () => copyText(cfg.bride.bank.accountNumber, "Đã sao chép số tài khoản Cô Dâu!");
    }

    const rsvpDeadlineEl = document.getElementById('rsvpDeadlineText');
    if (cfg.rsvpDeadline && rsvpDeadlineEl) {
        rsvpDeadlineEl.textContent = `Vui lòng phản hồi trước ngày ${cfg.rsvpDeadline} để gia đình đón tiếp chu đáo nhất`;
    }

    const quoteEl = document.getElementById('footerQuoteText');
    if (cfg.footerQuote && quoteEl) quoteEl.textContent = cfg.footerQuote;
    const copyEl = document.getElementById('footerCopyrightText');
    if (cfg.copyright && copyEl) copyEl.textContent = cfg.copyright;

    const galleryGridEl = document.getElementById('photoGalleryGrid');
    if (galleryGridEl && cfg.images?.gallery && Array.isArray(cfg.images.gallery)) {
        galleryGridEl.innerHTML = '';
        cfg.images.gallery.forEach((item, idx) => {
            const card = document.createElement('div');
            card.className = 'photo-card';
            card.onclick = () => openLightbox(idx);
            card.innerHTML = `<img src="${item.thumb}" alt="Ảnh cưới ${idx+1}" loading="lazy" decoding="async">`;
            galleryGridEl.appendChild(card);
        });
    }
}

function initCountdown() {
    const targetDate = new Date(cfg.weddingDateTime || "2026-09-19T18:00:00").getTime();
    const cdDaysEl = document.getElementById('cdDays');
    const cdHoursEl = document.getElementById('cdHours');
    const cdMinutesEl = document.getElementById('cdMinutes');
    const cdSecondsEl = document.getElementById('cdSeconds');

    function update() {
        const now = new Date().getTime();
        const distance = targetDate - now;
        if (distance <= 0) {
            if (cdDaysEl) cdDaysEl.textContent = "00";
            if (cdHoursEl) cdHoursEl.textContent = "00";
            if (cdMinutesEl) cdMinutesEl.textContent = "00";
            if (cdSecondsEl) cdSecondsEl.textContent = "00";
            return;
        }
        const days = Math.floor(distance / (1000 * 60 * 60 * 24));
        const hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
        const minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
        const seconds = Math.floor((distance % (1000 * 60)) / 1000);
        if (cdDaysEl) cdDaysEl.textContent = String(days).padStart(2, '0');
        if (cdHoursEl) cdHoursEl.textContent = String(hours).padStart(2, '0');
        if (cdMinutesEl) cdMinutesEl.textContent = String(minutes).padStart(2, '0');
        if (cdSecondsEl) cdSecondsEl.textContent = String(seconds).padStart(2, '0');
    }
    update();
    setInterval(update, 1000);
}

function resolveGuestName() {
    const raw = new URLSearchParams(window.location.search).get('to') || '';
    if (!raw) return null;
    const decoded = decodeURIComponent(raw).trim();
    if (typeof findGuestBySlug === 'function') {
        const bySlug = findGuestBySlug(decoded);
        if (bySlug) return bySlug.name;
    }
    if (typeof GUESTS !== 'undefined' && Array.isArray(GUESTS)) {
        const byName = GUESTS.find(g => g.name.toLowerCase() === decoded.toLowerCase());
        if (byName) return byName.name;
    }
    return decoded;
}

function initGuestPersonalization() {
    const currentGuest = resolveGuestName();
    const envelopeGuestNameEl = document.getElementById('envelopeGuestName');
    const invitationGuestTargetEl = document.getElementById('invitationGuestTarget');
    const rsvpGuestNameInput = document.getElementById('rsvpGuestName');
    const guestWishNameInput = document.getElementById('guestWishName');
    if (currentGuest) {
        if (envelopeGuestNameEl) envelopeGuestNameEl.textContent = currentGuest;
        if (invitationGuestTargetEl) invitationGuestTargetEl.textContent = currentGuest;
        if (rsvpGuestNameInput) rsvpGuestNameInput.value = currentGuest;
        if (guestWishNameInput) guestWishNameInput.value = currentGuest;
    }
}

function initEnvelopeAndMusic() {
    const weddingBgMusic = document.getElementById('weddingBgMusic');
    const musicToggleBtn = document.getElementById('musicToggleBtn');
    let isMusicPlaying = false;

    function startAudio() {
        if (!isMusicPlaying && weddingBgMusic) {
            weddingBgMusic.play().then(() => {
                isMusicPlaying = true;
                if (musicToggleBtn) musicToggleBtn.classList.add('playing');
            }).catch(() => {});
        }
    }

    if (musicToggleBtn) {
        musicToggleBtn.addEventListener('click', (e) => {
            e.stopPropagation();
            if (weddingBgMusic.paused) {
                weddingBgMusic.play();
                musicToggleBtn.classList.add('playing');
                isMusicPlaying = true;
            } else {
                weddingBgMusic.pause();
                musicToggleBtn.classList.remove('playing');
                isMusicPlaying = false;
            }
        });
    }

    const envelopeScreen = document.getElementById('envelopeScreen');
    const openInvitationBtn = document.getElementById('openInvitationBtn');
    const waxSealBtn = document.getElementById('waxSealBtn');

    function openEnvelope() {
        if (envelopeScreen && !envelopeScreen.classList.contains('opened')) {
            envelopeScreen.classList.add('opened');
        }
        startAudio();
        startPetalRain();
    }

    if (openInvitationBtn) openInvitationBtn.addEventListener('click', openEnvelope);
    if (waxSealBtn) waxSealBtn.addEventListener('click', openEnvelope);
}

// ============================================================
// HIỆU ỨNG CÁNH HOA RƠI (FALLING PETALS)
// ============================================================
function startPetalRain() {
    const container = document.getElementById('petalRain');
    if (!container || container.dataset.started) return;
    container.dataset.started = '1';

    const colors = ['#e8899a', '#d96a7b', '#c32a29', '#e9b4b8', '#e9ce9e', '#f3d9c9'];
    const PETAL_COUNT = 16;

    for (let i = 0; i < PETAL_COUNT; i++) {
        const petal = document.createElement('span');
        petal.className = 'petal';
        const size = 10 + Math.random() * 13;
        petal.style.width = size + 'px';
        petal.style.height = (size * 0.82).toFixed(1) + 'px';
        petal.style.left = (Math.random() * 100).toFixed(2) + '%';
        petal.style.background = colors[i % colors.length];
        petal.style.setProperty('--sx', Math.round(Math.random() * 240 - 120) + 'px');
        petal.style.setProperty('--sr', Math.round(360 + Math.random() * 540) + 'deg');
        petal.style.setProperty('--po', (0.55 + Math.random() * 0.35).toFixed(2));
        petal.style.animationDuration = (8 + Math.random() * 7).toFixed(2) + 's';
        petal.style.animationDelay = (Math.random() * 8).toFixed(2) + 's';
        container.appendChild(petal);
    }
}

// ============================================================
// NÚT CHIA SẺ THIỆP (WEB SHARE API + COPY LINK FALLBACK)
// ============================================================
function initShare() {
    const shareBtn = document.getElementById('shareToggleBtn');
    if (!shareBtn) return;
    shareBtn.addEventListener('click', async () => {
        const brideShort = cfg.bride?.shortName || "Bảo Trân";
        const groomShort = cfg.groom?.shortName || "Minh Trí";
        const shareData = {
            title: document.title,
            text: `💌 Trân trọng kính mời bạn đến dự lễ hôn lễ của ${brideShort} & ${groomShort} — 19.09.2026`,
            url: window.location.href
        };
        if (navigator.share) {
            try {
                await navigator.share(shareData);
            } catch (e) { /* Người dùng đóng hộp thoại chia sẻ */ }
        } else {
            copyText(window.location.href, '🔗 Đã copy link thiệp — dán vào Zalo/Messenger để gửi!');
        }
    });
}

function initToast() {
    const toastMsgEl = document.getElementById('toastMsg');
    let toastTimeout;
    window.showToast = function (text) {
        if (!toastMsgEl) return;
        toastMsgEl.textContent = text;
        toastMsgEl.classList.add('show');
        clearTimeout(toastTimeout);
        toastTimeout = setTimeout(() => toastMsgEl.classList.remove('show'), 2600);
    };
}

async function copyText(text, successMsg = 'Đã sao chép vào bộ nhớ tạm!') {
    try {
        await navigator.clipboard.writeText(text);
        showToast(successMsg);
    } catch (e) {
        const ta = document.createElement('textarea');
        ta.value = text;
        document.body.appendChild(ta);
        ta.select();
        document.execCommand('copy');
        document.body.removeChild(ta);
        showToast(successMsg);
    }
}

function initGiftModal() {
    const giftModal = document.getElementById('giftModal');
    const groomQrCard = document.getElementById('groomQrCard');
    const brideQrCard = document.getElementById('brideQrCard');
    const tabGroomBtn = document.getElementById('tabGroomBtn');
    const tabBrideBtn = document.getElementById('tabBrideBtn');

    window.openGiftModal = function () {
        if (giftModal) giftModal.classList.add('active');
    };
    window.closeGiftModal = function () {
        if (giftModal) giftModal.classList.remove('active');
    };
    window.switchQrTab = function (type) {
        if (type === 'groom') {
            if (groomQrCard) groomQrCard.style.display = 'block';
            if (brideQrCard) brideQrCard.style.display = 'none';
            if (tabGroomBtn) tabGroomBtn.classList.add('active');
            if (tabBrideBtn) tabBrideBtn.classList.remove('active');
        } else {
            if (groomQrCard) groomQrCard.style.display = 'none';
            if (brideQrCard) brideQrCard.style.display = 'block';
            if (tabBrideBtn) tabBrideBtn.classList.add('active');
            if (tabGroomBtn) tabGroomBtn.classList.remove('active');
        }
    };
}

function initRsvpModal() {
    const rsvpModal = document.getElementById('rsvpModal');
    const rsvpForm = document.getElementById('rsvpForm');

    window.openRsvpModal = function () {
        if (rsvpModal) rsvpModal.classList.add('active');
    };
    window.closeRsvpModal = function () {
        if (rsvpModal) rsvpModal.classList.remove('active');
    };

    if (rsvpForm) {
        rsvpForm.addEventListener('submit', (e) => {
            e.preventDefault();
            const name = document.getElementById('rsvpGuestName').value.trim();
            const count = document.getElementById('rsvpGuestCount').value;
            const note = document.getElementById('rsvpNote').value.trim();
            const rsvpData = { name, count, note, time: new Date().toISOString() };
            const stored = JSON.parse(localStorage.getItem('weddingRsvps') || '[]');
            stored.push(rsvpData);
            localStorage.setItem('weddingRsvps', JSON.stringify(stored));
            // Ghi nhận lên GA4 để xem tập trung trên dashboard
            if (typeof trackEvent === 'function') {
                trackEvent('rsvp_submit', { rsvp_name: name, rsvp_count: count });
            }
            closeRsvpModal();
            showToast('💌 Cảm ơn bạn đã xác nhận tham dự!');
        });
    }
}

function initLightbox() {
    const lightboxModal = document.getElementById('lightboxModal');
    const lightboxImg = document.getElementById('lightboxImg');
    const closeBtn = document.getElementById('lightboxCloseBtn');
    const prevBtn = document.getElementById('lightboxPrevBtn');
    const nextBtn = document.getElementById('lightboxNextBtn');
    const counterEl = document.getElementById('lightboxCounter');

    const photos = (cfg.images?.gallery && Array.isArray(cfg.images.gallery))
        ? cfg.images.gallery.map(item => item.full || item.thumb)
        : [];
    let currentIndex = 0;

    function show(index) {
        if (!photos.length || !lightboxImg) return;
        currentIndex = (index + photos.length) % photos.length;
        lightboxImg.src = photos[currentIndex];
        if (counterEl) counterEl.textContent = `${currentIndex + 1} / ${photos.length}`;
    }

    window.openLightbox = function (index) {
        if (!photos.length) return;
        show(typeof index === 'number' ? index : 0);
        if (lightboxModal) lightboxModal.classList.add('active');
    };
    window.closeLightbox = function () {
        if (lightboxModal) lightboxModal.classList.remove('active');
    };

    if (prevBtn) prevBtn.addEventListener('click', (e) => { e.stopPropagation(); show(currentIndex - 1); });
    if (nextBtn) nextBtn.addEventListener('click', (e) => { e.stopPropagation(); show(currentIndex + 1); });
    if (closeBtn) closeBtn.addEventListener('click', window.closeLightbox);

    // Bấm vào nền tối để đóng (không đóng khi bấm vào ảnh/nút)
    if (lightboxModal) {
        lightboxModal.addEventListener('click', (e) => {
            if (e.target === lightboxModal) window.closeLightbox();
        });
    }

    // Điều hướng bằng bàn phím
    document.addEventListener('keydown', (e) => {
        if (!lightboxModal || !lightboxModal.classList.contains('active')) return;
        if (e.key === 'ArrowLeft') show(currentIndex - 1);
        else if (e.key === 'ArrowRight') show(currentIndex + 1);
        else if (e.key === 'Escape') window.closeLightbox();
    });

    // Vuốt (swipe) trên mobile
    let touchStartX = 0;
    let touchEndX = 0;
    if (lightboxModal) {
        lightboxModal.addEventListener('touchstart', (e) => {
            touchStartX = e.changedTouches[0].screenX;
        }, { passive: true });
        lightboxModal.addEventListener('touchend', (e) => {
            touchEndX = e.changedTouches[0].screenX;
            const delta = touchEndX - touchStartX;
            if (Math.abs(delta) > 45) {
                if (delta < 0) show(currentIndex + 1);
                else show(currentIndex - 1);
            }
        }, { passive: true });
    }
}

function initGuestbook() {
    const guestbookForm = document.getElementById('guestbookForm');
    const wishesListEl = document.getElementById('wishesList');

    const defaultWishes = [
        { name: "Gia đình cô Lan", time: "10:58 19/08/2026", content: "Chúc hai cháu trăm năm hạnh phúc, sớm sinh quý tử!" },
        { name: "Bạn thân của cô dâu", time: "10:58 18/08/2026", content: "Chúc mừng hai bạn về chung một nhà. Mong hai bạn luôn yêu thương nhau như ngày đầu!" },
        { name: "Anh Minh", time: "10:58 17/08/2026", content: "Nhìn thiệp mà thấy ấm áp ghê. Chúc đám cưới thật trọn vẹn nhé!" },
        { name: "Chị Hương", time: "10:58 16/08/2026", content: "Chúc cô dâu chú rể trăm năm hảo hợp, gia đình luôn đầm ấm." }
    ];

    function escapeHtml(str) {
        const d = document.createElement('div');
        d.textContent = str;
        return d.innerHTML;
    }

    function renderWishes() {
        if (!wishesListEl) return;
        const saved = JSON.parse(localStorage.getItem('weddingWishes') || 'null') || defaultWishes;
        wishesListEl.innerHTML = '';
        saved.forEach(item => {
            const div = document.createElement('div');
            div.className = 'wish-card';
            div.innerHTML = `
                <div class="wish-header">
                    <span class="wish-author">${escapeHtml(item.name)}</span>
                    <span class="wish-time">${item.time || ''}</span>
                </div>
                <div class="wish-content">${escapeHtml(item.content)}</div>
            `;
            wishesListEl.appendChild(div);
        });
    }

    if (guestbookForm) {
        guestbookForm.addEventListener('submit', (e) => {
            e.preventDefault();
            const name = document.getElementById('guestWishName').value.trim();
            const content = document.getElementById('guestWishContent').value.trim();
            if (!name || !content) return;
            const now = new Date();
            const timeStr = `${String(now.getHours()).padStart(2, '0')}:${String(now.getMinutes()).padStart(2, '0')} ${String(now.getDate()).padStart(2, '0')}/${String(now.getMonth()+1).padStart(2, '0')}/${now.getFullYear()}`;
            const saved = JSON.parse(localStorage.getItem('weddingWishes') || 'null') || [...defaultWishes];
            saved.unshift({ name, content, time: timeStr });
            localStorage.setItem('weddingWishes', JSON.stringify(saved));
            document.getElementById('guestWishContent').value = '';
            // Ghi nhận lên GA4 để xem tập trung trên dashboard
            if (typeof trackEvent === 'function') {
                trackEvent('wish_send', { wish_author: name });
            }
            renderWishes();
            showToast('✨ Đã gửi lời chúc thành công!');
        });
    }

    renderWishes();
}

// ============================================================
// ANALYTICS — Google Analytics 4 + thông tin khách truy cập
// Xem hướng dẫn bật trong README.md mục "📊 Thống kê truy cập".
// ============================================================
function initAnalytics() {
    const analytics = cfg.analytics || {};
    const gaId = analytics.gaMeasurementId;

    // Nạp gtag.js nếu đã cấu hình Measurement ID
    if (gaId) {
        const s = document.createElement('script');
        s.async = true;
        s.src = 'https://www.googletagmanager.com/gtag/js?id=' + gaId;
        document.head.appendChild(s);
        window.dataLayer = window.dataLayer || [];
        window.gtag = function () { dataLayer.push(arguments); };
        gtag('js', new Date());
        gtag('config', gaId);
    }

    // Helper gửi sự kiện — an toàn khi chưa cấu hình GA (không gây lỗi)
    window.trackEvent = function (name, params) {
        if (gaId && typeof gtag === 'function') {
            try { gtag('event', name, params || {}); } catch (e) { /* bỏ qua */ }
        }
    };

    // Ghi thông tin khách truy cập: IP, quốc gia, thành phố (+ tên khách từ link ?to=)
    if (analytics.trackVisitorInfo !== false && analytics.geoApiUrl && gaId) {
        fetch(analytics.geoApiUrl)
            .then(r => r.json())
            .then(data => {
                const params = {
                    visitor_ip: data.ip || '',
                    visitor_country: data.country || '',
                    visitor_city: data.city || ''
                };
                const guestName = new URLSearchParams(location.search).get('to');
                if (guestName) params.guest_name = guestName;
                trackEvent('visitor_info', params);
            })
            .catch(() => { /* offline hoặc API lỗi — bỏ qua im lặng */ });
    }

    // Sự kiện mở thiệp (nút chính + triện sáp)
    ['openInvitationBtn', 'waxSealBtn'].forEach(id => {
        const btn = document.getElementById(id);
        if (btn) btn.addEventListener('click', () => trackEvent('open_invitation'));
    });

    // Sự kiện bấm nút chia sẻ
    const shareBtn = document.getElementById('shareToggleBtn');
    if (shareBtn) shareBtn.addEventListener('click', () => trackEvent('share_click'));
}

document.addEventListener('DOMContentLoaded', () => {
    initToast();
    initWeddingData();
    initCountdown();
    initGuestPersonalization();
    initEnvelopeAndMusic();
    initGiftModal();
    initRsvpModal();
    initLightbox();
    initGuestbook();
    initShare();
    initAnalytics();
});
