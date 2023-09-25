import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import {
  getMyInfo,
  resetStatus,
  updateUser,
} from "../../store/myPage/myPageSlice";

const MyInfo = () => {
  const { data, updateStatus, updateError } = useSelector(
    (state) => state.myPage
  );
  const [mode, setMode] = useState("Info");
  const [newInput, setNewInput] = useState({
    userName: "",
    userId: "",
    userBirth: "",
  });

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const inputArr = [
    { type: "text", name: "userName", label: "이름", value: newInput.userName },
    { type: "text", name: "userId", label: "아이디", value: newInput.userId },
    {
      type: "date",
      name: "userBirth",
      label: "생년월일",
      value: newInput.userBirth,
    },
  ];

  useEffect(() => {
    dispatch(getMyInfo());
  }, []);

  useEffect(() => {
    setNewInput(data);
  }, [data]);

  useEffect(() => {
    if (updateStatus === "failed") alert(updateError);
    else if (updateStatus === "successed") alert("회원 정보가 변경되었습니다.");
    dispatch(resetStatus());
  }, [updateStatus]);

  const setInput = (e) => {
    const { name, value } = e.target;
    setNewInput({ ...newInput, [name]: value });
  };

  const changeMode = () => {
    if (mode === "Info") setMode("Edit");
    else setMode("Info");
  };

  const onSubmit = (e) => {
    e.preventDefault();
    if (window.confirm("정보를 수정하시겠습니까?")) {
      console.log(newInput);
      localStorage.setItem("userName", newInput.userName);
      dispatch(updateUser(newInput));
    }
  };

  return (
    <div className="flex justify-center w-full h-80">
      <div className="flex p-10 rounded-3xl bg-gradient-to-r from-slate-400 to-slate-500 shadow-md">
        {data.userName && (
          <form className="flex flex-col justify-between" onSubmit={onSubmit}>
            {inputArr.map((el) => (
              <div className="flex justify-between">
                <label
                  className="flex items-center mr-10 text-slate-100 font-bold text-lg"
                  htmlFor={el.name}
                >
                  {el.label}
                </label>
                <input
                  className="p-3 text-lg rounded-lg bg-slate-200"
                  type={el.type}
                  name={el.name}
                  id={el.name}
                  value={el.value}
                  onChange={setInput}
                  disabled={mode === "Edit" ? false : true}
                />
              </div>
            ))}
            <button
              type={mode === "Info" ? "submit" : "button"}
              className="py-3 rounded-lg font-bold shadow-md bg-zinc-300 hover:bg-zinc-200"
              onClick={changeMode}
            >
              {mode === "Info" ? "편집" : "수정"}
            </button>
          </form>
        )}
      </div>
    </div>
  );
};

export default MyInfo;
