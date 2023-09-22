import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { api } from "../../api/api";

const initialState = {
  data: {},
  status: "idle",
  updateStatus: "idle",
  error: null,
  updateError: null,
};

export const getMyInfo = createAsyncThunk("/myPage/info", async () => {
  const response = await api("GET", "/user");
  return response;
});

export const updateUser = createAsyncThunk(
  "/user/update",
  async (request, thunkAPI) => {
    try {
      const response = await api("PUT", "/user/update", request);
      return response;
    } catch (err) {
      return thunkAPI.rejectWithValue(err.response);
    }
  }
);

const myPageSlice = createSlice({
  name: "myPage",
  initialState,
  reducers: {
    resetStatus: (state) => {
      state.status = initialState.status;
      state.updateStatus = initialState.updateStatus;
    },
  },
  extraReducers(builder) {
    builder
      .addCase(getMyInfo.pending, (state, action) => {
        state.status = "loading";
      })
      .addCase(getMyInfo.fulfilled, (state, action) => {
        state.status = "successed";
        state.data = action.payload.data;
      })
      .addCase(getMyInfo.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.payload.data;
      })
      .addCase(updateUser.pending, (state, action) => {
        state.updateStatus = "loading";
      })
      .addCase(updateUser.fulfilled, (state, action) => {
        state.updateStatus = "successed";
      })
      .addCase(updateUser.rejected, (state, action) => {
        state.updateStatus = "failed";
        state.updateError = action.payload.data;
      });
  },
});
export default myPageSlice.reducer;
export const { resetStatus } = myPageSlice.actions;
