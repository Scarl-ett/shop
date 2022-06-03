import { createSlice } from "@reduxjs/toolkit";

let cart = createSlice({
  name : 'cart',
  initialState : [
    {id : 0, name : 'White and Black', count : 2},
    {id : 2, name : 'Grey Yordan', count : 1}
  ],
  reducers : {
    decrease : (state, action) => {
      let idx = state.findIndex((x) => {return x.id === action.payload});
      if (state[idx].count <= 1) {
        return state.filter((cart) => cart.id !== action.payload);
      } else {
        state[idx].count -= 1;
      }
    },
    increase : (state, action) => {
      // let data = state.find((x) => {return x.id === action.payload.item.id});
      // data.count += 1;
      let data = state.findIndex((x) => {return x.id === action.payload});
      state[data].count += 1;
    },
    insert : (state, action) => {
      let data = state.find((x) => {return x.id === action.payload.id});
      data === undefined ? state.push(action.payload) : data.count += 1 
    }
  }
});

export let {decrease, increase, insert} = cart.actions;

export default cart;