import React, { useContext, useState } from 'react'
import Menu from './navigation/menu/Menu'
import Home from './Home'
import Explore from './exploration/Explore'
import GamesHome from './games/GamesHome'
import { ConfettiProvider, LangProvider, NavigationContext } from '../utils/context'
import GameInstruction from './games/GameInstruction'
import Memory from './games/gamesComponents/memory/Memory'
import Quiz from './games/gamesComponents/quiz/Quiz'
import Toxic from './games/gamesComponents/toxic/Toxic'
import Levels from './games/gamesComponents/levels/Levels'
import GuessWho from './games/gamesComponents/guesswho/GuessWho'
import Confettis from './games/gamesComponents/Confettis'
import CancelPage from './navigation/menu/CancelPage'


export default function Frame({ id, arrLength }) {
    const [displayCancel, setDisplayCancel] = useState(false)
    const { currentPage } = useContext(NavigationContext)

    let fullClass = `frame frame__${id}`
    if (arrLength === 4 && id < arrLength / 2) {
        fullClass += ' frame__reverse'
    } else if (arrLength === 2 && id === 0) {
        fullClass += ' frame__rotate__left'
    } else if (arrLength === 2 && id === 1) {
        fullClass += ' frame__rotate__right'
    }

    const handleCancel = (value) => {
        setDisplayCancel(value)
    }

    return (
        <>
            <LangProvider>
                <div className={fullClass}>
                    <ConfettiProvider>
                        <div className="frame__container">
                            <div className="home__wrapper">
                                {currentPage.category === 'home' && <Home />}
                                {currentPage.category === 'explore' && <Explore id={id} />}
                                {currentPage.category === 'gamesHome' && <GamesHome />}
                                {currentPage.category === 'gameInstruction' && <GameInstruction />}
                                {currentPage.category === 'memory' && <Memory />}
                                {currentPage.category === 'quiz' && <Quiz />}
                                {currentPage.category === 'toxic' && <Toxic />}
                                {currentPage.category === 'levels' && <Levels />}
                                {currentPage.category === 'guesswho' && <GuessWho />}
                            </div>
                            <Confettis canvasId={id} />
                            {displayCancel && <CancelPage nextPage={displayCancel} handleCancel={handleCancel} />}
                            <div className="menu__wrapper">
                                <Menu handleCancel={handleCancel} />
                            </div>

                        </div>
                    </ConfettiProvider>
                </div>
            </LangProvider>
        </>
    )
}