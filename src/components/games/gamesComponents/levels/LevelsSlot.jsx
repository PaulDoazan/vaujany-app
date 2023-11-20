import React, { useContext } from 'react'
import pages from '../../../../assets/data/pages.json'
import { LangContext } from '../../../../utils/context'

export default function LevelsSlot({ index }) {
    const { lang } = useContext(LangContext)

    const slotStyle = {
        position: `absolute`,
        width: `12.1%`,
        height: `14.3%`,
        left: `42.8%`,
        top: `${10.5 + index * 21.4}%`
    }

    const descriptionStyle = {
        position: `absolute`,
        left: `56.25%`,
        top: `${10.5 + index * 21.4}%`
    }
    return (
        <div className="levels__slot__container">
            <img className="dropzone yes-drop" src="images/icons/levelsSlot.jpg" alt="" style={slotStyle} />
            <div className="levels__slot__description" style={descriptionStyle}>
                <div className="levels__slot__title">{pages.levels[lang].slots[index].title}</div>
                <div className="levels__slot__height">{pages.levels[lang].slots[index].height}</div>
            </div>
        </div>
    )
}
