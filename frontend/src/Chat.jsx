import React, { useEffect, useState } from 'react'

function Chat({socket, userName}) {
  const [currentMessage, setcurrentMessage] = useState("")
  const sendMessage = async () => {
    if (currentMessage !== "") {
        const messageData = {
            author: userName,
            message: currentMessage,
            time: new Date(Date.now()).getHours() + ":" + new Date(Date.now()).getMinutes()
        }
        await socket.emit('send_message', messageData);
    }
  };

  useEffect(()=>{
    socket.on("receive_message",(data)=>{
        console.log(data)
    })
  },[socket])

  return (
    <div>
        <div className="chat-header">
            <p>Live Chat</p>
        </div>
        <div className="chat-body"></div>
        <div className="footer">
            <input 
                type="text" 
                placeholder="Type a message..." 
                onChange={(e)=> setcurrentMessage(e.target.value)}
            />
            <button onClick={sendMessage}>Send</button>
        </div>
    </div>
  )
}

export default Chat