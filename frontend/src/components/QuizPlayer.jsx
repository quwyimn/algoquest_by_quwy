import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';

const QuizPlayer = ({ user }) => {
  const { stageId } = useParams();
  const navigate = useNavigate();

  const [quizzes, setQuizzes] = useState([]);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [score, setScore] = useState(0);
  const [selectedAnswer, setSelectedAnswer] = useState(null);
  const [hasAnswered, setHasAnswered] = useState(false);
  const [isFinished, setIsFinished] = useState(false);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchQuizzes = async () => {
      try {
        // ĐÃ SỬA LỖI Ở ĐÂY (dùng dấu ` `)
        const response = await axios.get(`/api/quizzes/${stageId}`);
        setQuizzes(response.data);
      } catch (err) {
        setError('Không thể tải câu đố.');
      } finally {
        setLoading(false);
      }
    };
    fetchQuizzes();
  }, [stageId]);

  useEffect(() => {
    if (isFinished && user) {
      const updateProgress = async () => {
        try {
          const xpEarned = score * 10;
          await axios.post('/api/users/update-progress', {
            userId: user.id,
            xpEarned: xpEarned,
          });
          console.log("Đã cập nhật tiến độ thành công!");
        } catch (err) {
          console.error("Lỗi khi cập nhật tiến độ:", err);
        }
      };
      updateProgress();
    }
  }, [isFinished, user, score, stageId]);

  const handleAnswerClick = (optionIndex) => {
    if (hasAnswered) return;
    setSelectedAnswer(optionIndex);
    setHasAnswered(true);
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

  const handleReturnToMap = () => {
    navigate('/');
  };

  if (loading) return <div>Đang tải game...</div>;
  if (error) return <div>{error}</div>;
  if (quizzes.length === 0) return <div>Màn chơi này chưa có câu đố nào.</div>;

  if (isFinished) {
    const xpEarned = score * 10;
    return (
      <div className="quiz-results">
        <h2>Hoàn thành!</h2>
        <p>Điểm của bạn: {score} / {quizzes.length}</p>
        <p>XP nhận được: {xpEarned}</p>
        <button onClick={handleReturnToMap}>Quay về bản đồ</button>
      </div>
    );
  }

  const currentQuiz = quizzes[currentQuestionIndex];

  return (
    <div className="quiz-player">
      <h3>Câu {currentQuestionIndex + 1} / {quizzes.length}</h3>
      <p className="question-text">{currentQuiz.question}</p>
      <div className="options-container">
        {currentQuiz.options.map((option, index) => {
          let buttonClass = 'quiz-option';
          if (hasAnswered) {
            if (index === currentQuiz.correctAnswer) {
              buttonClass += ' correct';
            } else if (index === selectedAnswer) {
              buttonClass += ' incorrect';
            }
          }
          return (
            <button
              key={index}
              className={buttonClass}
              onClick={() => handleAnswerClick(index)}
              disabled={hasAnswered}
            >
              {option}
            </button>
          );
        })}
      </div>
      {hasAnswered && (
        <button onClick={handleNextQuestion} className="next-button">
          {currentQuestionIndex < quizzes.length - 1 ? 'Câu tiếp theo' : 'Xem kết quả'}
        </button>
      )}
    </div>
  );
};

export default QuizPlayer;