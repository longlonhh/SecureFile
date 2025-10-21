# Hướng dẫn cài đặt và sửa lỗi "không lưu tài khoản người dùng"

## Vấn đề đã được xác định
Project hiện tại đang sử dụng localStorage để lưu trữ dữ liệu thay vì kết nối với database thật. Điều này khiến tài khoản người dùng không được lưu trữ bền vững.

## Các thay đổi đã thực hiện

### 1. Tạo API Service (`client/src/services/api.js`)
- Tạo service để gọi API backend
- Hỗ trợ authentication với JWT token
- Các API: register, login, getCurrentUser, updateProfile, logout

### 2. Cập nhật LoginPage (`client/src/pages/LoginPage.js`)
- Thay thế mock data bằng API calls thật
- Sử dụng `api.login()` để đăng nhập
- Lưu JWT token vào localStorage

### 3. Cập nhật RegisterPage (`client/src/pages/RegisterPage.js`)
- Sử dụng `api.register()` để đăng ký tài khoản
- Gửi dữ liệu đến backend thay vì lưu vào localStorage

### 4. Cập nhật App.js (`client/src/App.js`)
- Loại bỏ logic localStorage cho user management
- Sử dụng API để kiểm tra authentication
- Thêm loading state

## Cài đặt MongoDB

### Cách 1: Cài đặt MongoDB Community Server
1. Tải MongoDB Community Server từ: https://www.mongodb.com/try/download/community
2. Cài đặt với cấu hình mặc định
3. Khởi động MongoDB service

### Cách 2: Sử dụng MongoDB Atlas (Cloud)
1. Tạo tài khoản tại: https://www.mongodb.com/atlas
2. Tạo cluster miễn phí
3. Lấy connection string
4. Cập nhật file `.env` trong thư mục `server`

## Cấu hình Environment Variables

### Server (.env trong thư mục server)
```env
# Database
MONGO_URI=mongodb://localhost:27017
# Hoặc sử dụng MongoDB Atlas:
# MONGO_URI=mongodb+srv://username:password@cluster.mongodb.net

DB_NAME=securefile_db

# JWT
JWT_SECRET=your-super-secret-jwt-key-here-change-this-in-production

# Server
PORT=5000
CLIENT_URL=http://localhost:3000

# File Upload
MAX_FILE_SIZE=100MB
UPLOAD_PATH=./uploads
```

### Client (.env trong thư mục client)
```env
REACT_APP_API_URL=http://localhost:5000/api
```

## Khởi động ứng dụng

### 1. Khởi động MongoDB
```bash
# Nếu cài đặt local MongoDB
mongod

# Hoặc sử dụng MongoDB service (Windows)
net start MongoDB
```

### 2. Khởi động Server
```bash
cd server
npm install
npm start
```

### 3. Khởi động Client
```bash
cd client
npm install
npm start
```

## Kiểm tra hoạt động

1. Mở trình duyệt tại `http://localhost:3000`
2. Thử đăng ký tài khoản mới
3. Đăng nhập với tài khoản vừa tạo
4. Kiểm tra database để xác nhận dữ liệu đã được lưu

## Lưu ý quan trọng

- Đảm bảo MongoDB đang chạy trước khi khởi động server
- Kiểm tra port 5000 và 3000 không bị chiếm dụng
- Nếu sử dụng MongoDB Atlas, cập nhật MONGO_URI trong file .env
- JWT_SECRET nên được thay đổi trong môi trường production

## Troubleshooting

### Lỗi kết nối MongoDB
- Kiểm tra MongoDB service có đang chạy không
- Kiểm tra MONGO_URI trong file .env
- Kiểm tra firewall settings

### Lỗi CORS
- Đảm bảo CLIENT_URL trong server/.env đúng
- Kiểm tra CORS configuration trong server/app.js

### Lỗi JWT
- Kiểm tra JWT_SECRET trong file .env
- Đảm bảo token được gửi đúng format trong header
