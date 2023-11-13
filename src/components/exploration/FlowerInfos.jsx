import React, { useContext } from 'react'
import dataFlowers from '../../assets/data/flowers.json'
import { LangContext } from '../../utils/context'

export default function FlowerInfos({ data }) {
    const { lang } = useContext(LangContext)
    const currentFlower = dataFlowers.flowers.find(el => el.slug === data)

    const handleTouch = (e) => {
        e.stopPropagation()
    }
    return (
        <div onTouchStart={handleTouch} onTouchMove={handleTouch} onTouchEnd={handleTouch} className='flower__info__container'>
            <div className="flower__info__img__container">
                <img src={"/images/flowers/" + currentFlower.full} />
            </div>
            <div className="flower__infos__data__container">
                <div className="flower__info__title">
                    <div className="flower__info__title__lang">
                        {currentFlower[`title_${lang}`]}
                    </div>

                    <div className="flower__info__title__latin">
                        {currentFlower[`title_latin`]}
                    </div>
                </div>

                <div className="flower__info__contents">
                    <div className="flower__info__caracteristics">
                        <div className="flower__info__caracteristics__icons">
                            <div className="flower__info__family__icon">
                                <svg xmlns="http://www.w3.org/2000/svg" width="22.467" height="29.619" viewBox="0 0 22.467 29.619">
                                    <path id="Tracé_27" data-name="Tracé 27" d="M8.151,23.5c8.669-3.466,11.015,4.723,11.015,4.723S11.617,32.167,8.151,23.5Z" transform="translate(0.029 0)" fill="none" stroke="#1d1d1b" stroke-miterlimit="10" stroke-width="1" />
                                    <path id="Tracé_28" data-name="Tracé 28" d="M21.934,10.426c.25,10.9-9.664,10.119-9.664,10.119S11.037,10.676,21.934,10.426Z" transform="translate(0.029 0)" fill="none" stroke="#1d1d1b" stroke-miterlimit="10" stroke-width="1" />
                                    <line id="Ligne_8" data-name="Ligne 8" y1="10.119" x2="9.664" transform="translate(12.298 10.426)" fill="none" stroke="#1d1d1b" stroke-miterlimit="10" stroke-width="1" />
                                    <line id="Ligne_9" data-name="Ligne 9" x2="4.171" y2="0.504" transform="translate(14.703 18.027)" fill="none" stroke="#1d1d1b" stroke-miterlimit="10" stroke-width="1" />
                                    <line id="Ligne_10" data-name="Ligne 10" x2="3.981" y2="0.481" transform="translate(16.665 15.973)" fill="none" stroke="#1d1d1b" stroke-miterlimit="10" stroke-width="1" />
                                    <line id="Ligne_11" data-name="Ligne 11" x2="2.677" y2="0.324" transform="translate(18.965 13.564)" fill="none" stroke="#1d1d1b" stroke-miterlimit="10" stroke-width="1" />
                                    <path id="Tracé_29" data-name="Tracé 29" d="M5.709.707c11.721,11.721,0,21.278,0,21.278S-6.012,12.428,5.709.707Z" transform="translate(0.029 0)" fill="none" stroke="#1d1d1b" stroke-miterlimit="10" stroke-width="1" />
                                    <line id="Ligne_12" data-name="Ligne 12" y1="21.278" transform="translate(5.738 0.707)" fill="none" stroke="#1d1d1b" stroke-miterlimit="10" stroke-width="1" />
                                    <line id="Ligne_13" data-name="Ligne 13" y1="3.827" x2="5.117" transform="translate(5.738 12.863)" fill="none" stroke="#1d1d1b" stroke-miterlimit="10" stroke-width="1" />
                                    <line id="Ligne_14" data-name="Ligne 14" y1="3.652" x2="4.884" transform="translate(5.738 8.718)" fill="none" stroke="#1d1d1b" stroke-miterlimit="10" stroke-width="1" />
                                    <line id="Ligne_15" data-name="Ligne 15" y1="2.456" x2="3.284" transform="translate(5.738 4.85)" fill="none" stroke="#1d1d1b" stroke-miterlimit="10" stroke-width="1" />
                                    <line id="Ligne_16" data-name="Ligne 16" x1="5.117" y1="3.827" transform="translate(0.453 12.863)" fill="none" stroke="#1d1d1b" stroke-miterlimit="10" stroke-width="1" />
                                    <line id="Ligne_17" data-name="Ligne 17" x1="4.884" y1="3.652" transform="translate(0.686 8.718)" fill="none" stroke="#1d1d1b" stroke-miterlimit="10" stroke-width="1" />
                                    <line id="Ligne_18" data-name="Ligne 18" x1="3.284" y1="2.456" transform="translate(2.286 4.85)" fill="none" stroke="#1d1d1b" stroke-miterlimit="10" stroke-width="1" />
                                </svg>

                            </div>
                            <div className="flower__info__bloom__icon">
                                <svg xmlns="http://www.w3.org/2000/svg" width="18.836" height="19.01" viewBox="0 0 18.836 19.01">
                                    <path id="Tracé_23" data-name="Tracé 23" d="M12.387,45.619A1.991,1.991,0,1,1,10.4,43.628,1.991,1.991,0,0,1,12.387,45.619Z" transform="translate(-0.981 -36.125)" fill="none" stroke="#1d1d1b" stroke-miterlimit="10" stroke-width="1" />
                                    <path id="Tracé_24" data-name="Tracé 24" d="M19.317,45.619c0-1.164-1.481-2.118-3.368-2.216,1.262-1.4,1.634-3.123.812-3.945-.861-.861-2.708-.412-4.143,1,0-.049,0-.1,0-.145,0-2.037-1-3.688-2.225-3.688-1.2,0-2.183,1.583-2.223,3.561-1.423-1.348-3.215-1.766-4.06-.921s-.414,2.7.987,4.13c-2,.023-3.618,1.009-3.618,2.224,0,1.175,1.51,2.136,3.422,2.218-1.317,1.416-1.719,3.182-.882,4.019.863.863,2.715.411,4.151-1.006,0,.033,0,.065,0,.1,0,2.037,1,3.688,2.225,3.688,1.191,0,2.163-1.551,2.222-3.5,1.409,1.287,3.149,1.673,3.978.844.86-.86.414-2.7-.99-4.135h.024C17.666,47.844,19.317,46.848,19.317,45.619Z" transform="translate(-0.981 -36.125)" fill="none" stroke="#1d1d1b" stroke-miterlimit="10" stroke-width="1" />
                                </svg>
                            </div>
                            <div className="flower__info__height__icon">
                                <svg xmlns="http://www.w3.org/2000/svg" width="13.266" height="18.688" viewBox="0 0 13.266 18.688">
                                    <line id="Ligne_1" data-name="Ligne 1" x2="1" transform="translate(0 18.188)" fill="none" stroke="#1d1d1b" stroke-miterlimit="10" stroke-width="1" />
                                    <line id="Ligne_2" data-name="Ligne 2" x2="7.886" transform="translate(3.253 18.188)" fill="none" stroke="#1d1d1b" stroke-miterlimit="10" stroke-width="1" stroke-dasharray="2.253 2.253" />
                                    <line id="Ligne_3" data-name="Ligne 3" x2="1" transform="translate(12.266 18.188)" fill="none" stroke="#1d1d1b" stroke-miterlimit="10" stroke-width="1" />
                                    <line id="Ligne_4" data-name="Ligne 4" x2="1" transform="translate(0 0.5)" fill="none" stroke="#1d1d1b" stroke-miterlimit="10" stroke-width="1" />
                                    <line id="Ligne_5" data-name="Ligne 5" x2="7.886" transform="translate(3.253 0.5)" fill="none" stroke="#1d1d1b" stroke-miterlimit="10" stroke-width="1" stroke-dasharray="2.253 2.253" />
                                    <line id="Ligne_6" data-name="Ligne 6" x2="1" transform="translate(12.266 0.5)" fill="none" stroke="#1d1d1b" stroke-miterlimit="10" stroke-width="1" />
                                    <line id="Ligne_7" data-name="Ligne 7" y1="16.545" transform="translate(6.633 1.643)" fill="none" stroke="#1d1d1b" stroke-miterlimit="10" stroke-width="1" />
                                    <path id="Tracé_25" data-name="Tracé 25" d="M12.094,67.2,10.4,65.5,8.7,67.2v-1.44l1.7-1.695,1.695,1.695Z" transform="translate(-3.766 -63.56)" fill="#1d1d1b" />
                                </svg>
                            </div>
                            <div className="flower__info__habitat__icon">
                                <svg xmlns="http://www.w3.org/2000/svg" width="17.646" height="17.8" viewBox="0 0 17.646 17.8">
                                    <rect id="Rectangle_166" data-name="Rectangle 166" width="13.426" height="9.779" transform="translate(2.11 7.521)" fill="none" stroke="#1d1d1b" stroke-miterlimit="10" stroke-width="1" />
                                    <path id="Tracé_26" data-name="Tracé 26" d="M2.076,98.8,10.4,91.779,18.722,98.8Z" transform="translate(-1.576 -91.279)" fill="none" stroke="#1d1d1b" stroke-linecap="round" stroke-linejoin="round" stroke-width="1" />
                                    <rect id="Rectangle_167" data-name="Rectangle 167" width="3.219" height="4.911" transform="translate(7.214 12.389)" fill="none" stroke="#1d1d1b" stroke-linecap="round" stroke-linejoin="round" stroke-width="1" />
                                </svg>
                            </div>
                        </div>

                        <div className="flower__info__caracteristics__titles">
                            <div className="flower__info__family__title">Famille</div>
                            <div className="flower__info__bloom__title">Floraison</div>
                            <div className="flower__info__height__title">Hauteur</div>
                            <div className="flower__info__habitat__title">Habitat</div>
                        </div>

                        <div className="flower__info__caracteristics__contents">
                            <div className="flower__info__family__content"></div>
                            <div className="flower__info__bloom__content"></div>
                            <div className="flower__info__height__content"></div>
                            <div className="flower__info__habitat__content"></div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}
