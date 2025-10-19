# Website Bang Hoa Sơn

Đây là website giới thiệu về Bang Hoa Sơn với chức năng mua bán vật phẩm trong game.

## Tính Năng Chính

### 1. Phần Giới Thiệu
- Giới thiệu về lịch sử hình thành của Bang Hoa Sơn
- Tôn chỉ hoạt động của bang hội
- Cơ cấu tổ chức
- Các tính năng nổi bật của bang

### 2. Phần Mua Bán
- Hệ thống mua bán vật phẩm với 4 danh mục:
  - Vật Phẩm (đan dược, ngọc bội, thảo dược)
  - Vũ Khí (kiếm, đao, thương)
  - Trang Bị (áo giáp, mũ, giày)
  - Kim Nguyên Bảo (tiền tệ trong game)

### 3. Các Tính Năng Khác
- Menu điều hướng responsive
- Tin tức và sự kiện của bang
- Form liên hệ
- Nút mua hàng với xác nhận
- Hiệu ứng scroll mượt mà

## Cấu Trúc File

```
/
├── index.html      # File HTML chính
├── styles.css      # File CSS định dạng
├── script.js       # File JavaScript tương tác
└── README.md       # File hướng dẫn
```

## Hướng Dẫn Sử Dụng

### Xem Website
1. Mở file `index.html` trong trình duyệt web
2. Website sẽ hiển thị trang chủ với menu điều hướng
3. Sử dụng menu để chuyển giữa các phần:
   - Trang Chủ: Hero section giới thiệu chung
   - Giới Thiệu: Thông tin chi tiết về Bang Hoa Sơn
   - Mua Bán: Khu giao dịch vật phẩm
   - Tin Tức: Các tin tức và sự kiện
   - Liên Hệ: Form gửi tin nhắn

### Sử Dụng Chức Năng Mua Bán
1. Chọn tab danh mục vật phẩm (Vật Phẩm, Vũ Khí, Trang Bị, Kim Nguyên Bảo)
2. Xem thông tin chi tiết của từng vật phẩm
3. Nhấn nút "Mua Ngay" để mua vật phẩm
4. Xác nhận mua hàng trong popup hiện ra
5. Nhận thông báo mua hàng thành công

### Tương Tác Khác
- Sử dụng menu trên điện thoại: nhấn biểu tượng 3 gạch
- Nút "Scroll to Top" ở góc phải dưới để quay về đầu trang
- Form liên hệ để gửi tin nhắn cho quản trị viên

## Tùy Chỉnh

### Thay Đổi Logo và Thông Tin
- Mở file `index.html`
- Tìm đến phần `<header>` và thay đổi nội dung trong phần `.logo`
- Cập nhật thông tin liên hệ trong phần `#lien-he`

### Thêm/Sửa Vật Phẩm Mua Bán
- Mở file `index.html`
- Tìm đến phần `#mua-ban`
- Thêm hoặc sửa các `.item-card` trong các tab tương ứng

### Tùy Chỉnh Màu Sắc
- Mở file `styles.css`
- Tìm đến các biến màu chính (thường là `#8B4513` cho màu nâu của Hoa Sơn)
- Thay đổi các giá trị màu theo ý muốn

### Thêm Tính Năng Mới
- Mở file `script.js`
- Thêm các function mới để xử lý tương tác
- Cập nhật HTML và CSS tương ứng nếu cần

## Tích Hợp Với Discord

Để tích hợp lấy dữ liệu mua bán từ Discord, bạn cần:

1. Tạo Discord Bot với quyền đọc tin nhắn
2. Lấy API Token từ Discord Developer Portal
3. Thêm code JavaScript để gọi API và lấy dữ liệu
4. Cập nhật giao diện để hiển thị dữ liệu thực tế từ Discord

Ví dụ code để lấy dữ liệu từ Discord:
```javascript
// Thêm vào file script.js
async function fetchDiscordData() {
    const response = await fetch('YOUR_DISCORD_API_ENDPOINT');
    const data = await response.json();

    // Xử lý dữ liệu và cập nhật giao diện
    updateMarketplace(data);
}

function updateMarketplace(data) {
    // Code để cập nhật phần mua bán với dữ liệu từ Discord
}
```

## Trình Duyệt Hỗ Trợ

Website hỗ trợ các trình duyệt hiện đại:
- Chrome (phiên bản mới nhất)
- Firefox (phiên bản mới nhất)
- Safari (phiên bản mới nhất)
- Edge (phiên bản mới nhất)

## Responsive Design

Website được thiết kế responsive, hỗ trợ:
- Desktop (màn hình lớn)
- Tablet (màn hình trung bình)
- Mobile (màn hình nhỏ)

## Liên Hệ

Nếu có câu hỏi hoặc cần hỗ trợ, vui lòng liên hệ:
- Email: info@hoason.vn
- Discord: discord.gg/hoason
- Hotline: 1900-1234

## Bản Quyền

© 2025 Bang Hoa Sơn. Tất cả quyền được bảo lưu.
