import React, { useContext, useEffect, useState } from 'react'
import { LangContext } from '../../../../utils/context';

export default function GuessWhoCard({ flower, index, layout, handleTouchStart, success }) {
    const scale = layout.scale ? layout.scale : 1
    const { lang } = useContext(LangContext)
    const [revealed, setRevealed] = useState(false)
    const [preserve3d, setPreserve3d] = useState(true)

    const width = 10.7;
    const height = 14.3
    const gapX = 2.6 * (Math.pow(scale, 3))
    const gapY = gapX * 16 / 9
    const top = (height + gapY) * (Math.floor(index / (layout.cols)))

    const cardStyle = {
        pointerEvents: revealed && !success ? 'auto' : 'none',
        transition: 'transform 0.7s',
        transformStyle: preserve3d ? 'preserve-3d' : 'flat',
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

    const iconStyle = {
        position: `absolute`,
        left: `88%`,
        top: `-45%`,
        width: `30%`,
        // height: 'auto',
    }

    useEffect(() => {
        setTimeout(() => {
            setRevealed(true)
        }, 300 + index * 100)
    }, [])

    const handleTouch = (e) => {
        setPreserve3d(true)
        handleTouchStart(e)
    }

    const handleTransitionEnd = (e) => {
        if (e.currentTarget.classList.contains('guesswho__is__flipped')) {
            setPreserve3d(true)
        } else {
            setPreserve3d(false)
        }
    }

    const handleOverlay = (e) => {
        e.stopPropagation()
    }

    return (
        <div className={`guesswho__card ${!revealed ? 'guesswho__is__flipped' : ''}`} onTransitionEnd={handleTransitionEnd} style={cardStyle} onTouchStart={handleTouch} slug={flower.slug}>
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
                    <img className={`flower__info__icon flower__info__icon__${index}`} dataindex={index} src="images/icons/flowerInfoIcon.svg" alt="" onTouchStart={handleOverlay} style={iconStyle} />
                </div>
            </div>

        </div>
    )
}
