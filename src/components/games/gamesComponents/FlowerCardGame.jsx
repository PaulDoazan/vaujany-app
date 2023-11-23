import parse from 'html-react-parser';
import React, { useContext } from 'react'
import { LangContext, NavigationContext } from '../../../utils/context'

export default function FlowerCardGame({ toxic, data, cardStyle, dataOrigin, index, titleStyle }) {
    const { currentPage } = useContext(NavigationContext)
    const { lang } = useContext(LangContext)

    const gameTitleStyle = {
        ...titleStyle,
        backgroundColor: data.backgroundColor,
        transition: 'all 0.3s',
        color: data.color,
    }

    const cardGameStyle = {
        ...cardStyle,
        transition: 'opacity 0.3s',
        touchAction: 'none',
    }

    const cardFakeStyle = {
        ...cardStyle,
        pointerEvents: 'none',
        display: 'none'
    }

    const cardImgStyle = {
        objectPosition: `${data.thumbnailPosition ? data.thumbnailPosition : "center center"}`
    }

    const descriptionStyle = {
        position: 'absolute',
        width: '100%',
        height: '100%',
        top: '182%',
    }

    const imgStyle = {
        position: 'absolute',
        width: '25%',
        height: '25%'
    }

    return (
        <div className={`flower__card__game ${toxic ? `flower__card__fake flower__card__fake_` + index : `flower__card__game_` + index} drag-drop_${currentPage.category}`} index={index} isLocked={false} datatoxic={data.en.toxic} dataOriginX={dataOrigin.x} dataOriginY={dataOrigin.y} dataLevel={data.level} dataSlug={data.slug} style={toxic ? cardFakeStyle : cardGameStyle}>
            <div className="flower__card__game__container">
                <img style={cardImgStyle} className={`flower__card__game__image`} src={"/images/flowers/thumbnails/" + data.thumbnail} alt="" />
                <div className={`flower__card__game__title`} style={gameTitleStyle}>
                    <div className="flower__card__game__titles__container">
                        <div className="flower__card__game__title__content">
                            {data[lang].title}
                        </div>
                    </div>
                </div>
                {toxic &&
                    <div className="toxic__description" style={descriptionStyle}>
                        <img style={imgStyle} src="images/icons/redskull.svg" alt="" />
                        <div className="toxic__description__content">{parse(data[lang].toxicDescription)}</div>
                    </div>
                }
            </div>
        </div>
    )
}
