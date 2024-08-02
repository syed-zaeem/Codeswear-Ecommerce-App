import { createSlice } from "@reduxjs/toolkit";
import { createAsyncThunk, createAction } from "@reduxjs/toolkit";

const InitialState = {
  loading: false,
  error: null,
};

export const fetchAllProducts = createAsyncThunk(
  "products/fetchProducts",
  async () => {
    const res = await fetch(
      `${process.env.NEXT_PUBLIC_HOST}/api/fetchAllProducts`
    );

    const response = await res.json();
    // console.log("This is response for the backend: ", response);

    return response;
  }
);


export const fetchAllOutOfStockProducts = createAsyncThunk(
  "products/outofstockproducts",
  async () => {
    const res = await fetch(
      `${process.env.NEXT_PUBLIC_HOST}/api/getOutOfStockProducts`
    );

    const response = await res.json();
    // console.log("This is response for the backend: ", response);

    return response;
  }
);

export const addProduct = createAsyncThunk(
  "products/addProduct",
  async (data) => {
    const res = await fetch(`${process.env.NEXT_PUBLIC_HOST}/api/addproducts`, {
      method: "POST", // *GET, POST, PUT, DELETE, etc.
      headers: {
        "Content-Type": "application/json",
      }, // no-referrer, *no-referrer-when-downgrade, origin, origin-when-cross-origin, same-origin, strict-origin, strict-origin-when-cross-origin, unsafe-url
      body: JSON.stringify(data), // body data type must match "Content-Type" header
    });

    const response = await res.json();
    console.log("This is response for the backend: ", response);

    return response;
  }
);

export const deleteProduct = createAsyncThunk(
  "products/deleteProd",
  async (data) => {
    const res = await fetch(
      `${process.env.NEXT_PUBLIC_HOST}/api/deleteProduct?id=${data.id}`,
      {
        method: "DELETE", // *GET, POST, PUT, DELETE, etc.
        headers: {
          "Content-Type": "application/json",
        }, // no-referrer, *no-referrer-when-downgrade, origin, origin-when-cross-origin, same-origin, strict-origin, strict-origin-when-cross-origin, unsafe-url
        body: JSON.stringify(data), // body data type must match "Content-Type" header
      }
    );

    const response = await res.json();
    console.log("This is response for the backend: ", response);

    return response;
  }
);

export const updateProduct = createAsyncThunk("products/updateProduct", async (data) => {
  console.log("The data is here: " , data)
  const res = await fetch(
    `${process.env.NEXT_PUBLIC_HOST}/api/updateproduct?id=${data.id}`,
    {
      method: "PUT", // *GET, POST, PUT, DELETE, etc.
      headers: {
        "Content-Type": "application/json",
      }, // no-referrer, *no-referrer-when-downgrade, origin, origin-when-cross-origin, same-origin, strict-origin, strict-origin-when-cross-origin, unsafe-url
      body: JSON.stringify(data.data), // body data type must match "Content-Type" header
    }
  );

  const response = await res.json();
  console.log("This is response for the backend: ", response);

  return response;
})

export const productsSlice = createSlice({
  name: "products",
  initialState: InitialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(createAction(addProduct.pending), (state) => {
        state.loading = true;
      })
      .addCase(createAction(addProduct.fulfilled), (state) => {
        state.loading = false;
      })
      .addCase(createAction(addProduct.rejected), (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      })
      .addCase(createAction(fetchAllProducts.pending), (state) => {
        state.loading = true;
      })
      .addCase(createAction(fetchAllProducts.fulfilled), (state) => {
        state.loading = false;
      })
      .addCase(createAction(fetchAllProducts.rejected), (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      })
      .addCase(createAction(deleteProduct.pending), (state) => {
        state.loading = true;
      })
      .addCase(createAction(deleteProduct.fulfilled), (state) => {
        state.loading = false;
      })
      .addCase(createAction(deleteProduct.rejected), (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      })
      .addCase(createAction(updateProduct.pending), (state) => {
        state.loading = true;
      })
      .addCase(createAction(updateProduct.fulfilled), (state) => {
        state.loading = false;
      })
      .addCase(createAction(updateProduct.rejected), (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      })
      .addCase(createAction(fetchAllOutOfStockProducts.pending), (state) => {
        state.loading = true;
      })
      .addCase(createAction(fetchAllOutOfStockProducts.fulfilled), (state) => {
        state.loading = false;
      })
      .addCase(createAction(fetchAllOutOfStockProducts.rejected), (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      });
  },
});

export const {} = productsSlice.actions;

export default productsSlice.reducer;
