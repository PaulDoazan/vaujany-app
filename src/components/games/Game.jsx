import React, { useContext } from 'react'
import { LangContext, NavigationContext } from '../../utils/context'
import dataGames from '../../assets/data/games.json'

export default function Game() {
    const { currentPage } = useContext(NavigationContext)

    const { lang } = useContext(LangContext)

    const currentGame = dataGames.games.find(el => el.slug === currentPage.element)

    return (
        <>

            Dans le jeu{currentGame[`title_${lang}`]}
        </>
    )
}
