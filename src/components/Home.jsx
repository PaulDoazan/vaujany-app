import React, { useContext, useEffect } from 'react'
import BtnExplore from './navigation/BtnExplore'
import BtnGames from './navigation/BtnGames'
import gsap from 'gsap'
import { NavigationContext } from '../utils/context'

export default function Home({ changePage }) {
    const { currentPage } = useContext(NavigationContext)
    const handleChangePage = (value) => {
        changePage(value)
    }

    useEffect(() => {
        if (currentPage.noAnimation) {
            return
        }
        gsap.fromTo('.home__container', { opacity: 0 }, { opacity: 1, duration: 0.5 })
    }, [])

    return (
        <div className="home__container" style={{ opacity: currentPage.noAnimation && 1 }}>
            <div className="home__left__slice"></div>
            <img src="images/flowers/full/hypericum_richeri.jpg" alt="" className="home__image" />

            <div className="home__content">
                <div className="home__title home__title__1">La</div>
                <div className="home__title home__title__2">Flore</div>
                <div className="home__title home__title__3">autour</div>
                <div className="home__title home__title__5">
                    <span className="home__title home__title__4">de </span>
                    Vaujany
                </div>
            </div>
            <BtnExplore changePage={handleChangePage} />
            <BtnGames changePage={handleChangePage} />

        </ div >
    )
}
