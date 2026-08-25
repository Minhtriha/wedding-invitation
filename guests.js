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

const GUESTS = [
    { name: "Gia đình anh Phát", slug: "anh-phat" },
    { name: "Anh chị Tuấn Anh", slug: "tuan-anh" },
    { name: "Cô Mai và bạn", slug: "co-mai" },
    { name: "Chú Hùng", slug: "chu-hung" },
    { name: "Bác Bảy", slug: "bac-bay" },
    { name: "Gia đình chị Hà", slug: "chi-ha" },
    { name: "Anh Đức", slug: "anh-duc" },
    { name: "Chị Thảo", slug: "chi-thao" },
    { name: "Cô Lan", slug: "co-lan" },
    { name: "Gia đình chú Tư", slug: "chu-tu" },
    { name: "Anh Khoa", slug: "anh-khoa" },
    { name: "Chị Ngọc", slug: "chi-ngoc" },
    { name: "Bạn Minh", slug: "ban-minh" },
    { name: "Bạn Huyền", slug: "ban-huyen" },
    { name: "Gia đình Hiếu, Thư", slug: "gia-dinh-hieu-thu" },
    { name: "Đồng nghiệp phòng Kinh doanh", slug: "dong-nghiep" }
];

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

// Lấy slug cho một khách (dùng slug có sẵn, nếu không có thì tự tạo)
function getGuestSlug(guest) {
    return (guest.slug && guest.slug.trim()) ? guest.slug.trim() : slugify(guest.name);
}

// Lấy bên thiệp của khách: "groom" (nhà trai) hoặc "bride" (nhà gái)
function getGuestSide(guest) {
    const def = (typeof WEDDING_CONFIG !== 'undefined' && WEDDING_CONFIG.defaultSide) || 'groom';
    if (!guest) return def;
    // Ưu tiên cài đặt ghi đè từ trang quản lý (lưu theo slug trong localStorage)
    const stored = (typeof getStoredGuestSettings === 'function')
        ? getStoredGuestSettings()[getGuestSlug(guest)] : null;
    const side = ((stored && stored.side) || guest.side || '').toLowerCase();
    return (side === 'bride' || side === 'groom') ? side : def;
}

// Khách này có được hiện QR + STK mừng cưới không?
// Ưu tiên: cài đặt trang quản lý > guest.showBankQr > WEDDING_CONFIG.gift.showQrDefault > true
function getGuestShowBankQr(guest) {
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
    const raw = new URLSearchParams(window.location.search).get('to') || '';
    if (!raw) return null;
    const decoded = decodeURIComponent(raw).trim().toLowerCase();
    let found = null;
    if (typeof getAllGuests === 'function') {
        found = getAllGuests().find(g => getGuestSlug(g) === decoded) || null;
    }
    if (!found && typeof GUESTS !== 'undefined' && Array.isArray(GUESTS)) {
        found = GUESTS.find(g => g.name.toLowerCase() === decoded) || null;
    }
    return applyGuestSettingsOverride(found);
}

// Lấy danh sách khách: từ GUESTS + localStorage (khách thêm qua trang quản lý)
function getAllGuests() {
    let custom = [];
    try {
        custom = JSON.parse(localStorage.getItem('weddingGuests') || '[]') || [];
    } catch (e) {
        custom = [];
    }
    const seen = new Set();
    return [...GUESTS, ...custom].filter(g => {
        const key = g.name.trim().toLowerCase();
        if (seen.has(key)) return false;
        seen.add(key);
        return true;
    });
}

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
    let url = base + 'wedding.html?to=' + getGuestSlug(guest);
    const side = typeof getGuestSide === 'function' ? getGuestSide(guest) : null;
    const showQr = typeof getGuestShowBankQr === 'function' ? getGuestShowBankQr(guest) : true;
    if (side === 'bride') url += '&s=bride';
    if (!showQr) url += '&q=0';
    if (guest.name) url += '&n=' + encodeURIComponent(guest.name);
    return url;
}

// Giữ tương thích: tạo link từ tên khách
function getGuestLink(name) {
    const base = window.location.origin + window.location.pathname.replace(/index\.html$/, '');
    return base + 'wedding.html?to=' + encodeURIComponent(name);
}