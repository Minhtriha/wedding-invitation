/**
 * =========================================================================
 * FILE CẤU HÌNH THÔNG TIN THIỆP CƯỚI (WEDDING CONFIG)
 * Bạn có thể dễ dàng chỉnh sửa toàn bộ nội dung của thiệp tại file này!
 * =========================================================================
 */

const WEDDING_CONFIG = {
    // ---------------------------------------------------------------------
    // 1. THÔNG TIN CẶP ĐÔI (COUPLE INFO)
    // ---------------------------------------------------------------------
    groom: {
        shortName: "Minh Trí",
        fullName: "Minh Trí",
        title: "Út Nam",
        parents: "Ông: Hà Văn Sơn<br>Bà: Nguyễn Thị Mỹ",
        address: "ấp Long Thạnh A, xã Long Khánh, tỉnh Đồng Tháp",
        bank: {
            bankName: "Wooribank",
            accountName: "HA MINH TRI",
            accountNumber: "100200278555",
            qrUrl: "https://img.vietqr.io/image/WOORIBANK-100200278555-compact2.png?amount=0&addInfo=Mung%20Cuoi%20Minh%20Tri&accountName=HA%20MINH%20TRI"
        }
    },
    bride: {
        shortName: "Bảo Trân",
        fullName: "Bảo Trân",
        title: "Trưởng Nữ",
        parents: "Ông: Nguyễn Minh Tú<br>Bà: Huỳnh Thị Ngọc Anh",
        address: "461 Đỗ Mười, Khu phố 48, phường Linh Xuân, TP. Hồ Chí Minh",
        bank: {
            bankName: "Wooribank",
            accountName: "Huynh Ngoc Bao TRAN",
            accountNumber: "100200526787",
            qrUrl: "https://img.vietqr.io/image/WOORIBANK-100200526787-compact2.png?amount=0&addInfo=Mung%20Cuoi%20Bao%20Tran&accountName=HUYNH%20NGOC%20BAO%20TRAN"
        }
    },

    // ---------------------------------------------------------------------
    // 2. THỜI GIAN & ĐỊA ĐIỂM (DATE, TIME & VENUE)
    // ---------------------------------------------------------------------
    // Ngnày giờ đám cưới (dùng cho đồng hồ đếm ngược - định dạng: YYYY-MM-DDTHH:mm:ss)
    weddingDateTime: "2026-09-19T18:00:00",
    
    // Lễ Gia Tiên (Tại tư gia)
    ceremony: {
        time: "09:00",
        dayOfWeek: "Thứ Bảy",
        day: "19",
        month: "09",
        year: "2026",
        lunarDate: "Tức ngày 09 tháng 08 năm Bính Ngọ",
        locationName: "Tư Gia",
        address: "ấp Long Thạnh A, xã Long Khánh, tỉnh Đồng Tháp"
    },

    // Tiệc Cưới (Tại Nhà Hàng / Trung Tâm Hội Nghị)
    reception: {
        time: "09:00",
        guestTime: "00:00",     // Giờ đón khách
        feastTime: "00:00",     // Giờ khai tiệc
        dayOfWeek: "Thứ Bảy",
        day: "19",
        month: "09",
        year: "2026",
        lunarDate: "Tức ngày 09 tháng 08 năm Bính Ngọ",
        venueName: "Tư Gia",
        hall: "",
        address: "Ấp Long Thạnh A, xã Long Khánh, tỉnh Đồng Tháp",
        mapUrl: "https://maps.app.goo.gl/cfsRmWnVzK1obxsG6",
        mapEmbedUrl: "https://www.google.com/maps/embed?pb=!1m17!1m12!1m3!1d1172.4147147814065!2d105.2984282696109!3d10.80321831667043!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m2!1m1!2zMTDCsDQ4JzExLjYiTiAxMDXCsDE3JzU2LjciRQ!5e1!3m2!1svi!2s!4v1787499706641!5m2!1svi!2s"
    },

    // ---------------------------------------------------------------------
    // 3. TÙY CHỌN NHẠC NỀN (AUDIO BACKGROUND MUSIC)
    // Bạn có thể dán link mp3 online hoặc đường dẫn file mp3 cục bộ (ví dụ: "music/wedding.mp3")
    // ---------------------------------------------------------------------
    music: {
        src: "sounds.mp3",
        autoPlayOnOpen: true // Tự động phát khi người dùng bấm Mở thiệp
    },

    // ---------------------------------------------------------------------
    // 4. HÌNH ẢNH CÓ SẴN (IMAGES & PHOTO GALLERY)
    // Thay đổi đường dẫn ảnh bìa hoặc danh sách album ảnh cưới tại đây
    // ---------------------------------------------------------------------
    images: {
        // Ảnh vẽ hoặc ảnh cặp đôi ở banner đầu trang
        // 👉 Đặt file ảnh vào thư mục "images/" trong dự án rồi ghi tên file vào đây
        heroIllustration: "images/hero.jpg",
        
        // Album ảnh cưới dạng lưới 2x2
        // thumb: bản nhỏ (images/thumbs/) cho lưới album — tải nhanh, không giật lag
        // full:  bản lớn (images/full/) cho lightbox xem full màn hình
        // Bản gốc độ phân giải gốc được backup tại images/originals/
        gallery: [
            {
                thumb: "images/thumbs/gallery-1.jpg",
                full: "images/full/gallery-1.jpg"
            },
            {
                thumb: "images/thumbs/gallery-2.jpg",
                full: "images/full/gallery-2.jpg"
            },
            {
                thumb: "images/thumbs/gallery-3.jpg",
                full: "images/full/gallery-3.jpg"
            },
            {
                thumb: "images/thumbs/gallery-4.jpg",
                full: "images/full/gallery-4.jpg"
            }
        ]
    },

    // ---------------------------------------------------------------------
    // 5. CÁC THÔNG ĐIỆP KHÁC
    // ---------------------------------------------------------------------
    rsvpDeadline: "05.09.2026",
    footerQuote: "Sự hiện diện của quý khách là niềm vinh hạnh của gia đình chúng tôi!",
    copyright: "© 2026 — Made & Designed by Groom Minh Tri/Bride Bao Tran ❤️",

    // ---------------------------------------------------------------------
    // 6. THỐNG KÊ TRUY CẬP (GOOGLE ANALYTICS 4)
    // 👉 Tạo tài khoản miễn phí tại https://analytics.google.com
    //    → Tạo property → Data streams → Web → copy Measurement ID (dạng "G-XXXXXXXXXX")
    //    → Dán vào gaMeasurementId bên dưới, push lên GitHub là xong.
    // Xem hướng dẫn chi tiết trong README.md mục "📊 Thống kê truy cập".
    // ---------------------------------------------------------------------
    analytics: {
        gaMeasurementId: "G-7W6M455PYZ",          // VD: "G-ABC1234567" — để trống thì tắt thống kê
        trackVisitorInfo: true,       // Ghi IP/quốc gia/thành phố của khách xem
        geoApiUrl: "https://ipwho.is/" // API miễn phí tra cứu vị trí theo IP
    }
};
