// ============================================================
// DANH SÁCH KHÁCH MỜI
// ============================================================
// Chỉnh sửa file này để thêm/bớt khách mời.
// Mỗi khách gồm:
//   - name: Tên hiển thị trên thiệp (bắt buộc)
//   - slug: Mã ngắn cho link (tùy chọn, để trống = tự tạo từ name)
//   - greeting: Lời mời riêng (tùy chọn, để trống = dùng mặc định)
//
// Ví dụ:
//   { name: "Gia đình anh Phát", slug: "anh-phat" }
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
function buildGuestLink(guest) {
    const base = window.location.origin + window.location.pathname.replace(/[^/]*$/, '');
    return base + 'wedding.html?to=' + getGuestSlug(guest);
}

// Giữ tương thích: tạo link từ tên khách
function getGuestLink(name) {
    const base = window.location.origin + window.location.pathname.replace(/index\.html$/, '');
    return base + 'wedding.html?to=' + encodeURIComponent(name);
}