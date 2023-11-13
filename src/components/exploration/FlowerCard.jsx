import React, { useContext, useRef, useEffect } from 'react'
import { LangContext, NavigationContext } from '../../utils/context'
import gsap from 'gsap'

export default function FlowerCard({ data, index, isDragging, deltaX }) {
    const { lang } = useContext(LangContext)
    const { changePage, currentPage } = useContext(NavigationContext)
    const currentX = useRef(0)
    const positionY = useRef(0)

    const titleRef = useRef()
    const imgRef = useRef()
    const animation = useRef()
    const wrapperRef = useRef()
    const titleContentRef = useRef()
    const titleLatinRef = useRef()

    useEffect(() => {
        if (animation.current) animation.current.kill();
        if (currentPage.element) {
            if (data.slug === currentPage.element) {
                animation.current = gsap.timeline()

                animation.current.to(`.card__title-${data.slug}`, {
                    left: 0,
                    duration: 0.7,
                    ease: "back.in"
                }).call(() => {
                    titleRef.current.style.flexDirection = 'row'
                    titleRef.current.style.justifyContent = 'left'

                    titleContentRef.current.style.marginLeft = '6vh'
                    titleContentRef.current.style.fontSize = '2vw'

                    titleLatinRef.current.style.marginLeft = '1vh'
                })

                animation.current.to(`.card__title-${data.slug}`, {
                    width: `100%`,
                    top: null,
                    bottom: `${-gapY}%`,
                    duration: 1
                })

                animation.current.to(`.card__image-${data.slug}`, {
                    opacity: 0,
                    duration: 0.7
                }, '<')

                animation.current.to(`.flower__info__container`, {
                    opacity: 1,
                    duration: 0.7
                })

                // width: `100%`,

                // titleRef.current.style.left = 0
                // titleRef.current.style.top = null
                // titleRef.current.style.bottom = `${-gapY}%`
                // titleRef.current.style.width = `100%`
                // titleRef.current.style.flexDirection = 'row'
                // titleRef.current.style.justifyContent = 'left'

                // titleContentRef.current.style.marginLeft = '6vh'
                // titleContentRef.current.style.fontSize = '2vw'

                // titleLatinRef.current.style.marginLeft = '1vh'
            } else {
                gsap.to(`.card__wrapper-${data.slug}`, {
                    opacity: 0,
                    duration: 0.7
                });
            }
        } else {
            titleRef.current.style.left = `${currentX.current}%`
            titleRef.current.style.top = `${positionY.current + imgHeight}%`
            titleRef.current.style.bottom = null
            titleRef.current.style.width = `${titleWidth - paddingTitle * 2}%`
            titleRef.current.style.flexDirection = 'column'
            titleRef.current.style.justifyContent = 'center'

            titleContentRef.current.style.marginLeft = null
            titleContentRef.current.style.fontSize = '1.3vw'

            titleLatinRef.current.style.textTransform = 'lowercase'
            titleLatinRef.current.style.marginLeft = null

            wrapperRef.current.style.opacity = 1
            imgRef.current.style.opacity = 1
        }
    }, [currentPage])

    const handleClick = (e) => {
        if (isDragging) return
        changePage({ category: "explore", element: data.slug })
    }

    // En pourcentage respectif de innerWidth et innerHeight
    const originX = 4
    const originY = 7.1

    const imgWidth = 16
    const imgHeight = 21.4

    const titleWidth = index % 3 === 1 ? 12.04 : 12.03
    const titleHeight = 7.1

    const gapX = 8.2
    const gapY = 7.5

    const positionX = originX + Math.floor(index / 3) * (imgWidth + gapX)
    positionY.current = originY + (index % 3) * (imgHeight + gapY)

    currentX.current = positionX + deltaX + imgWidth - 0.05

    const imageStyle = {
        left: `${positionX + deltaX}%`,
        top: `${positionY.current}%`,
        width: `${imgWidth}%`,
        height: `${imgHeight}%`,
    }

    const paddingTitle = 0.3
    const lineHeightTitle = 80

    const titleStyle = {
        padding: `${paddingTitle}%`,
        lineHeight: `${lineHeightTitle}%`,
        fontFamily: "Copperplate29",
        fontSize: '1.3vw',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
        left: `${currentX.current}%`,
        top: `${positionY.current + imgHeight}%`,
        backgroundColor: data.backgroundColor,
        transformOrigin: 'top left',
        color: data.color,
        transform: 'rotateZ(270deg)',
        textAlign: 'center',
        width: `${titleWidth - paddingTitle * 2}%`,
        height: `${titleHeight - paddingTitle * 2}%`,
    }

    const titleLatinStyle = {
        fontFamily: "Copperplate29",
        fontSize: '80%',
    }

    // const imagePath = process.env.NODE_ENV === "production"
    //     ? "https://prod-images-cdn.com"
    //     : "http://localhost:8000";

    return (
        <div ref={wrapperRef} className={`flower__card__wrapper card__wrapper-${data.slug}`} >
            <img ref={imgRef} onTouchEnd={handleClick} className={`flower__card__image card__image-${data.slug}`} src={"/images/flowers/" + data.thumbnail} alt="" style={imageStyle} />

            <div ref={titleRef} className={`flower__card__title card__title-${data.slug}`} style={titleStyle} onTouchEnd={handleClick}>
                <div ref={titleContentRef} className="title__content">
                    {data[`title_${lang}`]}
                </div>
                <div ref={titleLatinRef} className="title__latin__content" style={titleLatinStyle}>{data[`title_latin`]}</div>
            </div>
        </div>
    )
}