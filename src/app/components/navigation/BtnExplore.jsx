import React from 'react'
import { useDispatch } from 'react-redux'

export default function BtnExplore() {
    const dispatch = useDispatch()
    const handleClick = () => {
        console.log('click');
        dispatch(change_0('explore'))
    }
    return (
        <div className="btn__page" onClick={handleClick}>
            BtnExplore
        </div>
    )
}
