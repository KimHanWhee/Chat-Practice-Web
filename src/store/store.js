import { configureStore } from "@reduxjs/toolkit";
import userSlice from "./user/userSlice";
import myPageSlice from "./myPage/myPageSlice";
import chatSlice from "./chat/chatSlice";

export default configureStore({
  reducer: {
    user: userSlice,
    myPage: myPageSlice,
    chat: chatSlice,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({ serializableCheck: false }),
});
