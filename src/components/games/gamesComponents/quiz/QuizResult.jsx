import parse from 'html-react-parser'
import React, { useContext } from 'react'
import { ConfettiContext, NavigationContext } from '../../../../utils/context'
import dataGames from '../../../../assets/data/games.json'

export default function QuizResult() {
    const { fireConfetti } = useContext(ConfettiContext)
    const { currentPage, changePage } = useContext(NavigationContext)

    const currentGame = dataGames.games.find(el => el.slug === currentPage.element)

    const imageStyle = {
        left: currentGame.presentationDimensions.imgLeft,
        transform: currentGame.presentationDimensions.scale && `scale(${currentGame.presentationDimensions.scale})`,
        top: currentGame.presentationDimensions.imgTop && `${currentGame.presentationDimensions.imgTop}`
    }
    const handleStart = () => {
        fireConfetti(false)
        changePage({ backgroundColor: '#E07CAD', color: '#fff', category: 'gameInstruction', element: 'quiz', level: currentPage.level, refresh: true })
    }

    return (
        <div className="quiz__result__container">
            <img style={imageStyle} className="game__instructions__image" src={`images/illustrations/${currentGame.slug}.png`} alt="" />
            <div className="quiz__result__bravo">BRAVO !</div>
            <div className="quiz__result__congratulations">{parse(`Vous avez terminé le quiz avec brio&nbsp! La montagne n'a plus de secrets pour vous&nbsp!`)}</div>
            <div className="quiz__restart__button" onTouchStart={handleStart}>
                <img className="quiz__restart__button__image" src={`images/icons/quizEndBtnBackground.svg`} alt="" />
                <div className="quiz__restart__button__text">NOUVELLE PARTIE</div>
            </div>
        </div>
    )
}