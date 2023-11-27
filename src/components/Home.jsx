import React, { useContext, useEffect } from 'react'
import BtnExplore from './navigation/BtnExplore'
import BtnGames from './navigation/BtnGames'
import gsap from 'gsap'
import { LangContext, NavigationContext } from '../utils/context'
import pages from '../assets/data/pages.json'
import Credits from './navigation/menu/Credits'

export default function Home({ creditsVisible, handleCredits }) {
    const { lang } = useContext(LangContext)
    const { currentPage } = useContext(NavigationContext)

    useEffect(() => {
        handleCredits(false)
        if (currentPage.noAnimation) {
            gsap.to('.home__sub__container', { opacity: 1, duration: 1 })
            return
        }
        gsap.to('.home__sub__container', { opacity: 1, duration: 1 })
        gsap.to('.home__container', { opacity: 1, duration: 0.5 })
    }, [])

    return (
        <div className="home__container" style={{ opacity: currentPage.noAnimation && 1 }}>
            <div className="home__left__slice"></div>
            <img src="images/flowers/full/hypericum_richeri.jpg" alt="" className="home__image" />

            <div className="home__sub__container">
                <div className="home__content">
                    <div className="home__title home__title__1">{pages.home[lang].title1}</div>
                    <div className="home__title home__title__2">{pages.home[lang].title2}</div>
                    <div className="home__title home__title__3">{pages.home[lang].title3}</div>
                    <div className="home__title home__title__5">
                        <span className="home__title home__title__4">{pages.home[lang].title4}</span>
                        {pages.home[lang].title5}
                    </div>
                </div>
                <BtnExplore />
                <BtnGames />
                {creditsVisible && <Credits creditsVisible={creditsVisible} />}
            </div>

        </ div >
    )
}
