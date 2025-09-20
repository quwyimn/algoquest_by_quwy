import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import axios from 'axios';

const StageDetail = () => {
  const [quizzes, setQuizzes] = useState([]);
  const [stageInfo, setStageInfo] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const { stageId } = useParams();
  const [answeredQuizzes, setAnsweredQuizzes] = useState(new Set());

  useEffect(() => {
    const savedAnswers = localStorage.getItem(`answered_${stageId}`);
    if (savedAnswers) {
      setAnsweredQuizzes(new Set(JSON.parse(savedAnswers)));
    }
  }, [stageId]);

  useEffect(() => {
    const fetchGameData = async () => {
      try {
        const [quizzesResponse, stagesResponse] = await Promise.all([
          axios.get(`http://localhost:5135/api/quizzes/${stageId}`),
          axios.get('http://localhost:5135/api/stages')
        ]);

        if (Array.isArray(quizzesResponse.data)) {
          setQuizzes(quizzesResponse.data);
        }
        if (Array.isArray(stagesResponse.data)) {
          const currentStage = stagesResponse.data.find(s => s.id === stageId);
          setStageInfo(currentStage);
        }
      } catch (err) {
        setError('Không thể tải dữ liệu màn chơi.');
        console.error("Lỗi khi tải dữ liệu màn chơi  ", err);

      } finally {
        setLoading(false);
      }
    };
    fetchGameData();
  }, [stageId]);

  if (loading) return <div>Đang tải màn chơi...</div>;
  if (error) return <div>{error}</div>;

  const backgroundStyle = {
    backgroundImage: `linear-gradient(rgba(0, 0, 0, 0.5), rgba(0, 0, 0, 0.5)), url(/images/${stageInfo?.backgroundImageUrl})`,
    backgroundSize: 'cover',
    backgroundPosition: 'center',
    flexGrow: 1, // ĐÃ THÊM Ở ĐÂY
    position: 'relative',
    padding: '20px',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center'
  };

  return (
    <div style={backgroundStyle}>
      <h2 style={{ color: 'white', textShadow: '2px 2px 4px #000' }}>
        {stageInfo?.title}
      </h2>
      
      <div className="quiz-stations-container">
        {quizzes.map((quiz, index) => {
          const isAnswered = answeredQuizzes.has(quiz.id);
          return (
            <Link 
              to={`/play/${stageId}/${index}`} 
              key={quiz.id} 
              className={`quiz-station ${isAnswered ? 'answered' : ''}`}
            >
              Câu {index + 1}
              {isAnswered && <span className="checkmark">✓</span>}
            </Link>
          );
        })}
      </div>
    </div>
  );
};

export default StageDetail;