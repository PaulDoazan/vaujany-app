import React, { useContext } from 'react'
import BtnLang from './BtnLang'
import BtnHome from './BtnHome'
import BtnBack from './BtnBack'
import { NavigationContext } from '../../../utils/context'

export default function Menu() {
    const { currentPage } = useContext(NavigationContext)

    return (
        <div className="menu__container" style={{ 'backgroundColor': currentPage.backgroundColor }}>
            <BtnHome />
            <BtnBack />

            <BtnLang language={"fr"} />
            <BtnLang language={"en"} />
            <BtnLang language={"nl"} />
        </div>
    )
}
