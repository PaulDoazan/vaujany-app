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
    const [displayCheck, setDisplayCheck] = useState(false)
    const [result, setResult] = useState()
    const { currentPage } = useContext(NavigationContext)

    const restart = () => {
        let flowers = flowersData.flowers.filter(el => el.guessWhoParameters)
        shuffleArray(flowers)
        console.log('result : ', flowers[0].slug);
        setResult(flowers[0])
        shuffleArray(flowers)
        flowers = flowers.splice(0, layouts[`level_${currentPage.level}`].nbCards)
        setDeck(flowers)
    }

    const handleTouchStart = (e) => {
        const cards = document.querySelectorAll('.guesswho__card')
        let revealedCards = [];
        for (let i = 0; i < cards.length; i++) {
            const element = cards[i];
            if (!element.classList.contains('guesswho__is__flipped')) {
                revealedCards.push(element)
            }
        }

        if (e.currentTarget.classList.contains('guesswho__is__flipped')) {
            e.currentTarget.classList.remove('guesswho__is__flipped')
        } else {
            if (revealedCards.length > 1) e.currentTarget.classList.add('guesswho__is__flipped')
        }

        revealedCards = [];
        for (let i = 0; i < cards.length; i++) {
            const element = cards[i];
            if (!element.classList.contains('guesswho__is__flipped')) {
                revealedCards.push(element)
            }
        }

        if (revealedCards.length === 1) {
            check(revealedCards[0])
        }
    }

    const check = (card) => {
        if (card.getAttribute('slug') === result.slug) {
            console.log('success');
        } else {
            console.log('fail');
        }
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
            <GuessWhoQuestions correctFlower={result} />
        </div>
    )
}
