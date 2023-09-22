import { Outlet } from "react-router-dom";

const MyPage = () => {
  return (
    <div className="flex justify-center items-center w-full h-full">
      <Outlet />
    </div>
  );
};

export default MyPage;
