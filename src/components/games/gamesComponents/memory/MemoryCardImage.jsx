import React, { useContext } from 'react'

export default function MemoryCardImage({ flower }) {
    return (
        <>
            <div className="card__face card__face__back" >
                <img className='card__image__back' src={`images/flowers/memory/imgBack.png`} alt="" />
            </div>
            <div className="memory__card__image card__face">
                <img className='memory__card__flower__image' src={`images/flowers/memory/${flower.img}`} alt="" />
            </div>

        </>
    )
}
