import { useRef } from "react";

export default function Answers({ answers, selectedAnswer, answerState, onSelect }) {

    const shuffledAnswers = useRef()

    if (!shuffledAnswers.current) {
        shuffledAnswers.current = [...answers]
        shuffledAnswers.current.sort(() => Math.random - 0.5) //if sort function returns negative value it swaps the input.here with Math.random i will get numbers between 0 to 1 and substracting .5 will give me mostly negative value

    }
    return <ul id="answers">
        {shuffledAnswers.current.map((answer) => {
            let isSelected = selectedAnswer === answer;
            let cssClass = ''

            if (answerState === 'answered' && isSelected) {
                cssClass = 'selected'
            }
            if ((answerState === 'correct' || answerState === 'wrong') && isSelected) {
                cssClass = answerState
            }
            return <li key={answer} className="answer">
                <button
                    onClick={() => onSelect(answer)}
                    className={cssClass}
                    disabled={answerState !== ''}>
                    {answer}
                </button>
            </li>
        }
        )}
    </ul>
}
