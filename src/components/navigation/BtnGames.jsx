import React, { useContext } from 'react'
import { LangContext, NavigationContext } from '../../utils/context'
import navigation_configs from '../../config/navigation_configs.json'

export default function BtnGames() {
    const { lang } = useContext(LangContext)
    const { changePage } = useContext(NavigationContext)

    const handleClick = () => {
        changePage({ category: 'gamesHome', element: null })
    }
    return (
        <div className='home__button home__play__button' onTouchEnd={handleClick}>
            <img className="home__button__bg__image" src="images/icons/homePlayBtnBackground.svg" alt="" />
            <div className="home__button__text__container">
                <div className="home__button__title">
                    {navigation_configs.home[lang].play}
                </div>
                <div className="home__button__description">
                    {navigation_configs.home[lang].playDescription}
                </div>
            </div>
            <img className="home__button__image" src="images/icons/homeExploreBtn.png" alt="" style={{ left: '66%', height: '180%' }} />
        </div>
    )
}
