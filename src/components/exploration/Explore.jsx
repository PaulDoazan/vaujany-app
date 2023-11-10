import React, { useContext, useEffect, useRef, useState } from 'react'
import dataFlowers from '../../assets/data/flowers.json'
import FlowerCard from './FlowerCard'
import FlowerInfos from './FlowerInfos'
import { NavigationContext } from '../../utils/context'
import gsap from 'gsap'
import interact from 'interactjs'
import ExploreSlider from './ExploreSlider'

export default function Explore({ id }) {
    const { currentPage } = useContext(NavigationContext)
    const [isDragging, setIsDragging] = useState(false)
    const [originX, setOriginX] = useState(0)
    const [deltaX, setDeltaX] = useState(0)

    interact(`.draggable-${id}`)
        .draggable({
            // enable inertial throwing
            inertia: {
                resistance: 3
            },
            // keep the element within the area of it's parent

            listeners: {
                // call this function on every dragmove event
                resume() {
                    setOriginX(deltaX)
                },
                move(event) {
                    setIsDragging(true)
                    let endX = event.clientX;
                    let distance = originX + ((endX - event.clientX0) / 1920) * 100

                    if (distance > 0) distance = 0

                    // a card is 23.5% as wide as innerWidth, and 3 represents the number of grid rows
                    const max = - 4.2 - 23.5 * (Math.ceil(dataFlowers.flowers.length / 3) - 3)
                    if (distance < max) distance = max
                    setDeltaX(distance)
                },

                // call this function on every dragend event
                end(event) {
                    setOriginX(deltaX)
                }
            }
        })

    const handleStart = (e) => {
        setIsDragging(false)
    }

    const handleMove = (e) => {
        setIsDragging(true)
    }

    const handleEnd = (e) => {
        setIsDragging(false)
    }

    return (
        <>
            <div className={`draggable-${id} draggable__container`} onTouchStart={handleStart} onTouchMove={handleMove} onTouchEnd={handleEnd}>
                {dataFlowers.flowers.map((flower, index) => {
                    return <FlowerCard key={flower.slug} data={flower} index={index} isDragging={isDragging} deltaX={deltaX} />
                })}
                <div className="white__gradient__slice"></div>
            </div>
            <ExploreSlider deltaX={deltaX} />
            {currentPage.element && <FlowerInfos data={currentPage.element} />}
        </>
    )
}
