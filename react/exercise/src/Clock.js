import React, { Component } from "react";
import "./App.css";

class Clock extends Component {
    constructor(props) {
        super(props);
        this.state = {
            city: this.props.city,
            date: this.props.date
        };
    }
    getTime(zoom){
        let d = new Date();
        let localTime = d.getTime();
        let localOffset = d.getTimezoneOffset() * 60000; 
        let utc = localTime + localOffset;
        let offset = zoom;  
        let calctime = utc + (3600000*offset);
        return new Date(calctime);
    }
    componentDidMount() {
        this.timerID = setInterval(() => this.tick(), 1000);
    }

    componentWillUnmount() {
        clearInterval(this.timerID);
    }

    tick() {
        this.setState({
            date: new Date()
        });
    }

    render() {
        return (
            <div>
              <h2>{this.state.city} is {this.state.date.toLocaleTimeString('en-US',{timeZone:this.state.city,timeZoneName:'short'})} now </h2>
            </div>
        );
    }
}

export default Clock;
