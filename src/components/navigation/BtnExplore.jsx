import React from 'react'

export default function BtnExplore({ changePage }) {
    const handleClick = () => {
        changePage('explore')
    }
    return (
        <div onMouseDown={handleClick} onTouchDown={handleClick}>BtnExplore</div>
    )
}
