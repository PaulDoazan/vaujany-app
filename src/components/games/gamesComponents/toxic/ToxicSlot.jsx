import React from 'react'

export default function ToxicSlot({ coords, index }) {
    const height = 16.2
    const width = 12
    const slotStyle = {
        position: `absolute`,
        width: `${width}%`,
        height: `${height}%`,
        left: `${coords.slotX}%`,
        top: `${coords.slotY + index * coords.gapY}%`
    }

    const imgStyle = {
        position: 'absolute',
        width: '100%',
        height: '100%'
    }

    const iconStyle = {
        position: 'absolute',
        transform: 'translate(-50%, -50%)',
        width: '25%',
        height: '25%',
        top: '50%',
        left: '50%'
    }

    return (
        <div className="levels__slot__container" style={slotStyle}>
            <img style={imgStyle} src="images/icons/levelsSlot.jpg" alt="" />
            <img style={iconStyle} src="images/icons/redskull.svg" alt="" />
        </div>
    )
}
