import React, { Component } from "react";
import axios from "axios";
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
      console.log(players);
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
        {/* <ol>
          {this.state.players.map(player => (
            <li key={player.id}>{player.name}</li>
          ))}
        </ol> */}
      </div>
    );
  }
}

export default App;
