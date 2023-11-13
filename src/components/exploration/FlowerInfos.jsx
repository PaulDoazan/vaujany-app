import React, { useContext } from 'react'
import dataFlowers from '../../assets/data/flowers.json'
import { LangContext } from '../../utils/context'

export default function FlowerInfos({ data }) {
    const { lang } = useContext(LangContext)
    const currentFlower = dataFlowers.flowers.find(el => el.slug === data)

    const handleTouch = (e) => {
        e.stopPropagation()
    }
    return (
        <div onTouchStart={handleTouch} onTouchMove={handleTouch} onTouchEnd={handleTouch} className='flower__info__container'>
            {/* <div className="flower__info__img__container">
                <img src={"/images/flowers/" + currentFlower.full} />
            </div>
            <div className="flower__infos__data__container">
                <div className="flower__info__title">
                    {currentFlower[`title_${lang}`]}
                </div>
            </div> */}
        </div>
    )
}
