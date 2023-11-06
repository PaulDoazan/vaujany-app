import React, { useState } from 'react'
import Menu from './Menu'


export default function Frame({ id, arrLength }) {
    const [currentGame, setCurrentGame] = useState(null)
    let fullClass = `frame frame__${id}`
    if (arrLength === 4 && id < arrLength / 2) {
        fullClass += ' frame__reverse'
    } else if (arrLength === 2 && id === 0) {
        fullClass += ' frame__rotate__left'
    } else if (arrLength === 2 && id === 1) {
        fullClass += ' frame__rotate__right'
    }

    const onBtnClick = (e) => {
        if (currentGame === e.target.dataset.game) {
            setCurrentGame(null)
        } else {
            setCurrentGame(e.target.dataset.game)
        }

    }

    return (
        <>
            <div className={fullClass}>
                <div className="frame__container">
                    <div className="menu__wrapper">
                        <Menu />
                    </div>
                </div>
            </div>
        </>
    )
}