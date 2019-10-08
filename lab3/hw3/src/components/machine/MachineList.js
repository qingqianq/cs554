import React from "react";
import axios from "axios";
import { Link, Redirect } from "react-router-dom";
class MachineList extends React.Component{
    constructor(props){
        super(props);
        this.state = {
            data: undefined,
            redirect: undefined
        };
    }
    getData = async () => {
        try{
            const MACHINE_LINK = "https://pokeapi.co/api/v2/machine/";
            const ONE_PAGE = 25;
            let page = this.props.match.params.page;
            let urlParams = `?offset=${ONE_PAGE * page}&&limit=${ONE_PAGE}`;
            const response = await axios.get(MACHINE_LINK + urlParams);
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
        let next, previous, li;
        if(this.state.data){
            let results = this.state.data.results;
            if(this.state.data.next){
                let newPage = parseInt(this.props.match.params.page) + 1;
                let pathname = '/machines/page/'+newPage.toString();
                next = (<Link to={pathname} >Next</Link>);
            }
            if(this.state.data.previous){
                let newPage = parseInt(this.props.match.params.page) - 1;
                let pathname = `/machines/page/`+newPage.toString();
                previous = (<Link to={pathname} >Previous</Link>);
            }
            li = results && results.map(machines => {
                let name;
                let id = machines.url.match(/(?<=https:\/\/pokeapi\.co\/api\/v2\/machine\/)(\d+)(?=\/)/g);
                name = id && "Machine ".concat(id);
                id = id ? id[0] : "nowhere";
                return(
                    <li key={name}>
                      <Link to={`/machines/${id}`}> {name} </Link>
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
export default MachineList;
