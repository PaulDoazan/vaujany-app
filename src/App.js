import { useEffect, useState } from 'react';
import Frame from './components/Frame';
import { NavigationProvider } from './utils/context';
import useImagePreloader from './hooks/useImagePreloader'
import images from './assets/data/imagesPaths.json'

function App() {
  const [nbScreen, setNbScreen] = useState(1)
  const { imagesPreloaded } = useImagePreloader(images.paths)

  // const imagesPreloaded = true

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
      </div> : <div className="preloader__container">
        <div>LOADING</div>
        <div className='spinner'>
          <div className="lds-roller"><div></div><div></div><div></div><div></div><div></div><div></div><div></div><div></div></div>
        </div>
      </div>}

      {/* <select name="nbScreens" id="nbScreen-select" className='nbScreen__select' onChange={handleNbScreenChange}>
        <option value="1">1</option>
        <option value="4">4</option>
      </select> */}

      {/* <div className={`screens__container__${screens.length}`}>
        {screens.map((el, index, arr) => {
          return <NavigationProvider key={index}><Frame key={index} id={index} arrLength={arr.length} /></NavigationProvider>
        })}
      </div> */}
    </>
  )
}

export default App;