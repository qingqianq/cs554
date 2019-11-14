import React from 'react';
import logo from './logo.svg';
import './App.css';
import Data from './Data.js';
// import 

class App extends React.Component{
    constructor(props){
        super(props);
        this.state = {
            
        };
    }
    componentDidMount(){
        
    }
    componentDidUpdate(PrevProps){
        
    }
    render(){
        return (<div><Data client={this.props.client}/></div>);
    }
}

export default App;
