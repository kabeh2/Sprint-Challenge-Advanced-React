import React, { Component } from "react";
import axios from "axios";
import Navbar from "./components/Navbar";
import "./App.css";

class App extends Component {
  state = {
    players: []
  };

  componentDidMount() {
    this.fetchPlayers();
  }

  fetchPlayers = async () => {
    try {
      const response = await axios.get("http://localhost:5000/api/players");
      const players = response.data;
      console.log(response);
      this.setState({
        players
      });
    } catch (error) {
      console.error("Error: ", error);
    }
  };

  render() {
    return (
      <div className="App" data-test="component-app">
        <Navbar />
        <ol data-test="component-players">
          {this.state.players.map(player => (
            <li key={player.id} data-test="component-player">
              {player.name}
            </li>
          ))}
        </ol>
      </div>
    );
  }
}

export default App;
