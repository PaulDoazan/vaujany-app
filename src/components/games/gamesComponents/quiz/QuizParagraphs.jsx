import parse from 'html-react-parser'
import React, { useContext } from 'react'
import dataQuiz from './data_quiz.json'
import { LangContext } from '../../../../utils/context'

export default function QuizParagraphs({ questionNb }) {
    const { lang } = useContext(LangContext)
    return (
        <div className="quiz__paragraphs__container">
            {dataQuiz[`question_${questionNb}`][lang].paragraphs.map(el => {
                return <div className="quiz__question__paragraph">{parse(el)}</div>
            })}
        </div>
    )
}
