import './App.css';
import React, { useEffect, useState } from "react";
import Compose from "./components/Compose.js"
import Preview from "./components/Preview.js"
import Sender from "./components/Sender.js"

function App() {
  const [currentComponent, setCurrentComponent] = useState(<Sender/>)

  // const handleClick = (event) =>{
  //   event.preventDefault()
  //   setCurrentComponent(<Preview/>)
  // }
  return (
    <div className="app">
      <div className="form-nav-bar">
      </div>
      <div className="current-component">
        {currentComponent}
      </div>
      <div className="next-button">
        {/* <button className="btn" onClick={handleClick}>Next</button> */}
      </div>
    </div>
  );
}

export default App;
