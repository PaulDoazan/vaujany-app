import { useState } from 'react';
import Frame from './components/Frame';

function App() {
  const [nbScreen, setNbScreen] = useState(1)

  const screens = []

  for (let i = 0; i < nbScreen; i++) {
    screens.push(i);
  }

  const handleNbScreenChange = (e) => {
    console.log(e);
    if (e.key === 'e') {
      setNbScreen(1);
    } else if (e.key === 'r') {
      setNbScreen(4);
    }
  }

  window.addEventListener('keydown', handleNbScreenChange)

  return (
    <>

      <div className={`screens__container__${screens.length}`}>
        {screens.map((el, index, arr) => {
          return <Frame key={index} id={index} arrLength={arr.length} />
        })}
      </div>
    </>
  )
}

export default App;