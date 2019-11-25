import React from 'react';
import queries from './queries.js';
import { useQuery } from '@apollo/react-hooks';
import {Card} from 'react-bootstrap';
function Popularity() {
    const {loading,error,data} = useQuery(queries.GET_POP_PICS);
    if(loading) return `loading`;
    if(!data) return null;
    let {getTopTenBinnedPosts} = data;
    let likesScore = 0;
    let status;
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

export default Popularity;
