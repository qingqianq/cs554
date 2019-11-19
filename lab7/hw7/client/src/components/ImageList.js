import React from "react";
import {Query} from 'react-apollo';
import {Mutation} from 'react-apollo';
import queries from './queries.js';
//import { Button } from 'react-bootstrap';
import {Card} from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
//import {createApolloFetch} from 'apollo-fetch';
//const BASE_URL = "http://localhost:4000";
//const fetch = createApolloFetch({uri:BASE_URL});

// function MyButton(props){
//   let image = props.image;
//   return <Query query={queries.GET_BIN_PICS}>
//     {({data})=>{
//       if(!data) return null;
//       const {likedImages} = data;
//       return(
//         <Button variant="primary">add to Bin</Button>
//       );
//     }}
//   </Query>
// }
class ImageList extends React.Component{
  constructor(props){
    super(props);
    this.state = {

    };
  }
  addToBin = async(image) =>{
    //TODO update the apollo cache

  }
  removeFromBin = async(image)=>{

  }
  componentDidMount(){

  }
  componentDidUpdate(PrevProps){

  }

  render(){
    //TODO button change
    //console.log("render");
    let a = (<Query query={queries.GET_RAND_PICS}>
      {({data})=>{
        if(!data) return null;
        const {unsplashImages} = data;

        return(
          <div>
            <ul>
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
                          {/*<Button variant="primary" onClick={()=">{this.addToBin}" }>add to Bin</Button>*/}
                          <Mutation mutation={queries.SAVE_PIC_BIN}
                            variables={{
                              id:image.id,
                              url:image.url,
                              author:image.poster_name,
                              description:image.description,
                              user_posted:false,
                              binned:true,
                            }}
                            /*
                            update={
                            (cache,{data: {likedImages}}) => {
                              console.log(cache.readQuery({query:queries.GET_BIN_PICS}));
                              cache.writeQuery({query:queries.GET_BIN_PICS,data:{updateImage:updateImage.concat([updateImage])}});
                            }}
                            */
                          >
                            {updateImage =>{return <button className="btn btn-primary" onClick={updateImage}>Add to Bin</button>}}
                            {/*
                                {(updateImage,{data}) =>{
                                console.log(data);
                                return <button onClick={updateImage}>Add to Bin</button>
                                }}
                              */}
                          </Mutation>
                        </Card.Body>
                      </Card>
                    </li>
                  );
                })
              }
            </ul>
          </div>
        );
      }}
    </Query>)
    return(
      <div>
        <a className="btn btn-primary" href="/">Get More</a>
        {a}
      </div>
    );
  }
}
export default ImageList;
