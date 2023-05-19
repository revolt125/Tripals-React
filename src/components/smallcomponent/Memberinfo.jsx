import { useState } from "react";
import axios from "axios";

function Memberinfo({ currentUser, userMessage, setUserMessage, avaUsername, setavaUsername, ifPwdOK, setIfPwdOK }) {
  // console.log(JSON.parse(currentUser)[0].userno)
  // console.log(setCurrentUser)
  let url = "http://localhost:8000";
  let [userno, setuserno] = useState(currentUser ? JSON.parse(currentUser)[0].userno : 0);



  // 更新使用者資訊-------------------------------
  let userChange = async () => {
    if (userMessage.password && ifPwdOK) {
      // console.log("都有填囉");
      var resultInfo = await axios.post(url + "/client/identity/update", {
        userno: userno,
        password: userMessage.password,
        nickname: userMessage.nickname,
        birthday: userMessage.birthday,
        intro: userMessage.intro,
      });
      if (resultInfo) {
        // console.log(resultInfo.data[0])
        setUserMessage(resultInfo.data[0]);
        setavaUsername(
          resultInfo.data[0].nickname
            ? resultInfo.data[0].nickname
            : resultInfo.data[0].username
        );
      }
    } else {
      alert("請填寫必要內容");
    }
  };

  return (
    <div
      id="c-message"
      className='c-block'
    >
      <h3 className="c-title">個人資料</h3>
      <form className="c-form">
        <div className="c-inbox">
          <label htmlFor="email">帳號:</label>
          <span id="id">{userMessage.userno}</span>
          <span id="email" className="c-mail">
            {userMessage.id}
          </span>
          <br />
        </div>
        <div className="c-inbox">
          <label htmlFor="pwd">密碼:</label>
          <input
            id="pwd"
            className="c-textmessage"
            type="password"
            placeholder="請輸入密碼"
            pattern="[a-zA-Z0-9]{6,}"
            onChange={(e) => {
              setUserMessage((prevState) => ({
                ...prevState,
                password: e.target.value,
              }))
              setIfPwdOK(/^(?=.*[a-zA-Z])(?=.*\d).{6,}$/.test(
                e.target.value
              ))
            }}
            value={userMessage.password}
          />
          {!userMessage.password && (
            <span id="m-pwd">*必填欄位</span>
          )}
          {userMessage.password && !ifPwdOK && (
            <span id="m-pwd">*密碼長度6以上，並包含至少一個英數字</span>
          )}
        </div>
        <div className="c-inbox">
          <label htmlFor="nick">暱稱:</label>
          <input
            id="nick"
            className="c-textmessage"
            type="text"
            onChange={(e) => {
              setUserMessage((prevState) => ({
                ...prevState,
                nickname: e.target.value,
              }))
            }}
            value={userMessage.nickname}
          />
        </div>
        <div className="c-inbox">
          <label htmlFor="bday">生日:</label>
          <input
            id="bday"
            className="c-date"
            type="date"
            onChange={(e) => {
              setUserMessage((prevState) => ({
                ...prevState,
                birthday: e.target.value,
              }))
            }}
            value={
              userMessage.birthday
                ? userMessage.birthday
                : ""
            }
          />
        </div>
        <div className="c-textarea">
          <label htmlFor="myIntro">個人簡介:</label>
          <textarea
            id="myIntro"
            className="c-textbox"
            onChange={(e) => {
              setUserMessage((prevState) => ({
                ...prevState,
                intro: e.target.value,
              }))
            }}
            value={
              userMessage.intro
                ? userMessage.intro
                : ""
            }
          ></textarea>
        </div>
        <div className="c-inbox">
          <button
            className="c-change"
            type="button"
            onClick={userChange}
          >
            確定修改
          </button>
        </div>
      </form>
    </div>
  );
}

export default Memberinfo;