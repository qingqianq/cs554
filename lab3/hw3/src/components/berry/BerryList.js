import React from "react";
import axios from "axios";
import { Link, Redirect } from "react-router-dom";

class BerryList extends React.Component{
    constructor(props){
        super(props);
        this.state = {
            data: undefined,
            redirect: undefined
        };
    }
    getData = async () =>{
        try{
            const BERRY_LINK = "https://pokeapi.co/api/v2/berry/";
            const ONE_PAGE = 40;
            let page = this.props.match.params.page;
            let urlParams = `?offset=${ONE_PAGE * page}&&limit=${ONE_PAGE}`;
            const response = await axios.get(BERRY_LINK + urlParams);
            if(response.data.results.length === 0)
                this.setState({redirect:{url:"/nowhere"}});
            this.setState({data:response.data});
        }catch(err){
            console.log(err);
            this.setState({redirect:{url:"nowhere"}});
        }
    };
    componentDidMount(){
        this.getData();
    }
    componentDidUpdate(prevProps){
        if(prevProps.match.params.page !== this.props.match.params.page)
            this.getData();
    }
    render(){
        const {redirect} = this.state;
        if(redirect){
            let url = redirect.url;
            this.setState=(state,callback)=>{return;};
            return(<Redirect to = {url} />);
        }
        let next = null, previous = null, li = null;
        if(this.state.data){
            let results = this.state.data.results;
            if(this.state.data.next){
                let newPage = parseInt(this.props.match.params.page) + 1;
                let pathname = '/berries/page/'+newPage.toString();
                next = (<Link to={pathname} >Next</Link>);
            }
            if(this.state.data.previous){
                let newPage = parseInt(this.props.match.params.page) - 1;
                let pathname = `/berries/page/`+newPage.toString();
                previous = (<Link to={pathname} >Previous</Link>);
            }
            li = results && results.map(berries =>{
                let name = berries.name;
                let id = berries.url.match(/(?<=https:\/\/pokeapi\.co\/api\/v2\/berry\/)(\d+)(?=\/)/g);
                id = id ? id[0] : "nowhere";
                return(
                    <li key={name}>
                      <Link to={`/berries/${id}`}> {name} </Link>
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
export default BerryList;
