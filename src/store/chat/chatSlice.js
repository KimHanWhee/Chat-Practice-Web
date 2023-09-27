import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { api } from "../../api/api";
import SockJS from "sockjs-client";
import { Stomp } from "@stomp/stompjs";

const initialState = {
  data: [],
  roomData: [],
  status: "idle",
  createStatus: "idle",
  joinStatus: "idle",
  isOpen: false,
  isJoinOpen: false,
  error: "",
};

export const createChatRoom = createAsyncThunk(
  "/chat/room",
  async (request, thunkAPI) => {
    try {
      const response = await api("POST", "/chat", request);
      return response.data;
    } catch (err) {
      return thunkAPI.rejectWithValue(err.response);
    }
  }
);

export const getMyRooms = createAsyncThunk(
  "/get/rooms",
  async (page, thunkAPI) => {
    try {
      const response = await api("GET", `/chat?page=${page}&pageSize=5`);
      return response.data;
    } catch (err) {
      return thunkAPI.rejectWithValue(err.response);
    }
  }
);

export const joinChatRoom = createAsyncThunk(
  "/join/room",
  async (request, thunkAPI) => {
    try {
      const response = await api("POST", "/chat/join", request);
      return response;
    } catch (err) {
      return thunkAPI.rejectWithValue(err.response);
    }
  }
);

const chatSlice = createSlice({
  name: "chat",
  initialState,
  reducers: {
    setTrue: (state) => {
      state.isOpen = true;
    },
    setFalse: (state) => {
      state.isOpen = false;
    },
    setJoinTrue: (state) => {
      state.isJoinOpen = true;
    },
    setJoinFalse: (state) => {
      state.isJoinOpen = false;
    },
    resetStatus: (state) => {
      state.createStatus = "idle";
      state.joinStatus = "idle";
      state.status = "idle";
    },
  },
  extraReducers(builder) {
    builder
      .addCase(createChatRoom.pending, (state, action) => {
        state.createStatus = "loading";
      })
      .addCase(createChatRoom.fulfilled, (state, action) => {
        state.createStatus = "successed";
      })
      .addCase(createChatRoom.rejected, (state, action) => {
        state.createStatus = "failed";
        state.error = action.payload.data;
      })
      .addCase(getMyRooms.pending, (state, action) => {
        state.status = "loading";
      })
      .addCase(getMyRooms.fulfilled, (state, action) => {
        state.status = "successed";
        console.log(action.payload);
        state.data = action.payload;
      })
      .addCase(getMyRooms.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.payload;
      })
      .addCase(joinChatRoom.pending, (state, action) => {
        state.joinStatus = "loading";
      })
      .addCase(joinChatRoom.fulfilled, (state, action) => {
        state.joinStatus = "successed";
        state.roomData = action.payload.data;
      })
      .addCase(joinChatRoom.rejected, (state, action) => {
        state.joinStatus = "failed";
        state.error = action.payload.data;
      });
  },
});

export default chatSlice.reducer;
export const { setTrue, setFalse, setJoinTrue, setJoinFalse, resetStatus } =
  chatSlice.actions;
