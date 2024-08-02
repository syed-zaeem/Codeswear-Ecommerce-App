import { createSlice } from "@reduxjs/toolkit";
import { createAsyncThunk, createAction } from "@reduxjs/toolkit";

const InitialState = {
  loading: false,
  error: null,
};

export const retreiveAllFeedbacks = createAsyncThunk(
  "products/fetchFeedbacks",
  async () => {
    const res = await fetch(
      `${process.env.NEXT_PUBLIC_HOST}/api/fetchAllFeedbacks`
    );

    const response = await res.json();
    console.log("This is response for the backend: ", response);

    return response;
  }
);

export const addFeedback = createAsyncThunk(
  "products/addFeedback",
  async (data) => {
    const res = await fetch(`${process.env.NEXT_PUBLIC_HOST}/api/submitFeedback`, {
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

export const feedbacksSlice = createSlice({
  name: "feedbacks",
  initialState: InitialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(createAction(addFeedback.pending), (state) => {
        state.loading = true;
      })
      .addCase(createAction(addFeedback.fulfilled), (state) => {
        state.loading = false;
      })
      .addCase(createAction(addFeedback.rejected), (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      })
      .addCase(createAction(retreiveAllFeedbacks.pending), (state) => {
        state.loading = true;
      })
      .addCase(createAction(retreiveAllFeedbacks.fulfilled), (state) => {
        state.loading = false;
      })
      .addCase(createAction(retreiveAllFeedbacks.rejected), (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      });
  },
});

export const {} = feedbacksSlice.actions;

export default feedbacksSlice.reducer;
