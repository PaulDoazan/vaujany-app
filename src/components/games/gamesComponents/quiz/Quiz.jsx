import gsap from 'gsap'
import React, { useEffect } from 'react'

export default function Quiz() {
    useEffect(() => {
        gsap.fromTo('.quiz__container', { opacity: 0 }, { opacity: 1, duration: 0.5 })
    }, [])
    return (
        <div className='quiz__container'>Quiz</div>
    )
}
