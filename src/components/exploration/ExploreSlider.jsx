import interact from 'interactjs'
import React from 'react'

export default function ExploreSlider({ id, deltaX, carouselIsDragging, handleCursorDragging, handleCursorRatio, maxValue }) {
    let styleCursor = {
        left: `${deltaX * 100 / maxValue.current}%`
    }

    interact(`.zone__touch-${id}`)
        .draggable({
            listeners: {
                move(event) {
                    if (carouselIsDragging) return

                    // distance ends up as a ratio, dragZone positioned at left: 40%, width: 21% 
                    let ratioX = ((event.clientX / window.innerWidth) - 0.4) / 0.21

                    //if screen smaller
                    // let ratioX = ((event.clientX / window.innerWidth) - 0.7) / 0.105
                    // let distance = (event.clientX / window.innerWidth - ) 

                    if (ratioX > 1) {
                        ratioX = 1
                    } else if (ratioX < 0) {
                        ratioX = 0
                    }

                    handleCursorRatio(ratioX)
                }
            }
        })

    const handleStart = (e) => {
        if (carouselIsDragging) return
        handleCursorDragging(false)
    }

    const handleMove = (e) => {
        if (carouselIsDragging) return
        handleCursorDragging(true)
    }

    const handleEnd = (e) => {
        if (carouselIsDragging) return
        handleCursorDragging(false)
    }

    return (
        <div className='explore__slider__container'>
            <div className={`slider__line__zone__touch zone__touch-${id}`} onTouchStart={handleStart} onTouchMove={handleMove} onTouchEnd={handleEnd}></div>
            <div className="slider__line">
                <div className={`slider__cursor`} style={styleCursor}></div>
            </div>
        </div>
    )
}
