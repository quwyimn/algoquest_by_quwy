# 🔧 Troubleshooting Guide

## ❌ Lỗi CORS (Cross-Origin Request Blocked)

### Nguyên nhân:
- Frontend (port 5173) và Backend (port 5135) chạy trên port khác nhau
- Browser chặn request do Same Origin Policy

### ✅ Giải pháp:

#### 1. Khởi động Backend trước:
```bash
cd backend-aspnet
dotnet run
```

#### 2. Khởi động Frontend:
```bash
cd frontend
npm run dev
```

#### 3. Hoặc sử dụng script tự động:
```bash
./start-dev.sh
```

### 🔍 Kiểm tra Backend có chạy:
- Truy cập: http://localhost:5135/swagger
- Hoặc: http://localhost:5135/api/stages

### 🔍 Kiểm tra Frontend có chạy:
- Truy cập: http://localhost:5173

## ❌ Layout không căn giữa

### ✅ Đã sửa:
- Thêm `min-height: calc(100vh - 80px)` cho main
- Thêm `min-height: 100%` cho containers
- Sử dụng class CSS đúng cách

## 🚀 Khởi động nhanh

### Option 1: Script tự động
```bash
./start-dev.sh
```

### Option 2: Manual
```bash
# Terminal 1 - Backend
cd backend-aspnet && dotnet run

# Terminal 2 - Frontend  
cd frontend && npm run dev
```

## 🔧 Các lỗi thường gặp

### 1. Port đã được sử dụng
```bash
# Tìm process sử dụng port
lsof -i :5173
lsof -i :5135

# Kill process
kill -9 <PID>
```

### 2. MongoDB không kết nối được
- Kiểm tra MongoDB có chạy không
- Kiểm tra connection string trong appsettings.json

### 3. Node modules thiếu
```bash
cd frontend
npm install
```

### 4. .NET dependencies thiếu
```bash
cd backend-aspnet
dotnet restore
```

## 📱 Test trên mobile

### 1. Tìm IP của máy:
```bash
ip addr show | grep inet
```

### 2. Khởi động với host:
```bash
cd frontend
npm run dev -- --host
```

### 3. Truy cập từ mobile:
```
http://<YOUR_IP>:5173
```

## 🎯 Performance Tips

1. **Chrome DevTools**: F12 để debug
2. **Network Tab**: Kiểm tra API calls
3. **Console**: Xem lỗi JavaScript
4. **Lighthouse**: Test performance

---

**Nếu vẫn gặp lỗi, hãy:**
1. Restart cả frontend và backend
2. Clear browser cache
3. Kiểm tra console logs
4. Đảm bảo MongoDB đang chạy
