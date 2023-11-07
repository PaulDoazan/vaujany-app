import React from 'react'
import { useContext } from 'react'
import { LangContext } from '../../utils/context'

export default function FlowerCard({ data }) {
    const { lang } = useContext(LangContext)
    return (
        <div>
            {data[`title_${lang}`]}
        </div>
    )
}
