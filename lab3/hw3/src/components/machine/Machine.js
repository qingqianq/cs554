import React from "react";
import axios from "axios";
import uuid from 'uuid/v4';
import { Link, Redirect } from "react-router-dom";

class Machine extends React.Component{
    constructor(props){
        super(props);
        this.state = {
            data: undefined,
            redirect: undefined,
            machine: undefined
        };
    }
    getData = async () => {
        try{
            let machine = {};
            const MACHINE_URL = "https://pokeapi.co/api/v2/machine/";
            let id = this.props.match.params.id;
            let response = await axios.get(MACHINE_URL + id);
            const {data} = response;
            this.setState({data});
            let itemUrl = data.item.url;
            let moveUrl = data.move.url;
            response = await axios.get(itemUrl);
            machine["Cost"] = response.data.cost;
            for(let effects of response.data.effect_entries){
                if(effects.language.name === 'en'){
                    machine["Effect"] = effects.effect;
                    break;
                }
            }
            response = await axios.get(moveUrl);
            machine.Accuracy = response.data.accuracy;
            for(let descriptions of response.data.flavor_text_entries){
                if(descriptions.language.name === 'en'){
                    machine.Description = descriptions.flavor_text;
                    break;
                }
            }
            if(Object.keys(machine).length)
                this.setState({machine:machine});
        }catch(err){
            console.log(err);
            this.setState({redirect:{url:"/nowhere"}});
        }
    };
    componentDidMount(){
        this.getData();
    }
    componentDidUpdate(prevProps){
        if(prevProps.match.params.id !== this.props.match.params.id)
            this.getData();
    }
    render(){
        let {redirect} = this.state;
        if(redirect){
            let url = redirect.url;
            this.setState=(state,callback)=>{return;};
            return(
                <Redirect to={url}/>
            );
        }
        let machine, prev, next;
        if(this.state.data){
            const MACHINES = "/machines/";
            const MACHINE_BEGIN = 1, MACHINE_END = 1442;
            let id = parseInt(this.props.match.params.id);
            prev = (id !== MACHINE_BEGIN) && <Link to={`${MACHINES}${id - 1}`}> Previos </Link>;
            next = (id !== MACHINE_END) && <Link to={`${MACHINES}${id + 1}`}> Next </Link>;
        }
        let machine_info;
        if((machine_info = this.state.machine)){
            machine = [];
            for(let keys in machine_info){
                // some value may be false not use !machine_info[keys] here.
                if(machine_info[keys] !== undefined && machine_info[keys] !== null)
                    machine.push(<li key={uuid()}>{keys}: {machine_info[keys]}</li>);
            }
        }
        return(
            <div>
              {prev} &nbsp;&nbsp;
              {next}
              <li>Machine {this.props.match.params.id}</li>
              {machine}
            </div>
        );
    }
}
export default Machine;
