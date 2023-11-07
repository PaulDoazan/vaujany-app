import React from 'react'
import Menu from './navigation/menu/Menu'
import Home from './Home'
import { useSelector } from 'react-redux'

export default function Frame({ id, arrLength }) {
    const currentPage = useSelector((state) => state[`navigation_${id}`].value)

    let fullClass = `frame frame__${id}`
    if (arrLength === 4 && id < arrLength / 2) {
        fullClass += ' frame__reverse'
    } else if (arrLength === 2 && id === 0) {
        fullClass += ' frame__rotate__left'
    } else if (arrLength === 2 && id === 1) {
        fullClass += ' frame__rotate__right'
    }

    return (
        <>
            <div className={fullClass}>
                <div className="frame__container">
                    <div className="menu__wrapper">
                        <Menu />
                    </div>

                    <div className="home__wrapper">
                        <Home />
                    </div>
                </div>
            </div>
        </>
    )
}