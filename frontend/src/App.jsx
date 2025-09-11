// frontend/src/App.jsx
import React, { useState } from 'react';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom'; // Import thêm Link
import './App.css';
import GameMap from './components/GameMap';
import StageDetail from './components/StageDetail';
import QuizPlayer from './components/QuizPlayer';
import Login from './components/Login'; // 1. Import Login

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
          <nav>
            {user ? (
              // Nếu đã đăng nhập, hiển thị lời chào
              <span>Xin chào, {user.username}!</span>
            ) : (
              // Nếu chưa đăng nhập, hiển thị link tới trang Login
              <Link to="/login" style={{ color: 'white' }}>Đăng nhập</Link>
            )}
          </nav>
        </header>
        <main>
          <Routes>
            {/* 2. Kích hoạt Route cho trang Login */}
            <Route path="/login" element={<Login onLoginSuccess={handleLoginSuccess} />} />
            
            <Route path="/play/:stageId" element={<QuizPlayer user={user} />} />
            <Route path="/stage/:stageId" element={<StageDetail />} />
            <Route path="/" element={<GameMap />} />
          </Routes>
        </main>
      </div>
    </Router>
  );
}

export default App;