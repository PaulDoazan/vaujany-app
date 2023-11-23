import React, { useContext } from 'react'
import dataQuiz from './data_quiz.json'
import { LangContext } from '../../../../utils/context'

export default function QuizChoices({ questionNb }) {
    const { lang } = useContext(LangContext)

    const singleChoiceTitleStyle = {
        height: '33.33 %',
        width: '100%',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center'
    }

    const handleTouch = (e) => {
        if (parseInt(e.currentTarget.getAttribute('dataindex')) === dataQuiz[`question_${questionNb}`].answer[0]) {
            console.log('correct')
        } else {
            console.log('pas correct')
        }
    }
    return (
        <div className="quiz__answer__choices">
            {dataQuiz[`question_${questionNb}`].pictures.length > 1 ?
                <div className="quiz__multi__pictures__container">

                </div>
                :
                <div className="quiz__single__picture__container">
                    <img className="quiz__single__picture" src={`images/quiz/${dataQuiz[`question_${questionNb}`].pictures[0]}`} alt="" />
                    <div className="quiz__horizontal__choices">
                        {dataQuiz[`question_${questionNb}`][lang].choiceTitles.map((el, index) => {
                            return <div style={{ ...singleChoiceTitleStyle, backgroundColor: dataQuiz[`question_${questionNb}`].backgroundColors[index] }} className="quiz__choice__title" dataindex={index} onTouchEnd={handleTouch}>{el}</div>
                        })}
                    </div>
                </div>
            }
        </div>
    )
}
