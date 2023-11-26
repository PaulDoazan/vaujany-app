import React, { useState } from 'react'
import MemoryCardImage from './MemoryCardImage';
import MemoryCardTitle from './MemoryCardTitle';

export default function MemoryCard({ flower, index, layout, handleTouchStart }) {
    const [preserve3d, setPreserve3d] = useState(true)
    const width = 8;
    const height = 8 * 16 / 9;
    const gapX = 2.7
    const gapY = gapX * 16 / 9
    const marginLeft = (96 - (width + gapX) * (layout.nbPairCards / 2)) / 2
    const marginTop = 10.5
    const top = (height + gapY) * (Math.floor(index / (layout.nbPairCards / 2)))

    const cardStyle = {
        transition: 'transform 0.7s',
        transformStyle: preserve3d ? 'preserve-3d' : 'flat',
        width: `${width}%`,
        height: `${height}%`,
        position: 'absolute',
        left: `${marginLeft + (index % (layout.nbPairCards / 2)) * (width + gapX)}%`,
        top: `${marginTop + top}%`
    }

    const onTouchStart = (e) => {
        handleTouchStart(e)
    }

    const handleTransitionEnd = (e) => {
        if (e.currentTarget.classList.contains('is__flipped__from__right') || e.currentTarget.classList.contains('is__flipped__from__left')) {
            e.currentTarget.style.transformStyle = "preserve-3d"
        } else {
            e.currentTarget.style.transformStyle = "flat"
        }
    }

    return (
        <div className={`memory__card ${flower.slug} ${flower.img ? 'img is__flipped__from__right' : 'title is__flipped__from__left'}`} onTransitionEnd={handleTransitionEnd} style={cardStyle} onTouchStart={onTouchStart}>
            {flower.img ?
                <MemoryCardImage flower={flower} />
                :
                <MemoryCardTitle flower={flower} />
            }
        </div>
    )
}
