import { createSlice } from "@reduxjs/toolkit";
const initialstate ={
    cart:[]
}
const cartSlice =createSlice({
    name:"cartItem",
    initialState:initialstate,
    reducers:{
        handleAddItemCart:(state,action)=>{
            state.cart=[...action.payload]
        }
    }
})

export const {handleAddItemCart} = cartslice.actions
export default cartSlice.reducer