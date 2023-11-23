import React from 'react'
import FlowerCardGame from '../FlowerCardGame'

export default function ToxicThumbnail({ data, index, coords }) {
    const imgWidth = 7.9
    const imgHeight = 14.3

    const originX = coords.x
    const originY = coords.y

    const cardStyle = {
        zIndex: 1,
        position: `absolute`,
        left: `${originX}%`,
        top: `${originY}%`,
        width: `${imgWidth}%`,
        height: `${imgHeight}%`,
    }
    return (
        <FlowerCardGame data={data} cardStyle={cardStyle} index={index} dataOrigin={{ x: originX, y: originY }} />
    )
}
