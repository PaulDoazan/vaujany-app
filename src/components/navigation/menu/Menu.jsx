import React, { useContext } from 'react'
import BtnLang from './BtnLang'
import BtnHome from './BtnHome'
import BtnBack from './BtnBack'
import { NavigationContext } from '../../../utils/context'
import BottomContent from './BottomContent'

export default function Menu({ handleCancel }) {
    const { currentPage } = useContext(NavigationContext)

    return (
        <div className="menu__container" style={{ 'backgroundColor': currentPage.backgroundColor }}>
            <BtnHome />
            <BtnBack handleCancel={handleCancel} />

            <BtnLang language={"fr"} />
            <BtnLang language={"en"} />
            <BtnLang language={"nl"} />

            <BottomContent />
        </div>
    )
}
