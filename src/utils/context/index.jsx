import { createContext, useState } from "react";

export const LangContext = createContext()
export const NavigationContext = createContext()

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
    const [currentPage, setCurrentPage] = useState('home')
    const changePage = (value) => {
        setCurrentPage(value)
    }

    return (
        <NavigationContext.Provider value={{ currentPage, changePage }}>
            {children}
        </NavigationContext.Provider>
    )
}