import { useState } from 'react';
import Frame from './components/Frame';

function App() {
  const [nbScreen, setNbScreen] = useState(1)

  const screens = []

  for (let i = 0; i < nbScreen; i++) {
    screens.push(i);
  }

  const handleNbScreenChange = (e) => {
    setNbScreen(e.target.value);
  }

  return (
    <>

      <div className={`screens__container__${screens.length}`}>
        {screens.map((el, index, arr) => {
          return <Frame key={index} id={index} arrLength={arr.length} />
        })}
      </div>
      <select name="nbScreens" id="nbScreen-select" className='nbScreen__select' onChange={handleNbScreenChange}>
        <option value="1">1</option>
        <option value="2">2</option>
        <option value="4">4</option>
      </select>
    </>
  )
}

export default App;