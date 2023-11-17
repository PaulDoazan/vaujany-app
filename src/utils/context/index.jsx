import { createContext, useRef, useState } from "react";

import dataFlowers from '../../assets/data/flowers.json'
import dataGames from '../../assets/data/games.json'
import pages from '../../assets/data/pages.json'
import gsap from "gsap";


const gamesSlug = dataGames.games.map(el => el.slug)
const allPages = concatData()

export const LangContext = createContext()
export const NavigationContext = createContext()

const getColors = (pageObject) => {
    let target = pageObject.element ? pageObject.element : pageObject.category

    const result = allPages.find(el => el.slug === target)
    const color = result.color ? result.color : '#fff'

    return { bgColor: result.backgroundColor, color: color }
}

export const LangProvider = ({ children }) => {
    const [lang, setLang] = useState('fr')
    const switchLang = (value) => {
        setLang(value)
    }

    return (
        <LangContext.Provider value={{ lang, switchLang }}>
            {children}
        </LangContext.Provider>
    )
}

export const NavigationProvider = ({ children }) => {
    const [currentPage, setCurrentPage] = useState({ category: 'home', backgroundColor: '#AAB8A8', color: '#fff' })
    const animation = useRef()

    const changePage = (value) => {
        const { bgColor, color } = getColors(value);

        // transition between game and game Instructions 
        if (currentPage.element && gamesSlug.includes(currentPage.element)) {
            animation.current = gsap.timeline()
            animation.current.to(pages[currentPage.element].mainClass, { opacity: 0, duration: 0.5 }).call(() => {
                setCurrentPage({ backgroundColor: bgColor, color: color, ...value })
            })
        }

        // all cases when transition fadeIn fadeOut between pages should be avoided
        if (currentPage.category === 'home' && value.category === 'home') return

        if (currentPage.category === 'home' && value.category === 'gamesHome') {
            animation.current = gsap.timeline()
            animation.current.to('.home__sub__container', { opacity: 0, duration: 0.5 }).call(() => {
                setCurrentPage({ noAnimation: true, backgroundColor: bgColor, color: color, ...value })
            })
            return
        } else if (currentPage.category === 'gamesHome' && value.category === 'home') {
            animation.current = gsap.timeline()
            animation.current.to('.game__content', { opacity: 0, duration: 0.5 }).call(() => {
                setCurrentPage({ noAnimation: true, backgroundColor: bgColor, color: color, ...value })
            })
            return
        }

        if (currentPage.category === 'explore' && value.element) {
            setCurrentPage({ noAnimation: true, backgroundColor: bgColor, color: color, ...value })
            return
        }

        if (currentPage.element && currentPage.category === 'explore') {
            setCurrentPage({ noAnimation: true, backgroundColor: bgColor, color: color, ...value })
            return
        }

        if (pages[currentPage.category].mainClass) {
            animation.current = gsap.timeline()
            animation.current.to(pages[currentPage.category].mainClass, { opacity: 0, duration: 0.5 }).call(() => {
                setCurrentPage({ backgroundColor: bgColor, color: color, ...value })
            })
        } else {
            setCurrentPage({ noAnimation: true, backgroundColor: bgColor, color: color, ...value })
        }
    }

    return (
        <NavigationContext.Provider value={{ currentPage, changePage }}>
            {children}
        </NavigationContext.Provider>
    )
}

function concatData() {
    let newArr = []

    for (const key in pages) {
        if (pages[key].backgroundColor) newArr.push({ slug: key, ...pages[key] })
    }

    newArr = newArr.concat(dataFlowers.flowers)
    newArr = newArr.concat(dataGames.games)
    return newArr
}

