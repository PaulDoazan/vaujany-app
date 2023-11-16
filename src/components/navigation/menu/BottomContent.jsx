import React, { useContext } from 'react'
import { NavigationContext } from '../../../utils/context'

export default function BottomContent() {
    const { currentPage } = useContext(NavigationContext)
    return (
        <div className='menu__bottom__content'>
            {currentPage.menuImage && <img className="menu__bottom__image" src={`images/flowers/menuImages/${currentPage.menuImage}`} alt="" />}
        </div>
    )
}
