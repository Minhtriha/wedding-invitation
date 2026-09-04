// ============================================================
// DANH SÁCH KHÁCH MỜI
// ============================================================
// Chỉnh sửa file này để thêm/bớt khách mời.
// Mỗi khách gồm:
//   - name: Tên hiển thị trên thiệp (bắt buộc)
//   - slug: Mã ngắn cho link (tùy chọn, để trống = tự tạo từ name)
//   - greeting: Lời mời riêng (tùy chọn, để trống = dùng mặc định)
//   - side: "groom" (nhà trai) | "bride" (nhà gái) — quyết định ngày đãi tiệc
//           và địa điểm hiển thị trên thiệp (mặc định: nhà trai)
//   - showBankQr: true/false — ẩn/hiện QR + STK mừng cưới cho khách này
//
// Ví dụ:
//   { name: "Gia đình anh Phát", slug: "anh-phat", side: "bride", showBankQr: false }
//   Link sẽ là: wedding.html?to=anh-phat
// ============================================================

// Danh sách khách mời — hiện đang TRỐNG (đã xóa toàn bộ khách theo yêu cầu).
// Thêm khách mới ở đây (hoặc dễ hơn: dùng trang quản lý index.html → Google Sheet).
const GUESTS = [];

// ============================================================
// KHÔNG CẦN SỬA PHẦN DƯỚI ĐÂY
// ============================================================

// Bảng chuyển đổi ký tự tiếng Việt có dấu -> không dấu
const VIETNAMESE_MAP = {
    'a': 'àáảãạăắằẳẵặâấầẩẫậ',
    'e': 'èéẻẽẹêếềểễệ',
    'i': 'ìíỉĩị',
    'o': 'òóỏõọôốồổỗộơớờởỡợ',
    'u': 'ùúủũụưứừửữự',
    'y': 'ỳýỷỹỵ',
    'd': 'đ'
};

// Tự động tạo slug từ tên khách (bỏ dấu, thay khoảng trắng bằng '-')
function slugify(name) {
    let str = name.toLowerCase().trim();
    for (const [ascii, viet] of Object.entries(VIETNAMESE_MAP)) {
        for (const ch of viet) {
            str = str.replaceAll(ch, ascii);
        }
    }
    str = str.replace(/[^a-z0-9]+/g, '-').replace(/^-+|-+$/g, '');
    return str || 'guest';
}

// Sinh mã ngắn (shortcode) gồm 6 ký tự dễ đọc, không gây trùng với khách khác.
// Dùng cho khách thêm từ web quản lý để link thiệp ngắn: ?to=<mangu>.b.x
function makeShortCode(existingGuests) {
    const chars = 'abcdefghijkmnpqrstuvwxyz23456789'; // bỏ chữ dễ nhầm: l,0,o,1
    const used = new Set((existingGuests || []).map(getGuestSlug));
    let code;
    do {
        code = '';
        for (let i = 0; i < 6; i++) code += chars[Math.floor(Math.random() * chars.length)];
    } while (used.has(code));
    return code;
}

// ---- MÃ NGẮN ỔN ĐỊNH CHO MỌI KHÁCH (backfill khách cũ) ----
// Nếu khách chưa có mã ngắn (slug dài do tự sinh), cấp mã 6 ký tự và lưu lại
// vào localStorage + Google Sheet để mọi thiết bị dùng chung, link được rút gọn.
const SHORT_CODE_KEY = 'weddingShortCodes';
function getShortCodeMap() {
    try {
        return JSON.parse(localStorage.getItem(SHORT_CODE_KEY) || '{}') || {};
    } catch (e) {
        return {};
    }
}
function hasShortSlug(guest) {
    // Ưu tiên slug thủ công (guest.slug) — đã được soạn/ngắn (VD "anh-phat") → giữ nguyên.
    // Chỉ coi cần cấp mã ngắn khi KHÔNG có guest.slug thủ công (tức slug chỉ là slugify(name), dài).
    if (guest && guest.slug && String(guest.slug).trim()) return true;
    const s = getGuestSlug(guest); // = slugify(name) khi không có guest.slug
    return Boolean(s) && s.length <= 7;
}
// Đảm bảo khách có mã ngắn ổn định (tạo mới nếu chưa có) và trả về nó.
// Có guest.slug thủ công (ngắn) → dùng luôn. Ngược lại cấp mã 6 ký tự, lưu localStorage
// + Sheet để một thiết bị khác lookup đúng tên. (Khách không có Sheet thì kèm &n=.)
function ensureGuestShortCode(guest, usable) {
    if (!guest) return '';
    const s = getGuestSlug(guest);
    if (hasShortSlug(guest)) return s;
    const nameKey = (guest.name || '').trim().toLowerCase();
    const map = getShortCodeMap();
    if (map[nameKey]) return map[nameKey];
    // tạo mã mới tránh trùng với mã đang dùng
    if (usable) {
        const base = getGuests ? getGuests() : [];
        let code = makeShortCode(base);
        let guard = 0;
        while (Object.values(map).includes(code) && guard++ < 5) code = makeShortCode(base);
        map[nameKey] = code;
        try {
            localStorage.setItem(SHORT_CODE_KEY, JSON.stringify(map));
            // Đồng bộ mã ngắn lên Sheet để thiết bị khác lookup đúng tên
            setSheetGuestSlug(guest, code);
        } catch (e) {}
        return code;
    }
    return s;
}

// Báo apps script cập nhật mã ngắn cho khách (addGuest/setGuest với slug)
function setSheetGuestSlug(guest, code) {
    try {
        const url = (typeof WEDDING_CONFIG !== 'undefined') &&
                    WEDDING_CONFIG.guestbook && WEDDING_CONFIG.guestbook.googleSheetUrl;
        if (!url) return;
        fetch(url, {
            method: 'POST', mode: 'no-cors',
            headers: { 'Content-Type': 'text/plain;charset=utf-8' },
            body: JSON.stringify({ action: 'addGuest', name: guest.name, slug: code })
        }).catch(() => {});
    } catch (e) {}
}

// Lấy slug cho một khách (dùng slug có sẵn, nếu không có thì tự tạo)
function getGuestSlug(guest) {
    return (guest.slug && guest.slug.trim()) ? guest.slug.trim() : slugify(guest.name);
}

// Lấy bên thiệp của khách: "groom" (nhà trai) hoặc "bride" (nhà gái)
function getGuestSide(guest) {
    const def = (typeof WEDDING_CONFIG !== 'undefined' && WEDDING_CONFIG.defaultSide) || 'groom';
    // Ưu tiên 1: token trên link rút gọn (.b / .g)
    if (URL_SIDE) return URL_SIDE;
    // Ưu tiên 2: tham số ?s= cũ
    const sParam = (new URLSearchParams(window.location.search).get('s') || '').toLowerCase();
    if (sParam === 'bride' || sParam === 'groom') return sParam;
    if (!guest) return def;
    // Ưu tiên 3: cài đặt ghi đè từ trang quản lý (lưu theo slug trong localStorage)
    const stored = (typeof getStoredGuestSettings === 'function')
        ? getStoredGuestSettings()[getGuestSlug(guest)] : null;
    const side = ((stored && stored.side) || guest.side || '').toLowerCase();
    return (side === 'bride' || side === 'groom') ? side : def;
}

// Khách này có được hiện QR + STK mừng cưới không?
// Ưu tiên: token .x trên link > tham số ?q= > cài đặt trang quản lý > guest.showBankQr > mặc định
function getGuestShowBankQr(guest) {
    if (URL_HIDEQR === false) return false;
    const qParam = new URLSearchParams(window.location.search).get('q');
    if (qParam !== null) return qParam !== '0';
    const globalDefault = (typeof WEDDING_CONFIG !== 'undefined' && WEDDING_CONFIG.gift?.showQrDefault !== undefined)
        ? !!WEDDING_CONFIG.gift.showQrDefault : true;
    const stored = (guest && typeof getStoredGuestSettings === 'function')
        ? getStoredGuestSettings()[getGuestSlug(guest)] : null;
    if (stored && stored.showBankQr !== undefined) return !!stored.showBankQr;
    if (!guest || guest.showBankQr === undefined || guest.showBankQr === null) return globalDefault;
    return !!guest.showBankQr;
}

// Đọc cài đặt ghi đè theo từng khách (lưu từ trang quản lý, khóa theo slug)
function getStoredGuestSettings() {
    try {
        return JSON.parse(localStorage.getItem('weddingGuestSettings') || '{}') || {};
    } catch (e) {
        return {};
    }
}

// Ghi cài đặt cho một khách (side / showBankQr)
function saveGuestSetting(slug, settings) {
    const all = getStoredGuestSettings();
    all[slug] = Object.assign({}, all[slug] || {}, settings);
    localStorage.setItem('weddingGuestSettings', JSON.stringify(all));
}

// Trả về object khách đã trộn cài đặt ghi đè từ trang quản lý
function applyGuestSettingsOverride(guest) {
    if (!guest) return guest;
    const o = getStoredGuestSettings()[getGuestSlug(guest)];
    return o ? Object.assign({}, guest, o) : guest;
}

// Tìm object khách đầy đủ đang xem thiệp (theo tham số ?to= trên URL)
function findCurrentGuest() {
    // Hỗ trợ link rút gọn: to=<slug>.b.x — URL_SLUG đã được tách sẵn
    const raw = URL_SLUG !== null ? URL_SLUG
        : decodeURIComponent(new URLSearchParams(window.location.search).get('to') || '').trim().toLowerCase();
    if (!raw) return null;
    const decoded = raw;
    let found = null;
    if (typeof getAllGuests === 'function') {
        found = getAllGuests().find(g => getGuestSlug(g) === decoded) || null;
    }
    if (!found && typeof GUESTS !== 'undefined' && Array.isArray(GUESTS)) {
        found = GUESTS.find(g => g.name.toLowerCase() === decoded) || null;
    }
    return applyGuestSettingsOverride(found);
}

// ============================================================
// LINK RÚT GỌN: mọi tùy chọn gói trong một tham số to=
// Định dạng: to=<slug>[.b][.x]   (.b = nhà gái, .x = ẩn QR)
// Slug chỉ chứa a-z0-9- nên dấu chấm không bao giờ trùng.
// Vẫn hỗ trợ tương thích tham số cũ ?s=&q=&n=
// ============================================================
let URL_SLUG = null, URL_SIDE = null, URL_HIDEQR = null;

(function parseShortLink() {
    const to = new URLSearchParams(window.location.search).get('to');
    if (!to) return;
    const parts = decodeURIComponent(to).trim().split('.');
    URL_SLUG = parts[0].toLowerCase();
    parts.slice(1).forEach(token => {
        const t = token.toLowerCase();
        if (t === 'b') URL_SIDE = 'bride';
        if (t === 'g') URL_SIDE = 'groom';
        if (t === 'x') URL_HIDEQR = false;
    });
})();

// Lấy danh sách khách: từ GUESTS + REMOTE (Google Sheet) + localStorage (khách thêm qua trang quản lý)
function getAllGuests() {
    let custom = [];
    try {
        custom = JSON.parse(localStorage.getItem('weddingGuests') || '[]') || [];
    } catch (e) {
        custom = [];
    }
    const seen = new Set();
    return [...GUESTS, ...(REMOTE_GUESTS || []), ...custom].filter(g => {
        const key = g.name.trim().toLowerCase();
        if (seen.has(key)) return false;
        seen.add(key);
        return true;
    });
}

// ============================================================
// DANH SÁCH KHÁCH TỪ GOOGLE SHEET (tùy chọn)
// Dùng chung URL Apps Script với lời chúc: WEDDING_CONFIG.guestbook.googleSheetUrl
// Khách thêm từ trang quản lý (kể cả trên điện thoại) sẽ lưu lên Sheet,
// thiệp ở mọi thiết bị tự tải về và hiển thị đúng tên.
// ============================================================
let REMOTE_GUESTS = null;

function loadRemoteGuests() {
    try {
        const url = (typeof WEDDING_CONFIG !== 'undefined') &&
                    WEDDING_CONFIG.guestbook && WEDDING_CONFIG.guestbook.googleSheetUrl;
        // Nạp cache đã lưu lần trước NGAY (trước khi fetch) để tên khách xuất hiện tức thì
        // (nếu đã từng mở), tránh flash shortcode ở lần xem sau.
        try {
            const cached = JSON.parse(localStorage.getItem('weddingRemoteCache') || 'null');
            if (cached && Array.isArray(cached) && cached.length) REMOTE_GUESTS = cached;
        } catch (e) { /* bỏ qua */ }
        if (!url) return;
        fetch(url + '?action=guests')
            .then(r => r.json())
            .then(list => {
                if (!Array.isArray(list)) return;
                REMOTE_GUESTS = list.filter(g => g && g.name);
                try { localStorage.setItem('weddingRemoteCache', JSON.stringify(REMOTE_GUESTS)); } catch (e) {}
                // Báo cho các trang biết đã tải xong để cập nhật giao diện
                document.dispatchEvent(new CustomEvent('remote-guests-loaded'));
            })
            .catch(() => { /* offline / chưa cấu hình — dùng guests.js + localStorage */ });
    } catch (e) { /* bỏ qua */ }
}
loadRemoteGuests();

// Tìm khách theo slug (trong GUESTS + localStorage)
function findGuestBySlug(slug) {
    if (!slug) return null;
    return getAllGuests().find(g => getGuestSlug(g) === slug.toLowerCase()) || null;
}

// Tạo link thiệp bằng slug ngắn
// Cài đặt bên (s) và ẩn QR (q) được mã hóa vào link để khách mở trên
// thiết bị khác vẫn thấy đúng (không phụ thuộc localStorage).
// Tên đầy đủ cũng được nhúng vào link (&n=...) để điện thoại của khách
// hiển thị đúng ngay cả khi khách chỉ tồn tại trong localStorage máy quản lý.
function buildGuestLink(guest) {
    const base = window.location.origin + window.location.pathname.replace(/[^/]*$/, '');
    // Link rút gọn: to=<slug>.b.x  (.b = nhà gái, .x = ẩn QR).
    // getGuestSlug ưu tiên slug ngắn có sẵn; khách thiếu mã ngắn → ensureGuestShortCode
    // cấp mã 6 ký tự (backfill khách cũ) và lưu vào localStorage + Sheet → link gọn.
    // Per-guest static OG page (guest/<slug>.html) => Messenger caches a
    // unique object per guest and shows the guest name. Redirects to wedding.html.
    let url = base + 'guest/' + ensureGuestShortCode(guest, true) + '.html';
    // Luôn nhúng tên (&n=Tên) vào link để tên khách hiển thị NGAY trên mọi thiết bị,
    // không phụ thuộc tốc độ tải Google Sheet → không bị flash shortcode ở vài giây đầu.

    return url;
}

// Giữ tương thích: tạo link từ tên khách
function getGuestLink(name) {
    const base = window.location.origin + window.location.pathname.replace(/index\.html$/, '');
    return base + 'wedding.html?to=' + encodeURIComponent(name);
}