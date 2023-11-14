import React, { useContext } from 'react'
import { NavigationContext } from '../../../utils/context'
import navigation_configs from '../../../config/navigation_configs.json'

export default function BtnBack() {
    const { changePage, currentPage } = useContext(NavigationContext)

    const handlePreviousPage = () => {
        if (currentPage.category === 'home') return
        if (currentPage.element) {
            if (currentPage.category === "explore") {
                changePage({ category: currentPage.category })
            } else {
                const el = currentPage.category === currentPage.element ? currentPage.element : null
                changePage({ category: navigation_configs[currentPage.category].previous, element: el })
            }

        } else {
            changePage({ category: navigation_configs[currentPage.category].previous })
        }
    }
    return (
        <div onTouchEnd={handlePreviousPage} className="btn__back btn__navigation">
            <svg style={{ transform: `scale(${window.innerWidth / 1920})`, marginTop: `${window.innerHeight / 1080}vh` }} xmlns="http://www.w3.org/2000/svg" width="44.004" height="43.998" viewBox="0 0 44.004 43.998">
                <path className="btn__home__path" id="Soustraction_17" data-name="Soustraction 17" d="M-11658,19215a21.807,21.807,0,0,1-8.562-1.73,21.89,21.89,0,0,1-6.994-4.715,21.93,21.93,0,0,1-4.715-6.992A21.86,21.86,0,0,1-11680,19193a21.863,21.863,0,0,1,1.729-8.564,21.89,21.89,0,0,1,4.715-6.99,21.911,21.911,0,0,1,6.994-4.715A21.855,21.855,0,0,1-11658,19171a21.869,21.869,0,0,1,8.564,1.729,21.873,21.873,0,0,1,7,4.715,21.89,21.89,0,0,1,4.715,6.99A21.863,21.863,0,0,1-11636,19193a21.86,21.86,0,0,1-1.729,8.563,21.887,21.887,0,0,1-4.715,6.992,21.873,21.873,0,0,1-7,4.715A21.822,21.822,0,0,1-11658,19215Zm-8.893-25.914a1,1,0,0,0-.714.293l-4.315,4.3a1.533,1.533,0,0,0-.468,1.113,1.594,1.594,0,0,0,.468,1.133l4.171,4.156a.973.973,0,0,0,.714.295,1.063,1.063,0,0,0,.709-.279l.01-.01a1,1,0,0,0,.294-.715,1.008,1.008,0,0,0-.294-.717l-2.869-2.908h18.937a5.6,5.6,0,0,0,3.988-1.66,5.6,5.6,0,0,0,1.659-3.982v-3.477a1.014,1.014,0,0,0-1.013-1.014,1.017,1.017,0,0,0-1.018,1.014v3.477a3.573,3.573,0,0,1-1.061,2.551,3.6,3.6,0,0,1-2.557,1.066h-18.9l2.971-2.9.01,0a1.009,1.009,0,0,0,.294-.719,1.01,1.01,0,0,0-.294-.719A.992.992,0,0,0-11666.895,19189.084Z" transform="translate(11680.002 -19171)" fill={currentPage.color} />
            </svg>
        </div>
    )
}
