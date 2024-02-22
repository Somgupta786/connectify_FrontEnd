import { createSlice } from "@reduxjs/toolkit";

const initialState=[
    {id:1,title:"post",description:"Descr"}
]


const postSlice = createSlice({
    name:"posts",
    initialState,
    reducers:{
        addPost:(state,action)=>{
            const {id,title,description} = action.payload
            state.push( {id,title,description})
        }
       
    }
})

export const {addPost} = postSlice.actions;
export default postSlice.reducer;