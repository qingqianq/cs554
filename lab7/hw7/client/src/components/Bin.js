import React from "react";
import {Query} from 'react-apollo';
import queries from './queries.js';
import 'bootstrap/dist/css/bootstrap.min.css';
import BinImage from './BinImage';

class Bin extends React.Component{
  constructor(props){
    super(props);
  }

  render(){
    let binImage = (
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
                      <BinImage image={image} />
                    </li>
                  );
                })
              }
            </div>
          );
        }}
      </Query>
    )
    return(
      <div>
        {binImage}
      </div>
    );
  }
}
export default Bin;
