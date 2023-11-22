import gsap from 'gsap'
import React, { useContext, useEffect, useReducer, useRef, useState } from 'react'
import { ConfettiContext, NavigationContext } from '../../../../utils/context'
import MemoryCard from './MemoryCard'
import flowersData from '../../../../assets/data/flowers.json'
import MemoryResult from './MemoryResult'
import { confetti } from 'tsparticles-confetti'

const layouts = {
    level_0: {
        nbPairCards: 6,
    },
    level_1: {
        nbPairCards: 10,
    },
    level_2: {
        nbPairCards: 14,
    }
}

export default function Memory() {
    let pairsFound = 0

    const [deck, setDeck] = useState([])
    const { currentPage } = useContext(NavigationContext)
    const { fireConfetti } = useContext(ConfettiContext)

    const canvasRef = useRef()

    const restart = () => {
        const newDeck = []
        let flowers = flowersData.flowers.filter(el => el.imageMemory)
        shuffleArray(flowers)
        flowers = flowers.splice(0, layouts[`level_${currentPage.level}`].nbPairCards)
        const flowersSlug = flowers.map(el => { return { slug: el.slug } })
        const flowersImg = flowers.map(el => { return { slug: el.slug, img: el.imageMemory } })

        shuffleArray(flowersSlug)
        shuffleArray(flowersImg)
        flowers.forEach((el, ind) => {
            newDeck.push(flowersImg[ind])
            newDeck.push(flowersSlug[ind])
        })

        setDeck(newDeck)
    }

    // gamePlay
    let cardsPicked = []
    let typeCardPicked = null
    let animationPlaying = false
    const timeline = gsap.timeline()
    let duration = 0.6

    const checkCards = async () => {
        if (cardsPicked[0].classList.contains('img')) cardsPicked.reverse()
        animationPlaying = true

        if (cardsPicked[0].classList[1] === cardsPicked[1].classList[1]) {
            // SUCCESS
            pairsFound++
            animationPlaying = true

            timeline.call(() => {
                cardsPicked[0].style.zIndex = pairsFound
                cardsPicked[1].style.zIndex = pairsFound
            }).to(cardsPicked[0], {
                transform: `scale(0.8)`,
                top: '83.5%',
                left: `${80 - pairsFound / 2}%`,
                duration: duration
            })
            timeline.to(cardsPicked[1], {
                transform: `scale(0.8)`,
                top: '83.5%',
                left: `${80 - 8 - pairsFound / 2}%`,
                duration: duration
            }, `-=${duration / 2}`).call(() => {
                animationPlaying = false
                gsap.to('.card__image__back__white', { opacity: 0 })
                gsap.to('.card__text__back__white', { opacity: 0 })
                cardsPicked = []
            })

            if (pairsFound === layouts[`level_${currentPage.level}`].nbPairCards) {
                timeline.to(".memory__result__container", {
                    opacity: 1,
                    pointerEvents: 'auto',
                    duration: duration
                }).call(() => {
                    fireConfetti(true)
                })
            }
        } else {
            // FAIL
            cardsPicked[0].classList.add('is__flipped__from__left')
            cardsPicked[1].classList.add('is__flipped__from__right')

            cardsPicked = []
            setTimeout(() => {
                gsap.to('.card__image__back__white', { opacity: 0 })
                gsap.to('.card__text__back__white', { opacity: 0 })
                animationPlaying = false
            }, 400)
        }
    }

    const handleTouchStart = (e) => {
        if (animationPlaying || cardsPicked.length === 2) return
        if (cardsPicked.length === 1) {
            if ((cardsPicked[0].classList.contains('img') && e.currentTarget.classList.contains('img'))
                || (cardsPicked[0].classList.contains('title') && e.currentTarget.classList.contains('title'))) {
                return
            }
        }

        if (e.currentTarget.classList.contains('img')) {
            if (cardsPicked.length === 0) gsap.to('.card__image__back__white', { opacity: 1 })
            e.currentTarget.classList.remove('is__flipped__from__right')
        } else {
            if (cardsPicked.length === 0) gsap.to('.card__text__back__white', { opacity: 1 })
            e.currentTarget.classList.remove('is__flipped__from__left')
        }

        cardsPicked.push(e.currentTarget)
        typeCardPicked = cardsPicked[0].classList[2]

        if (cardsPicked.length >= 2) {
            setTimeout(() => {
                checkCards()
            }, 1500)
        }
    }

    useEffect(() => {
        restart();
        (async () => {
            canvasRef.confettis = canvasRef.confettis || await confetti.create(canvasRef.current, { resize: true });
        })()
        gsap.fromTo('.memory__container', { opacity: 0 }, { opacity: 1, duration: 0.5 })
    }, [])

    return (
        <div className='memory__container'>
            {deck.map((el, index) => {
                return <MemoryCard key={index} flower={el} index={index} handleTouchStart={handleTouchStart} layout={layouts[`level_${currentPage.level}`]} />
            })}
            <MemoryResult />
        </div>
    )
}

function shuffleArray(array) {
    for (let i = array.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [array[i], array[j]] = [array[j], array[i]];
    }
}