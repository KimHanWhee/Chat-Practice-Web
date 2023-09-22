const ChatInput = ({ messageInput, onChange, sendMessage }) => {
  return (
    <form className="flex justify-center mt-10" onSubmit={sendMessage}>
      <input
        type="text"
        className="border border-black rounded-l-lg text-xl p-2 "
        placeholder="메시지 입력"
        value={messageInput.message}
        onChange={onChange}
      />
      <button className="border bg-teal-100 px-3 rounded-r-lg">전송</button>
    </form>
  );
};

export default ChatInput;
