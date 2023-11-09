import React, { useContext } from 'react'
import { LangContext, NavigationContext } from '../../../utils/context'

export default function BtnLang({ language }) {
    const { switchLang, lang } = useContext(LangContext)
    const { currentPage } = useContext(NavigationContext)

    const handleChangeLang = () => {
        switchLang(language)
    }

    const { backgroundColor, color, fontFamily } = lang === language ? {
        fontFamily: 'Copperplate30',
        backgroundColor: currentPage.color,
        color: currentPage.backgroundColor
    } : {
        fontFamily: 'Copperplate29',
        backgroundColor: currentPage.backgroundColor,
        color: currentPage.color
    }

    return (
        <div onTouchEnd={handleChangeLang} className="btn__lang__container btn__navigation" style={{ 'fontFamily': fontFamily, 'backgroundColor': backgroundColor, 'borderColor': color, 'color': color }}>
            {language.toUpperCase()}
        </div>
    )
}
