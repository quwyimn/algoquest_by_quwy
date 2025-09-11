// frontend/src/App.jsx
import React, 'react';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import './App.css';

// SỬA LẠI TÊN FILE CHO ĐÚNG CHỮ HOA/THƯỜNG
import GameMap from './components/GameMap';
import StageDetail from './components/StageDetail';
import QuizPlayer from './components/QuizPlayer';
import Login from './components/Login';

function App() {
  // LƯU Ý: Mình đã xóa phần state "user" để đơn giản hóa việc gỡ lỗi.
  // Chúng ta sẽ thêm lại sau khi đã chạy được.
  
  return (
    <Router>
      <div className="App">
        <header className="App-header">
          <h1>AlgoQuest: Chuyến Phiêu Lưu Giải Thuật</h1>
          <nav>
            <Link to="/login" style={{ color: 'white' }}>Đăng nhập</Link>
          </nav>
        </header>
        <main>
          <Routes>
            <Route path="/login" element={<Login />} />
            <Route path="/play/:stageId" element={<QuizPlayer />} />
            <Route path="/stage/:stageId" element={<StageDetail />} />
            <Route path="/" element={<GameMap />} />
          </Routes>
        </main>
      </div>
    </Router>
  );
}

export default App;