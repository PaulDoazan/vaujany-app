import gsap from 'gsap'
import React, { useContext, useEffect, useRef, useState } from 'react'
import flowersData from '../../../../assets/data/flowers.json'
import { shuffleArray } from '../../../../utils/utils'
import LevelsSlot from './LevelsSlot'
import LevelsThumbnail from './LevelsThumbnail'
import interact from 'interactjs'
import { ConfettiContext } from '../../../../utils/context'
import LevelsResult from './LevelsResult'
import FlowerInfoGame from '../FlowerInfoGame'

export default function Levels() {
    const { fireConfetti } = useContext(ConfettiContext)
    const timeline = gsap.timeline()
    let duration = 0.6

    const tweens = useRef()
    const dragElement = useRef()
    const draggables = useRef()
    const slots = useRef()

    const slotX = 42.8
    const slotY = 10.5
    const gapY = 21.4
    const thumbnailX = 80

    useEffect(() => {
        restart();
        gsap.fromTo('.levels__container', { opacity: 0 }, { opacity: 1, duration: 0.5 })
    }, [])

    const [deck, setDeck] = useState([])

    const restart = () => {
        slots.current = { slot_0: null, slot_1: null, slot_2: null, slot_3: null }
        dragElement.current = []
        tweens.current = []
        const newDeck = []
        let flowers = flowersData.flowers.filter(el => el.level !== undefined)
        shuffleArray(flowers)

        for (let i = 0; i < 4; i++) {
            newDeck.push(flowers.find(el => el.level === i))
        }

        shuffleArray(newDeck)
        setDeck(newDeck)
    }

    interact('.drag-drop')
        .draggable({
            inertia: false,
            modifiers: [
                interact.modifiers.restrictRect({
                    restriction: 'parent',
                    endOnly: true
                })
            ],
            autoScroll: true,
            // dragMoveListener from the dragging demo above
            listeners: {
                move: dragMoveListener,
                start: dragStartListener,
                end: dragEndListener,
            }
        })

    function dragStartListener(event) {
        if (dragElement.current.length === 1) return
        dragElement.current.push(event.target)
        draggables.current = document.querySelectorAll('.drag-drop')
        const iconsInfo = document.querySelectorAll('.flower__info__icon')
        iconsInfo.forEach((el) => {
            el.style.opacity = 0
            el.style.pointerEvents = 'none'
        })

        let biggest = draggables.current[0]

        draggables.current.forEach(el => {
            if (parseInt(el.style.zIndex) > parseInt(biggest.style.zIndex)) biggest = el
        })

        event.target.offset = {
            x: (event.x0 / window.innerWidth) * 100 - parseFloat(event.target.getAttribute('dataOriginX')),
            y: (event.y0 / window.innerHeight) * 100 - parseFloat(event.target.getAttribute('dataOriginY'))
        }

        event.target.style.zIndex = (parseInt(biggest.style.zIndex) + 1).toString()
        event.target.setAttribute('isDragging', true)
    }

    function dragMoveListener(event) {
        if (dragElement.current.length && dragElement.current[0].getAttribute('dataLevel') != event.target.getAttribute('dataLevel')) return
        if (!event.target.getAttribute('isDragging')) return
        if (event.target.getAttribute('isMovingBack')) return
        const target = event.target
        // keep the dragged position in the data-x/data-y attributes
        const x = (parseFloat(target.getAttribute('data-x')) || parseFloat(target.getAttribute('dataOriginX'))) + (event.dx / window.innerWidth) * 100
        const y = (parseFloat(target.getAttribute('data-y')) || parseFloat(target.getAttribute('dataOriginY'))) + (event.dy / window.innerHeight) * 100

        // translate the element
        target.style.left = `${x}%`
        target.style.top = `${y}%`

        // update the posiion attributes
        target.setAttribute('data-x', x)
        target.setAttribute('data-y', y)
    }

    function dragEndListener(event) {
        if (!dragElement.current.length || !event.target.getAttribute('isDragging')) return

        let closestSlot = { dist: 100, index: 0 }
        for (let i = 0; i < draggables.current.length; i++) {
            const dist = getDistance(slotX, parseFloat(event.target.getAttribute('data-x')), slotY + i * gapY, parseFloat(event.target.getAttribute('data-y')))
            if (dist < closestSlot.dist) {
                closestSlot = { dist: dist, index: i, x: slotX, y: slotY + i * gapY, tg: event.target }
            }
        }

        if (closestSlot.dist < 10) {
            event.target.style.left = `${closestSlot.x}%`
            event.target.style.top = `${closestSlot.y}%`

            // update the position attributes
            event.target.setAttribute('data-x', closestSlot.x)
            event.target.setAttribute('data-y', closestSlot.y)

            event.target.setAttribute('isDragging', '')

            if (event.target.inSlot && slots.current[`slot_${event.target.inSlot.index}`]) {
                slots.current[`slot_${event.target.inSlot.index}`] = null
            }
            event.target.inSlot = closestSlot
            // slot already filled
            const slotFilled = slots.current[`slot_${closestSlot.index}`]
            if (slotFilled) {
                dragElement.current[0] = slotFilled.tg
                dragElement.current[0].setAttribute('isMovingBack', true)
                dragElement.current[0].inSlot = null
                gsap.ticker.add(moveBack);
            } else {
                displayIcons()
                dragElement.current = []
            }

            slots.current[`slot_${closestSlot.index}`] = closestSlot
            check()
            return
        }

        event.target.setAttribute('isMovingBack', true)
        gsap.ticker.add(moveBack);
    }

    function check() {
        for (let i = 0; i < 4; i++) {
            if (!slots.current[`slot_${i}`]) {
                return
            }
        }

        let wrongs = []
        for (let n = 0; n < 4; n++) {
            if (slots.current[`slot_${n}`].index != 3 - parseInt(slots.current[`slot_${n}`].tg.getAttribute('dataLevel'))) {
                slots.current[`slot_${n}`].tg.setAttribute('isMovingBack', true)
                dragElement.current.push(slots.current[`slot_${n}`].tg)
                wrongs.push(slots.current[`slot_${n}`].tg)
            }
        }

        if (wrongs.length) {
            gsap.ticker.add(moveBack);
        } else {
            fireConfetti(true)
            timeline.to('.levels__container__image__background', {
                opacity: 0.3,
                duration: duration
            })
            timeline.to('.levels__container__dashPoints', {
                opacity: 0,
                duration: duration
            })
            timeline.to('.dropzone', {
                css: { left: "10%" },
                duration: duration,
                ease: "power1.out"
            })
            timeline.to('.flower__card__game', {
                css: { left: "10%" },
                duration: duration,
                ease: "power1.out"
            }, `-=${duration}`)
            timeline.to('.levels__slot__description', {
                css: { left: "25%" },
                duration: duration,
                ease: "power1.out"
            }, `-=${duration}`)
            timeline.to(".levels__result__container", {
                opacity: 1,
                pointerEvents: 'auto',
                duration: duration
            }).call(() => {
                fireConfetti(true)
            })
        }
    }

    function moveBack() {
        dragElement.current.map(el => {
            const x = el.getAttribute('data-x')
            const y = el.getAttribute('data-y')
            const currentX = gsap.utils.interpolate(x, parseFloat(el.getAttribute('dataOriginX')), 0.2)
            const currentY = gsap.utils.interpolate(y, parseFloat(el.getAttribute('dataOriginY')), 0.2)

            el.style.left = `${currentX}%`
            el.style.top = `${currentY}%`

            el.setAttribute('data-x', currentX)
            el.setAttribute('data-y', currentY)
        })

        let movingBack = false
        for (let i = 0; i < dragElement.current.length; i++) {
            const element = dragElement.current[i];
            const dist = getDistance(element.getAttribute('data-x'), element.getAttribute('dataOriginX'), element.getAttribute('data-y'), element.getAttribute('dataOriginY'))
            if (dist > 0.1) {
                movingBack = true
                break
            }
        }

        if (!movingBack) {
            dragElement.current.map(el => {
                if (el.inSlot) {
                    slots.current[`slot_${el.inSlot.index}`] = null;
                }

                el.inSlot = null
                el.style.left = `${el.getAttribute('dataOriginX')}%`
                el.style.top = `${el.getAttribute('dataOriginY')}%`
                el.setAttribute('data-x', el.getAttribute('dataOriginX'))
                el.setAttribute('data-y', el.getAttribute('dataOriginY'))
                el.setAttribute('isDragging', '')
                el.setAttribute('isMovingBack', '')
            })

            displayIcons()
            dragElement.current = []
            gsap.ticker.remove(moveBack)
        }
    }

    function displayIcons() {
        const iconsInfo = document.querySelectorAll('.flower__info__icon')
        iconsInfo.forEach((el, index) => {
            if (!draggables.current[index].inSlot) {
                el.style.opacity = 1
                el.style.pointerEvents = 'auto'
            }
        })
    }

    const handleOverlay = (e) => {
        const overlays = document.querySelectorAll('.flower__info__game__overlay')
        if (e.currentTarget.classList.contains('flower__info__icon')) {
            overlays[parseInt(e.currentTarget.getAttribute('dataindex'))].style.opacity = 1
            overlays[parseInt(e.currentTarget.getAttribute('dataindex'))].style.pointerEvents = 'auto'
        } else {
            e.currentTarget.style.opacity = 0
            e.currentTarget.style.pointerEvents = 'none'
        }
    }

    return (
        <>
            <div className='levels__container'>
                <img className="levels__container__image__background" src="images/illustrations/levelsGameImageBackground.jpg" alt="" />
                <img className="levels__container__dashPoints" src="images/illustrations/dashPoints.png" alt="" />

                {deck.map((el, index) => {
                    return <LevelsSlot key={index} index={index} dimensions={{ slotX: slotX, slotY: slotY, gapY: gapY }} />
                })}

                {deck.map((el, index) => <LevelsThumbnail key={index} data={el} index={index} dimensions={{ thumbnailX: thumbnailX, slotY: slotY, gapY: gapY }} handleOverlay={handleOverlay} />)}
                <LevelsResult />
                {deck.map((el, index) => <FlowerInfoGame data={el} index={index} handleOverlay={handleOverlay} />)}
            </div>

        </>
    )
}

function getDistance(x1, x2, y1, y2) {
    const a = x1 - x2
    const b = y1 - y2

    return Math.sqrt(a * a + b * b)
}