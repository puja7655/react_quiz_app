import { useEffect, useState } from 'react'

export default function QuestionTimer({ timeout, onTimeout }) {
    const [remainingTime, setRemainingTIme] = useState(timeout)

    useEffect(() => {
        console.log("timeout")
        const timer = setTimeout(onTimeout, timeout)
        return () => {
            clearTimeout(timer)
        }
    }, [timeout, onTimeout])

    useEffect(() => {
        console.log("timeinterval")
        const interval = setInterval(() => {
            setRemainingTIme((prevRemainingTime) => prevRemainingTime - 100)
        }, 100)

        console.log("remaining time", remainingTime)
        return () => {
            clearInterval(interval)
        }
    }, [])
    return (
        <progress value={remainingTime} max={timeout} />
    )
}