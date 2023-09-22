import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { api } from "../../api/api";
import { Cookies } from "react-cookie";

const cookie = new Cookies();

const initialState = {
  userData: {},
  status: "idle",
  signupStatus: "idle",
  error: null,
  signupError: null,
};

export const login = createAsyncThunk(
  "/user/signin",
  async (user, thunkAPI) => {
    try {
      const response = await api("POST", "/user/sign-in", user);
      return response.data;
    } catch (err) {
      return thunkAPI.rejectWithValue(err.response);
    }
  }
);

export const signup = createAsyncThunk(
  "/user/signup",
  async (request, thunkAPI) => {
    try {
      const response = await api("POST", "/user/sign-up", request);
      return response;
    } catch (err) {
      return thunkAPI.rejectWithValue(err.response);
    }
  }
);

const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    logout: (state) => {
      state.userData = initialState.userData;
      state.status = initialState.status;
      state.error = initialState.error;
      state.userId = initialState.userId;
      cookie.remove("accessToken");
      localStorage.clear();
    },
  },
  extraReducers(builder) {
    builder
      .addCase(login.pending, (state, action) => {
        state.status = "loading";
      })
      .addCase(login.fulfilled, (state, action) => {
        state.status = "successed";
        state.userData = action.payload;
        localStorage.setItem("refreshToken", action.payload.refreshToken);
        localStorage.setItem("userName", action.payload.userName);
        localStorage.setItem("userId", action.payload.userId);
      })
      .addCase(login.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.payload.data;
      })
      .addCase(signup.pending, (state, action) => {
        state.signupStatus = "loading";
      })
      .addCase(signup.fulfilled, (state, action) => {
        state.signupStatus = "successed";
      })
      .addCase(signup.rejected, (state, action) => {
        state.signupStatus = "failed";
        state.signupError = action.payload.data;
        console.log(action.payload.data);
      });
  },
});
export default userSlice.reducer;
export const { logout } = userSlice.actions;
