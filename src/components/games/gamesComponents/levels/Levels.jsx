import gsap from 'gsap'
import React, { useEffect, useRef, useState } from 'react'
import flowersData from '../../../../assets/data/flowers.json'
import { shuffleArray } from '../../../../utils/utils'
import LevelsSlot from './LevelsSlot'
import LevelsThumbnail from './LevelsThumbnail'
import interact from 'interactjs'

export default function Levels() {
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
        console.log(event.target.inSlot)
        dragElement.current.push(event.target)
        draggables.current = document.querySelectorAll('.drag-drop')

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

            // update the posiion attributes
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
                dragElement.current = []
            }

            slots.current[`slot_${closestSlot.index}`] = closestSlot
            // closestSlot.tg.inSlot = closestSlot

            if ((deck.length - 1) - closestSlot.index === parseInt(event.target.getAttribute('dataLevel'))) {
                console.log('Success')
            }
            return
        }

        event.target.setAttribute('isMovingBack', true)
        gsap.ticker.add(moveBack);
    }

    function getDistance(x1, x2, y1, y2) {
        const a = x1 - x2
        const b = y1 - y2

        return Math.sqrt(a * a + b * b)
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
            const el = dragElement.current[0]
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
            dragElement.current = []
            gsap.ticker.remove(moveBack)
        }
    }

    return (
        <div className='levels__container'>
            <img className="levels__container__image__background" src="images/illustrations/levelsGameImageBackground.jpg" alt="" />
            <img className="levels__container__dashPoints" src="images/illustrations/dashPoints.png" alt="" />

            {deck.map((el, index) => {
                return <LevelsSlot key={index} index={index} dimensions={{ slotX: slotX, slotY: slotY, gapY: gapY }} />
            })}

            {deck.map((el, index) => {
                return <LevelsThumbnail key={index} data={el} index={index} dimensions={{ thumbnailX: thumbnailX, slotY: slotY, gapY: gapY }} />
            })}
        </div>
    )
}
