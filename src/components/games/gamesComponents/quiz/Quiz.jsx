import gsap from 'gsap'
import React, { useContext, useEffect, useRef, useState } from 'react'
import QuizTitleFlower from './QuizTitleFlower'
import QuizParagraphs from './QuizParagraphs'
import QuizChoices from './QuizChoices'
import QuizAnswerComment from './QuizAnswerComment'
import QuizNext from './QuizNext'
import QuizCount from './QuizCount'
import { ConfettiContext } from '../../../../utils/context'
import QuizResult from './QuizResult'
import { shuffleArray } from '../../../../utils/utils'

export default function Quiz() {
    const [deck, setDeck] = useState(null)
    const [count, setCount] = useState(1)
    const [currentQuestionNb, setCurrentQuestionNb] = useState(null)
    const [goodAnswer, setGoodAnswer] = useState(null)
    const { fireConfetti } = useContext(ConfettiContext)

    const restart = () => {
        const questionsMax = 8
        let questionsNbs = []
        for (let i = questionsMax - 4; i < questionsMax; i++) {
            questionsNbs.push(i)
        }
        // shuffleArray(questionsNbs)
        questionsNbs = questionsNbs.splice(0, 4)

        setCount(0)
        setDeck(questionsNbs)
        setCurrentQuestionNb(questionsNbs[0])
    }
    const handleNext = () => {
        setGoodAnswer(null)
        if (count === 3) {
            const timeline = gsap.timeline()

            timeline.to(".quiz__wrapper", {
                opacity: 0,
                pointerEvents: 'none',
                duration: 0.3
            }).to(".quiz__result__container", {
                opacity: 1,
                pointerEvents: 'auto',
                duration: 0.3
            }).call(() => {
                fireConfetti(true)
            })
        } else {
            const next = count + 1
            setCount(next)
            const nextNb = deck[next]
            setCurrentQuestionNb(nextNb)
        }
    }

    const handleAnswer = (value) => {
        setGoodAnswer(value)
    }

    useEffect(() => {
        restart()
        gsap.fromTo('.quiz__container', { opacity: 0 }, { opacity: 1, duration: 0.5 })
    }, [])
    return (
        <div className='quiz__container'>
            {currentQuestionNb !== null &&
                <div className="quiz__wrapper">
                    <QuizTitleFlower questionNb={currentQuestionNb} />
                    <QuizParagraphs questionNb={currentQuestionNb} />
                    <QuizChoices questionNb={currentQuestionNb} handleAnswer={handleAnswer} goodAnswer={goodAnswer} />
                    <QuizAnswerComment questionNb={currentQuestionNb} goodAnswer={goodAnswer} />
                    {goodAnswer && <QuizNext handleNext={handleNext} />}
                    <QuizCount questionNb={count} />
                </div>}
            <QuizResult />
        </div>
    )
}
