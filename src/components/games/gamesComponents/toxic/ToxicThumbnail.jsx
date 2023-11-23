import React, { useContext } from 'react'
import FlowerCardGame from '../FlowerCardGame'
import { NavigationContext } from '../../../../utils/context'

const positions = {
    level_0: [
        { x: 12, y: 20 }, { x: 25, y: 20 }, { x: 38, y: 20 }, { x: 51, y: 20 },
        { x: 12, y: 40 }, { x: 25, y: 40 }, { x: 38, y: 40 }, { x: 51, y: 40 },
        { x: 18.5, y: 60 }, { x: 31.5, y: 60 }, { x: 44.5, y: 60 }],
    level_1: [
        { x: 7, y: 20 }, { x: 20, y: 20 }, { x: 33, y: 20 }, { x: 46, y: 20 }, { x: 59, y: 20 },
        { x: 7, y: 40 }, { x: 20, y: 40 }, { x: 33, y: 40 }, { x: 46, y: 40 }, { x: 59, y: 40 },
        { x: 10, y: 60 }, { x: 20, y: 60 }, { x: 30, y: 60 }, { x: 40, y: 60 }, { x: 50, y: 60 }, { x: 60, y: 60 }
    ],
    level_2: [
        { x: 6, y: 20 }, { x: 17, y: 18 }, { x: 28, y: 16 }, { x: 39, y: 18 }, { x: 50, y: 19 }, { x: 61, y: 20 },
        { x: 6, y: 40 }, { x: 17, y: 40 }, { x: 28, y: 40 }, { x: 39, y: 40 }, { x: 50, y: 40 }, { x: 61, y: 40 },
        { x: 8, y: 60 }, { x: 20, y: 60 }, { x: 32, y: 60 }, { x: 44, y: 60 }, { x: 56, y: 60 },
        { x: 17, y: 75 }, { x: 28, y: 77 }, { x: 39, y: 78 }, { x: 50, y: 75 }
    ]
}

export default function ToxicThumbnail({ data, index }) {
    const { currentPage } = useContext(NavigationContext)
    const imgWidth = 7.9
    const imgHeight = 16.2

    const posNeg = index % 2 ? 1 : -1

    const originX = positions[`level_${currentPage.level}`][index].x + posNeg * (Math.random() * 1)
    const originY = positions[`level_${currentPage.level}`][index].y + posNeg * (Math.random() * 4)

    const rotation = (10 + Math.random() * 20) * posNeg

    const cardStyle = {
        zIndex: 1,
        position: `absolute`,
        left: `${originX}%`,
        top: `${originY}%`,
        width: `${imgWidth}%`,
        height: `${imgHeight}%`,
        transform: `rotateZ(${rotation}deg)`,
        transition: 'transform 0.5s'
    }

    const cardInfoStyle = {
        position: `absolute`,
        width: `${imgWidth}%`,
        height: `${imgHeight}%`,
    }

    const titleStyle = {
        width: '111.7%',
        height: '41%',
        left: '90.5%',
        top: '4.8%',
    }

    return (
        <>
            <FlowerCardGame data={data} cardStyle={cardStyle} titleStyle={titleStyle} index={index} dataOrigin={{ x: originX, y: originY }} />
            {data.en.toxic && <FlowerCardGame toxic={data.en.toxic} data={data} cardStyle={cardInfoStyle} titleStyle={titleStyle} index={index} dataOrigin={{ x: originX, y: originY }} />}
        </>
    )
}
