import React, { useState } from 'react';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import './App.css';

// Đảm bảo tên file import khớp 100% với tên file thật
import GameMap from './components/GameMap';
import StageDetail from './components/StageDetail';
import QuizPlayer from './components/QuizPlayer';
import Login from './components/Login';

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
              <span>Xin chào, {user.username}!</span>
            ) : (
              <Link to="/login" style={{ color: 'white' }}>Đăng nhập</Link>
            )}
          </nav>
        </header>
        <main>
          <Routes>
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