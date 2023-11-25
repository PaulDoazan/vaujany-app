import React, { useContext, useState } from 'react'
import dataGames from '../../../../assets/data/games.json'
import { LangContext, NavigationContext } from '../../../../utils/context'

export default function GuessWhoQuestions() {
    const [listPosition, setListPosition] = useState(0)
    const { lang } = useContext(LangContext)
    const { currentPage } = useContext(NavigationContext)

    const currentGame = dataGames.games.find(el => el.slug === currentPage.element)

    const handleListPosition = (e) => {
        if (e.currentTarget.classList.contains('questions__top__btn')) {
            let newPosition = listPosition + 1
            if (newPosition > 1) return
            setListPosition(newPosition)
        } else {
            let newPosition = listPosition - 1
            if (newPosition < -9) return
            setListPosition(newPosition)
        }
    }

    const listStyle = {
        transition: 'all 0.3s',
        transform: `translateY(${listPosition * 9}%)`
    }
    return (
        <div className="questions__container">
            <div className="questions__list__wrapper">
                <div className="questions__list" style={listStyle}>
                    {currentGame[lang].questions.map(el => {
                        return <div className="guesswho__question">{el}</div>
                    })}
                </div>

            </div>
            <div className="questions__fog__top"></div>
            <div className="questions__fog__bottom"></div>
            <img className="questions__top__btn" src="images/guesswho/arrowQuestionBtn.svg" alt="" onTouchStart={handleListPosition} />
            <img className="questions__bottom__btn" src="images/guesswho/arrowQuestionBtn.svg" alt="" onTouchStart={handleListPosition} />
        </div>
    )
}
