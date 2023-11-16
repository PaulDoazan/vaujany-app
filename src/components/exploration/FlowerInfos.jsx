import React, { useContext } from 'react'
import dataFlowers from '../../assets/data/flowers.json'
import { LangContext } from '../../utils/context'
import navigation_configs from '../../config/navigation_configs.json'
import DidYouKnow from './DidYouKnow'

export default function FlowerInfos({ data }) {
    const { lang } = useContext(LangContext)
    const currentFlower = dataFlowers.flowers.find(el => el.slug === data)

    const handleTouch = (e) => {
        e.stopPropagation()
    }

    console.log(currentFlower[lang].family);

    return (
        <div onTouchStart={handleTouch} onTouchMove={handleTouch} onTouchEnd={handleTouch} className='flower__info__container'>
            <div className="flower__info__img__container">
                <img src={"images/flowers/full/" + currentFlower.full} />
            </div>
            <div className="flower__infos__data__container">
                <div className="flower__info__title">
                    <div className="flower__info__title__lang">
                        {currentFlower[lang].title}
                    </div>

                    <div className="flower__info__title__latin">
                        {currentFlower[`title_latin`]}
                    </div>
                </div>

                <div className="flower__info__caracteristics__section caracteristics__section__1">
                    <div className="flower__info__caracteristics__element">
                        <span className="flower__info__icon"><img src="images/icons/family.svg" alt="" /></span>
                    </div>
                    <div className="flower__info__caracteristics__element">
                        <span className="flower__info__icon"><img src="images/icons/bloom.svg" alt="" /></span>
                    </div>
                    <div className="flower__info__caracteristics__element">
                        <span className="flower__info__icon"><img src="images/icons/height.svg" alt="" /></span>
                    </div>
                    <div className="flower__info__caracteristics__element">
                        <span className="flower__info__icon"><img src="images/icons/habitat.svg" alt="" /></span>
                    </div>
                </div>

                <div className="flower__info__caracteristics__section caracteristics__section__2">
                    <div className="flower__info__caracteristics__element">
                        <span className="flower__info__real__title">{navigation_configs.flowerInfos[lang].family}</span>
                        <span className=" flower__info__icon fake__icon"><img src="images/icons/family.svg" alt="" /></span>
                    </div>
                    <div className="flower__info__caracteristics__element">
                        <span className="flower__info__real__title">{navigation_configs.flowerInfos[lang].bloom}</span>
                        <span className=" flower__info__icon fake__icon"><img src="images/icons/bloom.svg" alt="" /></span>
                    </div>
                    <div className="flower__info__caracteristics__element">
                        <span className="flower__info__real__title">{navigation_configs.flowerInfos[lang].height}</span>
                        <span className=" flower__info__icon fake__icon"><img src="images/icons/height.svg" alt="" /></span>
                    </div>
                    <div className="flower__info__caracteristics__element">
                        <span className="flower__info__real__title">{navigation_configs.flowerInfos[lang].habitat}</span>
                        <span className=" flower__info__icon fake__icon"><img src="images/icons/habitat.svg" alt="" /></span>
                    </div>
                </div>

                <div className="flower__info__caracteristics__section caracteristics__section__3">
                    <div className="flower__info__caracteristics__element">
                        <span className="flower__info__real__title">{currentFlower[lang].family}</span>
                        <span className="flower__info__icon fake__icon"><img src="images/icons/family.svg" alt="" /></span>
                    </div>
                    <div className="flower__info__caracteristics__element">
                        <span className="flower__info__real__title">{currentFlower[lang].bloom}</span>
                        <span className="flower__info__icon fake__icon"><img src="images/icons/bloom.svg" alt="" /></span>
                    </div>
                    <div className="flower__info__caracteristics__element">
                        <span className="flower__info__real__title">{currentFlower[lang].height}</span>
                        <span className="flower__info__icon fake__icon"><img src="images/icons/height.svg" alt="" /></span>
                    </div>
                    <div className="flower__info__caracteristics__element">
                        <div className="flower__info__last__element">
                            <span className="flower__info__real__title">{currentFlower[lang].habitat}</span>
                            <span className="flower__info__icon fake__icon"><img src="images/icons/habitat.svg" alt="" /></span>
                            {currentFlower[lang].toxic &&
                                <div className={`flower__info__toxic__content ${currentFlower[lang].toxicParagraph && 'content__title__not__centered'}`}>
                                    <img className="flower__info__toxic__content__img" src="/images/icons/toxic.svg" alt="" />
                                    <div className="flower__info__toxic__content__text">
                                        <div className={`flower__info__toxic__content__title`}>
                                            {currentFlower[lang].toxic}
                                        </div>
                                        {currentFlower[lang].toxicParagraph &&
                                            <div className="flower__info__toxic__content__paragraph">
                                                {currentFlower[lang].toxicParagraph}
                                            </div>
                                        }
                                    </div>
                                </div>
                            }
                        </div>
                    </div>
                </div>
                <div className="flower__info__specification">
                    <div className="flower__info__specification__section">
                        <p className="flower__info__specification__title">{navigation_configs.flowerInfos[lang].medical}</p>
                        <p className="flower__info__specification__content">{currentFlower[lang].medical}</p>
                        <p className="flower__info__specification__content">{currentFlower[lang].medical}</p>
                    </div>
                    <div className="">
                        <p className="flower__info__specification__title">{navigation_configs.flowerInfos[lang].cooking}</p>
                        <p className="flower__info__specification__content">{currentFlower[lang].cooking}</p>
                    </div>
                </div>

                {currentFlower[lang].didYouKnow &&
                    <DidYouKnow currentFlower={currentFlower} lang={lang} />
                }
            </div>
        </div >
    )
}
