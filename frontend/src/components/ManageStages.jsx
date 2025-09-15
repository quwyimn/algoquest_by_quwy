import React, { useState, useEffect } from 'react';
import axios from 'axios';
import ManageQuizzes from './ManageQuizzes';

const ManageStages = () => {
  const [stages, setStages] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [selectedStageId, setSelectedStageId] = useState(null);
  const [newStage, setNewStage] = useState({ title: '', description: '', order: 0, topic: '', icon: 'default_icon.png' });

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

  useEffect(() => { fetchStages(); }, []);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setNewStage(prevState => ({ ...prevState, [name]: name === 'order' ? parseInt(value, 10) || 0 : value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.post('http://localhost:5135/api/stages', { ...newStage, order: Number(newStage.order) });
      alert('Thêm màn chơi thành công!');
      setNewStage({ title: '', description: '', order: 0, topic: '', icon: 'default_icon.png' });
      fetchStages();
    } catch (error) {
      console.error("Lỗi khi thêm màn chơi:", error.response?.data || error.message);
      alert('Thêm màn chơi thất bại.');
    }
  };

  const handleDeleteStage = async (stageId) => {
    if (window.confirm('Bạn có chắc chắn muốn xóa màn chơi này? Mọi câu đố liên quan cũng sẽ bị xóa.')) {
      try {
        await axios.delete(`http://localhost:5135/api/stages/${stageId}`);
        alert('Xóa màn chơi thành công!');
        fetchStages();
      } catch (error) {
        console.error("Lỗi khi xóa màn chơi:", error);
        alert('Xóa màn chơi thất bại.');
      }
    }
  };

  if (isLoading) return <p>Đang tải dữ liệu...</p>;

  return (
    <div className="admin-section">
      <h3>Quản lý Màn chơi</h3>
      <form onSubmit={handleSubmit} className="admin-form">
        <input name="title" value={newStage.title} onChange={handleInputChange} placeholder="Tiêu đề màn chơi" required />
        <input name="description" value={newStage.description} onChange={handleInputChange} placeholder="Mô tả" required />
        <input name="order" type="number" value={newStage.order} onChange={handleInputChange} placeholder="Thứ tự" required />
        <input name="topic" value={newStage.topic} onChange={handleInputChange} placeholder="Chủ đề (vd: Stack)" required />
        <button type="submit">Thêm Màn chơi</button>
      </form>

      <ul className="admin-list">
        {stages.map(stage => (
          <li key={stage.id} style={{display: 'flex', justifyContent: 'space-between', alignItems: 'center'}}>
            <span onClick={() => setSelectedStageId(stage.id)} style={{cursor: 'pointer', flexGrow: 1, border: selectedStageId === stage.id ? '2px solid #1e88e5' : 'none', padding: '5px'}}>
              {stage.order}. {stage.title} ({stage.topic})
            </span>
            <button onClick={() => handleDeleteStage(stage.id)} className="delete-button">Xóa</button>
          </li>
        ))}
      </ul>

      <ManageQuizzes stageId={selectedStageId} />
    </div>
  );
};

export default ManageStages;