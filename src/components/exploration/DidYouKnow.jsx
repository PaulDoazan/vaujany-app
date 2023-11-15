import React, { useState } from 'react'
import navigation_configs from '../../config/navigation_configs.json'

export default function DidYouKnow({ currentFlower, lang }) {
    const [visible, setVisible] = useState(true)
    const containerStyle = {
        color: currentFlower.color,
        top: currentFlower[lang].didYouKnow.dimensions.top
    }

    const handleClick = () => {
        setVisible(!visible)
    }

    return (
        <div onTouchStart={handleClick} className="didYouKnow__wrapper" style={{
            left: currentFlower[lang].didYouKnow.dimensions && currentFlower[lang].didYouKnow.dimensions.left && currentFlower[lang].didYouKnow.dimensions.left
        }}>
            <div className='didYouKnow__container' style={containerStyle}>
                <img style={
                    {
                        opacity: visible ? 1 : 0,
                        width: currentFlower[lang].didYouKnow.dimensions && currentFlower[lang].didYouKnow.dimensions.imgWidth && currentFlower[lang].didYouKnow.dimensions.imgWidth
                    }
                } className="didYouKnow__image" src={`/images/flowers/didYouKnow/${currentFlower[lang].didYouKnow.image}`} />
                <img style={{
                    width: currentFlower[lang].didYouKnow.dimensions && currentFlower[lang].didYouKnow.dimensions.imgWidth && currentFlower[lang].didYouKnow.dimensions.imgWidth
                }} className="didYouKnow__image" src={`/images/flowers/didYouKnow/${currentFlower[lang].didYouKnow.imageEmpty}`} />
                <div className="didYouKnow__paragraphs__container" style={{
                    width: currentFlower[lang].didYouKnow.dimensions.width,
                    top: currentFlower[lang].didYouKnow.dimensions && currentFlower[lang].didYouKnow.dimensions.containerTop && currentFlower[lang].didYouKnow.dimensions.containerTop,
                    opacity: visible ? 1 : 0
                }}>
                    {currentFlower[lang].didYouKnow.paragraphs.map((p, index) => {
                        return <div key={index} className={`didYouKnow__paragraph didYouKnow__p__${index}`} style={{ width: index === 2 && currentFlower[lang].didYouKnow.dimensions && currentFlower[lang].didYouKnow.dimensions.thirdParagraphWidth && currentFlower[lang].didYouKnow.dimensions.thirdParagraphWidth }}>
                            {p}
                        </div>
                    })}
                </div>

            </div>
            <div className="didYouKnow__question" style={{ color: currentFlower.color === "#000" ? currentFlower.color : currentFlower.backgroundColor, left: currentFlower[lang].didYouKnow.dimensions && currentFlower[lang].didYouKnow.dimensions.questionLeft ? currentFlower[lang].didYouKnow.dimensions.questionLeft : '25vw' }}>{navigation_configs.flowerInfos[lang].didYouKnow}</div>
        </div>
    )
}
