import './App.css';
import React, { useEffect, useState } from "react";
import Compose from "./components/Compose.js"
import Preview from "./components/Preview.js"
import Sender from "./components/Sender.js"

let componentArray = [<Compose />, <Sender />, <Preview />]
let componentIndex = 0

function App() {
  const [currentComponent, setCurrentComponent] = useState(componentArray[componentIndex])
  console.log("render")

  const handleClick = (event) =>{
    console.log("next or previous")
    event.preventDefault()
    if(event.target.id === "next" && componentIndex < 2){
      componentIndex += 1
    }
    if(event.target.id === "previous" && componentIndex > 0){
      componentIndex -= 1
    }
    setCurrentComponent(componentArray[componentIndex])
  }
  return (
    <div className="app">
      <div className="form-nav-bar">
      </div>
      <div className="current-component">
        {currentComponent}
      </div>
      <div className="next-button">
        <button id="previous" onClick={handleClick}>Previous</button>
        <button className="btn" id="next" onClick={handleClick}>Next</button>
      </div>
    </div>
  );
}

export default App;
