import React from "react";
import {Mutation} from 'react-apollo';
import queries from './queries.js';
class NewPost extends React.Component{
    constructor(props){
        super(props);
        this.state = {
            
        };
    }
    getData = async () => {
        try{
            
        }catch(err){
            console.log(err);
        }
    };
    componentDidMount(){
        
    }
    componentDidUpdate(PrevProps){
        
    }
    render(){
        let body = null;
        body = (
            <Mutation mutation="queries.ADD_PIC">

            </Mutation>
        );
        return(
            <div>
              
            </div>
        );
    }
}
export default NewPost;
