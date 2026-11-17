import parse from 'html-react-parser'
import React, { useContext } from 'react'
import pages from '../../../assets/data/pages.json'
import { LangContext, NavigationContext } from '../../../utils/context'

export default function MenuBottomDescription() {
    const { currentPage } = useContext(NavigationContext)
    const { lang } = useContext(LangContext)

    return (
        <div>
            {currentPage.category === 'gamesHome' && <div className="menu__bottom__text">{pages.home[lang].play}</div>}
            {currentPage.category === 'explore' && !currentPage.element && <div className="menu__bottom__text">{parse(pages.home[lang].explore)}</div>}
            {currentPage.element === 'levels' && <div className="menu__bottom__text">{parse(pages.levels[lang].title)}</div>}
            {currentPage.element === 'toxic' && <div className="menu__bottom__text">{parse(pages.toxic[lang].title)}</div>}
            {currentPage.element === 'memory' && <div className="menu__bottom__text">{parse(pages.memory[lang].title)}</div>}
            {currentPage.element === 'guesswho' && <div className="menu__bottom__text">{parse(pages.guesswho[lang].title)}</div>}
            {currentPage.element === 'quiz' && <div className="menu__bottom__text">{parse(pages.quiz[lang].title)}</div>}
        </div>
    )
}
