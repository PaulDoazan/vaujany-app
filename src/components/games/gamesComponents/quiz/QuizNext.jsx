import React, { useContext } from 'react'
import { LangContext } from '../../../../utils/context'
import pages from '../../../../assets/data/pages.json'

export default function QuizNext({ handleNext }) {
    const { lang } = useContext(LangContext)

    return (
        <div className="quiz__next__question__button" onTouchEnd={handleNext}>
            <div className="quiz__next__text">{pages.quiz[lang].next}</div>
            <img className="quiz__next__icon" src="images/icons/iconNextQuestion.png" alt="" />
        </div>
    )
}
