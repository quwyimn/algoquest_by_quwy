import React from 'react';
import { Navigate } from 'react-router-dom';

const AdminRoute = ({ user, children }) => {
  if (!user) {
    // Nếu chưa đăng nhập, về trang login
    return <Navigate to="/login" replace />;
  }

  if (user.role !== 'Admin') {
    // Nếu không phải Admin, về trang chủ
    return <Navigate to="/" replace />;
  }

  // Nếu là Admin, cho phép truy cập
  return children;
};

export default AdminRoute;