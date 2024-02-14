import { useState, useEffect } from "react";
import "./App.css";
import io from "socket.io-client";
import Chat from "./Chat";
import { PiHandWaving } from "react-icons/pi";
import Marquee from "./components/Marquee/Marquee";
import { motion, useAnimation } from "framer-motion";

const socket = io.connect("http://localhost:3000");
const room = "Development";

function App() {
  const controls = useAnimation();

  useEffect(() => {
    controls.start({
      x: 0,
      opacity: 1,
      transition: {
        duration: 1,
        ease: "easeInOut",
      },
    });
  }, [controls]);

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
        <div className="main">
          <div className="glass-container">
            <div className="hero-container">
              <motion.div
                initial={{ x: -100, opacity: 0 }}
                animate={controls}
                className="hero-left"
              >
                <h3 className="heading">
                  Hello{" "}
                  <span className="icon">
                    <PiHandWaving size={120} />
                  </span>
                </h3>
                <p className="sub-heading">Welcome to Insta Chat</p>
              </motion.div>
              <motion.div
                initial={{ x: -100, opacity: 0 }}
                animate={controls}
                className="hero-right"
              >
                <p>Enter a username and hop in!</p>
                <div className="container">
                  <input
                    className="input-box"
                    type="text"
                    placeholder="Your name goes here"
                    value={userName}
                    onChange={(e) => setuserName(e.target.value)}
                  />
                  <button className="button" onClick={joinRoom}>
                    <span class="label">Let's Chat</span>
                  </button>
                </div>
              </motion.div>
            </div>
            <Marquee />
          </div>
        </div>
      ) : (
        <Chat socket={socket} userName={userName} room={room} />
      )}
    </>
  );
}

export default App;
