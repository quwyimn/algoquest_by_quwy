#!/bin/bash

# Script để khởi động cả frontend và backend

echo "🚀 Khởi động AlgoQuest Development Environment..."

# Kiểm tra xem backend có đang chạy không
if ! curl -s http://localhost:5135/api/stages > /dev/null 2>&1; then
    echo "📡 Khởi động Backend..."
    cd backend-aspnet
    dotnet run &
    BACKEND_PID=$!
    cd ..
    
    # Đợi backend khởi động
    echo "⏳ Đợi backend khởi động..."
    sleep 5
else
    echo "✅ Backend đã chạy"
fi

# Kiểm tra xem frontend có đang chạy không
if ! curl -s http://localhost:5173 > /dev/null 2>&1; then
    echo "🎨 Khởi động Frontend..."
    cd frontend
    npm run dev &
    FRONTEND_PID=$!
    cd ..
else
    echo "✅ Frontend đã chạy"
fi

echo ""
echo "🎉 AlgoQuest đã sẵn sàng!"
echo "📱 Frontend: http://localhost:5173"
echo "🔧 Backend API: http://localhost:5135"
echo "📚 Swagger UI: http://localhost:5135/swagger"
echo ""
echo "Nhấn Ctrl+C để dừng tất cả services"

# Đợi user nhấn Ctrl+C
trap 'echo "🛑 Đang dừng services..."; kill $BACKEND_PID $FRONTEND_PID 2>/dev/null; exit' INT
wait
