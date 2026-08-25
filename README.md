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
- ✅ **2 loại thiệp theo bên** — nhà trai (19.09.2026) / nhà gái (13.09.2026): ngày đãi tiệc, địa điểm, bản đồ và vị trí card thông tin tự đổi theo khách
- ✅ **Tùy chọn ẩn QR/STK mừng cưới** cho từng khách (`showBankQr: false`)
- ✅ Responsive trên mọi thiết bị
- ✅ Trang quản lý khách mời với nút copy link

## 👰🤵 Thiệp theo bên (nhà trai / nhà gái) & ẩn QR

Trong `guests.js`, mỗi khách có thể thêm 2 trường tùy chọn:

```js
{ name: "Gia đình chị Hà", slug: "chi-ha", side: "bride", showBankQr: false }
```

- `side`: `"groom"` (nhà trai — mặc định) hoặc `"bride"` (nhà gái). Khách bên nhà gái sẽ thấy:
  - Ngày đãi tiệc **13.09.2026** (nhà trai: 19.09.2026) trên phong bì, mục sự kiện và đồng hồ đếm ngược
  - Địa điểm + bản đồ riêng của bên đó (cấu hình tại `WEDDING_CONFIG.sides.bride.reception` trong `config.js`)
  - Card Nhà Gái được đưa lên trước card Nhà Trai
- `showBankQr: false`: ẩn toàn bộ QR + số tài khoản trong Hộp Quà Mừng cho khách này (hiện lời nhắn thay thế). Bỏ qua = hiện bình thường.
- Không có tham số `?to=` → thiệp hiển thị như mặc định (bên nhà trai).


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

## 📊 Thống kê truy cập (Google Analytics 4 + IP/Location)

Website có sẵn hệ thống ghi nhận thống kê qua **Google Analytics 4** (miễn phí), cho phép xem tập trung:

- **Lượt truy cập** thiệp (số người xem, thời gian, thiết bị)
- **Lượt mở thiệp** (`open_invitation`)
- **Lượt xác nhận tham dự — RSVP** (`rsvp_submit`, kèm tên + số người)
- **Lượt gửi lời chúc** (`wish_send`, kèm tên người gửi)
- **IP / quốc gia / thành phố** của khách xem (`visitor_info`, kèm tên khách từ link `?to=`)

### Cách bật (chỉ mất ~5 phút):

1. Truy cập [analytics.google.com](https://analytics.google.com) → đăng nhập Google account
2. **Admin (⚙️) → Create Property** → đặt tên (VD: `Wedding Bao Tran & Minh Tri`) → Create
3. Chọn platform **Web** → nhập `https://btranmtri-wedding.cloud` → **Create stream**
4. Copy **Measurement ID** (dạng `G-XXXXXXXXXX`)
5. Mở file `config.js`, dán vào:
   ```js
   analytics: {
       gaMeasurementId: "G-XXXXXXXXXX",  // ← dán ID của bạn vào đây
       trackVisitorInfo: true,
       geoApiUrl: "https://ipwho.is/"
   }
   ```
6. Commit & push lên GitHub → xong! Website tự động gửi dữ liệu.

### Xem dữ liệu trên GA4:

| Muốn xem | Vào mục |
|---|---|
| Tổng lượt truy cập theo ngày | **Reports → Engagement → Overview** |
| Ai mở thiệp | **Reports → Engagement → Events** → chọn `open_invitation` |
| RSVP + lời chúc | **Events** → `rsvp_submit` / `wish_send` |
| IP / quốc gia / thành phố | **DebugView** hoặc **Events** → `visitor_info` |

> 💡 **Mẹo:** Để thấy được giá trị `guest_name`, `visitor_city`... trong báo cáo, vào **Admin → Custom definitions → Create custom dimension** và tạo dimension tương ứng với từng tham số sự kiện.
>
> ⚠️ Nếu `gaMeasurementId` để trống, toàn bộ tính năng thống kê tự tắt — website vẫn chạy bình thường, không gây lỗi.

## 📝 Xem lời chúc + Quản lý khách qua Google Sheet

Một Apps Script duy nhất lo cả 2 việc: **nhận lời chúc** và **lưu danh sách khách
thêm từ trang quản lý** (dùng được ngay trên điện thoại, không cần máy tính).

### Bước 1: Tạo Google Sheet tại [sheets.new](https://sheets.new)

### Bước 2: Extensions → Apps Script → xóa code mẫu, dán toàn bộ:

```javascript
// ===== LỜI CHÚC =====
function doPost(e) {
  const ss = SpreadsheetApp.getActiveSpreadsheet();
  const d = JSON.parse(e.postData.contents);

  if (d.action === 'wish') {
    const sh = ss.getSheetByName('LoiChuc') || ss.insertSheet('LoiChuc');
    if (sh.getLastRow() === 0) sh.appendRow(['Thời gian', 'Tên khách', 'Lời chúc']);
    sh.appendRow([d.time, d.name, d.content]);

  } else if (d.action === 'addGuest' || d.action === 'setGuest') {
    const sh = getGuestSheet(ss);
    const data = sh.getDataRange().getValues();
    for (let i = 1; i < data.length; i++) {
      if (data[i][0] === d.name) { // đã có -> cập nhật
        if (d.side !== undefined) sh.getRange(i + 1, 2).setValue(d.side);
        if (d.showBankQr !== undefined) sh.getRange(i + 1, 3).setValue(d.showBankQr ? '' : 'ẨN');
        return ContentService.createTextOutput('OK');
      }
    }
    sh.appendRow([d.name, d.side || '', d.showBankQr === false ? 'ẨN' : '']);

  } else if (d.action === 'deleteGuest') {
    const sh = getGuestSheet(ss);
    const data = sh.getDataRange().getValues();
    for (let i = data.length - 1; i >= 1; i--) {
      if (data[i][0] === d.name) sh.deleteRow(i + 1);
    }
  }
  return ContentService.createTextOutput('OK');
}

function getGuestSheet(ss) {
  const sh = ss.getSheetByName('KhachMoi') || ss.insertSheet('KhachMoi');
  if (sh.getLastRow() === 0) sh.appendRow(['Tên', 'Bên', 'Ghi chú QR']);
  return sh;
}

// ===== DANH SÁCH KHÁCH cho thiệp + trang quản lý đọc =====
function doGet(e) {
  const ss = SpreadsheetApp.getActiveSpreadsheet();
  const sh = ss.getSheetByName('KhachMoi');
  if (!sh || e.parameter.action !== 'guests') {
    return ContentService.createTextOutput('[]').setMimeType(ContentService.MimeType.JSON);
  }
  const out = [];
  const hideQr = [];
  const data = sh.getDataRange().getValues();
  for (let i = 1; i < data.length; i++) {
    out.push({
      name: String(data[i][0]),
      side: String(data[i][1] || '').toLowerCase() === 'bride' ? 'bride' : 'groom',
      showBankQr: String(data[i][2]).indexOf('ẨN') === -1
    });
  }
  return ContentService.createTextOutput(JSON.stringify(out))
         .setMimeType(ContentService.MimeType.JSON);
}
```

### Bước 3: Deploy → New deployment → Web app
- Execute as: **Me** — Who has access: **Anyone**
- Copy **Web app URL** và dán vào `config.js`:

```js
guestbook: {
    googleSheetUrl: "https://script.google.com/macros/s/XXXX/exec"
}
```

### Cách hoạt động sau khi cấu hình
| Thao tác | Kết quả |
|---|---|
| Thêm khách trên trang quản lý (kể cả điện thoại) | Khách lưu vào Sheet "KhachMoi" → thiệp mọi thiết bị hiển thị đúng tên |
| Đổi bên / ẩn QR của khách | Cập nhật lên Sheet |
| Xóa khách | Xóa khỏi Sheet |
| Khách gửi lời chúc | Lưu vào Sheet "LoiChuc" |

> 💡 File `guests.js` vẫn là danh sách gốc dự phòng khi mạng lỗi/không tải được Sheet.

## 📝 Ghi chú

- Guestbook & RSVP lưu trong `localStorage` của trình duyệt (mỗi khách xem sẽ thấy lời chúc của chính họ) — dữ liệu cũng được gửi lên GA4 để bạn xem tập trung
- Nhạc nền dùng từ Bensound (miễn phí) — có thể thay bằng file nhạc khác trong `config.js`
- Open Graph tags đã trỏ về tên miền thật `https://btranmtri-wedding.cloud` — preview chia sẻ Zalo/Messenger hoạt động khi HTTPS của GitHub Pages đã sẵn sàng (ổ khóa xanh)

---

© 2026 — Made with ❤️ for Bảo Trân & Minh Trí