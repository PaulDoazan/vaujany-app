import React, { useState } from 'react'
import Menu from './navigation/menu/Menu'
import Home from './Home'


export default function Frame({ id, arrLength }) {
    const [currentPage, setCurrentPage] = useState('home')
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