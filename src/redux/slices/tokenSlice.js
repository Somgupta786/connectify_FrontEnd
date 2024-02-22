import { createSlice } from "@reduxjs/toolkit";
const initialState = { accessToken: "eyJhbGciOiJIUzUxMiJ9.eyJzdWIiOiJzc29tdmlzaHdhcmk3O…RSTHuH9L2GEdfWe-8loqm0phejxaXcKG2lhc_qtBLAf1NB7wQ" };
const tokenSlice = createSlice({
    name:"accessToken",
    initialState,
    reducers:{
        addToken:(state,action)=>{
            state.accessToken = action.payload; 
        }
       
    }
})

export const {addToken} = tokenSlice.actions;
export default tokenSlice.reducer;