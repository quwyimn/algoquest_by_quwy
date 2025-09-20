import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';

const QuizPlayer = ({ user }) => {
  const { stageId, questionIndex } = useParams();
  const navigate = useNavigate();

  const [quizzes, setQuizzes] = useState([]);
  const [stageInfo, setStageInfo] = useState(null);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(parseInt(questionIndex, 10) || 0);
  const [score, setScore] = useState(0);
  const [selectedAnswer, setSelectedAnswer] = useState(null);
  const [hasAnswered, setHasAnswered] = useState(false);
  const [isFinished, setIsFinished] = useState(false);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

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
        setError('Không thể tải dữ liệu game.');
        console.error("Lỗi khi tải dữ liệu game  ", err);
      } finally {
        setLoading(false);
      }
    };
    fetchGameData();
  }, [stageId]);

  const handleAnswerClick = (optionIndex) => {
    if (hasAnswered) return;
    setSelectedAnswer(optionIndex);
    setHasAnswered(true);
    
    const savedAnswers = JSON.parse(localStorage.getItem(`answered_${stageId}`)) || [];
    const newAnswered = new Set(savedAnswers);
    newAnswered.add(quizzes[currentQuestionIndex].id);
    localStorage.setItem(`answered_${stageId}`, JSON.stringify([...newAnswered]));

    if (optionIndex === quizzes[currentQuestionIndex].correctAnswer) {
      setScore(prevScore => prevScore + 1);
    }
  };

  const handleNextQuestion = () => {
    setHasAnswered(false);
    setSelectedAnswer(null);
    if (currentQuestionIndex < quizzes.length - 1) {
      setCurrentQuestionIndex(prevIndex => prevIndex + 1);
    } else {
      setIsFinished(true);
    }
  };

  const handleReturnToDetail = () => {
    navigate(`/stage/${stageId}`);
  };

  useEffect(() => {
    if (isFinished && user) {
      const updateProgress = async () => {
        try {
          const xpEarned = score * 10;
          await axios.post('http://localhost:5135/api/users/update-progress', {
            userId: user.id,
            xpEarned: xpEarned,
            completedStageId: stageId,
          });
          console.log("Đã cập nhật tiến độ thành công!");
        } catch (err) {
          console.error("Lỗi khi cập nhật tiến độ:", err);
        }
      };
      updateProgress();
    }
  }, [isFinished, user, score, stageId]);

  if (loading) return (
    <div className="loading-container">
      <div className="loading-spinner"></div>
      <div className="loading-text">Đang tải game...</div>
    </div>
  );
  
  if (error) return (
    <div className="error-container">
      <div className="error-icon">⚠️</div>
      <div className="error-text">Lỗi tải dữ liệu</div>
      <div className="error-description">{error}</div>
    </div>
  );
  
  const currentQuiz = quizzes[currentQuestionIndex];

  if (!currentQuiz) {
    return <div>Màn chơi này chưa có câu đố nào.</div>;
  }

  const backgroundStyle = {
    backgroundImage: `linear-gradient(rgba(0, 0, 0, 0.7), rgba(0, 0, 0, 0.7)), url(/images/${stageInfo?.backgroundImageUrl})`,
    backgroundSize: 'cover',
    backgroundPosition: 'center',
    flexGrow: 1,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center'
  };

  if (isFinished) {
    return (
      <div style={backgroundStyle}>
        <div className="quiz-results">
          <h2>🎉 Hoàn thành!</h2>
          <div className="score">Điểm: {score} / {quizzes.length}</div>
          <p>XP nhận được: <strong>{score * 10}</strong></p>
          <p>Bạn đã mở khóa màn chơi tiếp theo!</p>
          <button onClick={() => navigate('/')} className="next-button">Về Bản đồ chính</button>
        </div>
      </div>
    );
  }

  return (
    <div style={backgroundStyle}>
      <div className="quiz-player">
        <h3>Câu {currentQuestionIndex + 1} / {quizzes.length}</h3>
        <p className="question-text">{currentQuiz.question}</p>
        <div className="options-container">
          {Array.isArray(currentQuiz.options) && currentQuiz.options.map((option, index) => (
            <button
              key={index}
              className={
                `quiz-option ${hasAnswered ? (index === currentQuiz.correctAnswer ? 'correct' : (index === selectedAnswer ? 'incorrect' : '')) : ''}`
              }
              onClick={() => handleAnswerClick(index)}
              disabled={hasAnswered}
            >
              {option}
            </button>
          ))}
        </div>
        {hasAnswered && (
          <button onClick={handleNextQuestion} className="next-button">
            {currentQuestionIndex < quizzes.length - 1 ? 'Câu tiếp theo' : 'Xem kết quả'}
          </button>
        )}
        <button onClick={handleReturnToDetail} style={{marginTop: '10px', background: 'grey'}}>Quay lại</button>
      </div>
    </div>
  );
};

export default QuizPlayer;