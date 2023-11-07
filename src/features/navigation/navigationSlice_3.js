import { createSlice } from '@reduxjs/toolkit'

const initialState = {
    value: 'home',
}

export const navigationSlice_3 = createSlice({
    name: 'navigation_3',
    initialState,
    reducers: {
        change: (state, action) => {
            state.value = action.payload
        },
    },
})

// Action creators are generated for each case reducer function
export const { change } = navigationSlice_3.actions

export default navigationSlice_3.reducer