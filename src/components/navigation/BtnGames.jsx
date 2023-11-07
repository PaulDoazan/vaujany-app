import React, { useContext } from 'react'
import { NavigationContext } from '../../utils/context'

export default function BtnGames() {
    const { changePage } = useContext(NavigationContext)

    const handleClick = () => {
        changePage('games')
    }
    return (
        <div onTouchEnd={handleClick}>BtnGames</div>
    )
}
