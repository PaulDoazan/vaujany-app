import React, { useContext } from 'react'
import { LangContext, NavigationContext } from '../../utils/context'
import navigation_configs from '../../config/navigation_configs.json'


export default function BtnExplore() {
    const { lang } = useContext(LangContext)
    const { changePage } = useContext(NavigationContext)

    const handleClick = () => {
        changePage({ category: 'explore' })
    }
    return (
        <div className='home__button home__explore__button' onTouchEnd={handleClick}>
            <img className="home__button__bg__image" src="images/icons/homeExploreBtnBackground.svg" alt="" />
            <div className="home__button__text__container">
                <div className="home__button__title">
                    {navigation_configs.home[lang].explore}
                </div>
                <div className="home__button__description">
                    {navigation_configs.home[lang].description}
                </div>
            </div>
            <img className="home__button__image" src="images/icons/homePlayBtn.png" alt="" style={{ height: '136%' }} />
        </div>
    )
}
