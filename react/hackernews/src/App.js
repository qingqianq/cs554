import React, {Component} from "react";
import logo from './logo.svg';
import './App.css';
const list = [
    {
        title: 'React',
        url: "https://reactjs.org",
        author: '卢本伟',
        num_comments: 3,
        points: 4,
        objectID: 0
    },
    {
        title: 'redux',
        url: "https://redux.js.org",
        author: "五五开",
        num_comments: 2,
        points : 5,
        objectID: 1,
    }
];
/*
  jsx
*/
class App  extends Component {
    render(){
        return (
            <div className = 'App'>
              {list.map((item) =>{
                      <div key = {item.objectID}>
                            <span>
                                  <a href = {item.url}> {item.title}</a>
                                </span>
                                <span>{item.author}</span>
                                    <span>{item.num_comments}</span>
                                        <span>{item.points}</span>
                          </div>
                      })}
            </div>
        );
    }
}

export default App;
