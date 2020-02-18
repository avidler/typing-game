import React, {useState, useRef, useEffect} from "react"
import axios from 'axios'
import "bootstrap/dist/css/bootstrap.min.css"

function Game() {
    const [level, setLevel] = useState(0)
    const [highScore, setHighScore] = useState()
    const [numString, setNumString] = useState("")
    const [finalNumString, setFinalNumString] = useState("")
    const [showFinalScore, setShowFinalScore] = useState(false)
    const [timeRemaining, setTimeRemaining] = useState(0)
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
        setTimeRemaining(level+3)

        var tCtx = document.getElementById('textCanvas').getContext('2d'),
        imageElem = document.getElementById('image');
    
        
        tCtx.canvas.width = tCtx.measureText(tempNumString).width+20;
        tCtx.font = '22px Verdana'
        tCtx.fillText(tempNumString, 5, 30);
        imageElem.src = tCtx.canvas.toDataURL();
        console.log(imageElem.src);
      
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
      
    axios.get('/scoreboard')
        .then(response => {
          console.log("Score to beat: ",response.data[response.data.length-1].score)
          if (level > response.data[response.data.length-1].score){
            let result = window.prompt("Please enter username", "Player 1")
            const userScore= {
              username: result,
              score: level
          }

          axios.post('/scoreboard/add', userScore)
          .then(res => console.log(res.data))
          }
            
        })
    //console.log(userScore)

   
    }
  
    function submitAnswer(){
      text === numString ? generateRandomNumber() : endGame()
    }
  
    function readyForAnswer() {
      setIsTimeRunning(false)
      textBoxRef.current.focus()
    }

    function enterPressed(event) {
      var code = event.keyCode || event.which;
      if(code === 13) { submitAnswer()
      } 
  }
  
    useEffect(() => {
      axios.get('/scoreboard')
      .then(response => {
        console.log("Top score: ",response.data[0].score)
         setHighScore(response.data[0].score) 
          
      })


   

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
        
          <textarea 
            onChange={handleChange} 
            value={text} 
            ref={textBoxRef} 
            disabled={(!isGameRunning||isTimeRunning)}
            onKeyPress={enterPressed}
          />

        <br />
        <button 
          onClick={submitAnswer} 
          disabled={(!isGameRunning||isTimeRunning)}
          
        >
          Submit Answer
        </button>
        <div>
       <canvas id='textCanvas' height='40'></canvas>
        {isTimeRunning ?  <img id='image'/> : <img id='image' width='0px'/>}
        </div>
     
  
        {isTimeRunning ? <div id="generated-text "><p>{timeRemaining}</p></div> : ""}
      
        {showFinalScore ? <div><p>Your text: {text}</p><p>{finalNumString}</p></div> : ""}
        
      </div>
    );

}

export default Game
