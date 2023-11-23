import gsap from 'gsap'
import React, { useEffect, useRef, useState } from 'react'
import QuizTitleFlower from './QuizTitleFlower'
import QuizParagraphs from './QuizParagraphs'
import QuizChoices from './QuizChoices'
import QuizAnswerComment from './QuizAnswerComment'


export default function Quiz() {
    const [currentQuestionNb, setCurrentQuestionNb] = useState(0)
    const gameRef = useRef()

    useEffect(() => {
        gsap.fromTo('.quiz__container', { opacity: 0 }, { opacity: 1, duration: 0.5 })
    }, [])
    return (
        <div className='quiz__container'>
            <QuizTitleFlower questionNb={currentQuestionNb} />
            <QuizParagraphs questionNb={currentQuestionNb} />
            <QuizChoices questionNb={currentQuestionNb} />
            <QuizAnswerComment questionNb={currentQuestionNb} />

            <div className="quiz__next__question__button">

            </div>
            <div className="quiz__count">

            </div>
        </div>
    )
}
