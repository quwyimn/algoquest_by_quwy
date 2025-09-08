import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';

const StageDetail = () => {
  const [quizzes, setQuizzes] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const { stageId } = useParams();

  useEffect(() => {
    const fetchQuizzes = async () => {
      try {
        const response = await axios.get(`http://localhost:5000/api/quizzes/${stageId}`);
        setQuizzes(response.data);
      } catch (err) {
        setError('Không thể tải được danh sách câu đố.');
      } finally {
        setLoading(false);
      }
    };
    fetchQuizzes();
  }, [stageId]);

  if (loading) return <div>Đang tải câu đố...</div>;
  if (error) return <div>{error}</div>;

  return (
    <div>
      <h2>Các câu đố của màn chơi</h2>
      {quizzes.length > 0 ? (
        <ul>
          {quizzes.map((quiz, index) => (
            <li key={quiz._id}>
              <p><strong>Câu {index + 1}:</strong> {quiz.question}</p>
            </li>
          ))}
        </ul>
      ) : (
        <p>Chưa có câu đố nào cho màn chơi này.</p>
      )}
    </div>
  );
};

export default StageDetail;