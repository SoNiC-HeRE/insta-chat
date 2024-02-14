import React, { useEffect, useState } from "react";

function Chat({ socket, userName, room }) {
  const [currentMessage, setcurrentMessage] = useState("");
  const [messageList, setmessageList] = useState([]);
  const sendMessage = async () => {
    if (currentMessage !== "") {
      const messageData = {
        room: room,
        author: userName,
        message: currentMessage,
        time:
          new Date(Date.now()).getHours() +
          ":" +
          new Date(Date.now()).getMinutes(),
      };
      await socket.emit("send_message", messageData);
      setmessageList((list) => [...list, messageData]);
      setcurrentMessage("");
    }
  };
  const handleKeyDown = (e) => {
    if (e.key === 'Enter') {
      e.preventDefault(); // Prevents the default behavior (e.g., form submission)
      sendMessage();
    }
  };

  useEffect(() => {
    const receiveMessage = (data) => {
      setmessageList((list) => [...list, data]);
    };
    socket.on("receive_message", receiveMessage);
    return () => {
      socket.off("receive_message", receiveMessage); // Cleanup function
    };
  }, [socket]);

  return (
    <div className="chat-window">
      <div className="chat-header">
        <p>Live Chat</p>
      </div>
      <div className="chat-body">
        {messageList.map((messageContent) => {
          return (
            // eslint-disable-next-line react/jsx-key
            <div
              className="message"
              id={userName === messageContent.author ? "other" : "you"}
            >
              <div>
                <div className="message-content">
                  <p>{messageContent.message}</p>
                </div>
                <div className="message-meta">
                  <p id="time">{messageContent.time}</p>
                  <p id="author">{messageContent.author}</p>
                </div>
              </div>
            </div>
          );
        })}
      </div>
      <div className="chat-footer">
        <input
          type="text"
          value={currentMessage}
          placeholder="Type a message..."
          onChange={(e) => setcurrentMessage(e.target.value)}
          onKeyDown={handleKeyDown}
        />
        <button onClick={sendMessage}>Send</button>
      </div>
    </div>
  );
}

export default Chat;
