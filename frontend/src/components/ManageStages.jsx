import React, { useState, useEffect } from 'react';
import axios from 'axios';

const ManageStages = () => {
  const [stages, setStages] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  
  // State cho form thêm màn chơi mới
  const [newStage, setNewStage] = useState({
    title: '',
    description: '',
    order: 0,
    topic: ''
  });

  // Hàm để tải lại danh sách màn chơi
  const fetchStages = async () => {
    try {
      const response = await axios.get('http://localhost:5135/api/stages');
      setStages(response.data);
    } catch (error) {
      console.error("Lỗi khi tải danh sách màn chơi:", error);
    } finally {
      setIsLoading(false);
    }
  };

  // Tải danh sách màn chơi khi component được render lần đầu
  useEffect(() => {
    fetchStages();
  }, []);

  // Hàm xử lý khi thay đổi nội dung trong form
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setNewStage(prevState => ({
      ...prevState,
      [name]: name === 'order' ? parseInt(value, 10) : value
    }));
  };

  // Hàm xử lý khi submit form
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.post('http://localhost:5135/api/stages', newStage);
      alert('Thêm màn chơi thành công!');
      setNewStage({ title: '', description: '', order: 0, topic: '' }); // Reset form
      fetchStages(); // Tải lại danh sách để hiển thị màn chơi mới
    } catch (error) {
      console.error("Lỗi khi thêm màn chơi:", error);
      alert('Thêm màn chơi thất bại.');
    }
  };

  if (isLoading) return <p>Đang tải dữ liệu...</p>;

  return (
    <div className="admin-section">
      <h3>Quản lý Màn chơi</h3>
      
      {/* Form để thêm màn chơi mới */}
      <form onSubmit={handleSubmit} className="admin-form">
        <input name="title" value={newStage.title} onChange={handleInputChange} placeholder="Tiêu đề màn chơi" required />
        <input name="description" value={newStage.description} onChange={handleInputChange} placeholder="Mô tả" required />
        <input name="order" type="number" value={newStage.order} onChange={handleInputChange} placeholder="Thứ tự" required />
        <input name="topic" value={newStage.topic} onChange={handleInputChange} placeholder="Chủ đề (vd: Stack)" required />
        <button type="submit">Thêm Màn chơi</button>
      </form>

      {/* Danh sách các màn chơi hiện có */}
      <ul className="admin-list">
        {stages.map(stage => (
          <li key={stage.id}>
            <span>{stage.order}. {stage.title} ({stage.topic})</span>
            {/* Chúng ta sẽ thêm nút Sửa/Xóa sau */}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default ManageStages;