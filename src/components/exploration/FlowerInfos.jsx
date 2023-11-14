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
                        {currentFlower[lang].title}
                    </div>

                    <div className="flower__info__title__latin">
                        {currentFlower[`title_latin`]}
                    </div>
                </div>

                <div className="flower__info__contents">
                    <div className="flower__info__caracteristics">
                        <div className="flower__info__caracteristics__icons">
                            <div className="flower__info__family__icon flower__info__icon">
                                <img src="/images/icons/family.svg" alt="" />
                            </div>
                            <div className="flower__info__bloom__icon flower__info__icon">
                                <img src="/images/icons/bloom.svg" alt="" />
                            </div>
                            <div className="flower__info__height__icon flower__info__icon">
                                <img src="/images/icons/height.svg" alt="" />
                            </div>
                            <div className="flower__info__habitat__icon flower__info__icon">
                                <img src="/images/icons/habitat.svg" alt="" />
                            </div>
                        </div>

                        <div className="flower__info__caracteristics__titles">
                            <div className="flower__info__family__title flower__info__caracteristics__titles__element">Famille</div>
                            <div className="flower__info__bloom__title flower__info__caracteristics__titles__element">Floraison</div>
                            <div className="flower__info__height__title flower__info__caracteristics__titles__element">Hauteur</div>
                            <div className="flower__info__habitat__title flower__info__caracteristics__titles__element">Habitat</div>
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
