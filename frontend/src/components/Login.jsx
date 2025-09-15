import React, { useState } from 'react';
import { useNavigate, Navigate } from 'react-router-dom';
import axios from 'axios';

const Login = ({ onLoginSuccess, user }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();

  if (user) {
    // Nếu đã đăng nhập, chuyển hướng dựa trên vai trò
    return <Navigate to={user.role === 'Admin' ? '/admin' : '/'} replace />;
  }

  const handleLogin = async () => {
    setError('');
    try {
      const response = await axios.post('http://localhost:5135/api/users/login', {
        email,
        password,
      });

      const loggedInUser = response.data.user;
      onLoginSuccess(loggedInUser);

      // CHUYỂN HƯỚNG DỰA TRÊN VAI TRÒ SAU KHI ĐĂNG NHẬP
      if (loggedInUser.role === 'Admin') {
        navigate('/admin');
      } else {
        navigate('/');
      }

    } catch (err) {
      setError(err.response?.data?.message || 'Đã có lỗi xảy ra. Vui lòng thử lại.');
    }
  };

  return (
    <div className="login-container">
      <h2>Đăng nhập</h2>
      <div className="form-group">
        <label htmlFor="email">Email</label>
        <input type="email" id="email" value={email} onChange={(e) => setEmail(e.target.value)} required />
      </div>
      <div className="form-group">
        <label htmlFor="password">Mật khẩu</label>
        <input type="password" id="password" value={password} onChange={(e) => setPassword(e.target.value)} required />
      </div>
      {error && <p className="error-message">{error}</p>}
      <button onClick={handleLogin} className="login-button">Đăng nhập</button>
    </div>
  );
};

export default Login;