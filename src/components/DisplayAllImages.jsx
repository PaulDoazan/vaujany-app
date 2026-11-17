import React from 'react'
import { useEffect } from 'react'
//
export default function DisplayAllImages({ imgs, handleOver }) {
    useEffect(() => {
        const nodes = document.querySelectorAll(".divLoaded")
        nodes.forEach((el, index, arr) => {
            setTimeout(() => {
                el.style.opacity = 1
                if (index === arr.length - 1) {
                    setTimeout(handleOver, 1000)
                }
            }, 20 * index)
        })
    }, [])

    return (
        <>
            <div className="imgLoadedContainer">{imgs.map((el, index) => {
                return <div className="divLoaded" style={{ width: '100%', overflow: 'hidden', opacity: 0 }}>
                    <img src={el.src} style={{ width: "100%" }} />
                </div>
            })}</div>
            <div className="preloader__container">
                <div>LOADING</div>
                <div className='spinner'>
                    <div className="lds-roller"><div></div><div></div><div></div><div></div><div></div><div></div><div></div><div></div></div>
                </div>
            </div>
        </>
    )
}
