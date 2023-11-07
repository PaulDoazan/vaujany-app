import React from 'react'
import BtnLang from './BtnLang'
import BtnHome from './BtnHome'
import BtnBack from './BtnBack'

export default function Menu({ changePage, previousPage }) {
    const handleChangePage = (value) => {
        changePage(value)
    }

    const handlePreviousPage = () => {
        previousPage()
    }
    return (
        <div className="menu__container">
            <BtnHome changePage={handleChangePage} />
            <BtnBack previousPage={handlePreviousPage} />

            <BtnLang lang={"fr"} />
            <BtnLang lang={"en"} />
            <BtnLang lang={"nl"} />
        </div>
    )
}
