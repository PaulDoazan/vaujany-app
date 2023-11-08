import React, { useContext, useState } from 'react'
import { LangContext, NavigationContext } from '../../utils/context'
import dataGames from '../../assets/data/games.json'

export default function GameInstruction() {
    const { currentPage, changePage } = useContext(NavigationContext)

    const { lang } = useContext(LangContext)

    const currentGame = dataGames.games.find(el => el.slug === currentPage.element)

    const displayGame = () => {
        changePage({ category: currentGame.slug, element: currentGame.slug })
    }
    return (
        <>
            <div className="game-instructions">
                Dans le jeu{currentGame[`title_${lang}`]}
            </div>
            <div onTouchEnd={displayGame} className="btn-play">JOUER</div>
        </>
    )
}
