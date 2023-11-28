import parse from 'html-react-parser'
import React, { useContext } from 'react'
import { ConfettiContext, LangContext, NavigationContext } from '../../../../utils/context'
import pages from '../../../../assets/data/pages.json'
import dataGames from '../../../../assets/data/games.json'

export default function LevelsResult() {
    const { fireConfetti } = useContext(ConfettiContext)
    const { lang } = useContext(LangContext)
    const { currentPage, changePage } = useContext(NavigationContext)

    const currentGame = dataGames.games.find(el => el.slug === currentPage.element)

    const handleStart = () => {
        fireConfetti(false)
        changePage({ backgroundColor: '#D5C389', color: '#fff', category: 'gameInstruction', element: 'levels', level: currentPage.level, refresh: true })
    }

    return (
        <div className="levels__result__container">
            <div className="memory__result__bravo">{pages.gameInstruction[lang].bravo}</div>
            <div className="memory__result__congratulations">{parse(currentGame[lang].congratulations)}</div>
            <div className="memory__restart__button" onTouchStart={handleStart}>
                <img className="levels__restart__button__image" src={`images/icons/levelsEndBtnBackground.svg`} alt="" />
                <div className="memory__restart__button__text">{pages.gameInstruction[lang].newGame}</div>
            </div>
        </div>
    )
}