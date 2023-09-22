import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { login } from "../../store/user/userSlice";
import { useNavigate } from "react-router-dom";
import { useEffect } from "react";

const SignInForm = () => {
  const { userData, status, error } = useSelector((state) => state.user);
  const [input, setInput] = useState({
    userId: "",
    userPw: "",
  });

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const onChange = (e) => {
    const { name, value } = e.target;
    setInput({ ...input, [name]: value });
  };

  const inputArr = [
    { label: "아이디", type: "text", name: "userId", value: input.userId },
    {
      label: "비밀번호",
      type: "password",
      name: "userPw",
      value: input.userPw,
    },
  ];

  const onSubmit = (e) => {
    e.preventDefault();
    dispatch(login(input));
  };

  useEffect(() => {
    if (status === "failed" && input.userId != "") {
      alert(error);
      setInput({ userId: "", userPw: "" });
    } else if (status === "successed" && input.userId != "") navigate("/");
  }, [status]);

  return (
    <div className="flex flex-col w-1/3 h-1/2 shadow- rounded-3xl bg-gradient-to-r from-slate-400 to-slate-500 shadow-md">
      <form onSubmit={onSubmit} className="p-10">
        {inputArr.map((el) => (
          <div key={el.name} className="flex justify-between mb-5">
            <label className="p-3 w-1/3 text-white" htmlFor={el.name}>
              {el.label}
            </label>
            <input
              className="border border-black w-2/3 p-3 rounded-md"
              type={el.type}
              id={el.name}
              name={el.name}
              value={el.value}
              onChange={onChange}
            />
          </div>
        ))}
        <div className="flex justify-center">
          <button className="py-3 px-8 rounded-lg font-bold shadow-md focus:shadow-none bg-zinc-300 hover:bg-zinc-200 hover:text-xl duration-75">
            로그인
          </button>
        </div>
      </form>
    </div>
  );
};

export default SignInForm;
