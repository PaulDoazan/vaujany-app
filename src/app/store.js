import { configureStore } from '@reduxjs/toolkit'
import navigationReducer_0 from '../features/navigation/navigationSlice_0'
import navigationReducer_1 from '../features/navigation/navigationSlice_1'
import navigationReducer_2 from '../features/navigation/navigationSlice_2'
import navigationReducer_3 from '../features/navigation/navigationSlice_3'

export const store = configureStore({
    reducer: {
        navigation_0: navigationReducer_0,
        navigation_1: navigationReducer_1,
        navigation_2: navigationReducer_2,
        navigation_3: navigationReducer_3,
    },
})