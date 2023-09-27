import { useDispatch, useSelector } from "react-redux";
import { getMyRooms, setJoinTrue, setTrue } from "../../store/chat/chatSlice";
import ChatRoomCreate from "../chat/ChatRoomCreate";
import { useEffect } from "react";
import MyChatRoomList from "../chat/MyChatRoomList";
import { useState } from "react";
import Pagination from "./Pagination";
import ChatRoomJoin from "../chat/ChatRoomJoin";
import { Cookies } from "react-cookie";
import NotLoginPage from "./NotLoginPage";
import ADTab from "./ADTab";
import { useScroll } from "../scroll/useScroll";

const Home = () => {
  const cookie = new Cookies();
  const { data } = useSelector((state) => state.chat);
  const [page, setPage] = useState(0);

  const dispatch = useDispatch();

  const createChatRoom = () => {
    dispatch(setTrue());
  };

  const joinChatRoom = () => {
    dispatch(setJoinTrue());
  };

  console.log(data);

  return (
    <div className="flex justify-center items-center w-full">
      <ChatRoomCreate page={page} />
      <ChatRoomJoin />
      {cookie.get("accessToken") ? (
        <div className="flex flex-col justify-between h-full">
          {data?.content?.length !== 0 ? (
            <MyChatRoomList data={data} />
          ) : (
            <div>
              {localStorage.getItem("userName")}님 환영합니다! 버튼을 눌러
              채팅을 시작해보세요!
            </div>
          )}
          <div className="flex justify-center">
            <div className="flex justify-between mb-5 w-5/6">
              <button
                className="py-3 px-8 rounded-lg font-bold shadow-md focus:shadow-none bg-zinc-400 hover:bg-zinc-200 hover:text-xl duration-75"
                onClick={createChatRoom}
              >
                채팅방 생성
              </button>
              <button
                className="py-3 px-8 rounded-lg font-bold shadow-md focus:shadow-none bg-slate-400 hover:bg-slate-200 hover:text-xl duration-75"
                onClick={joinChatRoom}
              >
                채팅방 참여
              </button>
            </div>
          </div>
          {data && (
            <div className="flex justify-center">
              <Pagination page={page} setPage={setPage} />
            </div>
          )}
        </div>
      ) : (
        <div className="mt-10 min-w-65 flex flex-col items-center">
          <div className="shadow w-5/6 h-full">
            <ADTab />
          </div>
        </div>
      )}
    </div>
  );
};

export default Home;
