import gsap from 'gsap'
import React, { useContext, useEffect, useRef, useState } from 'react'
import flowersData from '../../../../assets/data/flowers.json'
import { shuffleArray, getDistance } from '../../../../utils/utils'
import ToxicSlot from './ToxicSlot'
import ToxicResult from './ToxicResult'
import ToxicThumbnail from './ToxicThumbnail'
import interact from 'interactjs'
import { ConfettiContext, NavigationContext } from '../../../../utils/context'

export default function Toxic() {
    const { currentPage } = useContext(NavigationContext)
    const { fireConfetti } = useContext(ConfettiContext)
    const [deck, setDeck] = useState([])

    const timeline = gsap.timeline()
    let duration = 0.6

    const slots = useRef()
    const toxicFlowersRef = useRef([])
    const dragElement = useRef()
    const draggables = useRef()
    const tweens = useRef()

    const slotX = 76.2
    const slotY = 7.1
    const gapY = 17.2

    const restart = () => {
        slots.current = { slot_0: null, slot_1: null, slot_2: null, slot_3: null, slot_4: null }
        dragElement.current = []
        tweens.current = []

        let toxicFlowers = flowersData.flowers.filter(el => el.en.toxic)
        let nonToxicFlowers = flowersData.flowers.filter(el => !el.en.toxic)

        shuffleArray(toxicFlowers)
        shuffleArray(nonToxicFlowers)

        toxicFlowers = toxicFlowers.splice(0, 5)
        let maxNonToxicFlowers = 6
        if (currentPage.level === 1) maxNonToxicFlowers = 11
        if (currentPage.level === 2) maxNonToxicFlowers = 16
        nonToxicFlowers = nonToxicFlowers.splice(0, maxNonToxicFlowers)

        let flowers = [...toxicFlowers, ...nonToxicFlowers]
        shuffleArray(flowers)

        toxicFlowersRef.current = toxicFlowers
        setDeck(flowers)
    }

    interact(`.drag-drop_${currentPage.category}`)
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
        draggables.current = document.querySelectorAll(`.drag-drop_${currentPage.category}`)

        let biggest = draggables.current[0]

        draggables.current.forEach(el => {
            if (parseInt(el.style.zIndex) > parseInt(biggest.style.zIndex)) biggest = el
        })

        event.target.style.zIndex = (parseInt(biggest.style.zIndex) + 1).toString()
        event.target.style.transform = `rotateZ(0deg)`

        event.target.offset = {
            x: (event.x0 / window.innerWidth) * 100 - parseFloat(event.target.getAttribute('dataOriginX')),
            y: (event.y0 / window.innerHeight) * 100 - parseFloat(event.target.getAttribute('dataOriginY'))
        }

        event.target.setAttribute('isDragging', true)
    }

    function dragMoveListener(event) {
        if (dragElement.current.length && dragElement.current[0].getAttribute('dataSlug') !== event.target.getAttribute('dataSlug')) return
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
                dragElement.current = []
            }

            slots.current[`slot_${closestSlot.index}`] = closestSlot
            setTimeout(check, 300)
            return
        }

        if (dragElement.current[0].inSlot) {
            slots.current[`slot_${dragElement.current[0].inSlot.index}`] = null;
        }
        dragElement.current[0].inSlot = null
        dragElement.current = []
        event.target.setAttribute('isDragging', '')
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

            dragElement.current = []
            gsap.ticker.remove(moveBack)
        }
    }

    function check() {
        for (let i = 0; i < 5; i++) {
            if (!slots.current[`slot_${i}`]) {
                return
            }
        }

        let wrongs = []
        for (let n = 0; n < 5; n++) {
            if (!slots.current[`slot_${n}`].tg.getAttribute('datatoxic')) {
                dragElement.current.push(slots.current[`slot_${n}`].tg)
                wrongs.push(slots.current[`slot_${n}`].tg)
            }
        }

        if (wrongs.length) {
            gsap.ticker.add(moveBack);
        } else {
            const slotsElement = document.querySelectorAll('.levels__slot__container')

            slotsElement.forEach(el => {
                el.style.display = 'none'
            })

            timeline.call(() => {
                draggables.current.forEach(el => {
                    if (!el.getAttribute('datatoxic')) el.style.opacity = 0
                })
            })

            for (let i = 0; i < 5; i++) {
                timeline.to(`.${slots.current[`slot_${i}`].tg.classList[1]}`, {
                    css: { top: "50%", left: `${12 + 15 * i}%`, width: '12%' },
                    duration: (duration / 2),
                    ease: "power1.out"
                }).call(() => {
                    slots.current[`slot_${i}`].tg.children[0].children[1].style.transform = 'rotateZ(0deg)'
                    slots.current[`slot_${i}`].tg.children[0].children[1].style.top = '99%'
                    slots.current[`slot_${i}`].tg.children[0].children[1].style.width = '96%'
                    slots.current[`slot_${i}`].tg.children[0].children[1].style.left = '0%'
                })
            }
            timeline.to('.nonexistentclass', { duration: duration }).call(() => {
                draggables.current.forEach(el => {
                    el.style.display = 'none'
                })
                const fakeElements = document.querySelectorAll('.flower__card__fake')
                fakeElements.forEach((el, index) => {
                    el.style.display = 'block'
                    const fakeIndex = slots.current[`slot_${index}`].tg.classList[1].slice(19)
                    const fakeEl = document.querySelector(`.flower__card__fake_${fakeIndex}`)
                    fakeEl.style.top = '50%'
                    fakeEl.style.width = '12%'
                    fakeEl.style.left = `${12 + 15 * index}%`

                    fakeEl.children[0].children[1].style.transform = 'rotateZ(0deg)'
                    fakeEl.children[0].children[1].style.top = '99%'
                    fakeEl.children[0].children[1].style.width = '96%'
                    fakeEl.children[0].children[1].style.left = '0%'
                })
            })

            timeline.to(".toxic__result__container", {
                opacity: 1,
                pointerEvents: 'auto',
                duration: duration
            }).call(() => {
                fireConfetti(true)
            })
        }
    }

    useEffect(() => {
        restart();
        gsap.fromTo('.toxic__container', { opacity: 0 }, { opacity: 1, duration: 0.5 })
    }, [])
    return (
        <div className='toxic__container'>
            {toxicFlowersRef.current.map((el, index) => {
                return <ToxicSlot key={index} index={index} coords={{ slotX: slotX, slotY: slotY, gapY: gapY }} />
            })}

            <ToxicResult />
            {deck.map((el, index) => <ToxicThumbnail key={index} data={el} index={index} />)}
        </div>
    )
}
