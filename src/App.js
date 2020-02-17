import React from 'react';
import { BrowserRouter as Router, Route } from "react-router-dom"
import "bootstrap/dist/css/bootstrap.min.css"
import './App.css';
import Navbar from "./components/navbar.component"
import Game from "./components/game.component"
import Scoreboard from "./components/scoreboard.component"

function App() {
  return(
  <Router>
  <div className="container">
    <Navbar />
    <Route path="/" exact component={Game} />
    <Route path="/scoreboard" exact component={Scoreboard} />
  </div>
</Router>
  )
}

export default App;
