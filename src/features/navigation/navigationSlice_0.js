import { createSlice } from '@reduxjs/toolkit'

const initialState = {
    value: 'home',
}

export const navigationSlice_0 = createSlice({
    name: 'navigation_0',
    initialState,
    reducers: {
        change: (state, action) => {
            state.value = action.payload
        },
    },
})

// Action creators are generated for each case reducer function
export const { change } = navigationSlice_0.actions

export default navigationSlice_0.reducer