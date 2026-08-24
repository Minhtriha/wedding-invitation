# 💌 Thiệp Cưới Online — Bảo Trân & Minh Trí

Thiệp cưới online phong cách **Retro Sài Gòn Xưa** (giấy kem, đỏ son, xanh cổ vịt), mỗi khách mời có một link riêng với tên được cá nhân hóa.

## 📁 Cấu trúc dự án

```
wedding-invitation/
├── index.html      → Trang quản lý khách mời (tạo & copy link mời)
├── wedding.html    → Thiệp cưới chính (giao diện retro Sài Gòn)
├── config.js       → ⭐ TOÀN BỘ thông tin thiệp — chỉnh sửa tại đây
├── guests.js       → Danh sách khách mời mặc định
├── app.js          → Logic hiển thị & tương tác (đếm ngược, lightbox, modal...)
├── style.css       → Toàn bộ giao diện & hiệu ứng
├── sounds.mp3      → Nhạc nền
├── images/         → Ảnh cưới (hero.jpg, gallery-1.jpg → gallery-4.jpg)
├── netlify.toml    → Cấu hình deploy Netlify
├── DEPLOY.md       → 🌐 Hướng dẫn mua tên miền & deploy lên server
└── README.md       → Hướng dẫn này
```

## 🚀 Cách sử dụng

### 1. Chỉnh sửa thông tin thiệp (qua `config.js`)

Mở file `config.js` và sửa các mục:

| Mục | Nội dung |
|---|---|
| `groom` / `bride` | Tên, chức phận, tên cha mẹ, địa chỉ, thông tin tài khoản ngân hàng + QR |
| `weddingDateTime` | Ngày giờ cưới (dùng cho đồng hồ đếm ngược) — định dạng `YYYY-MM-DDTHH:mm:ss` |
| `ceremony` | Lễ Gia Tiên tại tư gia (giờ, ngày, âm lịch, địa chỉ) |
| `reception` | Tiệc cưới tại nhà hàng (giờ, sảnh, địa chỉ, link Google Maps) |
| `music` | Đường dẫn nhạc nền (`sounds.mp3` hoặc link online) |
| `images` | Ảnh bìa (`heroIllustration`) và album 4 ảnh (`gallery`) |
| `rsvpDeadline` | Hạn xác nhận tham dự |

> ⚠️ **Lưu ý:** Luôn dùng **đường dẫn tương đối** (VD: `images/hero.jpg`), không dùng đường dẫn tuyệt đối kiểu `C:/Users/...` — nếu không ảnh/nhạc sẽ hỏng khi deploy lên server.

### 2. Chỉnh sửa danh sách khách mời (qua `guests.js`)

```js
const GUESTS = [
    { name: "Gia đình anh Phát", greeting: "" },
    { name: "Anh chị Tuấn Anh", greeting: "" },
    // Thêm khách mới tại đây
];
```

Hoặc thêm trực tiếp qua trang quản lý `index.html` (khách thêm bằng form được lưu trong trình duyệt).

### 3. Tạo link mời riêng cho từng khách

Mở trang quản lý `index.html`:

1. Danh sách khách mời hiển thị tự động từ `guests.js`
2. Bấm **📋 Copy** bên cạnh mỗi khách để copy link riêng
3. Bấm **📋 Copy Tất Cả Link** để copy toàn bộ
4. Bấm **➕ Thêm Khách Mời** để thêm khách mới

Link có dạng:
```
https://[domain-cua-ban]/wedding.html?to=Gia+đình+anh+Phát
```

### 4. Xem thử thiệp

Mở trực tiếp `wedding.html` hoặc thêm tham số `?to=Tên+Khách`:
```
wedding.html?to=Gia+đình+anh+Phát
```

## ✨ Tính năng

- ✅ **Phong bì 3D mở nắp thật** — animation lật nắp phong bì + tấm thiệp trượt ra
- ✅ **Cánh hoa rơi** — hiệu ứng petals nhẹ nhàng khi mở thiệp, không khí retro Sài Gòn
- ✅ Tên khách mời cá nhân hóa trên phong bì & thiệp
- ✅ Nhạc nền tự động phát khi mở thiệp (có nút bật/tắt)
- ✅ Đếm ngược đến ngày cưới
- ✅ Thông tin gia đình, sự kiện, lịch tháng có đánh dấu ngày cưới
- ✅ Album ảnh cưới với **lightbox điều hướng** (nút prev/next, vuốt trên mobile, phím mũi tên)
- ✅ **Nút chia sẻ thiệp** — Web Share API trên mobile, tự copy link trên desktop
- ✅ **Open Graph tags** — preview đẹp khi gửi link qua Zalo/Facebook/Messenger
- ✅ Favicon 囍 trên tab trình duyệt
- ✅ RSVP xác nhận tham dự
- ✅ Guestbook lời chúc
- ✅ Hộp quà mừng với mã VietQR (chú rể / cô dâu)
- ✅ Responsive trên mọi thiết bị
- ✅ Trang quản lý khách mời với nút copy link

## 🌐 Deploy lên server

Xem hướng dẫn chi tiết trong file **[DEPLOY.md](DEPLOY.md)** — bao gồm:

- Mua tên miền (Cloudflare, Namecheap, Mắt Bão, Tenten...)
- Deploy miễn phí qua **GitHub Pages** / **Netlify** / **Vercel** / **Cloudflare Pages**
- Trỏ DNS tên miền về website
- Checklist kiểm tra sau khi deploy

Deploy nhanh với Netlify (đã có sẵn `netlify.toml`):
1. Truy cập [app.netlify.com](https://app.netlify.com)
2. Kéo thả thư mục `wedding-invitation` vào trang → website live ngay
3. Gắn tên miền riêng trong **Domain settings**

## 📝 Ghi chú

- Guestbook & RSVP lưu trong `localStorage` của trình duyệt (mỗi khách xem sẽ thấy lời chúc của chính họ) — nếu cần lưu tập trung, hãy thay bằng Google Form hoặc backend
- Nhạc nền dùng từ Bensound (miễn phí) — có thể thay bằng file nhạc khác trong `config.js`
- **Open Graph tags** trong `wedding.html` đang dùng URL mẫu `https://your-domain.com` — sau khi deploy, hãy thay bằng tên miền thật để preview chia sẻ hoạt động đúng

---

© 2026 — Made with ❤️ for Bảo Trân & Minh Trí