import React from "react";
import {Query} from 'react-apollo';
import queries from './queries.js';
import 'bootstrap/dist/css/bootstrap.min.css';
import Image from './Image.js';

import { Button } from 'react-bootstrap';
import {Card} from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import {Mutation} from 'react-apollo';
class TestComp extends React.Component{
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
    let info = "Hello"
    let image =       {
      "id": "hello world8",
      "url": "https://images.unsplash.com/photo-1573218877106-3e09ed6f4cf7?ixlib=rb-1.2.1&q=80&fm=jpg&crop=entropy&cs=tinysrgb&w=400&fit=max&ixid=eyJhcHBfaWQiOjEwMTE1N30",
      "poster_name": "Illiya Vjestica",
      "description": "Long winding road in the Yorkshire Dales.",
      "user_posted": false,
      "binned": true
    };
    let test = (
      <Mutation
        mutation={queries.SAVE_PIC_BIN}
        update={
        (cache,{ data: { updateImage } }) => {
          console.log(cache);
          let res = cache.readQuery({query:queries.GET_BIN_PICS});
          if(!res)
            cache.writeQuery({query:queries.GET_BIN_PICS,data:{likedImages:likedImages.concat([this.props.image])}});
          console.log(cache);
        }}
      >
        {
          (updateImage, {data}) =>(
            <form onSubmit={e => {
              e.preventDefault();
              updateImage({
                variables:{
                  id:image.id,
                  url:image.url,
                  author:image.poster_name,
                  description:image.description,
                  user_posted:false,
                  binned:true,
                }});
              alert("Added");
              this.setState({addToBin:false});
            }}>
              <button className="btn btn-primary" type="submit">{info}</button>
            </form>
          )
        }
      </Mutation>
    )

    return(
      <div>
        {test}
      </div>
    );
  }
}
export default TestComp;
