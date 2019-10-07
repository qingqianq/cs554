import React, {Component} from 'react';
import './App.css';
import {BrowserRouter as Router, Link} from "react-router-dom";
import Container from "./components/routeContainer.js";
/*
  Try to bind this in PokeList but failed.
*/
const Nav =()=>
      (
          <nav>
            <ul>
              <li>
                <Link to="/pokemon/page/0">Pokemon Listing</Link>
              </li>
              <li>
                <Link to="/berries/page/0">The Berry Listing </Link>
              </li>
              <li>
                <Link to="/machines/page/0">Machine Listing</Link>
              </li>
            </ul>
          </nav>
      );

class  App extends Component{
    render(){
        return (
            <div>
              <Router >
                <Nav/>
                <Container />
              </Router>
            </div>
        );
    }
}
export default App;
