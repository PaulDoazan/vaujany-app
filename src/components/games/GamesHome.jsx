import React, { useContext, useEffect } from 'react'
import dataGames from '../../assets/data/games.json'
import GameButton from './GameButton'
import gsap from 'gsap'
import { NavigationContext } from '../../utils/context'

export default function GamesHome() {
    const { currentPage } = useContext(NavigationContext)

    useEffect(() => {
        if (currentPage.noAnimation) return
        gsap.fromTo('.games__container', { opacity: 0 }, { opacity: 1, duration: 0.5 })
    }, [])
    return (
        <>
            <div className="games__container" style={{ opacity: currentPage.noAnimation && 1 }}>
                <div className="home__left__slice"></div>
                <img src="images/flowers/full/hypericum_richeri.jpg" alt="" className="home__image" />

                <div className="game__content">
                    {dataGames.games.map((game, index) => {
                        return <GameButton key={game.slug} data={game} index={index} />
                    })}
                </div>

            </div >
        </>
    )
}
