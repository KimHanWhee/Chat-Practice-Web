import { Outlet } from "react-router-dom";
import Header from "./Header";
import Footer from "./Footer";

const Main = () => {
  return (
    <div className="flex flex-col min-h-screen">
      <Header />
      <div className="flex-grow overflow-y-auto">
        <Outlet />
      </div>
      <Footer />
    </div>
  );
};

export default Main;
