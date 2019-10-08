import React from "react";
import axios from "axios";
import {Link,Redirect} from "react-router-dom";
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
            const POKE_URL = "https://pokeapi.co/api/v2/pokemon/";
            let id = this.props.match.params.id;
            const response = await axios.get(POKE_URL + id);
            const {data} = response;
            this.setState({data});
            try{
                const speciesUrl = data.species.url;
                let res = await axios.get(speciesUrl);
                for(let pokemon of res.data.names){
                    if(pokemon.language.name === 'zh-Hans'){
                        this.setState({cnName:pokemon.name});
                        break;
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
        let cnName = null;
        let pokemon = false;
        let prev = false;
        let next = false;
        if(this.state.data){
            const GOOGLE_IMG_SEARCH = 'https://www.google.com/search?tbm=isch&q=';
            let name = this.state.data.name ? this.state.data.name : null;
            let weight = this.state.data.weight ? this.state.data.weight : false;
            let img = this.state.data.sprites.front_default ?
                (<img src={`${this.state.data.sprites.front_default}`} alt={`${name}`}/>) :
                <a target='_blank' rel='noopener noreferrer' href={`${GOOGLE_IMG_SEARCH}${name}`}>No img</a>;
            let types = this.state.data.types && this.state.data.types.map((pokemon ,i, j) =>{
                return (i === j.length - 1) ? (pokemon.type.name) : (pokemon.type.name + ", ");
            });
            let id = this.props.match.params.id;
            let prevId = (id === '10001') ? 808 : id;
            let nextId = (id === '807') ? 10000 : id;
            let prevPath = ( prevId === '1') ? false : "/pokemon/".concat(parseInt(prevId) - 1);
            let nextPath = (nextId === '10157') ? false : ("/pokemon/" + (parseInt(nextId) + 1));
            prev = prevPath && (<Link to={prevPath}>Previos</Link>);
            next = nextPath && (<Link to = {nextPath}>Next</Link>);
            cnName = this.state.cnName && (<div>名称: {this.state.cnName}</div>);
            pokemon = (
                <div>
                  {img}
                  {cnName}
                  <div>name: {name}</div>
                  <div>weight: {weight}</div>
                  <div>type: {types}</div>
                </div>
            );
        }
        return(
            <div>
              {prev} &nbsp;&nbsp;
              {next}
              {pokemon}
            </div>
        );
    }
}
export default Pokemon;
