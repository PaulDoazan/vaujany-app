import React from 'react'

export default function CancelPage() {
    return (
        <div className="cancel__container">
            <div className="cancel__wrapper">
                <div className="cancel__text">Êtes-vous sûr de vouloir quitter la page ?</div>
                <div className="cancel__btns__container">
                    <div className="cancel__no__button">
                        <img className="cancel__btn__img" src="images/icons/cancelNoBtn.png" alt="" />
                        <div className="cancel__btn__text">NON</div>
                    </div>
                    <div className="cancel__yes__button">
                        <img className="cancel__btn__img" src="images/icons/cancelYesBtn.png" alt="" />
                        <div className="cancel__btn__text">OUI</div>
                    </div>
                </div>
            </div>
        </div>
    )
}
