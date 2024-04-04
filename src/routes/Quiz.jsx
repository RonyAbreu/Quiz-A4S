import { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { URL_BASE } from "../App";
import Question from "../components/Question";

//Css
import "../css/Quiz.css";
import InformationBox from "../components/InformationBox";
import Loading from "../components/Loading";

const Quiz = () => {
  const path = useLocation().pathname;
  const [questions, setQuestions] = useState([]);
  const [loading, setLoading] = useState(false);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [score, setScore] = useState(0);
  const [informationBox, setInformationBox] = useState(false);

  const navigate = useNavigate();

  let themeId;

  if (path.includes("user")) {
    themeId = path.substring("/user/theme/quiz/".length);
  } else {
    themeId = path.substring("/theme/quiz/".length);
  }

  useEffect(() => {
    async function getQuestionsByThemeId() {
      const url = `${URL_BASE}/question/quiz/${themeId}`;

      setLoading(true);
      const response = await fetch(url);
      const questionsJson = await response.json();
      setLoading(false);

      setQuestions(questionsJson);
    }

    getQuestionsByThemeId();
  }, []);

  function handleAnswerClick(alternative) {
    const alternatives = document.querySelectorAll("li");

    alternatives.forEach((alt) => {
      if (alt.getAttribute("value") === "true")
        alt.style.backgroundColor = "green";
      else alt.style.backgroundColor = "red";
    });

    setTimeout(() => {
      if (currentQuestionIndex === questions.length - 1) {
        setInformationBox(true);
        return;
      }

      setCurrentQuestionIndex(currentQuestionIndex + 1);

      if (isAlternativeCorrect(alternative)) {
        setScore(score + 1);
      }
    }, 1000);
  }

  function isAlternativeCorrect(alternative) {
    return alternative.target.getAttribute("value") === "true";
  }

  return (
    <div className="container-quiz">
      {loading && <Loading />}

      {informationBox && (
        <InformationBox
          text={`Você acertou ${score + 1} de 10 questões!`}
          closeBox={() => navigate("/theme")}
          icon="check"
          color="green"
        />
      )}

      {questions.length > 0 && (
        <Question
          title={questions[currentQuestionIndex].title}
          alternatives={questions[currentQuestionIndex].alternatives}
          onAnswerClick={handleAnswerClick}
          currentQuestion={currentQuestionIndex + 1}
          lastQuestion={questions.length}
        />
      )}
    </div>
  );
};

export default Quiz;
