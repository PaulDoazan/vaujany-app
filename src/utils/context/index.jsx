import { createContext, useRef, useState } from "react";

import dataFlowers from '../../assets/data/flowers.json'
import dataGames from '../../assets/data/games.json'
import pages from '../../config/navigation_configs.json'
import gsap from "gsap";

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

        if (currentPage.category === value.category) return

        if (currentPage.category === 'home' && value.category === 'gamesHome' || currentPage.category === 'gamesHome' && value.category === 'home') {
            setCurrentPage({ noAnimation: true, backgroundColor: bgColor, color: color, ...value })
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

