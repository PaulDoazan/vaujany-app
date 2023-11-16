import { useEffect, useState } from 'react';
import Frame from './components/Frame';
import { NavigationProvider } from './utils/context';
import useImagePreloader from './hooks/useImagePreloader'

const imgs = [
  'images/flowers/full/achillea_millefolium.jpg',
  'images/flowers/full/alchemilla_alpina.jpg',
  'images/flowers/full/angelica_sylvestris.jpg',
  'images/flowers/full/arnica_montana.jpg',
  'images/flowers/full/artemisia_eriantha.jpg',
  'images/flowers/full/carum_carvi.jpg',
  'images/flowers/full/digitalis_grandiflora.jpg',
  'images/flowers/full/euphrasia_minima.jpg',
  'images/flowers/full/gentiana_lutea.jpg',
  'images/flowers/full/geranium_robertianum.jpg',
  'images/flowers/full/hypericum_richeri.jpg',
  'images/flowers/full/leontodon_pyrenaicus.jpeg',
  'images/flowers/full/origanum_vulgare.jpg',
  'images/flowers/full/papaver_rhoeas.jpg',
  'images/flowers/full/plantago_major.jpg',
  'images/flowers/full/polygonatum_odoratum.jpg',
  'images/flowers/full/rhyteuma_spicatum.jpg',
  'images/flowers/full/rumex_pseudalpinus.jpg',
  'images/flowers/full/saxifraga_stellaris.jpg',
  'images/flowers/full/sedum_album.jpg',
  'images/flowers/full/sempervivum_montanum.jpg',
  'images/flowers/full/spirea_ulmaria.jpg',
  'images/flowers/full/thymus_serpyllum.jpg',
  'images/flowers/full/tussilago_farfara.jpg',
  'images/flowers/full/viola_canina.jpg',

  'images/flowers/thumbnails/achillea_millefolium_thumbnail.jpg',
  'images/flowers/thumbnails/alchemilla_alpina_thumbnail.jpg',
  'images/flowers/thumbnails/angelica_sylvestris_thumbnail.jpg',
  'images/flowers/thumbnails/arnica_montana_thumbnail.jpg',
  'images/flowers/thumbnails/artemisia_eriantha_thumbnail.jpg',
  'images/flowers/thumbnails/carum_carvi_thumbnail.jpg',
  'images/flowers/thumbnails/digitalis_grandiflora_thumbnail.jpg',
  'images/flowers/thumbnails/euphrasia_minima_thumbnail.jpg',
  'images/flowers/thumbnails/gentiana_lutea_thumbnail.jpg',
  'images/flowers/thumbnails/geranium_robertianum_thumbnail.jpg',
  'images/flowers/thumbnails/hypericum_richeri_thumbnail.jpg',
  'images/flowers/thumbnails/leontodon_pyrenaicus_thumbnail.jpg',
  'images/flowers/thumbnails/origanum_vulgare_thumbnail.jpg',
  'images/flowers/thumbnails/papaver_rhoeas_thumbnail.jpg',
  'images/flowers/thumbnails/plantago_major_thumbnail.jpg',
  'images/flowers/thumbnails/polygonatum_odoratum_thumbnail.jpg',
  'images/flowers/thumbnails/rhyteuma_spicatum_thumbnail.jpg',
  'images/flowers/thumbnails/rumex_pseudalpinus_thumbnail.jpg',
  'images/flowers/thumbnails/saxifraga_stellaris_thumbnail.jpg',
  'images/flowers/thumbnails/sedum_album_thumbnail.jpg',
  'images/flowers/thumbnails/sempervivum_montanum_thumbnail.jpg',
  'images/flowers/thumbnails/spirea_ulmaria_thumbnail.jpg',
  'images/flowers/thumbnails/thymus_serpyllum_thumbnail.jpg',
  'images/flowers/thumbnails/tussilago_farfara_thumbnail.jpg',
  'images/flowers/thumbnails/viola_canina_thumbnail.jpg',
]

function App() {
  const [nbScreen, setNbScreen] = useState(1)
  const { imagesPreloaded } = useImagePreloader(imgs)

  const screens = []

  for (let i = 0; i < nbScreen; i++) {
    screens.push(i);
  }

  const handleNbScreenChange = (e) => {
    if (e.key === 'e') {
      setNbScreen(1);
    } else if (e.key === 'r') {
      setNbScreen(4);
    } else if (e.target.value === '1') {
      setNbScreen(e.target.value);
    } else if (e.target.value === '4') {
      setNbScreen(e.target.value);
    }
  }

  window.addEventListener('keydown', handleNbScreenChange)

  return (
    <>
      {imagesPreloaded ? <div className={`screens__container__${screens.length}`}>
        {screens.map((el, index, arr) => {
          return <NavigationProvider><Frame key={index} id={index} arrLength={arr.length} /></NavigationProvider>
        })}
      </div> : <div>IS LOADING</div>}

      {/* <select name="nbScreens" id="nbScreen-select" className='nbScreen__select' onChange={handleNbScreenChange}>
        <option value="1">1</option>
        <option value="4">4</option>
      </select> */}
    </>
  )
}

export default App;