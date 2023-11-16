import React, { useContext } from 'react'
import dataGames from '../../assets/data/games.json'
import GameButton from './GameButton'

export default function GamesHome() {
    return (
        <>
            <div className="home__container">
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
