const OtherChat = ({ otherMessage }) => {
  return (
    <div className="flex justify-start my-2">
      <div className="w-fit">
        <div className="text-gray-400">{otherMessage.senderName}</div>
        <div className="border rounded-xl text-lg font-semibold bg-zinc-400 px-5 py-2">
          {otherMessage.message}
        </div>
      </div>
    </div>
  );
};

export default OtherChat;
