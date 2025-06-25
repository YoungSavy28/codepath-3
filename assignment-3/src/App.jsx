import React, { useState } from "react";
import Card from "./Card";
import { cardsData } from "./data";
import "./styles.css";

export default function App() {
  const [cards, setCards] = useState(cardsData);
  const [index, setIndex] = useState(0);
  const [guess, setGuess] = useState("");
  const [feedback, setFeedback] = useState("");
  const [currentStreak, setCurrentStreak] = useState(0);
  const [longestStreak, setLongestStreak] = useState(0);
  const [mastered, setMastered] = useState([]);
  const [isFlipped, setIsFlipped] = useState(false);

  const currentCard = cards[index];

  const checkAnswer = () => {
    const cleanedGuess = guess.trim().toLowerCase();
    const cleanedAnswer = currentCard.answer.trim().toLowerCase();
    if (cleanedAnswer.includes(cleanedGuess)) {
      setFeedback("✅ Correct!");
      const newStreak = currentStreak + 1;
      setCurrentStreak(newStreak);
      if (newStreak > longestStreak) setLongestStreak(newStreak);
    } else {
      setFeedback("❌ Try Again!");
      setCurrentStreak(0);
    }
  };

  const goNext = () => {
    if (index < cards.length - 1) {
      setIndex(index + 1);
      resetCard();
    }
  };

  const goBack = () => {
    if (index > 0) {
      setIndex(index - 1);
      resetCard();
    }
  };

  const shuffleCards = () => {
    const shuffled = [...cards].sort(() => Math.random() - 0.5);
    setCards(shuffled);
    setIndex(0);
    resetCard();
  };

  const markAsMastered = () => {
    const updated = cards.filter((_, i) => i !== index);
    setMastered([...mastered, currentCard]);
    setCards(updated);
    if (index >= updated.length) setIndex(updated.length - 1);
    resetCard();
  };

  const resetCard = () => {
    setGuess("");
    setFeedback("");
    setIsFlipped(false);
  };

  return (
    <div className="app">
      <h1>🧠 Flashcards</h1>

      {cards.length > 0 ? (
        <>
          <Card
            front={currentCard.front}
            back={currentCard.answer}
            isFlipped={isFlipped}
            onFlip={() => setIsFlipped(!isFlipped)}
          />

          <div className="input-section">
            <input
              type="text"
              value={guess}
              onChange={(e) => setGuess(e.target.value)}
              placeholder="Type your answer..."
            />
            <button onClick={checkAnswer}>Submit</button>
          </div>

          <div className="feedback">{feedback}</div>

          <div className="nav-buttons">
            <button onClick={goBack} disabled={index === 0}>
              ◀ Back
            </button>
            <button onClick={goNext} disabled={index === cards.length - 1}>
              Next ▶
            </button>
          </div>

          <div className="tools">
            <button onClick={shuffleCards}>🔀 Shuffle</button>
            <button onClick={markAsMastered}>🎯 Mastered</button>
          </div>

          <div className="streak">
            🔥 Streak: {currentStreak} | 🏆 Best: {longestStreak}
          </div>
          <div className="remaining">
            🍀 Cards Remaining: {cards.length} | ✅ Mastered: {mastered.length}
          </div>
        </>
      ) : (
        <h2>No more cards! 🎉</h2>
      )}
    </div>
  );
}
