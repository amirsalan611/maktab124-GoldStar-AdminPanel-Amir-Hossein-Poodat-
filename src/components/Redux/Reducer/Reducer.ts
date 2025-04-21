import { createSlice } from "@reduxjs/toolkit";

const initialState = [
  {
    id: "",
    newValue: "",
  },
];

const quantitySlice = createSlice({
  name: "quantity",
  initialState,
  reducers: {
    editProductsQuantity: async (product) => {
      try {
        const response = await promise.all;
      } catch (error) {}
    },
  },
});

export const { editProductsQuantity } = quantitySlice.actions;
export default quantitySlice.reducer;
