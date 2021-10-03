import send from "./send.svg";
import "./App.css"; 
import Hi from "./Hit.jpg"
import { useEffect, useState } from "react";
import io from "socket.io-client";
import lo from "./lo.gif";

function App() {
  let [socket, setSocket] = useState();
  let [message, setMessage] = useState("");

  let [chats, setChats] = useState([]);

  useEffect(function () {
    const soc = io("http://localhost:5000/");

    soc.on("connect", () => {
      setSocket(soc);
    });
   
    soc.on("broadcast", (payload) => {
      setChats(function (old) {
        let copy = [...old];
        copy.push(payload);
        return copy;
      });
    });
  }, []);

  if (socket) {
    return (
      <div className="hit1"><p className="heding">Hiteshsuthar</p>
      <p className="heding1">Online</p>
      <img className="img1" src={Hi} alt="" srcset="" />
      
        <div className="style">
          <div className="style1">
            {chats.map(function (chat, index) {
              return <p className="MASS">{chat.message} <span id="demo"></span></p>;
            })}

          </div>
        </div>

        <div className="hit">
          <div className="style3">
            {" "}
           
            <input
              placeholder="Type a massages"
              value={message}
              className="input"
              onChange={function (event) {
                setMessage(event.target.value);
              }}
            />
            <button
              className="button"
              onClick={function () {
                socket.emit("message", { message: message });
                setMessage("");
              }}
            >
              <img className="Helo" src={send} alt="helo" srcset="" />
            </button>
          </div>
        </div>
      </div>
    );
  } else {
   
    return (<div><center><img className="Helo2" src={lo} alt="helo" srcset=""/><h1  className="hed">Connecting.....</h1></center></div>);
  }
}

export default App;
