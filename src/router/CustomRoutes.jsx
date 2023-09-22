import { BrowserRouter, Route, Routes } from "react-router-dom";
import Main from "../component/main";
import Home from "../component/home/Home";
import SignUp from "../component/signUp/SignUp";
import SignIn from "../component/signIn/SignIn";
import MyPage from "../component/user/MyPage";
import MyInfo from "../component/user/MyInfo";
import ChatRoom from "../component/chat/chattingRoom/ChatRoom";

const CustomRoutes = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Main />}>
          <Route path="" element={<Home />} />
          <Route path="/signup" element={<SignUp />} />
          <Route path="/signin" element={<SignIn />} />

          <Route path="/mypage" element={<MyPage />}>
            <Route path="" element={<MyInfo />} />
          </Route>
          <Route path="/chat/:chatRoomId" element={<ChatRoom />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
};

export default CustomRoutes;
