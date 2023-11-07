import React, { useContext } from 'react'
import { NavigationContext } from '../../utils/context'

export default function BtnGames() {
    const { changePage } = useContext(NavigationContext)

    const handleClick = () => {
        changePage({ category: 'games', element: null })
    }
    return (
        <div onTouchEnd={handleClick}>BtnGames</div>
    )
}
