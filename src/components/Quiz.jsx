import { useCallback, useState } from "react"
import QUESTIONS from '../questions.js'
import quizCompleteImg from '../assets/quiz-complete.png'
import QuestionTimer from '../components/QuestioonTimer.jsx'

export default function Quiz() {
    const [usersAnswers, setUsersAnswers] = useState([])
    const activeQuestionIndex = usersAnswers.length
    const quizIsComplete = activeQuestionIndex === QUESTIONS.length

    const handleSelectAnswer = useCallback(function handleSelectAnswer(selectedAnswer) {
        setUsersAnswers((prevUserAnswer) => {
            return [...prevUserAnswer, selectedAnswer]
        })
        console.log("answers", usersAnswers)
    }, [])

    const handleSkipQuestion = useCallback(() => handleSelectAnswer(null), [handleSelectAnswer])

    if (quizIsComplete) {
        return (
            <div id="summary">
                <img src={quizCompleteImg} alt="Quiz is complete" />
                <h2>Quiz Completed!</h2>
            </div>
        )
    }

    const shuffledAnswers = [...QUESTIONS[activeQuestionIndex].answers]
    shuffledAnswers.sort(() => Math.random - 0.5) //if sort function returns negative value it swaps the input.here with Math.random i will get numbers between 0 to 1 and substracting .5 will give me mostly negative value

    //it is very important to add key . Here in QuestionTimer if we do not add key ,and when question changes since there is no change in QuestionTimer
    //it will not be re-rendered . Hence progres bar would show nothing.With key in place there is some change in there and QuestionTimer would re-render
    return (
        <div id="quiz">
            <QuestionTimer
                timeout={10000}
                key={activeQuestionIndex}
                onTimeout={handleSkipQuestion}
            />
            <div id="question">
                <h2>{QUESTIONS[activeQuestionIndex].text}</h2>
                <ul id="answers">
                    {shuffledAnswers.map((answer) =>
                        <li key={answer} className="answer">
                            <button onClick={() => handleSelectAnswer(answer)}>{answer}</button>
                        </li>
                    )}
                </ul>
            </div>
        </div>

    )
}