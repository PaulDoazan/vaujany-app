import React, { useContext } from 'react'
import dataFlowers from '../../assets/data/flowers.json'
import FlowerCard from './FlowerCard'
import FlowerInfos from './FlowerInfos'
import { NavigationContext } from '../../utils/context'

export default function Explore() {
    const { currentPage } = useContext(NavigationContext)

    return (
        <>
            {currentPage.element && <FlowerInfos data={currentPage.element} />}
            {dataFlowers.flowers.map((flower, index) => {
                return <FlowerCard key={flower.slug} data={flower} index={index} />
            })}
        </>
    )
}
