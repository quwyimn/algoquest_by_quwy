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
        // KIỂM TRA DỮ LIỆU Ở ĐÂY
        if (Array.isArray(response.data)) {
          setStages(response.data);
        } else {
          // Nếu không phải mảng, đặt nó thành mảng rỗng
          setStages([]);
        }
      } catch (err) {
        setError('Không thể tải được danh sách màn chơi.');
        console.error("Lỗi khi tải màn chơi:", err);
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
        {/* KIỂM TRA LẠI Ở ĐÂY TRƯỚC KHI MAP */}
        {Array.isArray(stages) && stages.map(stage => (
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