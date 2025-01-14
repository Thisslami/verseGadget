import { configureStore } from  "@reduxjs/toolkit";
import authReducer from "./auth-slice" 
import adminProductsSlice from "./admin/products-slice"
 import shopProductSlice from "./shop/products-slice"
import shopCartSlice from "./shop/cart-slice"




 const store = configureStore({
    reducer: {
      // Define your reducers here
      auth : authReducer,
      adminProducts : adminProductsSlice,
      shopProducts : shopProductSlice,
      shopCart: shopCartSlice,
    },
    // Other store setup...
  });

  export default store;
 