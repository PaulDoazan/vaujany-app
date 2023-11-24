import React, { useContext } from 'react'
import { LangContext } from '../../../utils/context'
import pages from '../../../assets/data/pages.json'

export default function FlowerInfoGame({ data, index, handleOverlay }) {
    const { lang } = useContext(LangContext)

    const contentStyle = {
        color: data.color
    }
    return (
        <div className={`flower__info__game__overlay flower__info__game__overlay__${index}`} dataindex={index} onTouchStart={handleOverlay}>
            <div className="flower__info__game__container">
                <div className="flower__info__game__wrapper">
                    <img style={{ width: data.gameInfoResizeIcon ? data.gameInfoResizeIcon : "100%" }} className="flower__info__game__illustration" src={`images/illustrations/illustrationInfoGame_${data.slug}.png`} alt="" />
                    <img className="flower__info__game__circle" src={`images/illustrations/circleInfoGame_${data.slug}.svg`} alt="" />
                    <img className="flower__info__game__cross" src={`images/illustrations/cross_${data.slug}.svg`} alt="" />
                    <div className="flower__info__game__content" style={contentStyle}>
                        <div className="flower__info__game__title">{data[lang].title}</div>
                        <div className="flower__info__game__latin">{data.title_latin}</div>
                        <div className="flower__info__game__paragraph">
                            <p>
                                <span>{pages.flowerInfos[lang].habitat}</span> : {data[lang].habitat}
                            </p>
                        </div>
                    </div>
                </div>
            </div>
        </div >
    )
}
