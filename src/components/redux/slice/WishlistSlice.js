import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  whishListProduct: [],
};

const WishListSlice = createSlice({
  name: "wishlist",
  initialState,
  reducers: {
    addWishlist: (state, action) => {
      const { product, product_id } = action.payload;
      const existingProduct = state.whishListProduct.find(
        (item) => item.product.id === product_id
      );

      if (!existingProduct) {
        state.whishListProduct.push({ product });
      }
    },
    deleteWishlist: (state, action) => {
      const { product_id } = action.payload;
      state.whishListProduct = state.whishListProduct.filter((item) => item.product.id !== product_id);
    },
    clearWishlist: (state) => {
      state.whishListProduct = [];
    },
  },
});

export const { addWishlist, deleteWishlist, clearWishlist } =
  WishListSlice.actions;
export default WishListSlice.reducer;
