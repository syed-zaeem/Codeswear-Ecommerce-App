import { createSlice } from "@reduxjs/toolkit";
import { createAsyncThunk, createAction } from "@reduxjs/toolkit";

const InitialState = {
  customers: []
};

export const getAllUsers = createAsyncThunk("users/getUsers" , async () => {
  const res = await fetch(`${process.env.NEXT_PUBLIC_HOST}/api/fetchAllUsers`)

  const response = await res.json()

  return response
})

export const signUp = createAsyncThunk("user/signup", async (data) => {
  const res = await fetch(`${process.env.NEXT_PUBLIC_HOST}/api/signup`, {
    method: "POST", // *GET, POST, PUT, DELETE, etc.
    headers: {
      "Content-Type": "application/json",
    }, // no-referrer, *no-referrer-when-downgrade, origin, origin-when-cross-origin, same-origin, strict-origin, strict-origin-when-cross-origin, unsafe-url
    body: JSON.stringify(data), // body data type must match "Content-Type" header
  });

  const response = await res.json();

  return response;
});

export const logIn = createAsyncThunk("user/login", async (data) => {
  const res = await fetch(`${process.env.NEXT_PUBLIC_HOST}/api/login`, {
    method: "POST", // *GET, POST, PUT, DELETE, etc.
    headers: {
      "Content-Type": "application/json",
    }, // no-referrer, *no-referrer-when-downgrade, origin, origin-when-cross-origin, same-origin, strict-origin, strict-origin-when-cross-origin, unsafe-url
    body: JSON.stringify(data), // body data type must match "Content-Type" header
  });
  const response = await res.json();

  return response;
});

export const updateUserDetails = createAsyncThunk(
  "user/updateDetails",
  async (data) => {
    let res = await fetch(`${process.env.NEXT_PUBLIC_HOST}/api/updateuser`, {
      method: "POST", // *GET, POST, PUT, DELETE, etc.
      headers: {
        "Content-Type": "application/json",
      }, // no-referrer, *no-referrer-when-downgrade, origin, origin-when-cross-origin, same-origin, strict-origin, strict-origin-when-cross-origin, unsafe-url
      body: JSON.stringify(data), // body data type must match "Content-Type" header
    });
    const response = await res.json();

    return response;
  }
);

export const updateUserPassword = createAsyncThunk(
  "user/updatepass",
  async (data) => {
    let res = await fetch(
      `${process.env.NEXT_PUBLIC_HOST}/api/updatepassword`,
      {
        method: "POST", // *GET, POST, PUT, DELETE, etc.
        headers: {
          "Content-Type": "application/json",
        }, // no-referrer, *no-referrer-when-downgrade, origin, origin-when-cross-origin, same-origin, strict-origin, strict-origin-when-cross-origin, unsafe-url
        body: JSON.stringify(data), // body data type must match "Content-Type" header
      }
    );
    const response = await res.json();

    return response;
  }
);

export const userSlice = createSlice({
  name: "user",
  initialState: InitialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(createAction(signUp.pending), (state) => {
        state.loading = true;
      })
      .addCase(createAction(signUp.fulfilled), (state, action) => {
        state.loading = false;
      })
      .addCase(createAction(signUp.rejected), (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      .addCase(createAction(logIn.pending), (state) => {
        state.loading = true;
      })
      .addCase(createAction(logIn.fulfilled), (state, action) => {
        state.loading = false;
      })
      .addCase(createAction(logIn.rejected), (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      .addCase(createAction(updateUserDetails.pending), (state) => {
        state.loading = true;
      })
      .addCase(createAction(updateUserDetails.fulfilled), (state, action) => {
        state.loading = false;
      })
      .addCase(createAction(updateUserDetails.rejected), (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      .addCase(createAction(updateUserPassword.pending), (state) => {
        state.loading = true;
      })
      .addCase(createAction(updateUserPassword.fulfilled), (state, action) => {
        state.loading = false;
      })
      .addCase(createAction(updateUserPassword.rejected), (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      .addCase(createAction(getAllUsers.pending), (state) => {
        state.loading = true;
      })
      .addCase(createAction(getAllUsers.fulfilled), (state, action) => {
        state.loading = false;
        state.customers = action.payload.customers
      })
      .addCase(createAction(getAllUsers.rejected), (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

export const {} = userSlice.actions;

export default userSlice.reducer;
