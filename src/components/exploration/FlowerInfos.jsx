import React, { useContext } from 'react'
import dataFlowers from '../../assets/data/flowers.json'
import { LangContext } from '../../utils/context'

export default function FlowerInfos({ data }) {
    const { lang } = useContext(LangContext)
    const currentFlower = dataFlowers.flowers.find(el => el.slug === data)
    return (
        <div className='flower__info__container'>
            {currentFlower[`title_${lang}`]}
        </div>
    )
}
