import React, { useContext } from 'react'
import { NavigationContext } from '../../utils/context'

export default function BtnGames() {
    const { changePage } = useContext(NavigationContext)

    const handleClick = () => {
        changePage({ category: 'gamesHome', element: null })
    }
    return (
        <div className='home__button home__play__button' onTouchEnd={handleClick}>
            <img className="home__button__bg__image" src="images/icons/homePlayBtnBackground.svg" alt="" />
            <div className="home__button__text__container">
                <div className="home__button__title">
                    Jouer
                </div>
                <div className="home__button__description">
                    S’amuser… Chercher… Deviner…
                </div>
            </div>
            <img className="home__button__image" src="images/icons/homeExploreBtn.png" alt="" style={{ left: '66%', height: '180%' }} />
        </div>
    )
}
