import React, { useContext, useEffect, useRef, useState } from 'react'
import { LangContext, NavigationContext } from '../../utils/context'
import dataGames from '../../assets/data/games.json'
import navigation_configs from '../../config/navigation_configs.json'
import gsap from 'gsap'

export default function GameInstruction() {
    const { currentPage, changePage } = useContext(NavigationContext)

    const { lang } = useContext(LangContext)

    const currentGame = dataGames.games.find(el => el.slug === currentPage.element)
    // const animation = useRef()

    const displayGame = () => {
        // animation.current = gsap.timeline()
        // animation.current.to('.game__instructions__container', { opacity: 0, duration: 0.5 }).call(() => {
        //     changePage({ category: currentGame.slug, element: currentGame.slug })
        // })
        changePage({ category: currentGame.slug, element: currentGame.slug })
    }

    const contentStyle = {
        bottom: currentGame.presentationDimensions.bottom
    }

    const imageStyle = {
        left: currentGame.presentationDimensions.imgLeft,
        transform: currentGame.presentationDimensions.scale && `scale(${currentGame.presentationDimensions.scale})`,
        top: currentGame.presentationDimensions.imgTop && `${currentGame.presentationDimensions.imgTop}`
    }

    useEffect(() => {
        gsap.fromTo('.game__instructions__container', { opacity: 0 }, { opacity: 1, duration: 0.5 })
    }, [])

    return (
        <>
            <div className="game__instructions__container">
                <img style={imageStyle} className="game__instructions__image" src={`images/illustrations/${currentGame.slug}.png`} alt="" />
                <div className="game__instructions__content" style={contentStyle}>
                    <div className="game__instructions__title">
                        {currentGame[lang].title}
                    </div>
                    <div className="game__instructions__rules__title">
                        {navigation_configs.gameInstruction[lang].rulesTitle}
                    </div>
                    <div className="game__instructions__goals">
                        {currentGame[lang].goal}
                    </div>
                    <div onTouchEnd={displayGame} className="btn-play">JOUER</div>
                </div>
            </div>

        </>
    )
}
