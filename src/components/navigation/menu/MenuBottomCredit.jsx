import React, { useContext, useState } from 'react'
import { LangContext, NavigationContext } from '../../../utils/context'
import pages from '../../../assets/data/pages.json'

export default function MenuBottomCredit({ handleCredits, creditsVisible }) {
    const { currentPage } = useContext(NavigationContext)
    const { lang } = useContext(LangContext)

    const iconStyle = {
        transform: creditsVisible ? 'rotateZ(180deg)' : 'rotateZ(0deg)',
        transition: "all 0.3s"
    }

    return (
        <div>
            {currentPage.category === 'home' && <div className="credits__button" onTouchStart={handleCredits}>
                <div className="credits__button__text">
                    {pages.home[lang].credits}
                </div>
                <img style={iconStyle} className="credits__button__arrow" src="images/guesswho/arrowQuestionBtn.svg" alt="" />
            </div>}
        </div>
    )
}
