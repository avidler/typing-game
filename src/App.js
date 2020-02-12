import React, {useState, useEffect} from 'react';
import './App.css';

function App() {
  const [level, setLevel] = useState(1)
  const [numString, setNumString] = useState("")
  const [isTimeRunning, setIsTimeRunning] = useState(false)
  const [text, setText] = useState("")

  function handleChange(e) {
    const {value} = e.target
    setText(value)
}


  function generateRandomNumber(level) {
    let tempNumString = ""
    for (let x = 0; x < level; x++){
      tempNumString = tempNumString + (Math.floor(Math.random() * 10))
    }
    setLevel(level+1)
    setNumString(tempNumString)
  }

  function resetGame(){
    setLevel(1)
    setNumString("")
    setIsTimeRunning(false)
    setText("")
  }


  return (
    <div className="App">
      <h1>Check your memory</h1>
      <button onClick={num => generateRandomNumber(level)}>Click for number</button>
      <p>{numString}</p>
      <textarea onChange={handleChange} value={text} /><br />
      <button onClick={resetGame}>Reset Game</button>
    </div>
  );
}

export default App;
