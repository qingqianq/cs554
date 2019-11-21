import React from "react";
import {Query} from 'react-apollo';
import queries from './queries.js';
import PostImage from './PostImage';
import 'bootstrap/dist/css/bootstrap.min.css';

class Post extends React.Component{
  constructor(props){
    super(props);
    this.state = {

    };
  }
  render(){
    let img = (
      <Query query={queries.GET_POST_PICS}>
        {
          ({data})=>{
            if(!data) return null;
            const{userPostedImages} = data;
            return(<div>
              {
                userPostedImages.map(image =>
                  (<li key={image.id}>
                    <PostImage image={image} />
                  </li>
                  )
                )
              }
            </div>);
          }
        }
      </Query>
    );
    return(
      <div>
        <a href="/new-post">Upload a Post</a>
        {img}
      </div>
    );
  }
}
export default Post;
