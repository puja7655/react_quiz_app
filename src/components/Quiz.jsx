import { useCallback, useState } from "react"
import QUESTIONS from '../questions.js'
import quizCompleteImg from '../assets/quiz-complete.png'
import QuestionTimer from '../components/QuestioonTimer.jsx'
import Answers from "./Answers.jsx"

export default function Quiz() {
    const [usersAnswers, setUsersAnswers] = useState([])
    const [answerState, setAnswerState] = useState('')

    // This is done as once the user selects an answer activeQuestionIndex points to the next question but to check
    //if the selected answer was right or wrong
    const activeQuestionIndex =
        answerState === '' ? usersAnswers.length : usersAnswers.length - 1;

    const quizIsComplete = activeQuestionIndex === QUESTIONS.length

    const handleSelectAnswer = useCallback(function handleSelectAnswer(selectedAnswer) {
        setAnswerState('answered')
        setUsersAnswers((prevUserAnswer) => {
            return [...prevUserAnswer, selectedAnswer]
        })

        setTimeout(() => {
            if (selectedAnswer === QUESTIONS[activeQuestionIndex].answers[0]) {
                setAnswerState('correct')
            } else {
                setAnswerState('wrong')
            }

            //Reseting the answer state after answer state has been identified
            setTimeout(() => {
                setAnswerState('')
            }, 2000)
        }, 1000)

    }, [activeQuestionIndex])

    const handleSkipQuestion = useCallback(() => handleSelectAnswer(null), [handleSelectAnswer])

    if (quizIsComplete) {
        return (
            <div id="summary">
                <img src={quizCompleteImg} alt="Quiz is complete" />
                <h2>Quiz Completed!</h2>
            </div>
        )
    }


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
                <Answers 
                key={activeQuestionIndex}
                answers={QUESTIONS[activeQuestionIndex].answers} 
                selectedAnswer={usersAnswers[usersAnswers.length - 1]} 
                answerState={answerState}
                onSelect={handleSelectAnswer}/>
            </div>
        </div>

    )
}