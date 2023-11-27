import React, { useContext } from 'react'
import { LangContext, NavigationContext } from '../../../utils/context'

export default function MenuBottomImage() {
    const { currentPage } = useContext(NavigationContext)
    return (
        <div className='menu__bottom__content'>
            {currentPage.menuImage && <img className="menu__bottom__image" src={`/images/flowers/menuImages/${currentPage.menuImage}`} alt="" />}
        </div>
    )
}
