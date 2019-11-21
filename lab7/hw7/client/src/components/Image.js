import React from "react";
import {Mutation} from 'react-apollo';
import {Query} from 'react-apollo';
import queries from './queries.js';
import { Button } from 'react-bootstrap';
import {Card} from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
class Image extends React.Component{
  constructor(props){
    super(props);
    this.state = {addToBin:true};
  }

  render(){
    let info = this.state.addToBin ? "Add to Bin" : "Remove from Bin";
    let image = this.props.image;
    let btn = null;
    if(this.state.addToBin === true){
      btn=(
        <Query query={queries.GET_BIN_PICS}>
          {({data})=>{
            if(!data) return null;
            let {likedImages} = data;
            for(let img of likedImages){
              if(img.id === image.id)
                this.setState({addToBin:false});
            }
            return (
              <Mutation
                mutation={queries.SAVE_PIC_BIN}
                update={
                (cache) => {
                  let res = cache.readQuery({query:queries.GET_BIN_PICS});
                  let {likedImages} = res;
                  if(res)
                    cache.writeQuery({query:queries.GET_BIN_PICS,data:{likedImages:likedImages.concat([this.props.image])}});
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
          }}
        </Query>
      )}else{
        btn = (
          <Query query={queries.GET_BIN_PICS}>
            {({data})=>{
              if(!data) return null;
              let {likedImages} = data;
              return (
                <Mutation
                  mutation={queries.SAVE_PIC_BIN}
                  update={
                  (cache) => {
                    let res = cache.readQuery({query:queries.GET_BIN_PICS});
                    let {likedImages} = res;
                    if(res)
                      cache.writeQuery({query:queries.GET_BIN_PICS,data:{likedImages:likedImages.concat([this.props.image])}});
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
                            binned:false,
                          }});
                        alert("Removed");
                        this.setState({addToBin:true});
                      }}>
                        <button className="btn btn-primary" type="submit">{info}</button>
                      </form>
                    )
                  }
                </Mutation>
              )
            }}
          </Query>
        )
      }

    return(
      <div>
        <Card style={{ width: '18rem' }}>
          <Card.Img variant="top" src={image.url} />
          <Card.Body>
            <Card.Title>Author: {image.poster_name}</Card.Title>
            <Card.Text>
              {image.description}
            </Card.Text>
            {btn}
          </Card.Body>
        </Card>
      </div>
    );
  }
}
export default Image;
