import { Stomp } from "@stomp/stompjs";
import { useState } from "react";
import { useEffect } from "react";
import { useLocation, useParams } from "react-router-dom";
import SockJS from "sockjs-client";
import MyChat from "./MyChat";
import OtherChat from "./OtherChat";
import ChatInput from "./ChatInput";

const ChatRoom = () => {
  const [stompClient, setStompClient] = useState(null);
  const [message, setMessage] = useState([]);
  const [messageInput, setMessageInput] = useState({
    senderId: localStorage.getItem("userId"),
    senderName: localStorage.getItem("userName"),
    message: "",
  });
  const { chatRoomId } = useParams();
  const { state } = useLocation();

  useEffect(() => {
    const sock = new SockJS("http://localhost:8080/ws");
    const stomp = Stomp.over(sock);
    stomp.connect({}, () => {
      stomp.subscribe(`/sub/chat/room/${chatRoomId}`, (message) => {
        handleMessage(message);
      });
      if (state.type !== null && state.type === "들어간다~~") {
        console.log(state.request);
        stomp.send("/pub/enter", {}, JSON.stringify(state.request));
      }
    });

    setStompClient(stomp);

    return () => {
      if (stomp) stomp.disconnect();
    };
  }, [chatRoomId]);

  const onChange = (e) => {
    setMessageInput({ ...messageInput, message: e.target.value });
  };

  const handleMessage = (message) => {
    const newMessage = JSON.parse(message.body);
    setMessage((prev) => [...prev, newMessage]);
  };

  const sendMessage = (e) => {
    e.preventDefault();
    if (
      messageInput.message !== "" &&
      messageInput.senderName !== "" &&
      stompClient
    ) {
      stompClient.send(
        `/pub/chat/${chatRoomId}`,
        {},
        JSON.stringify(messageInput)
      );
      setMessageInput({ ...messageInput, message: "" });
    }
  };

  return (
    <div className="flex flex-col h-screen overflow-auto items-center pt-48">
      <div className="w-1/2 flex-grow">
        <div>
          {message.map((el, idx) => (
            <div>
              {el.senderId === localStorage.getItem("userId") ? (
                <MyChat myMessage={el} />
              ) : (
                <OtherChat otherMessage={el} />
              )}
            </div>
          ))}
        </div>
        <div>
          <ChatInput
            messageInput={messageInput}
            onChange={onChange}
            sendMessage={sendMessage}
          />
        </div>
      </div>
    </div>
  );
};

export default ChatRoom;
