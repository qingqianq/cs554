import React from 'react';
import { useQuery, useMutation } from '@apollo/react-hooks';
import queries from './queries.js';
import Image from "./Image";
import {Card} from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import {Link} from 'react-router-dom';
function PostList() {
    const[removeImage] = useMutation(queries.DEL_POST,{
        refetchQueries: [{query:queries.GET_POST_PICS}],
    });
    const {data} = useQuery(queries.GET_POST_PICS);
    if(!data) return null;
    let{userPostedImages:images} = data;
    let body = (images.map(image=>{
        return (
            <li key={image.id}>
              <Card style={{ width: '10rem' }}>
                <Card.Img variant="top" src={image.url} />
                <Card.Body>
                  <Card.Title>Author: {image.poster_name}</Card.Title>
                  <Card.Text>
                    {image.description}
                  </Card.Text>
                  <Image image={image} user_posted = {true} />
                  <form
                    onSubmit={e => {
                        e.preventDefault();
                        removeImage({
                            variables:{id:image.id}
                        });
                        alert("removed");
                    }}
                    >
                    <button className="btn btn-primary" type="submit" >Remove Post</button>
                  </form>
                </Card.Body>
              </Card>
            </li>
        )}));
    return(
        <div>
          <Link to='/new-post'>Upload Image</Link>
          {body}
        </div>
    );
}

export default PostList;
