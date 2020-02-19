import React, {useState, useEffect} from "react"

import axios from 'axios'


function Scoreboard() {

    const [scorelist, setScorelist] = useState([])

    useEffect(() => {
        axios.get('http://localhost:5000/scoreboard/')
        .then(response => {
            console.log(response.data[response.data.length-1].score)
            setScorelist(response.data)
            
        })
        .catch((error) => {
            console.log(error)
        })

    },[])
    

 
    
    return(
        <div>
            <h1>Scoreboard</h1>
            {scorelist.map((player, index) => <div key={player._id}>{index+1} - {player.username}: {player.score}</div>)}
            
        </div>
    )
}

export default Scoreboard