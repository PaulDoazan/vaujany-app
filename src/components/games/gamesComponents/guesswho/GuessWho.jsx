import gsap from 'gsap'
import React, { useEffect } from 'react'

export default function GuessWho() {
    useEffect(() => {
        gsap.fromTo('.guesswho__container', { opacity: 0 }, { opacity: 1, duration: 0.5 })
    }, [])
    return (
        <div className='guesswho__container'>GuessWho</div>
    )
}
