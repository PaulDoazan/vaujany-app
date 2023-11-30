import React, { useContext, useEffect } from 'react'
import { LangContext } from '../../../../utils/context'
import flowersData from '../../../../assets/data/flowers.json'

export default function MemoryCardTitle({ flower }) {
    const { lang } = useContext(LangContext)

    const currentFlower = flowersData.flowers.find(el => el.slug === flower.slug)
    return (
        <>
            <div className="card__face card__face__back">
                <div className="card__text__back__white"></div>
                <img className='card__text__back' src={`images/flowers/memory/textBack.png`} alt="" />
            </div>
            <div className="memory__card__title card__face">
                <img className='memory__card__title__background' src={`images/icons/memoryCardTitleBackground.png`} alt="" />
                <div className="memory__card__title__text" style={{ fontSize: currentFlower[lang].title === 'Grootbloemig vingerhoedskruid' && '1.05vw' }}>
                    {currentFlower[lang].title}
                </div>
            </div>
        </>
    )
}
