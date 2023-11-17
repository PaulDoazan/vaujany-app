import gsap from 'gsap'
import React, { useContext, useEffect, useState } from 'react'
import { NavigationContext } from '../../../../utils/context'
import MemoryCard from './MemoryCard'
import flowersData from '../../../../assets/data/flowers.json'

const layouts = {
    level_0: {
        nbPairCards: 6,
    },
    level_1: {
        nbPairCards: 12,
    },
    level_2: {
        nbPairCards: 16,
    }
}

export default function Memory() {
    let pairsFound = 0
    const { currentPage } = useContext(NavigationContext)

    let flowers = flowersData.flowers.filter(el => el.imageMemory)
    shuffleArray(flowers)
    flowers = flowers.splice(0, layouts[`level_${currentPage.level}`].nbPairCards)
    const flowersSlug = flowers.map(el => { return { slug: el.slug } })
    const flowersImg = flowers.map(el => { return { slug: el.slug, img: el.imageMemory } })

    shuffleArray(flowersSlug)
    shuffleArray(flowersImg)
    let deck = [];
    flowers.forEach((el, ind) => {
        deck.push(flowersImg[ind])
        deck.push(flowersSlug[ind])
    })

    // gamePlay
    let cardsPicked = []
    let animationPlaying = false
    const timeline = gsap.timeline()
    let duration = 0.6
    // const marginLeft = (96 - (8 + 2.7) * (layouts[`level_${currentPage.level}`].nbPairCards / 2)) / 2

    const checkCards = async () => {
        if (cardsPicked[0].classList[1] === cardsPicked[1].classList[1]) {
            // SUCCESS
            pairsFound++
            animationPlaying = true
            if (cardsPicked[0].classList.contains('img')) cardsPicked.reverse()
            timeline.call(() => {
                cardsPicked[0].style.zIndex = pairsFound
                cardsPicked[1].style.zIndex = pairsFound
            }).to(cardsPicked[0], {
                transform: `scale(0.8)`,
                top: '83.5%',
                left: `${80 - pairsFound * 2}%`,
                duration: duration,
                ease: "power1.in"
            }, `-=${duration / 2}`)
            timeline.to(cardsPicked[1], {
                transform: `scale(0.8)`,
                top: '83.5%',
                left: `${80 - 8 * 0.8 - pairsFound * 2}%`,
                duration: duration,
                ease: "power1.in"
            }).call(() => {
                animationPlaying = false
                cardsPicked = []
            })

        } else {
            // FAIL
            console.log('fail')
            cardsPicked = []
        }

    }

    const handleTouchStart = (e) => {
        if (animationPlaying) return
        if (cardsPicked.length === 1) {
            if ((cardsPicked[0].classList.contains('img') && e.currentTarget.classList.contains('img'))
                || cardsPicked[0].classList.contains('title') && e.currentTarget.classList.contains('title')) {
                return
            }
        }

        e.currentTarget.classList.remove('is__flipped')
        cardsPicked.push(e.currentTarget)

        if (cardsPicked.length >= 2) {
            checkCards()
        }
    }

    useEffect(() => {
        gsap.fromTo('.memory__container', { opacity: 0 }, { opacity: 1, duration: 0.5 })
    }, [])

    return (
        <div className='memory__container'>
            {deck.map((el, index) => {
                return <MemoryCard flower={el} index={index} handleTouchStart={handleTouchStart} layout={layouts[`level_${currentPage.level}`]} />
            })}
        </div>
    )
}

function shuffleArray(array) {
    for (let i = array.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [array[i], array[j]] = [array[j], array[i]];
    }
}