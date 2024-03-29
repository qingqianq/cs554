import React, { Component } from "react";
import logo from "./logo.svg";
import "./App.css";
import Clock from "./Clock";
class App extends Component {
    render() {
        return (
            <div className="App">
              <header className="App-header">
                <img src={logo} className="App-logo" alt="logo" />
                <h1 className="App-title">Welcome to React</h1>
              </header>
              <Clock date={new Date()} city = {"Asia/Shanghai"}/>
              <Clock date={new Date()} city = {"Asia/Kolkata"}/>
              <Clock date={new Date()} city = {"America/New_York"}/>
            </div>
        );
    }
}
export default App;
