import React from "react";
import {Query} from 'react-apollo';
import queries from './queries.js';
import { Button } from 'react-bootstrap';
import {Card} from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import {createApolloFetch} from 'apollo-fetch';
const BASE_URL = "http://localhost:4000";
const fetch = createApolloFetch({uri:BASE_URL});

const q =  `mutation SaveImage($id:String!, $url:String!, $poster_name:String!, $description: String, $user_posted:Boolean!, $binned: Boolean!){
    saveImage(id:$id, url:url, poster_name:$poster_name, description:$description, user_posted:$user_posted,binned:$binned){
        id url poster_name description user_posted binned
    }}`;
class ImageList extends React.Component{
    constructor(props){
        super(props);
        this.state = {

        };
    }
    saveImage = async(image) =>{
        console.log(image);
        try{
            let res = await fetch({
                query: q,
                // variables:image
                variables:{
                    id:image.id,
                    url:image.url,
                    poster_name:image.poster_name,
                    description:image.description,
                    user_posted:false,
                    bind:false,
                }
            });
            if(!res)
                alert(`Image posted by ${image.poster_name} has been saved`);
        }catch(err){
            console.log(err);
        }
    }
    componentDidMount(){

    }
    componentDidUpdate(PrevProps){

    }
    render(){
        return(
            <div>
              <Query query={queries.GET_RAND_PICS}>
                {({data})=>{

                    if(!data) return null;
                    const {unsplashImages} = data;
                    return(
                        <div>
                          {
                              unsplashImages.map(image => {
                                  return(
                                      <li key={image.id}>
                                        <Card style={{ width: '18rem' }}>
                                          <Card.Img variant="top" src={image.url} />
                                          <Card.Body>
                                            <Card.Title>Author: {image.poster_name}</Card.Title>
                                            <Card.Text>
                                              {image.description}
                                            </Card.Text>
                                            <Button variant="primary" onClick={()=>{this.saveImage(image);}}>Save this image</Button>
                                          </Card.Body>
                                        </Card>
                                      </li>
                                  );
                              })
                          }
                        </div>
                    );
                }}
            </Query>
                </div>
        );
    }
}
export default ImageList;
