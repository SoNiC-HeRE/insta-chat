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
        <div>
          <h2>Welcome to Insta Chat</h2>
          <p>Enter a username and hop in!</p>
          <input
            type="text"
            placeholder="Enter username"
            value={userName}
            onChange={(e) => setuserName(e.target.value)}
          />
          <button onClick={joinRoom}>Join the chat</button>
        </div>
      ) : (
        <Chat socket={socket} userName={userName} room={room} />
      )}
    </>
  );
}

export default App;
