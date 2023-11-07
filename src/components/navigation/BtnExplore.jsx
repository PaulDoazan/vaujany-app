import React from 'react'

export default function BtnExplore({ changePage }) {
    const handleClick = () => {
        changePage('explore')
    }
    return (
        <div onClick={handleClick}>BtnExplore</div>
    )
}
