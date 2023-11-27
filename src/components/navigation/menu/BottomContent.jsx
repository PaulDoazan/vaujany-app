import React, { useContext } from 'react'
import { LangContext, NavigationContext } from '../../../utils/context'
import pages from '../../../assets/data/pages.json'

export default function BottomContent() {
    const { currentPage } = useContext(NavigationContext)
    const { lang } = useContext(LangContext)
    console.log(currentPage);
    return (
        <div className='menu__bottom__content'>
            {currentPage.category === 'home' && <div className="credits__button">CREDITS</div>}
            {currentPage.category === 'gamesHome' && <div className="menu__bottom__text">{pages.home[lang].play}</div>}
            {currentPage.menuImage && <img className="menu__bottom__image" src={`/images/flowers/menuImages/${currentPage.menuImage}`} alt="" />}
        </div>
    )
}
