import { createContext, useState } from "react";

import dataFlowers from '../../assets/data/flowers.json'
import dataGames from '../../assets/data/games.json'
import pages from '../../config/navigation_configs.json'

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

    const changePage = (value) => {
        const { bgColor, color } = getColors(value);

        setCurrentPage({ backgroundColor: bgColor, color: color, ...value })
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

