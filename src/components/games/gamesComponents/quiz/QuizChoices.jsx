import parse from 'html-react-parser'
import React, { useContext, useState } from 'react'
import dataQuiz from './data_quiz.json'
import { LangContext } from '../../../../utils/context'

export default function QuizChoices({ questionNb, handleAnswer, goodAnswer }) {
    const [currentChoice, setCurrentChoice] = useState(null)
    const { lang } = useContext(LangContext)

    const singleChoiceTitleStyle = {
        height: '33.33 %',
        width: '100%',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        textTransform: 'uppercase',
        textAlign: 'center'
    }

    const handleTouch = (e) => {
        setCurrentChoice(parseInt(e.currentTarget.getAttribute('dataindex')))
        if (dataQuiz[`question_${questionNb}`].answer.includes(parseInt(e.currentTarget.getAttribute('dataindex')))) {
            handleAnswer(true)
        } else {
            handleAnswer(false)
        }
    }

    return (
        <div className="quiz__answer__choices">
            {dataQuiz[`question_${questionNb}`].pictures.length > 1 ?
                <div className="quiz__pictures__container">
                    {dataQuiz[`question_${questionNb}`].pictures.map((el, index) => {
                        return <div className="quiz__picture__with__title" style={{ opacity: index === currentChoice || goodAnswer === null ? 1 : 0.5 }} dataindex={index} onTouchEnd={handleTouch}>
                            <div className="multi__picture__title" style={{ backgroundColor: dataQuiz[`question_${questionNb}`].backgroundColors[index] }}>
                                {dataQuiz[`question_${questionNb}`][lang].choiceTitles[index]}
                            </div>
                            <img className="multi__picture__image" src={`images/quiz/${el}`} alt="" />
                        </div>
                    })}
                </div>
                :
                <div className="quiz__pictures__container">
                    <img className="quiz__single__picture" src={`images/quiz/${dataQuiz[`question_${questionNb}`].pictures[0]}`} alt="" />
                    <div className="quiz__horizontal__choices">
                        {dataQuiz[`question_${questionNb}`][lang].choiceTitles.map((el, index) => {
                            return <div style={{ ...singleChoiceTitleStyle, backgroundColor: dataQuiz[`question_${questionNb}`].backgroundColors[index], opacity: index === currentChoice || goodAnswer === null ? 1 : 0.4 }} className="quiz__choice__title" dataindex={index} onTouchEnd={handleTouch}>{el}</div>
                        })}
                    </div>
                </div>
            }
        </div>
    )
}
