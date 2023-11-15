import React, { useContext, useRef, useEffect } from 'react'
import { LangContext, NavigationContext } from '../../utils/context'
import gsap from 'gsap'

export default function FlowerCard({ data, index, isDragging, deltaX }) {
    const { lang } = useContext(LangContext)
    const { changePage, currentPage } = useContext(NavigationContext)
    const currentX = useRef(0)
    const positionY = useRef(0)

    const titleRef = useRef()
    const titlesContainerRef = useRef()
    const imgRef = useRef()
    const animation = useRef()
    const wrapperRef = useRef()
    const titleContentRef = useRef()
    const titleLatinRef = useRef()

    useEffect(() => {
        if (animation.current) {
            animation.current.kill();
            gsap.killTweensOf(`.card__wrapper-${data.slug}`);
        }
        if (currentPage.element) {
            if (data.slug === currentPage.element) {
                animation.current = gsap.timeline()

                animation.current.to(`.card__title-${data.slug}`, {
                    left: 0,
                    duration: 0.7,
                    ease: "back.in"
                }).call(() => {
                    titlesContainerRef.current.style.display = 'flex'
                    titlesContainerRef.current.style.alignItems = 'baseline'
                    titleRef.current.style.flexDirection = 'row'
                    titleRef.current.style.justifyContent = 'left'

                    titleContentRef.current.style.marginLeft = '6vh'
                    titleContentRef.current.style.fontSize = '2vw'

                    titleLatinRef.current.style.marginLeft = '1vh'
                    titleLatinRef.current.style.fontSize = '1.4vw'
                })

                animation.current.to(`.card__title-${data.slug}`, {
                    width: `100%`,
                    top: null,
                    bottom: `${-gapY}%`,
                    duration: 1,
                    ease: "power1.out"
                })

                animation.current.to(`.card__image-${data.slug}`, {
                    opacity: 0,
                    duration: 0.7
                }, '<')

                animation.current.to(`.flower__info__container`, {
                    opacity: 1,
                    duration: 0.7
                })

                animation.current.fromTo(`.menu__bottom__image`, {
                    opacity: 0
                }, {
                    opacity: 1,
                    duration: 0.7
                }, '<')
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
            titlesContainerRef.current.style.display = 'block'

            titleContentRef.current.style.marginLeft = null
            titleContentRef.current.style.fontSize = '1.3vw'

            titleLatinRef.current.style.marginLeft = null
            titleLatinRef.current.style.fontSize = '1vw'

            wrapperRef.current.style.opacity = 1
            imgRef.current.style.opacity = 1
        }
    }, [currentPage])

    const handleClick = (e) => {
        if (isDragging) return
        changePage({ category: "explore", element: data.slug, menuImage: data.menuImage })
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
                <div ref={titlesContainerRef} className="flower__card__titles__container">
                    <div ref={titleContentRef} className="title__content">
                        {data[lang].title}
                    </div>
                    <div ref={titleLatinRef} className="title__latin__content" style={titleLatinStyle}>{data[`title_latin`]}</div>
                </div>
            </div>
        </div>
    )
}