import React, { useContext } from 'react'
import { LangContext } from '../../../../utils/context'
import FlowerCardGame from '../FlowerCardGame'

export default function LevelsThumbnail({ data, index }) {
    const { lang } = useContext(LangContext)

    const imgWidth = 7.9
    const imgHeight = 14.3

    const cardStyle = {
        zIndex: 1,
        position: `absolute`,
        left: `80%`,
        top: `${10.5 + index * 21.4}%`,
        width: `${imgWidth}%`,
        height: `${imgHeight}%`,
    }

    return (
        <FlowerCardGame data={data} cardStyle={cardStyle} />
    )
}
