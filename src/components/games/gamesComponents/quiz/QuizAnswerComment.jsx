import React, { useContext } from 'react'
import dataQuiz from './data_quiz.json'
import { LangContext } from '../../../../utils/context'

export default function QuizAnswerComment({ questionNb, goodAnswer }) {
    const { lang } = useContext(LangContext)

    return (
        <div className="quiz__answer__comment">
            {goodAnswer === false && <div className="icon__wrong__answer__container">
                <img className="icon__wrong__answer" src="images/icons/iconWrongAnswer.svg" alt="" />
            </div>}

            {goodAnswer === true && <div className="correct__answer__container">{dataQuiz[`question_${questionNb}`][lang].explanation.paragraphs.map(el => {
                return <p>{el}</p>
            })}
                <img className="icon__correct__answer" src="images/icons/iconCorrectAnswer.svg" alt="" />
            </div>
            }

        </div>
    )
}
