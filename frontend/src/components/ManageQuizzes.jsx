import React, { useState, useEffect } from 'react';
import axios from 'axios';

const ManageQuizzes = ({ stageId }) => {
  const [quizzes, setQuizzes] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  
  // Đặt giá trị khởi tạo ra một biến riêng
  const initialQuizState = {
    question: '',
    options: ['', '', '', ''],
    correctAnswer: 0
  };
  const [newQuiz, setNewQuiz] = useState(initialQuizState);

  const fetchQuizzes = async () => {
    if (!stageId) { setQuizzes([]); return; }
    setIsLoading(true);
    setError(null);
    try {
      const response = await axios.get(`http://localhost:5135/api/quizzes/${stageId}`);
      setQuizzes(response.data);
    } catch (error) {
      console.error("Lỗi khi tải câu đố:", error);
      setError("Không thể tải được câu đố cho màn chơi này.");
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => { fetchQuizzes(); }, [stageId]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    const processedValue = name === 'correctAnswer' ? parseInt(value, 10) : value;
    setNewQuiz(prevState => ({ ...prevState, [name]: processedValue }));
  };

  const handleOptionChange = (index, value) => {
    const updatedOptions = [...newQuiz.options];
    updatedOptions[index] = value;
    setNewQuiz(prevState => ({ ...prevState, options: updatedOptions }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.post('http://localhost:5135/api/quizzes', { ...newQuiz, stageId });
      alert('Thêm câu đố thành công!');
      setNewQuiz(initialQuizState); // RESET LẠI FORM
      // Cần reset cả các ô input thủ công
      e.target.reset();
      fetchQuizzes();
    } catch (error) {
      console.error("Lỗi khi thêm câu đố:", error);
      alert('Thêm câu đố thất bại.');
    }
  };

  const handleDeleteQuiz = async (quizId) => {
    if (window.confirm('Bạn có chắc chắn muốn xóa câu đố này?')) {
      try {
        await axios.delete(`http://localhost:5135/api/quizzes/${quizId}`);
        alert('Xóa câu đố thành công!');
        fetchQuizzes();
      } catch (error) {
        console.error("Lỗi khi xóa câu đố:", error);
        alert('Xóa câu đố thất bại.');
      }
    }
  };

  if (!stageId) return null;

  return (
    <div className="admin-section" style={{marginTop: '20px', borderTop: '1px solid #555', paddingTop: '20px'}}>
      <h4>Quản lý Câu đố cho Màn chơi đã chọn</h4>
      {isLoading && <p>Đang tải câu đố...</p>}
      {error && <p style={{color: 'red'}}>{error}</p>}

      <form onSubmit={handleSubmit} className="admin-form">
        <input name="question" onChange={handleInputChange} placeholder="Nội dung câu hỏi" required />
        <input onChange={(e) => handleOptionChange(0, e.target.value)} placeholder="Đáp án A" required />
        <input onChange={(e) => handleOptionChange(1, e.target.value)} placeholder="Đáp án B" required />
        <input onChange={(e) => handleOptionChange(2, e.target.value)} placeholder="Đáp án C" required />
        <input onChange={(e) => handleOptionChange(3, e.target.value)} placeholder="Đáp án D" required />
        <select name="correctAnswer" onChange={handleInputChange} required>
          <option value={0}>Đáp án đúng là A</option>
          <option value={1}>Đáp án đúng là B</option>
          <option value={2}>Đáp án đúng là C</option>
          <option value={3}>Đáp án đúng là D</option>
        </select>
        <button type="submit">Thêm Câu đố</button>
      </form>

      <ul className="admin-list">
        {quizzes.length > 0 ? (
          quizzes.map(quiz => (
            <li key={quiz.id} style={{display: 'flex', justifyContent: 'space-between', alignItems: 'center'}}>
              <span>{quiz.question}</span>
              <button onClick={() => handleDeleteQuiz(quiz.id)} className="delete-button">Xóa</button>
            </li>
          ))
        ) : (
          !isLoading && <li>Chưa có câu đố nào cho màn chơi này.</li>
        )}
      </ul>
    </div>
  );
};

export default ManageQuizzes;