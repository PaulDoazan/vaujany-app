import React, { useContext } from 'react'
import dataQuiz from './data_quiz.json'
import { LangContext } from '../../../../utils/context'

export default function QuizAnswerComment({ questionNb, goodAnswer }) {
    const { lang } = useContext(LangContext)

    return (
        <div className="quiz__answer__comment">
            {goodAnswer === false && <p>Mauvaise Réponse</p>}
            {goodAnswer === true && dataQuiz[`question_${questionNb}`][lang].explanation.paragraphs.map(el => {
                return <p>{el}</p>
            })}
        </div>
    )
}
