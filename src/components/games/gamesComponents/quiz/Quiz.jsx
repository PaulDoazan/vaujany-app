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
    const [allAnswers, setAllAnswers] = useState([])
    const [deck, setDeck] = useState(null)
    const [count, setCount] = useState(1)
    const [currentQuestionNb, setCurrentQuestionNb] = useState(null)
    const [goodAnswer, setGoodAnswer] = useState(null)
    const { fireConfetti } = useContext(ConfettiContext)

    const restart = () => {
        let selectedAnswers
        if (allAnswers.length === 0) {
            const questionsMax = 12

            let questionsNbs = []
            for (let i = 0; i < questionsMax; i++) {
                questionsNbs.push(i)
            }
            // shuffleArray(questionsNbs)
            selectedAnswers = questionsNbs.splice(0, 4)
            setAllAnswers(questionsNbs)
        } else {
            selectedAnswers = allAnswers.splice(0, 4)
            setAllAnswers(allAnswers)
        }

        setCount(0)
        setDeck(selectedAnswers)
        setCurrentQuestionNb(selectedAnswers[0])
    }

    const handleNext = () => {
        const timeline = gsap.timeline()
        if (count === 3) {
            timeline.to(".quiz__wrapper", {
                opacity: 0,
                pointerEvents: 'none',
                duration: 0.3
            }).to(".quiz__result__container", {
                opacity: 1,
                pointerEvents: 'auto',
                duration: 0.3
            }).call(() => {
                setGoodAnswer(null)
                fireConfetti(true)
            })
        } else {
            timeline
                .to(".quiz__title__flower", {
                    opacity: 0,
                    pointerEvents: 'none',
                    duration: 0.5
                })
                .to(".quiz__paragraphs__container", {
                    opacity: 0,
                    pointerEvents: 'none',
                    duration: 0.5
                }, `-=0.5`)
                .to(".quiz__answer__choices", {
                    opacity: 0,
                    pointerEvents: 'none',
                    duration: 0.5
                }, `-=0.5`)
                .to(".quiz__answer__comment", {
                    opacity: 0,
                    pointerEvents: 'none',
                    duration: 0.5
                }, `-=0.5`)
                .to(".quiz__next__question__button", {
                    opacity: 0,
                    pointerEvents: 'none',
                    duration: 0.5
                }, `-=0.5`)
                .call(() => {
                    setGoodAnswer(null)
                    const next = count + 1
                    setCount(next)
                    const nextNb = deck[next]
                    setCurrentQuestionNb(nextNb)
                })
                .to(".quiz__title__flower", {
                    opacity: 1,
                    pointerEvents: 'auto',
                    duration: 0.5
                })
                .to(".quiz__paragraphs__container", {
                    opacity: 1,
                    pointerEvents: 'auto',
                    duration: 0.5
                }, `-=0.5`)
                .to(".quiz__answer__choices", {
                    opacity: 1,
                    pointerEvents: 'auto',
                    duration: 0.5
                }, `-=0.5`)
                .to(".quiz__answer__comment", {
                    opacity: 1,
                    pointerEvents: 'auto',
                    duration: 0.5
                }, `-=0.5`)
                .to(".quiz__next__question__button", {
                    opacity: 1,
                    pointerEvents: 'auto',
                    duration: 0.5
                }, `-=0.5`)
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
            <QuizResult handleRestart={restart} />
        </div>
    )
}
