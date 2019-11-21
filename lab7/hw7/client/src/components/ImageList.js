import React from "react";
import {Query} from 'react-apollo';
import queries from './queries.js';
import 'bootstrap/dist/css/bootstrap.min.css';
import Image from './Image.js';
import 'bootstrap/dist/css/bootstrap.min.css';
class ImageList extends React.Component{
  render(){
    //TODO Wrapped
    let img = (<Query query={queries.GET_RAND_PICS}>
      {({data})=>{
        if(!data) return null;
        const {unsplashImages} = data;
        return(
          <div>
            {
              unsplashImages.map(image => {
                return(
                  <li key = {image.id}>
                    <Image image={image}/>
                  </li>
                )
              })
            }
          </div>
        );
      }}
    </Query>)
    return(
      <div>
        <a className="btn btn-primary" href="/">Get More</a>
        {img}

        {/* <TestComp/> */}
      </div>
    );
  }
}
export default ImageList;
