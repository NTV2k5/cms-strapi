# 🚀 Strapi CMS - Hướng dẫn Toàn diện cho Kỹ sư Software

Đây là bản tóm tắt tài liệu hướng dẫn nhanh nhằm giúp nắm bắt hệ thống Strapi 5 một cách nhanh chóng và hiệu quả nhất.

---

## 🌟 Giới thiệu về Strapi
Strapi là một **Headless CMS** mã nguồn mở dựa trên Node.js, cung cấp cho các nhà phát triển khả năng xây dựng, quản lý và phân phối nội dung thông qua API một cách linh hoạt. Với Strapi có thể tách biệt hoàn toàn phần quản trị nội dung (Backend) và phần hiển thị (Frontend).

---

## 🛠 Cài đặt & Khởi chạy (Quick Start)

### 1. Cài đặt dự án mới
```bash
npx create-strapi-app@latest my-project --quickstart
```
*Ghi chú: `--quickstart` sẽ tự động cài đặt SQLite làm cơ sở dữ liệu mặc định.*

### 2. Lệnh vận hành
- **Phát triển (Development):**
  ```bash
  npm run dev
  ```
- **Xây dựng Admin Panel (Build):**
  ```bash
  npm run build
  ```
- **Chạy Production:**
  ```bash
  npm run start
  ```

---

## 📁 Cấu trúc Thư mục Dự án

- `src/api`: Chứa mã nguồn cho các Content Type, Controller, Service và Router.
- `src/admin`: Tùy biến giao diện Admin panel.
- `src/extensions`: Chứa các plugin hoặc override cho các tính năng cốt lõi.
- `public/uploads`: Nơi lưu trữ file từ Media Library.
- `config/`: Các file cấu hình hệ thống (database, server, plugins,...).
- `types/`: Chứa các định nghĩa TypeScript (nếu sử dụng).

---

## 💎 Các tính năng Cốt lõi của Strapi 5

### 1. Content-type Builder
Công cụ trực quan để tạo mô hình dữ liệu (Schemas). 
- **Collection Types:** Cho dữ liệu lặp lại (ví dụ: Bài viết, Sản phẩm).
- **Single Types:** Cho dữ liệu duy nhất (ví dụ: Cấu hình Homepage, Cài đặt SEO).
- **Components:** Các cụm dữ liệu có thể tái sử dụng.

### 2. Content Manager
Giao diện quản trị cho người dùng cuối nhập liệu theo các mô hình đã tạo ở Content-type Builder.

### 3. Media Library
Quản lý tập trung các tài nguyên đa phương tiện (Hình ảnh, Video, PDF). Hỗ trợ tối ưu hóa hình ảnh và tích hợp cloud (AWS S3, Cloudinary).

### 4. Role-Based Access Control (RBAC)
Phân quyền chi tiết cho người dùng Admin (Admin, Author, Editor) và người dùng API.

---

## 📡 Truy vấn Dữ liệu (Content APIs)

Strapi tự động tạo các Endpoint.

### REST API
- **URL cơ bản:** `http://localhost:1337/api/<plural-api-id>`
- **Ví dụ:** `GET /api/articles`
- **Tham số:** Hỗ trợ `populate` (để lấy dữ liệu liên quan), `filters`, `sort`, và `pagination`.
  - Ví dụ: `GET /api/articles?populate=*&filters[title][$eq]=Hello`

### GraphQL API
Tích hợp thông qua Plugin GraphQL.
- **Endpoint:** `http://localhost:1337/graphql`
- **Đặc điểm:** Chỉ lấy những dữ liệu cần thiết, giảm thiểu Over-fetching.

---

## ⚙️ Tùy biến & Phát triển Nâng cao

### Backend Customization
Có thể ghi đè (override) hoặc mở rộng logic tại:
- **Controllers:** Xử lý logic nghiệp vụ.
- **Services:** Chứa logic nghiệp vụ có thể tái sử dụng.
- **Middlewares:** Can thiệp vào vòng đời Request/Response.
- **Lifecycle Hooks:** Tự động thực thi mã khi dữ liệu được Tạo, Cập nhật hoặc Xóa.

### Admin Panel Customization
Có thể thay đổi Logo, Theme hoặc thêm các Component tùy chỉnh vào giao diện quản trị thông qua thư mục `src/admin`.

---

## 💡 Kiến thức & Thực hành từ Dự án

Dưới đây là các kỹ thuật thực tế đã áp dụng trong quá trình xây dựng hệ thống:

### 1. Xây dựng Custom API (Custom Endpoint)
Khi các API mặc định của Strapi không đáp ứng đủ yêu cầu logic phức tạp, chúng ta cần tạo Custom API.
- **Controller Customization:** Mở rộng core controller bằng `factories.createCoreController` để thêm các action mới (ví dụ: `getLatest`).
- **Custom Route:** Tạo file route riêng (ví dụ: `01-custom-post.ts`) để định nghĩa endpoint mới như `/api/blog-lastest`. Việc đánh số `01-` giúp route này được ưu tiên load trước core routes.

### 2. Strapi 5 Document Service
Thay vì sử dụng `entityService` như ở các phiên bản cũ, Strapi 5 giới thiệu **Document Service API** mạnh mẽ hơn:
- Quản lý đồng thời bản nháp (Draft) và bản chính thức (Published).
- Cú pháp truy vấn tiêu chuẩn: `strapi.documents('api::post.post').findMany({ ... })`.
- Hỗ trợ tham số `status: 'published'` để đảm bảo chỉ lấy dữ liệu đã công khai.

### 3. API Security & Permissions
- **Auth Configuration:** Trong file route, cấu hình `auth: {}` để ràng buộc API custom vào hệ thống phân quyền của Strapi.
- **Permissions Plugin:** Luôn nhớ truy cập Admin Panel -> Settings -> Roles để cấp quyền cho action mới. Ngay cả khi bạn viết code đúng, API vẫn sẽ trả về lỗi 403 nếu chưa được tích chọn permission.

### 4. Tầm quan trọng của Populate & Filter
- **Populate:** Mặc định Strapi không trả về quan hệ (Author) hoặc Media (Images). Sử dụng `populate=*` hoặc cấu hình chi tiết để lấy đúng dữ liệu cần thiết, tránh Over-fetching.
- **Filtering:** Sử dụng chuẩn query của Strapi (ví dụ: `filters[slug][$eq]=...`) giúp việc tìm kiếm dữ liệu trở nên an toàn và hiệu quả ngay từ tầng database.

### 5. Tích hợp Frontend (Next.js)
- Xây dựng các hàm helper trong `lib/strapi.tsx` để đóng gói logic gọi API, giúp code ở Page component sạch sẽ hơn.
- Xử lý dữ liệu động: Ví dụ như cập nhật tiêu đề section dựa trên số lượng dữ liệu thực tế trả về từ API (`latestPosts.length`).


## 🚀 Triển khai (Deployment)

Strapi có thể được triển khai trên nhiều nền tảng:
- **Cloud:** Strapi Cloud (Khuyên dùng cho sự đơn giản).
- **VPS/Phần cứng riêng:** Ubuntu, Docker, v.v.
- **PaaS:** Heroku, Digital Ocean, Render.

> [!IMPORTANT]
> Luôn cấu hình **Environment Variables (`.env`)** cho Database và JWT Secret trước khi deploy lên môi trường Production.

---

## 📚 Tài liệu Tham khảo
- [Strapi Documentation](https://docs.strapi.io)
- [Strapi GitHub Repository](https://github.com/strapi/strapi)
- [Strapi Blog & Tutorials](https://strapi.io/blog)

---
*Bản tóm tắt được viết bởi Senior AI Engineer dựa trên phiên bản Strapi 5.*
