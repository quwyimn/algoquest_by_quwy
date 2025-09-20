import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, Link, Navigate, Outlet } from 'react-router-dom';
import './App.css';

import GameMap from './components/GameMap';
import StageDetail from './components/StageDetail';
import QuizPlayer from './components/QuizPlayer';
import Login from './components/Login';
import Register from './components/Register';
import AdminDashboard from './components/AdminDashboard';
import AdminRoute from './components/AdminRoute';

// Layout chính, có Header
const MainLayout = ({ user, handleLogout }) => {
  return (
    <div className="App">
      <header className="App-header">
        <h1>AlgoQuest: Chuyến Phiêu Lưu Giải Thuật</h1>
        <nav style={{ display: 'flex', gap: '20px', alignItems: 'center' }}>
          {user ? (
            <>
              {user.role === 'Admin' && (
                <Link to="/admin" style={{ color: 'white', fontWeight: 'bold' }}>Trang Admin</Link>
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
        <Outlet />
      </main>
    </div>
  );
};

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
      <Routes>
        {/* TẤT CẢ CÁC TRANG ĐỀU NẰM TRONG MAINLAYOUT */}
        <Route element={<MainLayout user={user} handleLogout={handleLogout} />}>
          <Route path="/admin" element={<AdminRoute user={user}><AdminDashboard /></AdminRoute>} />
          <Route path="/login" element={<Login onLoginSuccess={handleLoginSuccess} user={user} />} />
          <Route path="/register" element={<Register user={user} />} />
          
          <Route path="/" element={user ? <GameMap user={user} /> : <Navigate to="/login" />} />
          <Route path="/stage/:stageId" element={user ? <StageDetail /> : <Navigate to="/login" />} />
          <Route path="/play/:stageId/:questionIndex" element={user ? <QuizPlayer user={user} /> : <Navigate to="/login" />} />
        </Route>
      </Routes>
    </Router>
  );
}

export default App;