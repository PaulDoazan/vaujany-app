import gsap from 'gsap'
import React, { useEffect, useRef, useState } from 'react'
import QuizTitleFlower from './QuizTitleFlower'
import QuizParagraphs from './QuizParagraphs'
import QuizChoices from './QuizChoices'
import QuizAnswerComment from './QuizAnswerComment'
import QuizNext from './QuizNext'
import QuizCount from './QuizCount'


export default function Quiz() {
    const [currentQuestionNb, setCurrentQuestionNb] = useState(0)
    const [goodAnswer, setGoodAnswer] = useState(null)
    const gameRef = useRef()

    const handleNext = () => {
        setGoodAnswer(null)
        setCurrentQuestionNb(currentQuestionNb + 1)
    }

    const handleAnswer = (value) => {
        setGoodAnswer(value)
    }

    useEffect(() => {
        gsap.fromTo('.quiz__container', { opacity: 0 }, { opacity: 1, duration: 0.5 })
    }, [])
    return (
        <div className='quiz__container'>
            <QuizTitleFlower questionNb={currentQuestionNb} />
            <QuizParagraphs questionNb={currentQuestionNb} />
            <QuizChoices questionNb={currentQuestionNb} handleAnswer={handleAnswer} goodAnswer={goodAnswer} />
            <QuizAnswerComment questionNb={currentQuestionNb} goodAnswer={goodAnswer} />
            {goodAnswer && <QuizNext handleNext={handleNext} />}
            <QuizCount questionNb={currentQuestionNb} />
        </div>
    )
}
