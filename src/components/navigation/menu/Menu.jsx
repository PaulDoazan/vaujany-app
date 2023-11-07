import React from 'react'
import BtnLang from './BtnLang'
import BtnHome from './BtnHome'
import BtnBack from './BtnBack'

export default function Menu() {
    return (
        <div className="menu__container">
            <BtnHome />
            <BtnBack />

            <BtnLang language={"fr"} />
            <BtnLang language={"en"} />
            <BtnLang language={"nl"} />
        </div>
    )
}
