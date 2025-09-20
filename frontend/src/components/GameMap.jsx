import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';

const GameMap = ({ user }) => {
  const [stages, setStages] = useState([]);
  const [completedStages, setCompletedStages] = useState(new Set());
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (!user) return;

    const fetchGameData = async () => {
      try {
        const [stagesResponse, userResponse] = await Promise.all([
          axios.get('http://localhost:5135/api/stages'),
          axios.get(`http://localhost:5135/api/users/${user.id}`)
        ]);

        if (Array.isArray(stagesResponse.data)) {
          setStages(stagesResponse.data);
        }

        if (userResponse.data && Array.isArray(userResponse.data.completedStages)) {
          const completedSet = new Set(userResponse.data.completedStages);
          setCompletedStages(completedSet);
        }

      } catch (err) {
        setError('Không thể tải được dữ liệu game.');
        console.error("Lỗi khi tải dữ liệu game:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchGameData();
  }, [user]);

  if (loading) return (
    <div className="loading-container">
      <div className="loading-spinner"></div>
      <div className="loading-text">Đang tải bản đồ...</div>
    </div>
  );
  
  if (error) return (
    <div className="error-container">
      <div className="error-icon">⚠️</div>
      <div className="error-text">Lỗi tải dữ liệu</div>
      <div className="error-description">{error}</div>
    </div>
  );

  return (
    <div className="game-map-container">
      <h2>Bản đồ Môn học</h2>
      <div className="stage-list">
        {stages.map(stage => {
          // --- LOGIC MỞ KHÓA ĐÃ ĐƯỢC SỬA LẠI ---
          let isUnlocked = false;
          if (stage.order === 1) {
            // Màn 1 luôn mở
            isUnlocked = true;
          } else {
            // Tìm màn chơi trước đó
            const prevStage = stages.find(s => s.order === stage.order - 1);
            // Màn hiện tại được mở nếu ID của màn trước đó đã có trong danh sách hoàn thành
            if (prevStage && completedStages.has(prevStage.id)) {
              isUnlocked = true;
            }
          }
          // ---------------------------------------

          if (isUnlocked) {
            return (
              <Link to={`/stage/${stage.id}`} key={stage.id} className="stage-node">
                <h3>{stage.order}</h3>
                <p>{stage.topic}</p>
              </Link>
            );
          } else {
            return (
              <div key={stage.id} className="stage-node locked">
                <h3>{stage.order}</h3>
                <p>{stage.topic}</p>
                <span className="lock-icon">🔒</span>
              </div>
            );
          }
        })}
      </div>
    </div>
  );
};

export default GameMap;