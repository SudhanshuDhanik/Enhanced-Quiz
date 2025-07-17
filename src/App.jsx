import React, { useState } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "./components/Home";
import QuizStepper from "./components/quiz/QuizStepper";
import Quiz from "./components/quiz/Quiz";
import QuizResult from "./components/quiz/QuizResult";
import GetAllQuiz from "./components/quiz/GetAllQuiz";
import AddQuestion from "./components/question/AddQuestion";
import UpdateQuestion from "./components/question/UpdateQuestion";
import Navbar from "./components/layout/Navbar";
import Admin from "./components/Admin";
import "./App.css";
import JarvisAssistant from "./components/JarvisAssistant";

function App() {
  const [isJarvisActive, setJarvisActive] = useState(false);

  const handleToggleJarvis = () => {
    setJarvisActive((prev) => !prev);
  };

  return (
    <main>
      <Router>
        {/* ✅ Only Navbar Button Controls Jarvis */}
        <Navbar toggleJarvis={handleToggleJarvis} isJarvisActive={isJarvisActive} />
        
        {/* ✅ Render JarvisAssistant Only When Active */}
        {isJarvisActive && (
          <div className="jarvis-assistant-container">
            <JarvisAssistant />
          </div>
        )}

        <div className="quiz-container">
          <div className="overlay"></div>
          <div className="content">
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/quiz-stepper" element={<QuizStepper />} />
              <Route path="/take-quiz" element={<Quiz />} />
              <Route path="/admin" element={<Admin />} />
              <Route path="/create-quiz" element={<AddQuestion />} />
              <Route path="/update-quiz/:id" element={<UpdateQuestion />} />
              <Route path="/all-quizzes" element={<GetAllQuiz />} />
              <Route path="/quiz-result" element={<QuizResult />} />
            </Routes>
          </div>
        </div>
      </Router>
    </main>
  );
}

export default App;
