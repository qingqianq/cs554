import React from "react";
import axios from "axios";
import { Link, Redirect } from "react-router-dom";
/*
  TODO Build a template component class by yas-snippets with spacemacs with "comp" M-/ in js2-jsx-mode
  https://blog.alex-miller.co/emacs/spacemacs/2017/05/28/yasnippets.html
*/
class PokemonList extends React.Component{
    constructor(props){
        super(props);
        this.state = {
            data: undefined,
            redirect: undefined
            //onePage = undefined   state for ONE_PAGE
        };
    }
    getData = async ()=>{
        try{
            const POKE_LINK = "https://pokeapi.co/api/v2/pokemon/";
            //One page number
            const ONE_PAGE = 40;
            let page = this.props.match.params.page;
            let urlParams = `?offset=${ONE_PAGE * page}&&limit=${ONE_PAGE}`;
            const response = await axios.get(POKE_LINK + urlParams);
            if(response.data.results.length === 0)
                this.setState({redirect:{url:"/nowhere"}});
            this.setState({data:response.data});
        }catch(err){
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
    /*
      http://localhost:3000/pokemon/page/1000000
      <Redirect/> redirect the page but the life circle is not done.
      there may be other setState call in other life circle function,that may be memory leak.
      handle it with setState = (state,callback)=>{return};
      zero width assertion in Id part 零宽断言 .
      https://stackoverflow.com/questions/2973436/regex-lookahead-lookbehind-and-atomic-groups
    */
    render(){
        const {redirect} = this.state;
        if(redirect){
            let url = redirect.url;
            this.setState=(state,callback)=>{return;};
            return(
                <Redirect to={url}/>
            );
        }
        let next = null;
        let previous = null;
        var li = null;
        if(this.state.data){
            let results = this.state.data.results;
            if(this.state.data.next){
                let newPage = parseInt(this.props.match.params.page) + 1;
                let pathname = '/pokemon/page/'+newPage.toString();
                next = (<Link to={pathname} >Next</Link>);
            }
            if(this.state.data.previous){
                let newPage = parseInt(this.props.match.params.page) - 1;
                let pathname = `/pokemon/page/`+newPage.toString();
                previous = (<Link to={pathname} >Previous</Link>);
            }
            li = results && results.map(pokemons =>{
                let name = pokemons.name;
                let id = pokemons.url.match(/(?<=https:\/\/pokeapi\.co\/api\/v2\/pokemon\/)(\d+)(?=\/)/g);
                id = id ? id[0] : "nowhere";
                return (
                    <li key = {pokemons.url.toString()}>
                      <Link to={`/pokemon/${id}`}>{name}</Link>
                    </li>
                );
            });
        }
        return(
            <div>
              {previous} &nbsp;&nbsp;
              {next}
              {li}
            </div>
        );
    }
}
export default PokemonList;
