import { useState, useEffect } from "react";
import "./App.css";
import io from "socket.io-client";
import Chat from "./components/Chat/Chat";
import { PiHandWaving } from "react-icons/pi";
import Marquee from "./components/Marquee/Marquee";
import { motion, useAnimation } from "framer-motion";
import Loader from "./components/Loader/Loader";

const socket = io.connect("http://localhost:3000");
const room = "Development";

function App() {
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Simulate a delay for the loader to show
    setTimeout(() => {
      setIsLoading(false);
    }, 2000);
  }, []);
  const controls = useAnimation();

  useEffect(() => {
    controls.start({
      x: 0,
      opacity: 1,
      transition: {
        duration: 4,
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
      {isLoading && <Loader />}
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
                  Hello
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
                    <span className="label">Let's Chat</span>
                  </button>
                </div>
              </motion.div>
            </div>
            <Marquee />
          </div>
        </div>
      ) : (
        <div className="chat-container">
          <Chat socket={socket} userName={userName} room={room} />
        </div>
      )}
    </>
  );
}

export default App;
