import { createSlice } from '@reduxjs/toolkit'
const items=localStorage.getItem('bag') !=null ?JSON.parse(localStorage.getItem('bag')):[]
const init = {
    bag: items,
    bagLenght:items.length
}

export const BagSlice = createSlice({
    name: 'Bag',
    initialState: init,
    reducers: {
        Add: (state,action) => {
            const exists = state.bag.some(function (obj) {
                return obj.id === action.payload.id;
            }); 
            if(!exists){
                state.bag.push(action.payload) 
                localStorage.setItem('bag',JSON.stringify(state.bag))
                state.bagLenght=state.bag.length
                }
        },
        Remove: (state,action) => {
            state.bag=state.bag.filter(function(obj) {
                return obj.id !== action.payload;
              });
              localStorage.setItem('bag',JSON.stringify(state.bag))
              state.bagLenght=state.bag.length
        }, 
    },
})
 
export const { Add, Remove } = BagSlice.actions

export default BagSlice.reducer