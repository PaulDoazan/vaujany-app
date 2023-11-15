import React, { useContext } from 'react'
import { NavigationContext } from '../../utils/context'

export default function BtnExplore() {
    const { changePage } = useContext(NavigationContext)

    const handleClick = () => {
        changePage({ category: 'explore' })
    }
    return (
        <div className='home__button home__explore__button' onTouchEnd={handleClick}>
            <img className="home__button__bg__image" src="images/icons/homeExploreBtnBackground.svg" alt="" />
            <div className="home__button__text__container">
                <div className="home__button__title">
                    Explorer
                </div>
                <div className="home__button__description">
                    Explorer les fleurs de&nbsp;nos montagnes…
                </div>
            </div>
            <img className="home__button__image" src="images/icons/homePlayBtn.png" alt="" style={{ height: '136%' }} />
        </div>
    )
}
