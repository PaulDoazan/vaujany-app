import React from 'react'
import dataGames from '../../assets/data/games.json'
import GameCard from './GameCard'

export default function Games() {
    return (
        <>
            {dataGames.games.map(game => {
                return <GameCard key={game.slug} data={game} />
            })}
        </>
    )
}
