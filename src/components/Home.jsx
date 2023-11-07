import React from 'react'
import BtnExplore from './navigation/BtnExplore'
import BtnGames from './navigation/BtnGames'

export default function Home() {
    return (
        <div className="home__container">
            <h1>La flore autour de Vaujany</h1>
            <BtnExplore />
            <BtnGames />
        </div>
    )
}
