import React, { useState, useEffect } from 'react';
import axios from 'axios';

const ManageUsers = () => {
  const [users, setUsers] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const response = await axios.get('http://localhost:5135/api/users');
        if (Array.isArray(response.data)) {
          setUsers(response.data);
        } else {
          setUsers([]);
        }
      } catch (error) {
        console.error("Lỗi khi tải danh sách người dùng:", error);
      } finally {
        setIsLoading(false);
      }
    };
    fetchUsers();
  }, []);

  if (isLoading) return <p>Đang tải danh sách người dùng...</p>;

  return (
    <div className="admin-section">
      <h3>Quản lý Người dùng</h3>
      <table className="admin-table">
        <thead>
          <tr>
            <th>Tên đăng nhập</th>
            <th>Email</th>
            <th>Vai trò</th>
            <th>XP</th>
          </tr>
        </thead>
        <tbody>
          {users.length > 0 ? (
            users.map(user => (
              <tr key={user.id}>
                <td>{user.username}</td>
                <td>{user.email}</td>
                <td>{user.role}</td>
                <td>{user.xp}</td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan="4">Không có người dùng nào.</td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
};

export default ManageUsers;