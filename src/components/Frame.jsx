import React, { useState, useContext } from 'react'
import Menu from './navigation/menu/Menu'
import Home from './Home'
import Explore from './exploration/Explore'
import Games from './games/Games'
import { LangProvider, NavigationProvider, NavigationContext } from '../utils/context'
import Game from './games/Game'


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
                            {currentPage.category === 'games' && <Games />}
                            {currentPage.category === 'game' && <Game />}
                        </div>
                    </div>
                </div>
            </LangProvider>
        </>
    )
}