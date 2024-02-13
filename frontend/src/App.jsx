import { useState } from "react";
import "./App.css";
import io from "socket.io-client";
import Chat from "./Chat";

const socket = io.connect("http://localhost:3000");
const room = "Development";

function App() {
  const [userName, setuserName] = useState("");
  const [showChat, setshowChat] = useState(false);

  const joinRoom = () => {
    if (userName !== "") {
      socket.emit("join_room", room);
      setshowChat(true);
    }
  };

  return (
    <>
      {!showChat ? (
        <div className = "main">
        <div className="hero-container">
          <div className="hero-left">
            <h3 className="heading">
              Hello👋
            </h3>
            <p className="sub-heading">Welcome to Insta Chat</p>
          </div>
          <div className="hero-right">
          <p>Enter a username and hop in!</p>
          <div className="container">
          <input
            className="input-box"
            type="text"
            placeholder="Enter username"
            value={userName}
            onChange={(e) => setuserName(e.target.value)}
          />
          <button className="button" onClick={joinRoom}>
  <span class="lable">Let's Chat</span>
</button>
        </div>
        </div>
        </div>
        </div>
      ) : (
        <Chat socket={socket} userName={userName} room={room} />
      )}
    </>
  );
}

export default App;
