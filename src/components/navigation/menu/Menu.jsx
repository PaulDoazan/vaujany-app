import React, { useContext } from 'react'
import BtnLang from './BtnLang'
import BtnHome from './BtnHome'
import BtnBack from './BtnBack'
import { NavigationContext } from '../../../utils/context'
import MenuBottomImage from './MenuBottomImage'
import MenuBottomCredit from './MenuBottomCredit'
import MenuBottomDescription from './MenuBottomDescription'

export default function Menu({ handleCancel, handleCredits, creditsVisible }) {
    const { currentPage } = useContext(NavigationContext)

    return (
        <div className="menu__container" style={{ 'backgroundColor': currentPage.backgroundColor }}>
            <BtnHome handleCancel={handleCancel} />
            <BtnBack handleCancel={handleCancel} />

            <BtnLang language={"fr"} />
            <BtnLang language={"en"} />
            <BtnLang language={"nl"} />

            <MenuBottomImage />
            <MenuBottomCredit handleCredits={handleCredits} creditsVisible={creditsVisible} />
            <MenuBottomDescription />
        </div>
    )
}
