import React, { useContext } from 'react'
import { LangContext, NavigationContext } from '../../utils/context'

export default function GameButton({ data, index }) {
    const { lang } = useContext(LangContext)
    const { changePage } = useContext(NavigationContext)

    const handleClick = () => {
        changePage({ category: "gameInstruction", element: data.slug })
    }

    const styleGameButton = {
        top: `${(index % 3 + Math.floor(index / 3)) * 16}%`,
        left: `${Math.floor(index / 3) * 24}%`
    }

    return (
        <div className='game__button' onTouchEnd={handleClick} style={styleGameButton}>
            <img className="game__button__bg__image" src={`images/icons/${data.slug}BtnBackground.svg`} alt="" />
            <div className="game__button__text__container" style={{ width: index === 1 && '63%' }}>
                <div className="game__button__title">
                    {data[lang].title}
                </div>
                <div className="game__button__description">
                    {data[lang].description}
                </div>
            </div>
            <img className="game__button__image" src={`images/icons/${data.slug}IconBtn.png`} alt="" />
        </div>
    )
}
