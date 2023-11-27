
import React, { useContext } from 'react'
import pages from '../../../assets/data/pages.json'
import { LangContext, NavigationContext } from '../../../utils/context'

export default function MenuBottomDescription() {
    const { currentPage } = useContext(NavigationContext)
    const { lang } = useContext(LangContext)
    return (
        <div>
            {currentPage.category === 'gamesHome' && <div className="menu__bottom__text">{pages.home[lang].play}</div>}
        </div>
    )
}
