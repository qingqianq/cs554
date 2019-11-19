import React from "react";
import {Query} from 'react-apollo';
import queries from './queries.js';
import { Button } from 'react-bootstrap';
import {Card} from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';

class Bin extends React.Component{
    constructor(props){
        super(props);
        this.state = {
        };
    }
    addToBin = async (image) => {
        console.log(image);
    };
    componentDidMount(){

    }
    componentDidUpdate(PrevProps){

    }
    render(){
        return(
            <div>
              <Query query={queries.GET_BIN_PICS}>
                {({data})=>{
                    if(!data) return null;
                    const {likedImages} = data;
                    return(
                        <div>
                          {
                              likedImages.map(image => {
                                  return(
                                      <li key={image.id}>
                                        <Card style={{ width: '18rem' }}>
                                          <Card.Img variant="top" src={image.url} />
                                          <Card.Body>
                                            <Card.Title>Author: {image.poster_name}</Card.Title>
                                            <Card.Text>
                                              {image.description}
                                            </Card.Text>
                                            <Button variant="primary" onClick={()=>{this.addToBin(image);}}>Remove from Bin</Button>
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
export default Bin;
