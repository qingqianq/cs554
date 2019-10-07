import React from "react";
import axios from "axios";
import {Redirect} from "react-router-dom";
class Pokemon extends React.Component{
    constructor(props){
        super(props);
        this.state = {
            data:undefined,
            redirect:undefined,
            cnName:undefined
        };
    }
    getData = async()=>{
        try {
            const response = await axios.get("https://pokeapi.co/api/v2/pokemon/" + this.props.match.params.id);
            const {data} = response;
            this.setState({data});
            try{
                const speciesUrl = data.species.url;
                let res = await axios.get(speciesUrl);
                for(let pokemon of res.data.names){
                    if(pokemon.language.name === 'zh-Hans'){
                        this.setState({cnName:pokemon.name});
                        return;
                    }
                }
            }catch(err){
                console.log("Get cnName err\n" + err);
            }
        } catch (err) {
            console.log(err);
            this.setState({redirect:{url:"/nowhere"}});
        }

    }
    componentDidMount(){
        this.getData();
    }
    componentDidUpdate(prevProps){
        if(prevProps.match.params.page !== this.props.match.params.page)
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
        let cnName = null;
        let pokemon = false;
        if(this.state.data){
            let name = this.state.data.name ? this.state.data.name : false;
            let weight = this.state.data.weight ? this.state.data.weight : false;
            let img = this.state.data.sprites.front_default ? this.state.data.sprites.front_default : false;
            let types = this.state.data.types && this.state.data.types.map((pokemon ,i, j) =>{
                return (i !== j.length - 1) ? (pokemon.type.name + ", ") : (pokemon.type.name);
            });
            cnName = this.state.cnName && (<div>名称: {this.state.cnName}</div>);
            pokemon = (
                <div>
                  <img src={img} />
                  {cnName}
                  <div>name: {name}</div>
                  <div>weight: {weight}</div>
                  <div>types: {types}</div>
                </div>
            );

        }
        return(
            <div>

              {pokemon}
            </div>
        );
    }

}
export default Pokemon;
