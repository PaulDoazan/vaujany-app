import React from 'react'
import dataGames from '../../assets/data/games.json'
import GameButton from './GameButton'

export default function GamesHome() {
    return (
        <>
            {dataGames.games.map(game => {
                return <GameButton key={game.slug} data={game} />
            })}
        </>
    )
}
