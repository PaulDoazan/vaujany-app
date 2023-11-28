import parse from 'html-react-parser'
import React, { useContext } from 'react'
import { ConfettiContext, LangContext, NavigationContext } from '../../../../utils/context'
import dataGames from '../../../../assets/data/games.json'
import dataFlowers from '../../../../assets/data/flowers.json'
import pages from '../../../../assets/data/pages.json'

const questionsType = [
    "toxic",
    "yellow",
    "pink",
    "spring",
    "summer",
    "small",
    "medium",
    "large",
    "extralarge",
    "subalpin",
    "wood",
]

export default function GuessWhoResult({ correctFlower, success, revealedCards }) {
    const { fireConfetti } = useContext(ConfettiContext)
    const { lang } = useContext(LangContext)
    const { currentPage, changePage } = useContext(NavigationContext)
    const currentGame = dataGames.games.find(el => el.slug === currentPage.element)

    const handleStart = () => {
        fireConfetti(false)
        changePage({ backgroundColor: '#52774E', color: '#fff', category: 'gameInstruction', element: 'guesswho', level: currentPage.level, refresh: true })
    }

    const containerStyle = {
        width: currentPage.level !== 1 ? '69%' : '70%',
        left: currentPage.level !== 1 ? '43%' : '39%'
    }

    const goodAnswers = questionsType.map(question => {
        let allRevealedCardsMatch = true
        for (let i = 0; i < revealedCards.length; i++) {
            const revealedCard = revealedCards[i];
            const currentFlower = dataFlowers.flowers.find(el => el.slug === revealedCard.getAttribute('slug'))
            if (currentFlower.guessWhoParameters[question] !== correctFlower.guessWhoParameters[question]) {
                allRevealedCardsMatch = false
                break;
            }
        }
        return allRevealedCardsMatch;
    })

    return (
        <div className='guesswho__result__container' style={containerStyle}>
            {success ?
                <div className='guesswho__result__success'>
                    <div className="guesswho__result__bravo">{pages.gameInstruction[lang].bravo}</div>
                    <div className="guesswho__result__congratulations">{parse(currentGame[lang].congratulations)}</div>
                    <div className="guesswho__restart__button" onTouchStart={handleStart}>
                        <img className="levels__restart__button__image" src={`images/icons/guesswhoEndBtnBackground.svg`} alt="" />
                        <div className="guesswho__restart__button__text" style={{ pointerEvents: success && 'auto' }}>{pages.gameInstruction[lang].newGame}</div>
                    </div>
                </div>
                :
                <div className='guess__who__result__fail'>
                    <div className="guesswho__result__wrong__answer">{parse(currentGame[lang].wrong)}</div>
                    <div className="questions__list__wrong">
                        {currentGame[lang].questions.map((el, index) => {
                            return <div className="guesswho__question__wrong">
                                <span><img className='guesswho__icon__wrong' src={goodAnswers[index] ? `images/icons/iconCorrectAnswer.svg` : `images/icons/iconWrongAnswer.svg`} alt="" /></span>
                                {el}{parse('&nbsp &nbsp')}<span>« {correctFlower.guessWhoParameters[questionsType[index]] ? pages.cancel[lang].yes : pages.cancel[lang].no} »</span>
                            </div>
                        })}
                    </div>
                </div>
            }
        </div>
    )
}
