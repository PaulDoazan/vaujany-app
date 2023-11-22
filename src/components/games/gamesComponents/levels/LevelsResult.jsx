import parse from 'html-react-parser'
import React, { useContext, useEffect, useState } from 'react'
import { ConfettiContext, NavigationContext } from '../../../../utils/context'

export default function LevelsResult() {
    const { fireConfetti } = useContext(ConfettiContext)
    const { currentPage, changePage } = useContext(NavigationContext)
    const handleStart = () => {
        fireConfetti(false)
        changePage({ backgroundColor: '#D5C389', color: '#fff', category: 'gameInstruction', element: 'levels', level: currentPage.level, refresh: true })
    }

    return (
        <div className="levels__result__container">
            <div className="memory__result__bravo">BRAVO !</div>
            <div className="memory__result__congratulations">{parse(`Vous avez réussi à placer toutes les plantes dans leur habitat naturel&nbsp!`)}</div>
            <div className="memory__restart__button" onTouchStart={handleStart}>
                <img className="levels__restart__button__image" src={`images/icons/levelsEndBtnBackground.svg`} alt="" />
                <div className="memory__restart__button__text">NOUVELLE PARTIE</div>
            </div>
        </div>
    )
}