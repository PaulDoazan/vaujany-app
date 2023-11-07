import React from 'react'

export default function BtnGames({ changePage }) {
    const handleClick = () => {
        changePage('games')
    }
    return (
        <div onMouseDown={handleClick} onTouchDown={handleClick}>BtnGames</div>
    )
}
