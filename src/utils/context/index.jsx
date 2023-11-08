import { createContext, useState } from "react";

import dataFlowers from '../../assets/data/flowers.json'
import dataGames from '../../assets/data/games.json'
import pages from '../../config/navigation_configs.json'

const allPages = concatData()

export const LangContext = createContext()
export const NavigationContext = createContext()

const getColor = (pageObject) => {
    console.log(allPages);
    if (pageObject.element) {
        return allPages.find(el => el.slug === pageObject.element).backgroundColor
    } else {
        return allPages.find(el => el.slug === pageObject.category).backgroundColor
    }
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
    const [currentPage, setCurrentPage] = useState({ category: 'home' })
    const changePage = (value) => {
        setCurrentPage({ backgroundColor: getColor(value), ...value })
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
        newArr.push({ slug: key, ...pages[key] })
    }

    newArr = newArr.concat(dataFlowers.flowers)
    newArr = newArr.concat(dataGames.games)
    return newArr
}

