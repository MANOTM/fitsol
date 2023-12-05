import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import axios from '../axios/axios'; 
import Cookies from 'js-cookie';
 
export const fetchUser = createAsyncThunk('user/fetchUser',async (id,thunkAPI)=>{
    const response = await axios.post("/me",{API_PASS:12345},{headers:{'Authorization':'Bearer ' + Cookies.get('token'),}});
    const data = await response.data
    return data
})


const userSlice = createSlice({
  name: 'user',
  initialState: {
    user: null,
    loading: false,
    error: false,
  },
  reducers:{
    logout:(state,action)=>{ 
        state.user=null
    },  
    loginIn:(state,action)=>{ 
        state.user=action.payload
    },  
  },
  extraReducers:{
    [fetchUser.pending]:(state,action)=>{
        state.loading = true; 
    },
    [fetchUser.fulfilled]:(state,action)=>{
        state.loading = false;
        state.user = action.payload?.data;  
    },
    [fetchUser.rejected]:(state,action)=>{
        state.loading=false  
    }
}
});

export default userSlice.reducer;
export const { logout , loginIn}= userSlice.actions