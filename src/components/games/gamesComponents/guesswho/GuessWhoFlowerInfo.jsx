import parse from "html-react-parser"
import React, { useContext } from 'react'
import { LangContext, NavigationContext } from '../../../../utils/context'
import pages from '../../../../assets/data/pages.json'

export default function GuessWhoFlowerInfo({ data, index, handleOverlay }) {
    const { lang } = useContext(LangContext)
    const { currentPage } = useContext(NavigationContext)

    const contentStyle = {
        color: data.color
    }
    return (
        <div className={`flower__info__game__overlay flower__info__game__overlay__${index}`} dataindex={index} onTouchStart={handleOverlay}>
            <div className="flower__info__game__container">
                <div className="guesswho__flower__info__game__wrapper">
                    <img style={{ width: data.gameInfoResizeIcon && currentPage.element === "levels" ? data.gameInfoResizeIcon : "120%" }} className="guesswho__flower__info__game__illustration" src={`images/illustrations/illustrationInfoGame_${data.slug}.png`} alt="" />
                    <img className="guesswho__flower__info__game__circle" src={`images/illustrations/circleInfoGame_${data.slug}.svg`} alt="" />
                    <img className="guesswho__flower__info__game__cross" src={`images/illustrations/cross_${data.slug}.svg`} alt="" />
                    <div className="guesswho__flower__info__game__content" style={contentStyle}>
                        <div className="guesswho__flower__info__game__title">{data[lang].title}</div>
                        <div className="guesswho__flower__info__game__latin">{data.title_latin}</div>

                        <div className="guesswho__info__caracteristics">
                            <div className="guesswho__flower__info__caracteristics__section guesswho__caracteristics__section__1">
                                <div className="guesswho__flower__info__caracteristics__element">
                                    <span className="guesswho__flower__info__icon"><img src={`${data.color === '#fff' ? 'images/icons/familyWhite.svg' : 'images/icons/family.svg'}`} alt="" /></span>
                                </div>
                                <div className="guesswho__flower__info__caracteristics__element">
                                    <span className="guesswho__flower__info__icon"><img src={`${data.color === '#fff' ? 'images/icons/bloomWhite.svg' : 'images/icons/bloom.svg'}`} alt="" /></span>
                                </div>
                                <div className="guesswho__flower__info__caracteristics__element">
                                    <span className="guesswho__flower__info__icon"><img src={`${data.color === '#fff' ? 'images/icons/heightWhite.svg' : 'images/icons/height.svg'}`} alt="" /></span>
                                </div>
                                <div className="guesswho__flower__info__caracteristics__element">
                                    <span className="guesswho__flower__info__icon"><img src={`${data.color === '#fff' ? 'images/icons/habitatWhite.svg' : 'images/icons/habitat.svg'}`} alt="" /></span>
                                </div>
                            </div>

                            <div className="guesswho__flower__info__caracteristics__section guesswho__caracteristics__section__2">
                                <div className="guesswho__flower__info__caracteristics__element">
                                    <span className="guesswho__flower__info__real__title">{pages.flowerInfos[lang].family}</span>
                                    <span className="guesswho__flower__info__icon fake__icon"><img src="/images/icons/family.svg" alt="" /></span>
                                </div>
                                <div className="guesswho__flower__info__caracteristics__element">
                                    <span className="guesswho__flower__info__real__title">{pages.flowerInfos[lang].bloom}</span>
                                    <span className="guesswho__flower__info__icon fake__icon"><img src="/images/icons/bloom.svg" alt="" /></span>
                                </div>
                                <div className="guesswho__flower__info__caracteristics__element">
                                    <span className="guesswho__flower__info__real__title">{pages.flowerInfos[lang].height}</span>
                                    <span className="guesswho__flower__info__icon fake__icon"><img src="/images/icons/height.svg" alt="" /></span>
                                </div>
                                <div className="guesswho__flower__info__caracteristics__element">
                                    <span className="guesswho__flower__info__real__title">{pages.flowerInfos[lang].habitat}</span>
                                    <span className="guesswho__flower__info__icon fake__icon"><img src="/images/icons/habitat.svg" alt="" /></span>
                                </div>
                            </div>

                            <div className="guesswho__flower__info__caracteristics__section guesswho__caracteristics__section__3">
                                <div className="guesswho__flower__info__caracteristics__element">
                                    <span className="guesswho__flower__info__real__title">{data[lang].family}</span>
                                    <span className="guesswho__flower__info__icon fake__icon"><img src="/images/icons/family.svg" alt="" /></span>
                                </div>
                                <div className="guesswho__flower__info__caracteristics__element">
                                    <span className="guesswho__flower__info__real__title">{data[lang].bloom}</span>
                                    <span className="guesswho__flower__info__icon fake__icon"><img src="/images/icons/bloom.svg" alt="" /></span>
                                </div>
                                <div className="guesswho__flower__info__caracteristics__element">
                                    <span className="guesswho__flower__info__real__title">{data[lang].height}</span>
                                    <span className="guesswho__flower__info__icon fake__icon"><img src="/images/icons/height.svg" alt="" /></span>
                                </div>
                                <div className="guesswho__flower__info__caracteristics__element">
                                    <div className="guesswho__flower__info__last__element">
                                        <span className="guesswho__flower__info__real__title" style={{ fontSize: data[lang].habitatGameInfoSmaller && data[lang].habitatGameInfoSmaller }}>{parse(data[lang].habitatGameInfo)}</span>
                                        <span className="guesswho__flower__info__icon fake__icon"><img src="/images/icons/habitat.svg" alt="" /></span>
                                        {data[lang].toxic &&
                                            <img className="guesswho__flower__info__toxic__content__img" src="/images/icons/toxic.svg" alt="" />
                                        }
                                    </div>
                                </div>
                            </div>

                        </div>

                    </div>
                </div>
            </div>
        </div >
    )
}