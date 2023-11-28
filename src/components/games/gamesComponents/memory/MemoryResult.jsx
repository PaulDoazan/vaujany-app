import parse from 'html-react-parser'
import React, { useContext, useEffect, useState } from 'react'
import { ConfettiContext, LangContext, NavigationContext } from '../../../../utils/context'
import dataGames from '../../../../assets/data/games.json'
import pages from '../../../../assets/data/pages.json'


export default function MemoryResult() {
    const { fireConfetti } = useContext(ConfettiContext)
    const { lang } = useContext(LangContext)
    const { currentPage, changePage } = useContext(NavigationContext)

    const currentGame = dataGames.games.find(el => el.slug === currentPage.element)

    const imageStyle = {
        left: currentGame.presentationDimensions.imgLeft,
        transform: currentGame.presentationDimensions.scale && `scale(${currentGame.presentationDimensions.scale})`,
        top: currentGame.presentationDimensions.imgTop && `${currentGame.presentationDimensions.imgTop}`
    }

    const handleStart = () => {
        fireConfetti(false)
        changePage({ backgroundColor: '#E8D262', color: '#fff', category: 'gameInstruction', element: 'memory', level: currentPage.level, refresh: true })
    }

    return (
        <div className="memory__result__container">
            <img style={imageStyle} className="game__instructions__image" src={`images/illustrations/${currentGame.slug}.png`} alt="" />
            <div className="memory__result__bravo">{pages.gameInstruction[lang].bravo}</div>
            <div className="memory__result__congratulations">{parse(currentGame[lang].congratulations)}</div>
            <div className="memory__restart__button" onTouchStart={handleStart}>
                <img className="memory__restart__button__image" src={`images/icons/memoryBtnBackground.svg`} alt="" />
                <div className="memory__restart__button__text">{pages.gameInstruction[lang].newGame}</div>
            </div>
        </div>
    )
}
