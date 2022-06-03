import { configureStore, createSlice } from '@reduxjs/toolkit'
import cart from './store/cartSlice';
import user from './store/userSlice';

let stock = createSlice({
  name : 'stock', 
  initialState : [10, 11, 12]
})

export default configureStore({
  reducer: {
    user : user.reducer,
    stock : stock.reducer,
    cart : cart.reducer
  }
});