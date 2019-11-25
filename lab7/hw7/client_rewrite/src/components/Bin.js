import React from 'react';
import queries from './queries.js';
import { useQuery,useMutation } from '@apollo/react-hooks';
import {Card} from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';

function Bin() {
    const[removeImage] = useMutation(queries.SAVE_PIC_BIN,{
        refetchQueries: [{query:queries.GET_BIN_PICS}],
    });
    const {data} = useQuery(queries.GET_BIN_PICS);
    if(!data) return null;
    let {likedImages:image} = data;
    let body=(image.map(image=>(
        <li key={image.id}>
            <Card style={{ width: '10rem' }}>
            <Card.Img variant="top" src={image.url} />
            <Card.Body>
            <Card.Title>Author: {image.poster_name}</Card.Title>
            <Card.Text>
            {image.description}
        </Card.Text>
            <form
        onSubmit={e => {
            e.preventDefault();
            removeImage({
                variables:{id:image.id,user_posted:image.user_posted,description:image.description,binned:false,url:image.url,author:image.poster_name},
            });
            alert("removed");
        }}
            >
            <button className="btn btn-primary" type="submit" >Remove from Bin</button>
            </form>
            </Card.Body>
            </Card>
            </li>
    )));
    return(
        <div>
          {body}
        </div>
    );
}
export default Bin;
