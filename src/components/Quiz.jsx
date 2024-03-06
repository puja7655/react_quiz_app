import { useState } from "react"
import QUESTIONS from '../questions.js'
import quizCompleteImg from '../assets/quiz-complete.png'

export default function Quiz() {
    const [usersAnswers, setUsersAnswers] = useState([])
    const activeQuestionIndex = usersAnswers.length
    const quizIsComplete = activeQuestionIndex === QUESTIONS.length

    function handleSelectAnswer(selectedAnswer) {
        setUsersAnswers((prevUserAnswer) => {
            return [...prevUserAnswer, selectedAnswer]
        })
        console.log("answers", usersAnswers)
    }

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

    return (
        <div id="quiz">
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