import React, { useState, useEffect } from 'react';
import axios from 'axios';
import ManageQuizzes from './ManageQuizzes';

const ManageStages = () => {
  const [stages, setStages] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [selectedStage, setSelectedStage] = useState(null);
  
  const initialStageState = { 
    title: '', 
    description: '', 
    order: 0, 
    topic: '', 
    icon: '', 
    backgroundImageUrl: '' 
  };
  const [formData, setFormData] = useState(initialStageState);

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

  // SỬA LẠI LOGIC QUAN TRỌNG NHẤT Ở ĐÂY
  useEffect(() => {
    if (selectedStage) {
      // Khi chọn một màn chơi, đảm bảo formData luôn có đủ các trường
      // Nếu một trường nào đó không có trong selectedStage, nó sẽ lấy giá trị rỗng ''
      setFormData({
        title: selectedStage.title || '',
        description: selectedStage.description || '',
        order: selectedStage.order || 0,
        topic: selectedStage.topic || '',
        icon: selectedStage.icon || '',
        backgroundImageUrl: selectedStage.backgroundImageUrl || ''
      });
    } else {
      setFormData(initialStageState);
    }
  }, [selectedStage]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prevState => ({
      ...prevState,
      [name]: name === 'order' ? parseInt(value, 10) || 0 : value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const dataToSend = { ...formData, id: selectedStage?.id };

    if (selectedStage) {
      try {
        await axios.put(`http://localhost:5135/api/stages/${selectedStage.id}`, dataToSend);
        alert('Cập nhật màn chơi thành công!');
        setSelectedStage(null);
        fetchStages();
      } catch (error) {
        console.error("Lỗi khi cập nhật màn chơi:", error);
        alert('Cập nhật màn chơi thất bại.');
      }
    } else {
      try {
        await axios.post('http://localhost:5135/api/stages', dataToSend);
        alert('Thêm màn chơi thành công!');
        setFormData(initialStageState);
        fetchStages();
      } catch (error) {
        console.error("Lỗi khi thêm màn chơi:", error);
        alert('Thêm màn chơi thất bại.');
      }
    }
  };

  const handleDeleteStage = async (stageId) => {
    if (window.confirm('Bạn có chắc chắn muốn xóa màn chơi này?')) {
      try {
        await axios.delete(`http://localhost:5135/api/stages/${stageId}`);
        alert('Xóa màn chơi thành công!');
        if (selectedStage?.id === stageId) {
          setSelectedStage(null);
        }
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
      <h3>{selectedStage ? 'Chỉnh sửa Màn chơi' : 'Thêm Màn chơi mới'}</h3>
      <form onSubmit={handleSubmit} className="admin-form">
        <input name="title" value={formData.title} onChange={handleInputChange} placeholder="Tiêu đề màn chơi" required />
        <input name="description" value={formData.description} onChange={handleInputChange} placeholder="Mô tả" required />
        <input name="order" type="number" value={formData.order} onChange={handleInputChange} placeholder="Thứ tự" required />
        <input name="topic" value={formData.topic} onChange={handleInputChange} placeholder="Chủ đề (vd: Stack)" required />
        <input name="backgroundImageUrl" value={formData.backgroundImageUrl} onChange={handleInputChange} placeholder="Tên file ảnh nền (vd: stack.jpg)" />
        <button type="submit">{selectedStage ? 'Cập nhật Màn chơi' : 'Thêm Màn chơi'}</button>
        {selectedStage && <button type="button" onClick={() => setSelectedStage(null)}>Hủy</button>}
      </form>

      <ul className="admin-list">
        {stages.map(stage => (
          <li key={stage.id} style={{display: 'flex', justifyContent: 'space-between', alignItems: 'center'}}>
            <span onClick={() => setSelectedStage(stage)} style={{cursor: 'pointer', flexGrow: 1, border: selectedStage?.id === stage.id ? '2px solid #1e88e5' : 'none', padding: '5px'}}>
              {stage.order}. {stage.title} ({stage.topic})
            </span>
            <button onClick={() => handleDeleteStage(stage.id)} className="delete-button">Xóa</button>
          </li>
        ))}
      </ul>

      <ManageQuizzes stageId={selectedStage?.id} />
    </div>
  );
};

export default ManageStages;