import parse from 'html-react-parser'
import React, { useContext } from 'react'
import dataQuiz from './data_quiz.json'
import { LangContext } from '../../../../utils/context'

export default function QuizTitleFlower({ questionNb }) {
    const { lang } = useContext(LangContext)
    return (
        <div className="quiz__title__flower">
            {parse(dataQuiz[`question_${questionNb}`][lang].title)}
        </div>
    )
}
