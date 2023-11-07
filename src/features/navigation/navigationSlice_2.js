import { createSlice } from '@reduxjs/toolkit'

const initialState = {
    value: 'home',
}

export const navigationSlice_2 = createSlice({
    name: 'navigation_2',
    initialState,
    reducers: {
        change: (state, action) => {
            state.value = action.payload
        },
    },
})

// Action creators are generated for each case reducer function
export const { change } = navigationSlice_2.actions

export default navigationSlice_2.reducer