import React, { useContext } from 'react'
import { LangContext } from '../../../utils/context'

export default function BtnLang({ language }) {
    const { switchLang } = useContext(LangContext)

    const handleChangeLang = () => {
        switchLang(language)
    }

    return (
        <div onTouchEnd={handleChangeLang} className="btn__lang__container btn__navigation">
            {language.toUpperCase()}
        </div>
    )
}
