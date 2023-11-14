import React, { useContext } from 'react'
import { NavigationContext } from '../../../utils/context'

export default function BtnHome() {
    const { changePage, currentPage } = useContext(NavigationContext)

    const handleChangePage = () => {
        changePage({ category: 'home', element: null })
    }

    return (
        <div onTouchEnd={handleChangePage} className="btn__home btn__navigation">
            <svg style={{ transform: `scale(${window.innerWidth / 1920})`, marginTop: `${window.innerHeight / 1080}vh` }} xmlns="http://www.w3.org/2000/svg" width="42" height="42" viewBox="0 0 42 42">
                <circle className="btn__home__circle" id="Ellipse_47" data-name="Ellipse 47" cx="21" cy="21" r="21" fill={currentPage.color} />
                <path className='btn__home__path' id="Icon_material-home" data-name="Icon material-home" d="M12.232,24.952V17.028h5.283v7.924h6.6V14.386h3.962L14.874,2.5,1.667,14.386H5.629V24.952Z" transform="translate(6.126 7.273)" fill={currentPage.backgroundColor} />
            </svg>
        </div>
    )
}
