import React, { useContext, useEffect, useRef, useState } from 'react'
import dataFlowers from '../../assets/data/flowers.json'
import FlowerCard from './FlowerCard'
import FlowerInfos from './FlowerInfos'
import { NavigationContext } from '../../utils/context'
import gsap from 'gsap'
import interact from 'interactjs'

export default function Explore() {
    const { currentPage } = useContext(NavigationContext)
    const [isDragging, setIsDragging] = useState(false)
    const [originX, setOriginX] = useState(0)
    const [deltaX, setDeltaX] = useState(0)

    // const handleStart = (e) => {
    //     setIsDragging(false)
    // }

    // const handleMove = (e) => {
    //     setIsDragging(true)
    // }

    // const handleEnd = (e) => {
    //     setIsDragging(false)
    // }

    interact('.draggable')
        .draggable({
            // enable inertial throwing
            inertia: true,
            // keep the element within the area of it's parent

            listeners: {
                // call this function on every dragmove event
                move(event) {
                    // let distance = ((originX.current + event.dx) / 1920) * 100
                    // setDeltaX(distance)

                    // originX.current = deltaX
                    // console.log(deltaX);
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
                    console.log('end');
                }
            }
        })
    // const [startX, setStartX] = useState(0)
    // const [currentX, setCurrentX] = useState(0)
    // const [originX, setOriginX] = useState(0)
    // // const [deltaX, setDeltaX] = useState(0)
    // const deltaX = useRef();
    // const { currentPage } = useContext(NavigationContext)

    // const targetX = useRef();

    // const handleStart = (e) => {
    //     setIsDragging(false)
    //     setStartX(e.touches[0].clientX)
    // }

    // const handleMove = (e) => {
    //     setIsDragging(true)

    //     let endX = e.touches[0].clientX;
    //     let distance = originX + ((endX - startX) / 1920) * 100

    //     if (distance > 0) distance = 0

    //     // a card is 23.5% as wide as innerWidth, and 3 represents the number of grid rows
    //     const max = - 4.2 - 23.5 * (Math.ceil(dataFlowers.flowers.length / 3) - 3)
    //     if (distance < max) distance = max
    //     deltaX.current = distance
    //     // targetX.current = startX - distance
    // }

    // const handleEnd = (e) => {
    //     setIsDragging(false)
    //     setOriginX(deltaX.current)
    // }

    // const requestId = useRef();

    // const animate = (timestamp) => {
    //     // Animation code goes here


    //     setCurrentX(gsap.utils.interpolate(currentX, deltaX.current, 0.1))
    //     console.log(currentX);
    //     requestId.current = requestAnimationFrame(animate);
    // };

    // useEffect(() => {
    //     requestId.current = requestAnimationFrame(animate);
    //     return () => {
    //         cancelAnimationFrame(requestId.current);
    //     };
    // }, []);

    // (currentX / 1920) * 100 instead of deltaX

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
        <div className="draggable draggable__container" onTouchStart={handleStart} onTouchMove={handleMove} onTouchEnd={handleEnd}>
            {dataFlowers.flowers.map((flower, index) => {
                return <FlowerCard key={flower.slug} data={flower} index={index} isDragging={isDragging} deltaX={deltaX} />
            })}
            {currentPage.element && <FlowerInfos data={currentPage.element} />}
        </div>
    )
}
