import React from "react";
import {Mutation} from 'react-apollo';
import {Query} from 'react-apollo';
import queries from './queries.js';
import {Card} from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
class PostImage extends React.Component{
  constructor(props){
    super(props);
    this.state = {
      addToBin:true
    };
  }
  render(){
    let image = this.props.image;
    let btn;
    if(this.state.addToBin){
      btn=(
        <Mutation mutation={queries.DEL_POST}
          update={
          (cache)=>{
            let res = cache.readQuery({query:queries.GET_POST_PICS});
            let {userPostedImages} = res;
            if(res)
              cache.writeQuery({query:queries.GET_POST_PICS,data:{userPostedImages:userPostedImages.filter(e=>e.id!==image.id)}});
          }}
        >
          {
            (deleteImage,{data})=>(
              <form onSubmit={e => {
                e.preventDefault();
                deleteImage({variables:{id:image.id}});
                alert("Removed");
              }}>
                <button className="btn btn-primary" type="submit" >Remove from Post</button>
              </form>
            )
          }
        </Mutation>
      )
    }else{

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
export default PostImage;
