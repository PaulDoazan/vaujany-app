import React, { useContext } from 'react'
import { LangContext } from '../../../../utils/context'

export default function QuizNext({ handleNext }) {
    const { lang } = useContext(LangContext)

    return (
        <div className="quiz__next__question__button" onTouchEnd={handleNext}>
            <div className="quiz__next__text">Question suivante</div>
            <img className="quiz__next__icon" src="images/icons/iconNextQuestion.png" alt="" />
        </div>
    )
}
