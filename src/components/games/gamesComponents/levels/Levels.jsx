import gsap from 'gsap'
import React, { useEffect, useRef, useState } from 'react'
import flowersData from '../../../../assets/data/flowers.json'
import { shuffleArray } from '../../../../utils/utils'
import LevelsSlot from './LevelsSlot'
import LevelsThumbnail from './LevelsThumbnail'
import interact from 'interactjs'

export default function Levels() {
    const currentDrag = useRef()
    useEffect(() => {
        restart();
        gsap.fromTo('.levels__container', { opacity: 0 }, { opacity: 1, duration: 0.5 })
    }, [])

    const [deck, setDeck] = useState([])

    const restart = () => {
        const newDeck = []
        let flowers = flowersData.flowers.filter(el => el.level !== undefined)
        shuffleArray(flowers)

        for (let i = 0; i < 4; i++) {
            newDeck.push(flowers.find(el => el.level === i))
        }

        shuffleArray(newDeck)
        setDeck(newDeck)
    }

    interact('.dropzone').dropzone({
        // only accept elements matching this CSS selector
        // accept: '.yes-drop',
        // Require a 75% element overlap for a drop to be possible
        overlap: 0.75,

        // listen for drop related events:
        ondragenter: function (event) {
            console.log(`ondragenter`);
        },
        ondragleave: function (event) {
            console.log('ondragleave')
        },
        ondrop: function (event) {
            console.log('ondrop')
        },

    })

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
        currentDrag.current = event.target;
        const draggables = document.querySelectorAll('.drag-drop')

        let biggest = draggables[0]
        draggables.forEach(el => {
            if (parseInt(el.style.zIndex) > parseInt(biggest.style.zIndex)) biggest = el
        })

        event.target.style.zIndex = (parseInt(biggest.style.zIndex) + 1).toString()
    }

    function dragMoveListener(event) {
        var target = event.target
        // keep the dragged position in the data-x/data-y attributes
        var x = (parseFloat(target.getAttribute('data-x')) || 0) + event.dx
        var y = (parseFloat(target.getAttribute('data-y')) || 0) + event.dy

        // translate the element
        target.style.transform = 'translate(' + x + 'px, ' + y + 'px)'

        // update the posiion attributes
        target.setAttribute('data-x', x)
        target.setAttribute('data-y', y)
    }

    function moveBack() {
        const x = currentDrag.current.getAttribute('data-x')
        const y = currentDrag.current.getAttribute('data-y')
        const currentX = gsap.utils.interpolate(x, 0, 0.1)
        const currentY = gsap.utils.interpolate(y, 0, 0.1)

        currentDrag.current.style.transform = 'translate(' + currentX + 'px, ' + currentY + 'px)'
        currentDrag.current.setAttribute('data-x', currentX)
        currentDrag.current.setAttribute('data-y', currentY)

        if (currentX - x < 1) gsap.ticker.remove(moveBack);
    }

    function dragEndListener(event) {
        var target = event.target
        // keep the dragged position in the data-x/data-y attributes

        // translate the element
        // target.style.transform = 'translate(0px, 0px)'
        // target.setAttribute('data-x', 0)
        // target.setAttribute('data-y', 0)

        // gsap.to(event.target, { transform: 'translate(0, 0)', duration: 0.5 })
        gsap.ticker.add(moveBack);
    }

    return (
        <div className='levels__container'>
            <img className="levels__container__image__background" src="images/illustrations/levelsGameImageBackground.jpg" alt="" />
            <img className="levels__container__dashPoints" src="images/illustrations/dashPoints.png" alt="" />


            {deck.map((el, index) => {
                return <LevelsSlot index={index} />
            })}

            {deck.map((el, index) => {
                return <LevelsThumbnail data={el} index={index} />
            })}
        </div>
    )
}
