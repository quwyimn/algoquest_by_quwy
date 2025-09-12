import React from 'react';
import { Navigate } from 'react-router-dom';

const ProtectedRoute = ({ user, children }) => {
  if (!user) {
    // Nếu không có thông tin người dùng, chuyển hướng về trang đăng nhập
    return <Navigate to="/login" replace />;
  }

  // Nếu đã có thông tin người dùng, hiển thị nội dung được bọc bên trong
  return children;
};

export default ProtectedRoute;