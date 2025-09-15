import React from 'react';
import ManageStages from './ManageStages';
import ManageUsers from './ManageUsers'; // 1. Import component mới

const AdminDashboard = () => {
  return (
    <div>
      <h2>Trang Quản trị (Admin Dashboard)</h2>
      <hr />
      <ManageUsers /> {/* 2. Hiển thị component quản lý người dùng */}
      <ManageStages />
    </div>
  );
};

export default AdminDashboard;