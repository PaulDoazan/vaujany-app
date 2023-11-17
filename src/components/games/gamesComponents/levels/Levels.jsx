import gsap from 'gsap'
import React, { useEffect } from 'react'

export default function Levels() {
    useEffect(() => {
        gsap.fromTo('.levels__container', { opacity: 0 }, { opacity: 1, duration: 0.5 })
    }, [])
    return (
        <div className='levels__container'>Levels</div>
    )
}
