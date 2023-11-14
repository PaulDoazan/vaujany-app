import React, { useContext, useRef, useState } from 'react'
import dataFlowers from '../../assets/data/flowers.json'
import FlowerCard from './FlowerCard'
import FlowerInfos from './FlowerInfos'
import { NavigationContext } from '../../utils/context'
import interact from 'interactjs'
import ExploreSlider from './ExploreSlider'

export default function Explore({ id }) {
    const { currentPage } = useContext(NavigationContext)
    const [carouselIsDragging, setCarouselIsDragging] = useState(false)
    const [cursorIsDragging, setCursorIsDragging] = useState(false)
    const [deltaX, setDeltaX] = useState(0)

    // a card is 23.5% as wide as innerWidth, and 3 represents the number of grid rows
    const maxValue = useRef(- 4.2 - 23.5 * (Math.ceil(dataFlowers.flowers.length / 3) - 3))

    const handleCursorRatio = (value) => {
        setDeltaX(value * maxValue.current)
    }

    const handleCursorDragging = (value) => {
        setCursorIsDragging(value)
    }

    interact(`.draggable-${id}`)
        .draggable({
            // enable inertial throwing
            inertia: {
                resistance: 3
            },
            listeners: {
                move(event) {
                    if (currentPage.element) return
                    let distance = deltaX + (event.dx / 1920) * 100

                    if (distance > 0) {
                        distance = 0
                    } else if (distance < maxValue.current) {
                        distance = maxValue.current
                    }

                    setDeltaX(distance)
                }
            }
        })

    const handleStart = (e) => {
        setCarouselIsDragging(false)
    }

    const handleMove = (e) => {
        setCarouselIsDragging(true)
    }

    const handleEnd = (e) => {
        setCarouselIsDragging(false)
    }

    return (
        <>
            <div className={`draggable-${id} draggable__container`} onTouchStart={handleStart} onTouchMove={handleMove} onTouchEnd={handleEnd}>
                {dataFlowers.flowers.map((flower, index) => {
                    return <FlowerCard key={flower.slug} data={flower} index={index} isDragging={carouselIsDragging || cursorIsDragging} deltaX={deltaX} />
                })}
                <div className="white__gradient__slice"></div>
            </div>
            {!currentPage.element && <ExploreSlider id={id} deltaX={deltaX} handleCursorDragging={handleCursorDragging} handleCursorRatio={handleCursorRatio} carouselIsDragging={carouselIsDragging} maxValue={maxValue} />}
            {currentPage.element && <FlowerInfos data={currentPage.element} />}
        </>
    )
}
