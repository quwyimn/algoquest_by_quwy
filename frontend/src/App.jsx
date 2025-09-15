import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, Link, Navigate } from 'react-router-dom';
import './App.css';

import GameMap from './components/GameMap';
import StageDetail from './components/StageDetail';
import QuizPlayer from './components/QuizPlayer';
import Login from './components/Login';
import Register from './components/Register';
import AdminDashboard from './components/AdminDashboard';
import AdminRoute from './components/AdminRoute';

function App() {
  const [user, setUser] = useState(null);

  useEffect(() => {
    const loggedInUser = localStorage.getItem("user");
    if (loggedInUser) {
      const foundUser = JSON.parse(loggedInUser);
      setUser(foundUser);
    }
  }, []);

  const handleLoginSuccess = (userData) => {
    localStorage.setItem('user', JSON.stringify(userData));
    setUser(userData);
  };

  const handleLogout = () => {
    localStorage.removeItem('user');
    setUser(null);
  };

  return (
    <Router>
      <div className="App">
        <header className="App-header">
          <h1>AlgoQuest: Chuyến Phiêu Lưu Giải Thuật</h1>
          <nav style={{ display: 'flex', gap: '20px', alignItems: 'center' }}>
            {user ? (
              <>
                {/* THÊM LẠI LOGIC HIỂN THỊ LINK ADMIN Ở ĐÂY */}
                {user.role === 'Admin' && (
                  <Link to="/admin" style={{ color: 'white', fontWeight: 'bold' }}>
                    Trang Admin
                  </Link>
                )}
                <span>Xin chào, {user.username}!</span>
                <button onClick={handleLogout} style={{ background: 'none', border: 'none', color: 'white', cursor: 'pointer', textDecoration: 'underline' }}>
                  Đăng xuất
                </button>
              </>
            ) : (
              <>
                <Link to="/login" style={{ color: 'white' }}>Đăng nhập</Link>
                <Link to="/register" style={{ color: 'white' }}>Đăng ký</Link>
              </>
            )}
          </nav>
        </header>
        <main>
          <Routes>
            <Route path="/register" element={<Register user={user} />} />
            <Route path="/login" element={<Login onLoginSuccess={handleLoginSuccess} user={user} />} />
            
            <Route path="/admin" element={
              <AdminRoute user={user}>
                <AdminDashboard />
              </AdminRoute>
            } />

            <Route path="/" element={user ? <GameMap /> : <Navigate to="/login" />} />
            <Route path="/stage/:stageId" element={user ? <StageDetail /> : <Navigate to="/login" />} />
            <Route path="/play/:stageId" element={user ? <QuizPlayer user={user} /> : <Navigate to="/login" />} />
          </Routes>
        </main>
      </div>
    </Router> 
  );
}

export default App;