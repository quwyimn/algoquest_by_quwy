import React from 'react';
import ManageStages from './ManageStages'; // 1. Import component mới

const AdminDashboard = () => {
  return (
    <div>
      <h2>Trang Quản trị (Admin Dashboard)</h2>
      <hr />
      <ManageStages /> {/* 2. Hiển thị component quản lý màn chơi */}
      {/* Chúng ta sẽ thêm component quản lý câu đố vào đây sau */}
    </div>
  );
};

export default AdminDashboard;