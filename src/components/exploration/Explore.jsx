import React from 'react'
import dataFlowers from '../../assets/data/flowers.json'
import FlowerCard from './FlowerCard'

export default function Explore() {
    return (
        <div>
            {dataFlowers.flowers.map(flower => {
                return <FlowerCard key={flower.slug} data={flower} />
            })}
        </div>
    )
}
