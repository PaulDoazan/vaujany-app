import React from 'react'

export default function FlowerInfoGame({ data, index, handleOverlay }) {
    return (
        <div className={`flower__info__game__overlay flower__info__game__overlay__${index}`} dataindex={index} onTouchStart={handleOverlay}>
            {data.title_latin}
        </div>
    )
}
