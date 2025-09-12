import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';

const GameMap = () => {
  const [stages, setStages] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchStages = async () => {
      try {
        const response = await axios.get('/api/stages');
        setStages(response.data);
      } catch (err) {
        setError('Không thể tải được danh sách màn chơi.');
      } finally {
        setLoading(false);
      }
    };
    fetchStages();
  }, []);

  if (loading) return <div>Đang tải bản đồ...</div>;
  if (error) return <div>{error}</div>;

  return (
    <div className="game-map-container">
      <h2>Bản đồ Môn học</h2>
      <div className="stage-list">
        {stages.map(stage => (
          // ĐÃ SỬA LỖI Ở ĐÂY (dùng dấu ` `)
          <Link to={`/stage/${stage.id}`} key={stage.id} className="stage-node">
            <h3>{stage.order}</h3>
            <p>{stage.topic}</p>
          </Link>
        ))}
      </div>
    </div>
  );
};

export default GameMap;