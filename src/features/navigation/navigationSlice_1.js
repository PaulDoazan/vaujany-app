import { createSlice } from '@reduxjs/toolkit'

const initialState = {
    value: 'home',
}

export const navigationSlice_1 = createSlice({
    name: 'navigation_1',
    initialState,
    reducers: {
        change: (state, action) => {
            state.value = action.payload
        },
    },
})

// Action creators are generated for each case reducer function
export const { change } = navigationSlice_1.actions

export default navigationSlice_1.reducer