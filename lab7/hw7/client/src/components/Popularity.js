import React from "react";
import {Query} from 'react-apollo';
import queries from './queries.js';
import 'bootstrap/dist/css/bootstrap.min.css';
import {Card} from 'react-bootstrap';
class Popularity extends React.Component{
  render(){
    let body = (
      <Query query={queries.GET_POP_PICS}>
        {
          ({loading,error,data})=>{
            let likesScore = 0;
            let status;
            if(loading) return 'Loading...';
            if(!data) return null;
            const{getTopTenBinnedPosts} = data;
            for(let img of getTopTenBinnedPosts)
              likesScore += img.likes;
            if(likesScore !== 0)
              status = (likesScore>=200)?"Mainstream":" Non-mainstream";
            return(
              <div>
                <h1>{status}</h1>
                {getTopTenBinnedPosts.map(image=>(
                  <li key={image.id}>
                    <Card style={{ width: '18rem' }}>
                      <Card.Img variant="top" src={image.url} />
                      <Card.Body>
                        <Card.Title>Author: {image.poster_name}</Card.Title>
                        <Card.Text>
                          {image.description}
                          <br/>
                          Likes: {image.likes}
                        </Card.Text>
                      </Card.Body>
                    </Card>

                  </li>
                ))}
              </div>
            );
          }
        }
      </Query>
    );
    return(
      <div>
        {body}
      </div>
    );
  }
}
export default Popularity;
