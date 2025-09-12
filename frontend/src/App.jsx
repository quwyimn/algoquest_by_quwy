import React, { useState } from 'react';
import { BrowserRouter as Router, Routes, Route, Link, Navigate, Outlet } from 'react-router-dom';
import './App.css';

import GameMap from './components/GameMap';
import StageDetail from './components/StageDetail';
import QuizPlayer from './components/QuizPlayer';
import Login from './components/Login';
import Register from './components/Register';

// Layout cho các trang cần đăng nhập
const ProtectedLayout = ({ user }) => {
  if (!user) {
    return <Navigate to="/login" replace />;
  }
  // Outlet sẽ render các component con (GameMap, StageDetail...)
  return <Outlet />; 
};

function App() {
  const [user, setUser] = useState(null);

  const handleLoginSuccess = (userData) => {
    setUser(userData);
  };

  return (
    <Router>
      <div className="App">
        <header className="App-header">
          <h1>AlgoQuest: Chuyến Phiêu Lưu Giải Thuật</h1>
          <nav style={{ display: 'flex', gap: '20px', alignItems: 'center' }}>
            {user ? (
              <span>Xin chào, {user.username}!</span>
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
            {/* Các trang công khai */}
            <Route path="/register" element={<Register />} />
            <Route path="/login" element={<Login onLoginSuccess={handleLoginSuccess} />} />
            
            {/* Nhóm các trang được bảo vệ */}
            <Route element={<ProtectedLayout user={user} />}>
              <Route path="/" element={<GameMap />} />
              <Route path="/stage/:stageId" element={<StageDetail />} />
              <Route path="/play/:stageId" element={<QuizPlayer user={user} />} />
            </Route>
          </Routes>
        </main>
      </div>
    </Router>
  );
}

export default App;