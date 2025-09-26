#!/bin/bash

echo "🚀 Khởi động AlgoQuest Development Environment..."

# Kill any existing processes
echo "🧹 Dọn dẹp processes cũ..."
pkill -f "dotnet run" 2>/dev/null || true
pkill -f "npm run dev" 2>/dev/null || true
sleep 2

# Start Backend
echo "📡 Khởi động Backend..."
cd backend-aspnet
dotnet run > ../backend.log 2>&1 &
BACKEND_PID=$!
cd ..

echo "⏳ Đợi backend khởi động..."
sleep 8

# Check if backend started successfully
if curl -s http://localhost:5135/api/stages > /dev/null 2>&1; then
    echo "✅ Backend đã chạy thành công"
else
    echo "❌ Backend không khởi động được. Kiểm tra backend.log"
    exit 1
fi

# Start Frontend
echo "🌐 Khởi động Frontend..."
cd frontend
npm run dev > ../frontend.log 2>&1 &
FRONTEND_PID=$!
cd ..

echo "⏳ Đợi frontend khởi động..."
sleep 5

# Check if frontend started successfully
if curl -s http://localhost:5173 > /dev/null 2>&1; then
    echo "✅ Frontend đã chạy thành công"
else
    echo "❌ Frontend không khởi động được. Kiểm tra frontend.log"
    exit 1
fi

echo ""
echo "🎉 AlgoQuest đã sẵn sàng!"
echo "📱 Frontend: http://localhost:5173"
echo "🔧 Backend API: http://localhost:5135"
echo "📚 Swagger UI: http://localhost:5135/swagger"
echo ""
echo "📋 Test Accounts:"
echo "   User: test@test.com / test123"
echo "   Admin: admin@test.com / admin123"
echo ""
echo "Nhấn Ctrl+C để dừng tất cả services"

# Keep the script running until Ctrl+C is pressed
trap 'echo "Đang dừng các services..."; kill $BACKEND_PID $FRONTEND_PID 2>/dev/null; echo "Đã dừng."; exit 0' INT

wait $BACKEND_PID $FRONTEND_PID
