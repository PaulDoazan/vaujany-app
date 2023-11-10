import React, { useContext, useEffect, useRef, useState } from 'react'
import dataFlowers from '../../assets/data/flowers.json'
import FlowerCard from './FlowerCard'
import FlowerInfos from './FlowerInfos'
import { NavigationContext } from '../../utils/context'
import gsap from 'gsap'

export default function Explore() {
    const [isDragging, setIsDragging] = useState(false)
    const [startX, setStartX] = useState(0)
    const [currentX, setCurrentX] = useState(0)
    const [originX, setOriginX] = useState(0)
    const [deltaX, setDeltaX] = useState(0)
    const { currentPage } = useContext(NavigationContext)

    const targetX = useRef();

    const handleStart = (e) => {
        setIsDragging(false)
        setStartX(e.touches[0].clientX)
    }

    const handleMove = (e) => {
        setIsDragging(true)

        let endX = e.touches[0].clientX;
        let distance = originX + ((endX - startX) / 1920) * 100

        if (distance > 0) distance = 0

        // a card is 23.5% as wide as innerWidth, and 3 represents the number of grid rows
        const max = - 4.2 - 23.5 * (Math.ceil(dataFlowers.flowers.length / 3) - 3)
        if (distance < max) distance = max
        setDeltaX(distance)
        targetX.current = startX - distance
    }

    const handleEnd = (e) => {
        setIsDragging(false)
        setOriginX(deltaX)
        console.log(targetX);
    }

    const requestId = useRef();

    const animate = (timestamp) => {
        // Animation code goes here

        setCurrentX(gsap.utils.interpolate(currentX, targetX.current, 0.1))
        requestId.current = requestAnimationFrame(animate);
    };

    useEffect(() => {
        requestId.current = requestAnimationFrame(animate);
        return () => {
            cancelAnimationFrame(requestId.current);
        };
    }, []);

    // (currentX / 1920) * 100 instead of deltaX

    return (
        <div onTouchStart={handleStart} onTouchMove={handleMove} onTouchEnd={handleEnd}>
            {dataFlowers.flowers.map((flower, index) => {
                return <FlowerCard key={flower.slug} data={flower} index={index} isDragging={isDragging} deltaX={deltaX} />
            })}
            {currentPage.element && <FlowerInfos data={currentPage.element} />}
        </div>
    )
}
