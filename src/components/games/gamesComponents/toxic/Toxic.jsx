import gsap from 'gsap'
import React, { useEffect } from 'react'

export default function Toxic() {
    useEffect(() => {
        gsap.fromTo('.toxic__container', { opacity: 0 }, { opacity: 1, duration: 0.5 })
    }, [])
    return (
        <div className='toxic__container'>Toxic</div>
    )
}
