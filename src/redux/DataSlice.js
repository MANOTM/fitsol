import { createSlice } from '@reduxjs/toolkit'

const init = {
    NEW_ARRIVALS: [],
    BAG_SUGG: [], 
}

export const DataSlice = createSlice({
    name: 'data',
    initialState: init,
    reducers: {
        INITIAL_NEW_ARRIVALS: (state,action) => {
            state.NEW_ARRIVALS=action.payload
        },
        INITIAL_BAG_SUGG: (state,action) => {
            state.BAG_SUGG=action.payload
        }
    },
})
 
export const { INITIAL_NEW_ARRIVALS ,INITIAL_BAG_SUGG} = DataSlice.actions

export default DataSlice.reducer