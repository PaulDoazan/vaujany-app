import React, { useContext } from 'react'
import { LangContext, NavigationContext } from '../../utils/context'

export default function GameButton({ data }) {
    const { lang } = useContext(LangContext)

    const { changePage } = useContext(NavigationContext)

    const handleClick = () => {
        changePage({ category: "gameInstruction", element: data.slug })
    }

    return (
        <div onTouchEnd={handleClick}>
            {data[`title_${lang}`]}
        </div>
    )
}
