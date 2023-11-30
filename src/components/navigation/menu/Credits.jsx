import React, { useContext } from 'react'
import pages from '../../../assets/data/pages.json'
import { LangContext } from '../../../utils/context'

export default function Credits() {
    const { lang } = useContext(LangContext)

    const creditsStyle = {
        position: 'absolute',
        width: '18%',
        height: '100%',
        backgroundColor: '#AAB8A8',
        textAlign: 'left',
        right: '3.5%',
        bottom: '0'
    }

    const titleStyle = {
        position: 'absolute',
        top: '56%',
        left: '15%'
    }

    const listStyle = {
        position: 'absolute',
        top: '64%',
        left: '15%'
    }
    return (
        <div className="credits__content" style={creditsStyle}>
            <div className="credits__title" style={titleStyle}>{pages.home[lang].photography}</div>
            <div className="credits__list" style={listStyle}>
                <p>Quintard Cyrille</p>
                <p>Nicollet Jean-Pierre</p>
                <p>Nicollet Bernard</p>
                <p>Warluzelle Olivier</p>
                <p>Albert Christophe</p>
                <p>Corail Marc</p>
                <p>Fiat Denis</p>
                <p>Vincent Dominique</p>
            </div>
        </div>
    )
}
