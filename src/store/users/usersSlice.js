import { createSlice,createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
const url='https://randomuser.me/api/?results=5'
const initialState ={
  users:[],
  isLoading: false,
  error:undefined
}
export const fetchuser=createAsyncThunk('user/fetchuser',async(thunkAPI)=>{
  try{
    const result=await axios(url)
    return result.data.results
  }
  catch (error){
    return thunkAPI.rejectWithValue('somwthing went wrong..',error)
  }
})
const userSlice =createSlice({
    name:'user',
    initialState,
    extraReducers(builder){
       builder
          .addCase(fetchuser.pending,(state)=>{
            state.isLoading=true
          })
          .addCase(fetchuser.fulfilled,(state,action)=>{
            state.users=action.payload
            state.isLoading=false
          })
          .addCase(fetchuser.rejected,(state,action)=>{
            state.error=action.payload
            state.isLoading=false
          })
    }
})
export const getuser = (state) => state.user.users;
export const status = (state) => state.user.isLoading;
export const error = (state) => state.user.error;
export default userSlice.reducer
