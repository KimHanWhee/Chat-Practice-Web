import { useNavigate } from "react-router-dom";

const MyChatRoomListItem = ({
  chatRoomId,
  chatRoomName,
  creatorName,
  createdAt,
}) => {
  const navigate = useNavigate();
  return (
    <tr className="bg-white border-b dark:bg-gray-800 dark:border-gray-700">
      <th
        scope="row"
        className="px-6 py-4 text-lg font-medium text-gray-900 whitespace-nowrap dark:text-white"
      >
        {chatRoomId}
      </th>
      <td
        className="px-6 py-4 text-lg hover:cursor-pointer"
        onClick={() => {
          navigate(`/chat/${chatRoomId}`, {
            state: { type: "채팅하러왔다", chatRoomName: chatRoomName },
          });
        }}
      >
        {chatRoomName.length > 10
          ? chatRoomName.substring(0, 10) + "..."
          : chatRoomName}
      </td>
      <td className="px-6 py-4 text-lg">{creatorName}</td>
      <td className="px-6 py-4 text-lg">{createdAt}</td>
      {/* <td class="px-6 py-4">
        <a
          href="#"
          class="font-medium text-blue-600 dark:text-blue-500 hover:underline"
        >
          Edit
        </a>
      </td> */}
    </tr>
  );
};

export default MyChatRoomListItem;
