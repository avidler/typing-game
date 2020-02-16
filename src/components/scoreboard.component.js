import React, {useState, useEffect} from "react"

import axios from 'axios'


function Scoreboard() {

    const [scorelist, setScorelist] = useState([])

    useEffect(() => {
        axios.get('http://localhost:5000/scoreboard/')
        .then(response => {
            console.log(response.data)
            setScorelist(response.data)
            
        })
        .catch((error) => {
            console.log(error)
        })

    },[])
    

 
    
    return(
        <div>
            <h1>Scoreboard</h1>
            {scorelist.map((player, i) => <div key={i}>{player.username}: {player.score}</div>)}
            
        </div>
    )
}

export default Scoreboard