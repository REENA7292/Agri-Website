import { createSlice } from "@reduxjs/toolkit";
import { toast } from "react-hot-toast";
const initialState = {
  productList: [],
  cartItem: [],
};

export const productSlice = createSlice({
  name: "product",
  initialState,
  reducers: {
    setDataProduct: (state, action) => {
      state.productList = [...action.payload];
    },
    addCartItem: (state, action) => {
      const check = state.cartItem.some((el) => el._id === action.payload._id);
      if (check) {
        toast("Already Item in Cart");
      } else {
        toast("Item Add successfully");
        const total = 0;
        state.cartItem = [
          ...state.cartItem,
          { ...action.payload, qty: 0, total: total },
        ];
      }
    },
    filterProducts: (state, action) => {
      const searchTerm = action.payload.toLowerCase(); // Convert search term to lowercase for case-insensitive search
      state.filteredProducts = state.productList.filter((product) => {
        // Perform filtering based on product name or any other criteria
        return product.name.toLowerCase().includes(searchTerm);
        // Replace 'product.name' with the property you want to filter by (e.g., category, description, etc.)
      });
    },
    // clearCartItem: (state, action) => {
      
    //   // toast("one Item Delete");
    //   const index = state.cartItem.findIndex((el) => el._id === action.payload);
    //   state.cartItem.splice(index, 1);
    //   console.log(index);
    // },

    deleteCartItem: (state, action) => {
      
      toast("one Item Delete");
      const index = state.cartItem.findIndex((el) => el._id === action.payload);
      state.cartItem.splice(index, 1);
      console.log(index);
    },
    increaseQty: (state, action) => {
      const index = state.cartItem.findIndex((el) => el._id === action.payload);
      let qty = state.cartItem[index].qty;
      const qtyInc = 0.5+qty;
      state.cartItem[index].qty = qtyInc;

      const price = state.cartItem[index].price;
      const total = (price) * qtyInc;

      state.cartItem[index].total = total;
    },
    decreaseQty: (state, action) => {
      const index = state.cartItem.findIndex((el) => el._id === action.payload);
      let qty = state.cartItem[index].qty;
      if (qty > 0) {
        const qtyDec = qty-0.5;
        state.cartItem[index].qty = qtyDec;

        const price = state.cartItem[index].price;
        const total = (price) * qtyDec;

        state.cartItem[index].total = total;
      }
    },
  },
});

export const {
  setDataProduct,
  addCartItem,
  deleteCartItem,
  clearCartItem,
  increaseQty,
  filterProducts,
  decreaseQty,
} = productSlice.actions;

export default productSlice.reducer;
