import React, { useContext } from 'react'
import { LangContext } from '../../../utils/context'

export default function FlowerCardGame({ data, cardStyle, dataOrigin }) {
    const { lang } = useContext(LangContext)

    const titleStyle = {
        backgroundColor: data.backgroundColor,
        color: data.color,
    }
    return (
        <div className={`flower__card__game drag-drop drag-drop_${data.level}`} isLocked={false} dataOriginX={dataOrigin.x} dataOriginY={dataOrigin.y} dataLevel={data.level} style={cardStyle}>
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
