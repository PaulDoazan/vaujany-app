import React, { useContext } from 'react'
import { LangContext, NavigationContext } from '../../utils/context'

export default function FlowerCard({ data, index }) {
    const { lang } = useContext(LangContext)
    const { changePage } = useContext(NavigationContext)

    const handleClick = (e) => {
        e.stopPropagation();
        changePage({ category: "explore", element: data.slug })
    }

    // En  pourcentage respectif de innerWidth et innerHeight
    const originX = 4
    const originY = 7.1

    const imgWidth = 16
    const imgHeight = 21.4

    const titleWidth = index % 3 === 1 ? 12.04 : 12.03
    const titleHeight = 7.1

    const gapX = 8.2
    const gapY = 7.5

    const positionX = originX + Math.floor(index / 3) * (imgWidth + gapX)
    const positionY = originY + (index % 3) * (imgHeight + gapY)

    const imageStyle = {
        left: `${positionX}%`,
        top: `${positionY}%`,
        width: `${imgWidth}%`,
        height: `${imgHeight}%`,
    }

    const paddingTitle = 0.3
    const lineHeightTitle = 80

    const titleStyle = {
        padding: `${paddingTitle}%`,
        lineHeight: `${lineHeightTitle}%`,
        fontFamily: "Copperplate29",
        fontSize: '1.3vw',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
        left: `${positionX + imgWidth - 0.05}%`,
        top: `${positionY + imgHeight}%`,
        backgroundColor: data.backgroundColor,
        transformOrigin: 'top left',
        color: data.color,
        transform: 'rotateZ(270deg)',
        textAlign: 'center',
        width: `${titleWidth - paddingTitle * 2}%`,
        height: `${titleHeight - paddingTitle * 2}%`,
    }

    const titleLatinStyle = {
        fontFamily: "Copperplate29",
        fontSize: '80%',
    }

    // const imagePath = process.env.NODE_ENV === "production"
    //     ? "https://prod-images-cdn.com"
    //     : "http://localhost:8000";

    return (
        <div className="flower__card__wrapper" >
            <div className="flower__card__title" style={titleStyle} onTouchEnd={handleClick}>
                {data[`title_${lang}`]}<br />
                <div style={titleLatinStyle}>{data[`title_latin`]}</div>
            </div>
            <img onTouchEnd={handleClick} className="flower__card__image" src={"/images/flowers/" + data.file_name} alt="" style={imageStyle} />
        </div>
    )
}
