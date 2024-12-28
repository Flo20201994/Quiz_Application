import React, { useState, useEffect } from 'react';
import './QuizPage.css';

export default function QuizPage({ user }) {
  const [questions, setQuestions] = useState([]);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [score, setScore] = useState(0);

  useEffect(() => {
    // Fetch quiz questions from API
    fetch('/api/quiz')
      .then((res) => res.json())
      .then((data) => setQuestions(data));
  }, []);

  const handleAnswer = (isCorrect) => {
    if (isCorrect) setScore(score + 1);
    if (currentQuestionIndex + 1 < questions.length) {
      setCurrentQuestionIndex(currentQuestionIndex + 1);
    } else {
      // TODO: Save results to database
      alert(`Quiz completed! Your score: ${score}`);
    }
  };

  if (!questions.length) return <div>Loading...</div>;

  const question = questions[currentQuestionIndex];

  return (
    <div className="quiz-container">
      <h2>Question {currentQuestionIndex + 1}</h2>
      <p>{question.text}</p>
      {question.options.map((option, idx) => (
        <button key={idx} onClick={() => handleAnswer(option.isCorrect)}>
          {option.text}
        </button>
      ))}
    </div>
  );
}
