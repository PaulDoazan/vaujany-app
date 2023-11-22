import React from 'react'
import FlowerCardGame from '../FlowerCardGame'

export default function LevelsThumbnail({ data, index, dimensions, handleOverlay }) {
    const imgWidth = 7.9
    const imgHeight = 14.3

    const originX = dimensions.thumbnailX
    const originY = dimensions.slotY + index * dimensions.gapY

    const cardStyle = {
        zIndex: 1,
        position: `absolute`,
        left: `${originX}%`,
        top: `${originY}%`,
        width: `${imgWidth}%`,
        height: `${imgHeight}%`,
    }

    const iconStyle = {
        zIndex: 999,
        position: `absolute`,
        left: `${originX + 11}%`,
        top: `${originY - 3}%`,
        width: `3%`,
        height: 'auto',
    }

    return (
        <>
            <FlowerCardGame data={data} cardStyle={cardStyle} index={index} dataOrigin={{ x: originX, y: originY }} />
            <img className={`flower__info__icon flower__info__icon__${index}`} dataindex={index} src="images/icons/flowerInfoIcon.svg" alt="" onTouchStart={handleOverlay} style={iconStyle} />
        </>

    )
}
