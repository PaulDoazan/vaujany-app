import React, { useState, useContext } from 'react'
import Menu from './navigation/menu/Menu'
import Home from './Home'
import Explore from './exploration/Explore'
import GamesHome from './games/GamesHome'
import { LangProvider, NavigationProvider, NavigationContext } from '../utils/context'
import GameInstruction from './games/GameInstruction'
import Memory from './games/gamesComponents/Memory'
import Quiz from './games/gamesComponents/Quiz'
import Toxic from './games/gamesComponents/Toxic'
import Levels from './games/gamesComponents/Levels'
import GuessWho from './games/gamesComponents/GuessWho'


export default function Frame({ id, arrLength }) {
    const { currentPage } = useContext(NavigationContext)

    let fullClass = `frame frame__${id}`
    if (arrLength === 4 && id < arrLength / 2) {
        fullClass += ' frame__reverse'
    } else if (arrLength === 2 && id === 0) {
        fullClass += ' frame__rotate__left'
    } else if (arrLength === 2 && id === 1) {
        fullClass += ' frame__rotate__right'
    }

    return (
        <>
            <LangProvider>
                <div className={fullClass}>
                    <div className="frame__container">
                        <div className="menu__wrapper">
                            <Menu />
                        </div>

                        <div className="home__wrapper">
                            {currentPage.category === 'home' && <Home />}
                            {currentPage.category === 'explore' && <Explore />}
                            {currentPage.category === 'gamesHome' && <GamesHome />}
                            {currentPage.category === 'gameInstruction' && <GameInstruction />}
                            {currentPage.category === 'memory' && <Memory />}
                            {currentPage.category === 'quiz' && <Quiz />}
                            {currentPage.category === 'toxic' && <Toxic />}
                            {currentPage.category === 'levels' && <Levels />}
                            {currentPage.category === 'guesswho' && <GuessWho />}
                        </div>
                    </div>
                </div>
            </LangProvider>
        </>
    )
}