import React from 'react'
import BtnLang from './BtnLang'
import BtnHome from './BtnHome'
import BtnBack from './BtnBack'

export default function Menu() {
    return (
        <div className="menu__container">
            <BtnHome />
            <BtnBack />
            <BtnLang lang={"fr"} />
            <BtnLang lang={"en"} />
            <BtnLang lang={"nl"} />
        </div>
    )
}
