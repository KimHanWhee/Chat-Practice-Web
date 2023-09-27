import { useState, Fragment, useRef } from "react";
import { Dialog, Transition } from "@headlessui/react";
import { useDispatch, useSelector } from "react-redux";
import {
  createChatRoom,
  getMyRooms,
  setFalse,
  setTrue,
} from "../../store/chat/chatSlice";
import { useEffect } from "react";
import { resetStatus } from "../../store/myPage/myPageSlice";

const ChatRoomCreate = ({ page }) => {
  const { isOpen, createStatus } = useSelector((state) => state.chat);
  const [request, setRequest] = useState({
    chatRoomName: "",
  });

  const dispatch = useDispatch();

  const cancelButtonRef = useRef(null);

  const changeRoomName = (e) => {
    setRequest({ chatRoomName: e.target.value });
  };

  const onSubmit = (e) => {
    e.preventDefault();
    if (request.chatRoomName === "") alert("입력해라.");
    else dispatch(createChatRoom(request));
  };

  useEffect(() => {
    if (createStatus === "successed" && request.chatRoomName !== "") {
      alert("채팅방이 생성되었습니다.");
      setRequest({ chatRoomName: "" });
      dispatch(getMyRooms(page));
    } else if (createStatus === "failed" && request.chatRoomName !== "") {
      alert("채팅방 생성에 실패하였습니다.");
      setRequest({ chatRoomName: "" });
    }
    dispatch(resetStatus());
    dispatch(setFalse());
  }, [createStatus]);

  console.log(isOpen);

  return (
    <Transition.Root show={isOpen} as={Fragment}>
      <Dialog
        as="div"
        className="relative z-10"
        initialFocus={cancelButtonRef}
        onClose={() => dispatch(setTrue())}
      >
        <Transition.Child
          as={Fragment}
          enter="ease-out duration-300"
          enterFrom="opacity-0"
          enterTo="opacity-100"
          leave="ease-in duration-200"
          leaveFrom="opacity-100"
          leaveTo="opacity-0"
        >
          <div className="fixed inset-0 bg-slate-500 bg-opacity-75 transition-opacity" />
        </Transition.Child>
        <div className="fixed inset-0 z-10 overflow-y-auto">
          <div className="flex min-h-full items-end justify-center p-4 text-center sm:items-center sm:p-0">
            <Transition.Child
              as={Fragment}
              enter="ease-out duration-300"
              enterFrom="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
              enterTo="opacity-100 translate-y-0 sm:scale-100"
              leave="ease-in duration-200"
              leaveFrom="opacity-100 translate-y-0 sm:scale-100"
              leaveTo="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
            >
              <div className="h-auto w-4/5 transform overflow-hidden rounded-lg bg-white text-left shadow-xl transition-all ">
                <div className="bg-white  px-5 pt-3 pb-4">
                  <div className="flex justify-between">
                    <div className="flex">
                      <div
                        onClick={() => dispatch(setFalse())}
                        className="text-4xl text-end mb-5 hover:cursor-pointer"
                      >
                        x
                      </div>
                    </div>
                  </div>
                </div>
                <div className="flex justify-center">
                  <div className="mt-2 px-24 text-left h-3/5">
                    <form
                      className="flex flex-col justify-center"
                      onSubmit={onSubmit}
                    >
                      <div>
                        <label
                          className="text-xl text-center mr-3"
                          htmlFor="chatRoomName"
                        >
                          채팅방 이름 :
                        </label>
                        <input
                          className="border-b-2 border-black text-3xl focus:border-none"
                          type="text"
                          name="chatRoomName"
                          value={request.chatRoomName}
                          id="chatRoomName"
                          onChange={changeRoomName}
                        />
                      </div>
                      <div className="flex justify-center mt-10">
                        <button className="py-3 px-8 w-2/5 rounded-lg font-bold shadow-md focus:shadow-none bg-zinc-300 hover:bg-zinc-200 hover:text-xl duration-75">
                          채팅 드가자
                        </button>
                      </div>
                    </form>
                  </div>
                </div>

                <div className="flex justify-center px-4 py-3 "></div>
              </div>
            </Transition.Child>
          </div>
        </div>
      </Dialog>
    </Transition.Root>
  );
};

export default ChatRoomCreate;
