import React from 'react';
import { useQuery } from '@apollo/react-hooks';
import queries from './queries.js';
import Image from "./Image";
import {Card} from 'react-bootstrap';
function ImageList() {
    const {data,refetch} = useQuery(queries.GET_RAND_PICS);
    if(!data) return null;
    let {unsplashImages:images} = data;
    let list=(images.map(image=>(
        <li key={image.id}>
          <Card style={{ width: '10rem' }}>
            <Card.Img variant="top" src={image.url} />
            <Card.Body>
              <Card.Title>Author: {image.poster_name}</Card.Title>
              <Card.Text>
                {image.description}
              </Card.Text>
              <Image image={image} user_posted = {false} />
            </Card.Body>
          </Card>
        </li>
    )));
    return(
        <div>
          <button className="btn btn-primary"onClick={()=>refetch()}>Get More</button>
          {list}
        </div>
    );
}
export default ImageList;
