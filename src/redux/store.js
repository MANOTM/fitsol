import { configureStore } from '@reduxjs/toolkit'
import BagSlice from './BagSlice'
import UserSlice from './UserSlice'
import DataSlice from './DataSlice'

export const store = configureStore({
  reducer: {
    bag:BagSlice,
    user:UserSlice,
    data:DataSlice
  },
})