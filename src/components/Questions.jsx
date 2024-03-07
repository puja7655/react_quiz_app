import QuestionTimer from '../components/QuestioonTimer.jsx'
import Answers from "./Answers.jsx"
import { useState } from 'react'
import QUESTIONS from '../questions.js'

export default function Questions({
    index,
    onSelectAnswer,
    onSkipAnswer
}) {
    const [answer, setAnswer] = useState({
        selectedAnswer: '',
        iscorrect: null
    })

    //Resting the timer. reason is mentiond at the bottom
    let timer = 10000;
    if (answer.selectedAnswer) {
        timer = 1000 // right or wrong answer would be highlighted after 1 s
    }
    if (answer.iscorrect !== null) {
        timer = 2000 //if we ave the information whether answer is right or wrong bcause that is the time it would take befor moving to the next quetsion
    }

    function handleSelectAnswer(answer) {
        setAnswer({
            selectedAnswer: answer,
            iscorrect: null
        })

        setTimeout(() => {
            setAnswer({
                selectedAnswer: answer,
                iscorrect: QUESTIONS[index].answers[0] === answer
            })

            //we are passing this to trigger handleSelectAnswer in Quiz.jsx as we want to update usersAnswer to decide Quiz over
            setTimeout(() => {
                onSelectAnswer(answer)
            }, 2000)
        }, 1000)
    }

    let answerState = ''
    if (answer.selectedAnswer && answer.iscorrect !== null) {
        answerState = answer.iscorrect ? 'correct' : 'wrong'
    } else if (answer.selectedAnswer && answer.iscorrect === null) {
        answerState = 'answered'  // setting this state when we have a selected answer but we do not want to shhow the result so quickly
    }

    return (
        <div id="question">
            <QuestionTimer
                key={timer}
                timeout={timer}
                onTimeout={answer.selectedAnswer === '' ? onSkipAnswer : null}// this method should only be called when answer is skipped not when QuestionTimer is re-rendered as we have placed a key value to timer which would change leading to re-render
                mode={answerState} />
            <h2>{QUESTIONS[index].text}</h2>
            <Answers
                answers={QUESTIONS[index].answers}
                selectedAnswer={answer.selectedAnswer}
                answerState={answerState}
                onSelect={handleSelectAnswer} />
        </div>
    )
}


//situation 1: when user selects answer too late in that case we move to the next question without showing correct or wrong it happens because of two reasons
//1. since it is put under timeout react considers it as skipped answers and move to the next question 
//2. since there is a setTimeout used for sending the answer from question.jsx to Quiz , when answer gets forwarded to parent i.e quiz then it want to move to the next question


//to avoid this we must reset the time once the user ahs selected the answer. it only expires after we have shown the user right or wrong answer