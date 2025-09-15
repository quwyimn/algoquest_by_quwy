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
        const response = await axios.get('http://localhost:5135/api/stages');
        
        // Kiểm tra kỹ dữ liệu trả về
        if (Array.isArray(response.data)) {
          setStages(response.data);
        } else {
          console.error("Dữ liệu trả về từ API không phải là một mảng:", response.data);
          setStages([]); // Đặt thành mảng rỗng để tránh lỗi .map
        }
      } catch (err) {
        setError('Không thể tải được danh sách màn chơi. Vui lòng kiểm tra xem server backend đã chạy chưa.');
        console.error("Lỗi khi tải màn chơi:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchStages();
  }, []); // Mảng rỗng đảm bảo useEffect chỉ chạy 1 lần

  // Hiển thị trạng thái tải hoặc lỗi
  if (loading) {
    return <div>Đang tải bản đồ...</div>;
  }

  if (error) {
    return <div>{error}</div>;
  }

  return (
    <div className="game-map-container">
      <h2>Bản đồ Môn học</h2>
      <div className="stage-list">
        {/* Kiểm tra lại một lần nữa trước khi render */}
        {stages.length > 0 ? (
          stages.map(stage => (
            <Link to={`/stage/${stage.id}`} key={stage.id} className="stage-node">
              <h3>{stage.order}</h3>
              <p>{stage.topic}</p>
            </Link>
          ))
        ) : (
          <p>Chưa có màn chơi nào được tạo. Vui lòng liên hệ Admin.</p>
        )}
      </div>
    </div>
  );
};

export default GameMap;