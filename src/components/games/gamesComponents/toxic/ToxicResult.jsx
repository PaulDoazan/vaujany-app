import parse from 'html-react-parser'
import React, { useContext } from 'react'
import { ConfettiContext, LangContext, NavigationContext } from '../../../../utils/context'
import dataGames from '../../../../assets/data/games.json'
import pages from '../../../../assets/data/pages.json'

export default function ToxicResult() {
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
        changePage({ backgroundColor: '#FFB559', color: '#fff', category: 'gameInstruction', element: 'toxic', level: currentPage.level, refresh: true })
    }

    return (
        <div className="toxic__result__container">
            <img style={imageStyle} className="game__instructions__image" src={`images/illustrations/${currentGame.slug}.png`} alt="" />
            <div className="toxic__result__bravo">{pages.gameInstruction[lang].bravo}</div>
            <div className="toxic__result__congratulations">{parse(currentGame[lang].congratulations)}</div>
            <div className="toxic__restart__button" onTouchStart={handleStart}>
                <img className="toxic__restart__button__image" src={`images/icons/toxicEndBtnBackground.svg`} alt="" />
                <div className="toxic__restart__button__text">{pages.gameInstruction[lang].newGame}</div>
            </div>
        </div>
    )
}
