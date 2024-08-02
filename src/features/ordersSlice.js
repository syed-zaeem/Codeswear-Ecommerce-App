import { createSlice } from "@reduxjs/toolkit";
import { createAsyncThunk, createAction } from "@reduxjs/toolkit";

const InitialState = {
  orders: [],
  loading: false,
  error: null,
};

export const getTotalSales = createAsyncThunk(
  "orders/gettotalsales",
  async () => {
    // console.log("I am here gee")
    const a = await fetch(
      `${process.env.NEXT_PUBLIC_HOST}/api/calculateTotalSales`
    );

    const response = await a.json();
    // console.log("This is response from the backend side: ", response);

    return response;
  }
);

export const getRevenue = createAsyncThunk("orders/calculatetotalrevenue", async () => {
  const a = await fetch(
    `${process.env.NEXT_PUBLIC_HOST}/api/calculateRevenue`
  );

  const response = await a.json();
  // console.log("This is response from the backend side: ", response);

  return response;
})

export const calculateWeeklySales = createAsyncThunk("orders/weeklysales", async () => {
  const a = await fetch(
    `${process.env.NEXT_PUBLIC_HOST}/api/weeklySales`
  );

  const response = await a.json();
  // console.log("This is response from the backend side: ", response);

  return response;
})

export const fetchOrders = createAsyncThunk("orders", async () => {
  const a = await fetch(`${process.env.NEXT_PUBLIC_HOST}/api/myorders`, {
    method: "POST", // *GET, POST, PUT, DELETE, etc.
    headers: {
      "Content-Type": "application/json",
    }, // no-referrer, *no-referrer-when-downgrade, origin, origin-when-cross-origin, same-origin, strict-origin, strict-origin-when-cross-origin, unsafe-url
    body: JSON.stringify({ token: localStorage.getItem("token") }), // body data type must match "Content-Type" header
  });
  let res = await a.json();

  try {
    return res;
  } catch (error) {
    console.log(error);
  }
});

export const addOrder = createAsyncThunk("orders/addOrder", async (data) => {
  const res = await fetch(`${process.env.NEXT_PUBLIC_HOST}/api/addorder`, {
    method: "POST", // *GET, POST, PUT, DELETE, etc.
    headers: {
      "Content-Type": "application/json",
    }, // no-referrer, *no-referrer-when-downgrade, origin, origin-when-cross-origin, same-origin, strict-origin, strict-origin-when-cross-origin, unsafe-url
    body: JSON.stringify(data), // body data type must match "Content-Type" header
  });
  const response = await res.json();
  // console.log("This is response for the backend: ", response);

  return response;
});

export const ordersSlice = createSlice({
  name: "orders",
  initialState: InitialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(createAction(fetchOrders.pending), (state) => {
        state.loading = true;
      })
      .addCase(createAction(fetchOrders.fulfilled), (state, action) => {
        state.loading = false;
        state.orders = action.payload.orders;
      })
      .addCase(createAction(fetchOrders.rejected), (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      .addCase(addOrder.pending, (state) => {
        state.loading = true;
      })
      .addCase(addOrder.fulfilled, (state, action) => {
        state.loading = false;
        // console.log(
        //   "This is only for the try in cases of fulfilled: ",
        //   action.payload
        // );
        state.orders.push(action.payload.order);
      })
      .addCase(addOrder.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      })
      .addCase(getTotalSales.pending, (state) => {
        state.loading = true;
      })
      .addCase(getTotalSales.fulfilled, (state) => {
        state.loading = false;
      })
      .addCase(getTotalSales.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      })
      .addCase(getRevenue.pending, (state) => {
        state.loading = true;
      })
      .addCase(getRevenue.fulfilled, (state) => {
        state.loading = false;
      })
      .addCase(getRevenue.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      })
      .addCase(calculateWeeklySales.pending, (state) => {
        state.loading = true;
      })
      .addCase(calculateWeeklySales.fulfilled, (state) => {
        state.loading = false;
      })
      .addCase(calculateWeeklySales.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      });
  },
});

export const {} = ordersSlice.actions;

export default ordersSlice.reducer;
