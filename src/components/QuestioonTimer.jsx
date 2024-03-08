import { useEffect, useState } from 'react'

//Try to minimize the use of useEffect
export default function QuestionTimer({ timeout, onTimeout, mode }) {
    const [remainingTime, setRemainingTIme] = useState(timeout)

    useEffect(
        () => {
            const timer = setTimeout(onTimeout, timeout)
            return () => {
                clearTimeout(timer)
            }
        }, [timeout, onTimeout])

    useEffect(
        () => {
            const interval = setInterval(() => {
                setRemainingTIme((prevRemainingTime) => prevRemainingTime - 100)
            }, 100)

            console.log("remaining time", remainingTime)
            return () => {
                clearInterval(interval)
            }
        }, [])

    return (
        <progress value={remainingTime} max={timeout} className={mode} />
    )
}
