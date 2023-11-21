import React, { useContext } from 'react'
import pages from '../../../../assets/data/pages.json'
import { LangContext } from '../../../../utils/context'

export default function LevelsSlot({ index, dimensions }) {
    const { lang } = useContext(LangContext)

    const slotStyle = {
        position: `absolute`,
        width: `12.1%`,
        height: `14.3%`,
        left: `${dimensions.slotX}%`,
        top: `${dimensions.slotY + index * dimensions.gapY}%`
    }

    const descriptionStyle = {
        position: `absolute`,
        left: `56.25%`,
        top: `${dimensions.slotY + index * dimensions.gapY}%`
    }

    return (
        <div className="levels__slot__container">
            <img className={`dropzone_${index}`} src="images/icons/levelsSlot.jpg" alt="" style={slotStyle} />
            <div className="levels__slot__description" style={descriptionStyle}>
                <div className="levels__slot__title">{pages.levels[lang].slots[index].title}</div>
                <div className="levels__slot__height">{pages.levels[lang].slots[index].height}</div>
            </div>
        </div>
    )
}
