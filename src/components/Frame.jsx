import React, { useState } from 'react'
import Menu from './navigation/menu/Menu'
import Home from './Home'
import Explore from './exploration/Explore'


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

    const handleChangePage = (value) => {
        setCurrentPage(value)
    }
    return (
        <>
            <div className={fullClass}>
                <div className="frame__container">
                    <div className="menu__wrapper">
                        <Menu changePage={handleChangePage} />
                    </div>

                    <div className="home__wrapper">
                        {currentPage === 'home' && <Home changePage={handleChangePage} />}
                        {currentPage === 'explore' && <Explore />}
                    </div>
                </div>
            </div>
        </>
    )
}