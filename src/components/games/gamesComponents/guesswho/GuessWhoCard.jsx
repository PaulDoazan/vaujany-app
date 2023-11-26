import React, { useContext, useEffect, useState } from 'react'
import { LangContext } from '../../../../utils/context';

export default function GuessWhoCard({ flower, index, layout, handleTouchStart, success }) {
    const scale = layout.scale ? layout.scale : 1
    const { lang } = useContext(LangContext)
    const [revealed, setRevealed] = useState(false)
    const width = 10.7;
    const height = 14.3
    const gapX = 2.6 * (Math.pow(scale, 3))
    const gapY = gapX * 16 / 9
    const top = (height + gapY) * (Math.floor(index / (layout.cols)))

    const cardStyle = {
        pointerEvents: revealed && !success ? 'auto' : 'none',
        transition: 'transform 0.7s',
        transformStyle: 'preserve-3d',
        width: `${width}%`,
        height: `${height}%`,
        position: 'absolute',
        left: `${layout.origin.x + (index % (layout.cols)) * (width + gapX)}%`,
        top: `${layout.origin.y + top}%`
    }

    const scaleStyle = {
        width: '100%',
        height: '100%',
        backgroundColor: flower.backgroundColor,
        transform: `scale(${layout.scale ? layout.scale : 1})`
    }

    useEffect(() => {
        setTimeout(() => {
            setRevealed(true)
        }, 300 + index * 100)
    }, [])

    return (
        <div className={`guesswho__card ${!revealed ? 'guesswho__is__flipped' : ''}`} style={cardStyle} onTouchStart={handleTouchStart} slug={flower.slug}>
            <div className="guesswho__card__face guesswho__card__face__back">
                <div className="container__to__scale" style={scaleStyle}>
                    <img className='guesswho__card__image__back' src={`images/guesswho/imgBack.png`} alt="" />
                </div>
            </div>
            <div className="guesswho__card__image guesswho__card__face">
                <div className="container__to__scale" style={scaleStyle}>
                    <img className='guesswho__card__flower__image' src={`images/guesswho/${flower.thumbnailSquare}`} alt="" />
                    <div className={`guesswho__card__game__title`} style={{ backgroundColor: flower.backgroundColor }}>
                        <div className="guesswho__card__game__titles__container">
                            <div className="guesswho__card__game__title__content" style={{ color: flower.color }}>
                                {flower[lang].title}
                            </div>
                        </div>
                    </div>
                </div>
            </div>

        </div>
    )
}
