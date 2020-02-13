import React, {useState, useEffect, useRef} from 'react';
import './App.css';

function App() {
  const [level, setLevel] = useState(0)
  const [highScore, setHighScore] = useState(0)
  const [numString, setNumString] = useState("")
  const [timeRemaining, setTimeRemaining] = useState(3)
  const [isTimeRunning, setIsTimeRunning] = useState(false)
  const [text, setText] = useState("")
  const [isGameRunning, setIsGameRunning] = useState(false)
  const textBoxRef = useRef(null)

  function handleChange(e) {
    const {value} = e.target
    setText(value)
}


  function generateRandomNumber() {
    let tempNumString = numString
    tempNumString = tempNumString + (Math.floor(Math.random() * 10)).toString()
    setLevel(level+1)
    setNumString(tempNumString)
    setIsTimeRunning(true)
    setTimeRemaining(3)
    
  }

  function resetGame(){
    setHighScore(level>highScore ? level : highScore)
    setLevel(0)
    setNumString("")
    setIsTimeRunning(false)
    setText("")
    setIsGameRunning(false)
  }

  function startGame(){
    generateRandomNumber()
    setIsGameRunning(true)
    textBoxRef.current.focus()
  }

  function submitAnswer(){
    setText("")
    text === numString ? generateRandomNumber() : resetGame()
  }

  function readyForAnswer() {
    setIsTimeRunning(false)
    textBoxRef.current.focus()
  }

  useEffect(() => {
    if(isTimeRunning && timeRemaining > 0) {
        setTimeout(() => {
            setTimeRemaining(time => time - 1)
        }, 1000)
    } else if(timeRemaining === 0) {
        readyForAnswer()
    }
}, [timeRemaining, isTimeRunning])

  return (
    <div className="App">
      <h1>Check your memory</h1>
      <h2>High Score: {highScore}</h2>
      <h3>Level: {level}</h3>
      <button onClick={startGame} disabled={isGameRunning}>Start Game</button><br />

      <textarea onChange={handleChange} value={text} ref={textBoxRef} disabled={isTimeRunning}/><br />
      <button onClick={submitAnswer} disabled={isTimeRunning}>Submit Answer</button>
      <button onClick={resetGame}>Reset Game</button>

      <p>{isTimeRunning ? numString : ""}</p>
      <p>{isTimeRunning ? timeRemaining : ""}</p>
    </div>
  );
}

export default App;
