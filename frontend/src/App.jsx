import { useState } from 'react'
import './App.css'
import io from 'socket.io-client'
import Chat from './Chat';

const socket = io.connect('http://localhost:3000')

function App() {
  const [userName, setuserName] = useState("");

  const joinRoom = () => {
    if(userName !== ""){
      socket.emit("join_room", userName)
    }
  };

  return (
    <>
    <h2>Welcome to Insta Chat</h2>
    <p>Enter a username and hop in!</p>
    <input 
      type="text" 
      placeholder="Enter username" 
      value={userName} 
      onChange={(e) => setuserName(e.target.value)} />
      <button onClick={joinRoom}>Join the chat</button>

      <Chat socket={socket} userName={userName}/>
    </>
  )
}

export default App
