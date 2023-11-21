import React, { useContext } from 'react'
import { LangContext } from '../../../../utils/context'
import FlowerCardGame from '../FlowerCardGame'

export default function LevelsThumbnail({ data, index, dimensions }) {
    const { lang } = useContext(LangContext)

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

    return (
        <FlowerCardGame data={data} cardStyle={cardStyle} index={index} dataOrigin={{ x: originX, y: originY }} />
    )
}
