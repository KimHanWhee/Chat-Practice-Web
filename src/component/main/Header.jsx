import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { logout } from "../../store/user/userSlice";
import { Cookies } from "react-cookie";
import { useEffect } from "react";

const Header = () => {
  const { userData } = useSelector((state) => state.user);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const cookie = new Cookies();

  useEffect(() => {
    if (cookie.get("accessToken") === undefined) dispatch(logout());
  }, []);

  return (
    <div className="navbar bg-base-100 shadow-sm shadow-gray-400">
      <div className="navbar-start">
        <div className="dropdown">
          <label tabIndex={0} className="btn btn-ghost btn-circle">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-5 w-5"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M4 6h16M4 12h16M4 18h7"
              />
            </svg>
          </label>
          <ul
            tabIndex={0}
            className="menu menu-sm dropdown-content mt-3 z-[1] p-2 shadow bg-base-100 rounded-box w-52"
          >
            <li>
              <a>Homepage</a>
            </li>
            <li>
              <a>Portfolio</a>
            </li>
            <li>
              <a>About</a>
            </li>
          </ul>
        </div>
      </div>
      <div className="navbar-center">
        <div
          className="btn btn-ghost normal-case text-xl"
          onClick={() => navigate("/")}
        >
          Project
        </div>
      </div>
      {cookie.get("accessToken") ? (
        <div className="navbar-end">
          <button className="btn btn-ghost" onClick={() => navigate("/mypage")}>
            마이페이지
          </button>
          <button
            className="btn btn-ghost"
            onClick={() => {
              dispatch(logout());
              navigate("/");
            }}
          >
            로그아웃
          </button>
        </div>
      ) : (
        <div className="navbar-end">
          <button className="btn btn-ghost" onClick={() => navigate("/signin")}>
            로그인
          </button>
          <button className="btn btn-ghost" onClick={() => navigate("/signup")}>
            회원가입
          </button>
        </div>
      )}
    </div>
  );
};

export default Header;
