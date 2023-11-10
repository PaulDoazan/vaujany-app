import React from 'react'

export default function ExploreSlider() {
    const handleStart = (e) => {

    }

    const handleMove = (e) => {

    }

    const handleEnd = (e) => {

    }

    return (
        <div className='explore__slider__container'>
            <div className="slider__line__zone__touch" onTouchStart={handleStart} onTouchMove={handleMove} onTouchEnd={handleEnd}></div>
            <div className="slider__line">
                <div className="slider__cursor"></div>
            </div>

        </div>
    )
}
