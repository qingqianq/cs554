import React from 'react';
import Container from './components/Container';
import {BrowserRouter as Router, Link} from "react-router-dom";
const Nav = () =>{
    return(
        <nav>
          <ul>
            <li>
              <Link to="/">Home</Link>
            </li>
            <li>
              <Link to="/my-bin">my bin</Link>
            </li>
            <li>
              <Link to="/my-posts">my post</Link>
            </li>
            <li>
              {/* use a tag here because no store the likes into redis  */}
              <a href="/popularity">popularity</a>
            </li>
          </ul>
        </nav>
    );
};
function App() {
  return (
    <div className="App">
      <Router>
        <Nav/>
        <Container/>
      </Router>
    </div>
  );
}

export default App;
