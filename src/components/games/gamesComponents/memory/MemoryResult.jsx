import parse from 'html-react-parser'
import React, { useContext, useEffect, useState } from 'react'
import { ConfettiContext, NavigationContext } from '../../../../utils/context'

export default function MemoryResult() {
    const { fireConfetti } = useContext(ConfettiContext)
    const { currentPage, changePage } = useContext(NavigationContext)
    const handleStart = () => {
        fireConfetti(false)
        changePage({ backgroundColor: '#E8D262', color: '#fff', category: 'gameInstruction', element: 'memory', level: currentPage.level, refresh: true })
    }

    return (
        <div className="memory__result__container">
            <div className="memory__result__bravo">BRAVO !</div>
            <div className="memory__result__congratulations">{parse(`Vous avez terminé le jeu avec brio ! La montagne n’a plus
                de secrets pour vous&nbsp!`)}</div>
            <div className="memory__restart__button" onTouchStart={handleStart}>
                <img className="memory__restart__button__image" src={`images/icons/memoryBtnBackground.svg`} alt="" />
                <div className="memory__restart__button__text">NOUVELLE PARTIE</div>
            </div>
        </div>
    )
}
