import React from 'react'

export default function BtnExplore({ changePage }) {
    const handleClick = () => {
        changePage('explore')
    }
    return (
        <div onMouseDown={handleClick} onTouchStart={handleClick}>BtnExplore</div>
    )
}
