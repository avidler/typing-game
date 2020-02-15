import React, {useState, useRef, useEffect} from "react"

function Game() {
    const [level, setLevel] = useState(0)
    const [highScore, setHighScore] = useState(0)
    const [numString, setNumString] = useState("")
    const [finalNumString, setFinalNumString] = useState("")
    const [showFinalScore, setShowFinalScore] = useState(false)
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
        setText("")
        let tempNumString = numString
        tempNumString = tempNumString + (Math.floor(Math.random() * 10)).toString()
        setNumString(tempNumString)
        setLevel(level+1)
        setIsTimeRunning(true)
        setTimeRemaining(3)
      
    }

    function resetGame() {
        setLevel(0)
        setNumString("")
        setIsTimeRunning(false)
        setText("")
        setShowFinalScore(false)
    }
  
   
    function startGame(){

        resetGame()
        setIsGameRunning(true)
        textBoxRef.current.focus()
        generateRandomNumber()
    }
  
    function endGame() {
        setLevel(0)
        setFinalNumString(numString)
        setNumString("")
      setShowFinalScore(true)
      setIsGameRunning(false)
      setHighScore(level>highScore ? level : highScore)

    }
  
    function submitAnswer(){
      text === numString ? generateRandomNumber() : endGame()
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
        <button onClick={submitAnswer} disabled={(!isGameRunning||isTimeRunning)}>Submit Answer</button>
       
  
        {isTimeRunning ? <div><p>{numString}</p><p>{timeRemaining}</p></div> : ""}
       
  
        {showFinalScore ? <div><p>Your text: {text}</p><p>{finalNumString}</p></div> : ""}
        
      </div>
    );

}

export default Game
