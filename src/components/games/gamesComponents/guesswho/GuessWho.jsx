import gsap from 'gsap'
import React, { useContext, useEffect, useState } from 'react'
import flowersData from '../../../../assets/data/flowers.json'
import { shuffleArray } from '../../../../utils/utils'
import { NavigationContext } from '../../../../utils/context'
import GuessWhoCard from './GuessWhoCard'
import GuessWhoQuestions from './GuessWhoQuestions'

const layouts = {
    level_0: {
        nbCards: 9,
        rows: 3,
        cols: 3,
        origin: { x: 13.4, y: 26.8 }
    },
    level_1: {
        nbCards: 12,
        rows: 4,
        cols: 3,
        origin: { x: 13.4, y: 14.1 }
    },
    level_2: {
        nbCards: 16,
        rows: 4,
        cols: 4,
        origin: { x: 8, y: 14.1 }
    }
}

export default function GuessWho() {
    const [deck, setDeck] = useState([])
    const [result, setResult] = useState()
    const { currentPage } = useContext(NavigationContext)

    const restart = () => {
        let flowers = flowersData.flowers.filter(el => el.guessWhoParameters)
        shuffleArray(flowers)
        setResult(flowers[0])
        shuffleArray(flowers)
        flowers = flowers.splice(0, layouts[`level_${currentPage.level}`].nbCards)
        setDeck(flowers)
    }

    const handleTouchStart = (e) => {
        e.currentTarget.classList.toggle('guesswho__is__flipped')
    }

    useEffect(() => {
        restart()
        gsap.fromTo('.guesswho__container', { opacity: 0 }, { opacity: 1, duration: 0.5 })
    }, [])
    return (
        <div className='guesswho__container'>
            {deck.map((el, index) => {
                return <GuessWhoCard key={index} flower={el} index={index} handleTouchStart={handleTouchStart} layout={layouts[`level_${currentPage.level}`]} />
            })}
            <GuessWhoQuestions />
        </div>
    )
}
