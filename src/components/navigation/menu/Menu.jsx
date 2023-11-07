import React from 'react'
import BtnLang from './BtnLang'
import BtnHome from './BtnHome'
import BtnBack from './BtnBack'

export default function Menu({ changePage }) {
    const handleChangePage = (value) => {
        changePage(value)
    }
    return (
        <div className="menu__container">
            <BtnHome changePage={handleChangePage} />
            <BtnBack />

            <BtnLang lang={"fr"} />
            <BtnLang lang={"en"} />
            <BtnLang lang={"nl"} />
        </div>
    )
}
