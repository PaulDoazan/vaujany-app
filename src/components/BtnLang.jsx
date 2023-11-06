import React from 'react'

export default function BtnLang({ lang }) {
    return (
        <div className="btn__lang__wrapper btn__navigation">
            {lang.toUpperCase()}
        </div>
    )
}
