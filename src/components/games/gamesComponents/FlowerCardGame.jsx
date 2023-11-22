import React, { useContext, useState } from 'react'
import { LangContext, NavigationContext } from '../../../utils/context'

export default function FlowerCardGame({ data, cardStyle, dataOrigin, index }) {
    const { currentPage } = useContext(NavigationContext)
    const { lang } = useContext(LangContext)

    const titleStyle = {
        backgroundColor: data.backgroundColor,
        color: data.color,
    }

    const cardGameStyle = {
        ...cardStyle,
        touchAction: 'none'
    }

    return (
        <div className={`flower__card__game drag-drop_${currentPage.category}`} index={index} isLocked={false} dataOriginX={dataOrigin.x} dataOriginY={dataOrigin.y} dataLevel={data.level} dataSlug={data.slug} style={cardGameStyle}>
            <div className="flower__card__game__container">
                <img className={`flower__card__game__image`} src={"/images/flowers/thumbnails/" + data.thumbnail} alt="" />
                <div className={`flower__card__game__title`} style={titleStyle}>
                    <div className="flower__card__game__titles__container">
                        <div className="flower__card__game__title__content">
                            {data[lang].title}
                        </div>
                        {/* <div className="flower__card__game__title__latin__content" style={titleLatinStyle}>{data[`title_latin`]}</div> */}
                    </div>
                </div>
            </div>
        </div>
    )
}
