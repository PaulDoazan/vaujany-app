import parse from 'html-react-parser'
import React, { useContext } from 'react'
import { ConfettiContext, NavigationContext } from '../../../../utils/context'
import dataGames from '../../../../assets/data/games.json'
import gsap from 'gsap'

export default function QuizResult({ handleRestart }) {
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
        const timeline = gsap.timeline()
        timeline.to(".quiz__result__container", { opacity: 0, pointerEvents: 'none', duration: 0.3 }).call(() => {
            handleRestart()
        }).to(".quiz__wrapper", { opacity: 1, pointerEvents: 'auto', duration: 0.3 })
        //changePage({ backgroundColor: '#E07CAD', color: '#fff', category: 'gameInstruction', element: 'quiz', level: currentPage.level, refresh: true })
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