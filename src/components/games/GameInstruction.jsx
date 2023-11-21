import parse from 'html-react-parser';
import React, { useContext, useEffect, useRef, useState } from 'react'
import { LangContext, NavigationContext } from '../../utils/context'
import dataGames from '../../assets/data/games.json'
import pages from '../../assets/data/pages.json'
import gsap from 'gsap'

export default function GameInstruction() {
    const { currentPage, changePage } = useContext(NavigationContext)
    const { lang } = useContext(LangContext)

    if (currentPage.refresh) {
        changePage({ ...currentPage, category: currentPage.element, refresh: null })
    }

    const currentGame = dataGames.games.find(el => el.slug === currentPage.element)

    const displayGame = (e, level) => {
        changePage({ category: currentGame.slug, element: currentGame.slug, level: level })
    }

    const contentStyle = {
        bottom: currentGame.presentationDimensions.bottom
    }

    const btnStyle = {
        bottom: currentGame.presentationDimensions.bottom
    }

    const imageStyle = {
        left: currentGame.presentationDimensions.imgLeft,
        transform: currentGame.presentationDimensions.scale && `scale(${currentGame.presentationDimensions.scale})`,
        top: currentGame.presentationDimensions.imgTop && `${currentGame.presentationDimensions.imgTop}`
    }

    useEffect(() => {
        if (currentPage.refresh) return
        gsap.fromTo('.game__instructions__container', { opacity: 0 }, { opacity: 1, duration: 0.5 })
    }, [])

    // top: `${66 + index * 8}%`,

    return (
        <>
            <div className="game__instructions__container">
                <img style={imageStyle} className="game__instructions__image" src={`images/illustrations/${currentGame.slug}.png`} alt="" />
                <div className="game__instructions__content" style={contentStyle}>
                    <div className="game__instructions__title">
                        {currentGame[lang].title}
                    </div>
                    <div className="game__instructions__rules__title">
                        {pages.gameInstruction[lang].rulesTitle}
                    </div>
                    <div className="game__instructions__goals">
                        {currentGame[lang].goal}
                    </div>
                    <div className="game__instructions__explanation">
                        {currentGame[lang].explanation.map((el, index) => {
                            return <p key={index}>{parse(el)}</p>
                        })
                        }
                    </div>
                    {currentGame[lang].examples &&
                        <div className="game__instructions__examples">
                            {currentGame[lang].examples.map((el, index) => {
                                return <p key={index}>{parse(el)}</p>
                            })
                            }
                        </div>
                    }
                </div>
                {currentGame.btnPlayBackground ?
                    <div onTouchEnd={displayGame} className="game__instructions__btn__play" style={btnStyle}>
                        <img className="game__instructions__btn__play__image" src={`images/icons/${currentGame.btnPlayBackground}`} alt="" />
                        <div className="game__instructions__btn__play__title">{pages.gameInstruction[lang].play}</div>
                    </div> : currentGame.btnLevelsBackground.map((el, index, arr) => {
                        return <div key={index} onTouchEnd={(e) => { displayGame(e, index) }} className="game__instructions__btn__level" style={{ marginBottom: `${(arr.length - index - 1) * 5}%`, ...btnStyle }}>
                            <img className="game__instructions__btn__level__image" src={`images/icons/${currentGame.btnLevelsBackground[index]}.svg`} alt="" />
                            <div className="game__instructions__btn__level__title">{pages.gameInstruction[lang].levels[index]}</div>
                        </div>
                    })
                }
            </div>
        </>
    )
}
