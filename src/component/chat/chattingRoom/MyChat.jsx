const MyChat = ({ myMessage }) => {
  return (
    <div className="flex justify-end my-2">
      <div className="w-fit">
        <div className="border rounded-xl shadow-md text-lg font-semibold px-5 py-2">
          {myMessage.message}
        </div>
      </div>
    </div>
  );
};

export default MyChat;
