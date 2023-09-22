import { useDispatch, useSelector } from "react-redux";
import MyChatRoomListItem from "./MyChatRoomListItem";
import { useEffect } from "react";
import { getMyRooms } from "../../store/chat/chatSlice";
import { useState } from "react";

const MyChatRoomList = ({ data }) => {
  return (
    <div className="h-96 pt-5">
      <table className="w-full text-sm text-left text-gray-500 dark:text-gray-400">
        <thead className="text-base text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
          <tr className="">
            <th scope="col" className="px-6 py-3">
              번호
            </th>
            <th scope="col" className="px-6 py-3">
              이름
            </th>
            <th scope="col" className="px-6 py-3">
              방장
            </th>
            <th scope="col" className="px-6 py-3">
              생성일
            </th>
          </tr>
        </thead>
        <tbody>
          {data.content?.map((el, idx) => (
            <MyChatRoomListItem
              key={idx}
              chatRoomId={el.chatRoomId}
              chatRoomName={el.chatRoomName}
              creatorName={el.creatorName}
              createdAt={el.createdAt.split("T")[0]}
            />
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default MyChatRoomList;
