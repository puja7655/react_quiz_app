import { useCallback, useState } from "react"
import QUESTIONS from '../questions.js'
import Questions from "./Questions.jsx"
import Summary from "./Summary.jsx"

export default function Quiz() {
    const [usersAnswers, setUsersAnswers] = useState([])
    //this will now be update only from question.jsx once we show the users if their answer is correct or not basically once handleSelectAnswer() is called from Question.jsx
    const activeQuestionIndex = usersAnswers.length
    const quizIsComplete = activeQuestionIndex === QUESTIONS.length

    const handleSelectAnswer = useCallback(
        function handleSelectAnswer(selectedAnswer) {
            setUsersAnswers((prevUserAnswer) => {
                return [...prevUserAnswer, selectedAnswer]
            })
        }, []);

    const handleSkipQuestion = useCallback(
        () => handleSelectAnswer(null),
        [handleSelectAnswer]);

    if (quizIsComplete) {
        return <Summary usersAnswers={usersAnswers} />
    }

    //it is very important to add key . Here in QuestionTimer if we do not add key ,and when question changes since there is no change in QuestionTimer
    //it will not be re-rendered . Hence progres bar would show nothing.With key in place there when activeQuestionIndex QuestionTimer would re-render
    return (
        <div id="quiz">
            <Questions
                key={activeQuestionIndex}
                index={activeQuestionIndex}
                onSelectAnswer={handleSelectAnswer}
                onSkipAnswer={handleSkipQuestion} />
        </div>
    )
}
