import React from "react";
import axios from "axios";
import {Link, Redirect} from "react-router-dom";
class Berry extends React.Component{
    constructor(props){
        super(props);
        this.state = {
            data: undefined,
            redirect:undefined,
            berryDescription: undefined
        };
    }
    getData = async () => {
        try{
            const BERRY_URL = "https://pokeapi.co/api/v2/berry/";
            let id = this.props.match.params.id;
            const response = await axios.get(BERRY_URL + id);
            const {data} = response;
            this.setState({data});
            try {
                const itemUrl = data.item.url;
                let res = await axios.get(itemUrl);
                for(let berry of res.data.flavor_text_entries){
                    if(berry.language.name === 'en'){
                        this.setState({berryDescription:berry.text});
                        break;
                    }
                }
            } catch (err) {
                console.log("Get description err\n" + err);
            }
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
        let berry, berryDescription, prev, next;
        if(this.state.data){
            const BERRIES = "/berries/";
            const BERRY_BEGIN = 1, BERRY_END = 64;
            let name = this.state.data.item.name,
                size = this.state.data.size,
                smoothness = this.state.data.smoothness;
            berryDescription = this.state.berryDescription &&
                <div>Description: {this.state.berryDescription}</div>;
            let id = parseInt(this.props.match.params.id);
            prev = (id !== BERRY_BEGIN) && <Link to={`${BERRIES}${id - 1}`}> Previos </Link>;
            next = (id !== BERRY_END) && <Link to={`${BERRIES}${id + 1}`}> Next </Link>;
            berry = (
                <div>
                  <div>Name: {name} </div>
                  <div>Size: {size} </div>
                  <div>Smoothness: {smoothness} </div>
                  {berryDescription}
                </div>
            );
        }
        return(
            <div>
              {prev} &nbsp;&nbsp;
              {next}
              {berry}
            </div>
        );
    }
}
export default Berry;
