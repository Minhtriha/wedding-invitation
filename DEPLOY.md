# 🌐 Hướng Dẫn Mua Tên Miền & Deploy Website

Hướng dẫn chi tiết từ A → Z để đưa website thiệp cưới của bạn lên internet với **tên miền riêng** của mình.

---

## 📌 Tổng quan

Dự án này là **web tĩnh** (chỉ HTML/CSS/JS, không cần backend) nên bạn:
- **Chỉ cần mua tên miền** (~200–300k/năm cho `.com`)
- **Hosting miễn phí** dùng GitHub Pages / Netlify / Vercel / Cloudflare Pages
- Chỉ bỏ tiền hosting nếu bạn muốn tự quản lý server

---

## BƯỚC 1: Mua tên miền (Domain)

### 1.1 Chọn nhà cung cấp

| Nhà cung cấp | Loại | Giá tham khảo | Ghi chú |
|---|---|---|---|
| **Cloudflare Registrar** | Quốc tế | ~$10/năm (giá gốc) | Giá tốt nhất, không phí tăng giá |
| **Namecheap** | Quốc tế | ~$10–15/năm | Phổ biến, hỗ trợ 24/7 |
| **GoDaddy** | Quốc tế | ~$12–18/năm (khuyến mãi năm đầu) | Giá gia hạn cao hơn |
| **Mắt Bão / Tenten / PA VN** | Việt Nam | ~250k–350k/năm | Thanh toán chuyển khoản/MoMo, hỗ trợ VN |

> 💡 **Mẹo:** Nếu bạn mua tên miền từ nhà cung cấp nước ngoài, thường phải dùng thẻ Visa/Mastercard. Nếu không có thẻ quốc tế, hãy dùng nhà cung cấp Việt Nam.

### 1.2 Các bước mua

1. Truy cập website nhà cung cấp tên miền (ví dụ: `namecheap.com` hoặc `matbao.com`)
2. Gõ tên miền bạn muốn vào ô tìm kiếm, ví dụ: `tinhyeu-btmt.com`
3. Chọn đuôi miền phù hợp:
   - `.com` — phổ biến nhất, chuyên nghiệp
   - `.info` / `.me` — rẻ hơn
   - `.love` / `.wedding` — phù hợp chủ đề đám cưới (giá cao)
4. Bấm **Add to Cart** → bấm **Checkout**
5. Điền thông tin thanh toán (thẻ hoặc chuyển khoản)
6. Hoàn tất → kiểm tra email kích hoạt tên miền

### 1.3 Nhận thông tin DNS

Sau khi mua, bạn cần lấy **Nameserver** (hoặc cổng quản lý DNS) của nhà cung cấp. Ví dụ:
- Cloudflare: cần bạn đổi nameserver của miền về `alice.ns.cloudflare.com` + `bob.ns.cloudflare.com`
- Namecheap: quản lý DNS ngay trong bảng điều khiển
- Nhà VN: thường có sẳn giao diện quản lý DNS trong tài khoản

---

## BƯỚC 2: Deploy website lên Internet

### Lựa chọn A — GitHub Pages (miễn phí, phù hợp nếu đã có repo GitHub)

1. **Chuẩn bị dự án để đẩy lên Git** (nếu chưa có repo):

   ```bash
   cd wedding-invitation
   git init
   git add .
   git commit -m "Thiệp cưới Bảo Trân & Minh Trí"
   git branch -M main
   git remote add origin https://github.com/your-username/wedding-invitation.git
   git push -u origin main
   ```

   > 👉 Nếu chưa tạo repo trên GitHub, vào github.com → New repository → đặt tên `wedding-invitation` → Create, rồi dùng `git remote add origin` như trên.

2. **Bật GitHub Pages**:
   - Vào GitHub → repo của bạn → **Settings**
   - Kéo xuống mục **Pages** (menu bên trái)
   - Mục **Build and deployment**:
     - **Source**: Chọn *Deploy from a branch*
     - **Branch**: chọn `main` → thư mục `/ (root)` → bấm **Save**
3. **Website live tại**:
   - Trang quản lý: `https://your-username.github.io/wedding-invitation/`
   - Thiệp cưới: `https://your-username.github.io/wedding-invitation/wedding.html`
   - Đợi 1–3 phút cho lần deploy đầu tiên

#### 🔗 Gắn tên miền riêng vào GitHub Pages

1. Trong **Settings → Pages**, mục *Custom domain*, gõ tên miền bạn đã mua (không `https://`, ví dụ: `bao-tran-minh-tri.com`) → bấm **Save**
2. **Cấu hình DNS** trên trang quản lý tên miền của bạn (xem Bước 3 bên dưới)
3. Sau khi DNS cập nhật, GitHub tự động cấu hình **Enforce HTTPS** (tick vào).

### Lựa chọn B — Netlify (miễn phí, kéo-thả siêu dễ)

> 💡 Đây là cách **đơn giản nhất** — không cần Git, không cần dòng lệnh.

1. Truy cập [app.netlify.com](https://app.netlify.com) → đăng ký bằng tài khoản GitHub
2. Kéo cả **thư mục** `wedding-invitation` vào trang web, hoặc:
   - **Add new site** → **Import existing project** → kết nối GitHub repo → chọn repo → **Deploy**
3. Deplyxong bạn có link `random-name.netlify.app`
4. **Gắn tên miền riêng**:
   - Vào **Domain settings** → **Add a domain** → nhập tên miền đã mua
   - Netlify sẽ hiển thị 2 cách:
     - **Cách 1 (đơn giản)**: Dùng *Netlify DNS* → bạn đổi nameserver của tên miền về `dns1.p01.nsone.net` + `dns2.p01.nsone.net`
     - **Cách 2**: Thêm DNS record `A` trỏ về IP của site Netlify (hiển thị ngay trên trang), hoặc một record `CNAME` trỏ `www` về `randomly.netlify.app`
5. HTTPS tự động (Let's Encrypt) — không cần cấu hình gì thêm.

### Lựa chọn C — Vercel / Cloudflare Pages (tương tự Netlify)

- **Vercel**: import từ GitHub repo → deploy (giống Netlify, tự động HTTPS, thêm domain tương tự)
- **Cloudflare Pages**: free với DAX tốt, nhập repo → website live → gắn domain qua Cloudflare DNS.

### Lựa chọn D — Hosting trả phí (chỉ cần khi muốn tự quản lý)

1. Mua gói hosting shared tại nhà cung cấp VN (Mắt Băng, Tenten, iNET) hoặc VPS
2. Nhận thông tin IP server + đường link quản trị cPanel/hPanel
3. **Cấu hình DNS**: thêm record `A` trỏ tên miền về IP hosting
4. **Upload file qua**:
   - **File Manager** trong cPanel: vào thư mục `public_html` → Upload tất cả file trong thư mục `wedding-invitation`
   - Hoặc **FileZilla** (FTP): host, tài khoản FTP, password → kéo cả thư mục vào `public_html`
5. Mở trình duyệt gõ tên miền → website live. HTTPS cần setup SSL (Let's Encrypt) trong cPanel.

---

## BƯỚC 3: Trỏ DNS tên miền (áp dụng cho mọi nền tảng)

Sau khi website đã chạy trên một nền tảng, bạn cần `trỏ tên miền` về nó. Tuỳ nền tảng:

| Nền tảng | Loại record | Giá trị |
|---|---|---|
| **GitHub Pages** | `A` (4 IP) | `185.199.108.153`<br>`185.199.109.153`<br>`185.199.110.153`<br>`185.199.111.153` |
| **GitHub Pages** | `CNAME` | `www` → `your-username.github.io` |
| **Netlify** | `A` | IP hiển thị trong Netlify (vd `75.2.60.5`) |
| **Netlify DNS** | – | Đổi nameserver → `dns1.netlify.app` + `dns2.netlify.app` |
| **Vercel** | `A` | IP trong trang Domain của Vercel |
| **Cloudflare Pages** | `CNAME` | `your-domain.com` → `<project>.pages.dev`; bật **Proxy ON** |

### Cách thực hiện (tuỳ nhà cung cấp tên miền):

1. Đăng nhập bảng quản lý tên miền tại nhà cung cấp (hoặc Cloudflare Dashboard nếu dùng Cloudflare)
2. Tìm mục **DNS** hoặc **DNS Management / Zone**
3. **Thêm record mới** theo bảng trên:
   - Type: `A` (hoặc `CNAME`)
   - Host/Name: `@` (cho tên miền gốc) hoặc `www`
   - Value: IP / hostname tương ứng
   - TTL: mặc định 3600 (hoặc auto)
4. Save → đợi DNS cập nhật (vài phút → 24h)
5. Kiểm tra website bằng cách gõ tên miền vào trình duyệt

---

## 🧪 Kiểm tra sau khi deploy

- [ ] Truy cập `https://ten-mien-cua-ban.com/wedding.html?to=Gia+đình+anh+Phát` — thiệp hiển thị đúng tên khách
- [ ] Nhạc nền phát khi mở thiệp
- [ ] Ảnh cưới / gallery hiển thị (nếu có thêm ảnh)
- [ ] HTTPS hoạt động (ổ khóa xanh trên thanh địa chỉ)
- [ ] Trang quản lý `index.html` có thể copy link từng khách

> Cảnh báo: Nếu trong `config.js` vẫn để đường dẫn kiểu `C:/Users/...` thì ảnh/nhạc sẽ bị hỏng khi deploy. Hãy đảm bảo dùng đường dẫn tương đối như `images/hero.jpg` và file `sounds.mp3` nằm cùng thư mục.

---

## 📋 Tóm tắt chi phí

| Hạng mục | Chi phí |
|---|---|
| Tên miền `.com` | ~200–350k/năm |
| Hosting (GitHub Pages / Netlify) | 0đ (miễn phí) |
| `sounds.mp3` | Có sẵn trong dự án |
| Ảnh cưới | Bạn phải tự copy vào thư mục `images/` |

**Tổng cộng tối thiểu: ~200–350k/năm** cho cả trang web thiệp cưới trên internet.

---

## ❓ Câu hỏi thường gặp (FAQ)

**Q: Tên miền `.com` bị bận thì sao?**
A: Thử các đuôi khác: `.info`, `.me`, `.net`, hoặc đổi tên một chút (thêm từ như `tinh-yeu`, `wedding`).

**Q: Không có thẻ tín dụng quốc tế mua tên miền nước ngoài?**
Dùng nhà cung cấp Việt Nam (Mắt Băng, Tenten, PA VN...) — thanh toán bằng chuyển khoản / MoMo.

**Q: GitHub Pages website có cần HTTPS không?**
Có, tự động bật sau khi bạn bật *Enforce HTTPS*; nếu dùng Netlify/Vercel/Cloudflare, HTTPS tự động.

**Q: Thay đổi file rồi làm sao cập nhật lên website?**
- **GitHub Pages**: `git add . && git commit -m "update" && git push` — GitHub tự deploy lại
- **Netlify**: đăng nhập trang Netlify → *Deploys* → *Deploy site* (hoặc nối Git để tự động)
- **FTP**: upload lại file đã sửa qua FTP

---

© 2026 — Bảo Trân & Minh Trí | Made with ❤️