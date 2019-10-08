import React from "react";
import axios from "axios";
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
            machine["cost"] = response.data.cost;
            for(let effects of response.data.effect_entries){
                if(effects.language.name === 'en'){
                    machine["effect"] = effects.effect;
                    break;
                }
            }
            this.setState({machine});

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
        return(
            <div>
              {prev} &nbsp;&nbsp;
              {next}
            </div>
        );
    }
}
export default Machine;
