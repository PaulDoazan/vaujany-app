import React, { useContext } from 'react'
import { NavigationContext } from '../../utils/context'

export default function BtnExplore() {
    const { changePage } = useContext(NavigationContext)

    const handleClick = () => {
        changePage({ category: 'explore', element: null })
    }
    return (
        <div onTouchEnd={handleClick}>BtnExplore</div>
    )
}
