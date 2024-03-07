import quizCompleteImg from '../assets/quiz-complete.png'
import QUESTIONS from '../questions.js'

export default function Summary({ usersAnswers }) {
    const skippedAnswers = usersAnswers.filter((answer) => answer === null)
    const correctAnswers = usersAnswers.filter((answer, index) => answer === QUESTIONS[index].answers[0])

    const skippedAnswersShare = Math.round((skippedAnswers.length / usersAnswers.length) * 100)
    const correctAnswersShare = Math.round((correctAnswers.length / usersAnswers.length) * 100)
    const wrongAnswerShare = 100 - skippedAnswersShare - correctAnswersShare;

    return (
        <div id="summary">
            <img src={quizCompleteImg} alt="Quiz is complete" />
            <h2>Quiz Completed!</h2>
            <div id="summary-stats">
                <p>
                    <span className='number'>{skippedAnswersShare}%</span>
                    <span className='text'>skipped</span>
                </p>
                <p>
                    <span className='number'>{correctAnswersShare}%</span>
                    <span className='text'>answered correctly</span>
                </p>
                <p>
                    <span className='number'>{wrongAnswerShare}%</span>
                    <span className='text'>answered incorrectly</span>
                </p>
            </div>
            <ol>
                {usersAnswers.map((answer, index) => {
                    let cssClass = 'user-answer'
                    if (answer === null) {
                        cssClass += ' skipped'
                    } else if (answer === QUESTIONS[index].answers[0]) {
                        cssClass += ' correct'
                    } else {
                        cssClass += ' wrong'
                    }
                    return (
                        <li key={index}>
                            <h3>{index + 1}</h3>
                            <p><span className='question'>{QUESTIONS[index].text}</span></p>
                            <p><span className={cssClass}>{answer ?? 'skipped'}</span></p>
                        </li>
                    )
                })}
            </ol>
        </div>
    )
}