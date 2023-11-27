import React, { useContext } from 'react'
import { NavigationContext } from '../../../utils/context'
import pages from '../../../assets/data/pages.json'
import { LangContext } from '../../../utils/context'

export default function CancelPage({ nextPage, handleCancel }) {
    const { changePage } = useContext(NavigationContext)
    const { lang } = useContext(LangContext)

    const handleYes = () => {
        handleCancel(null)
        changePage({ ...nextPage, noAnimation: true })
    }

    const handleNo = () => {
        handleCancel(null)
    }
    return (
        <div className="cancel__container">
            <div className="cancel__wrapper">
                <div className="cancel__text">{pages.cancel[lang].areyousure}</div>
                <div className="cancel__btns__container">
                    <div className="cancel__no__button" onTouchStart={handleNo}>
                        <img className="cancel__btn__img" src="images/icons/cancelNoBtn.png" alt="" />
                        <div className="cancel__btn__text">{pages.cancel[lang].no}</div>
                    </div>
                    <div className="cancel__yes__button" onTouchStart={handleYes}>
                        <img className="cancel__btn__img" src="images/icons/cancelYesBtn.png" alt="" />
                        <div className="cancel__btn__text">{pages.cancel[lang].yes}</div>
                    </div>
                </div>
            </div>
        </div>
    )
}
