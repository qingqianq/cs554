import React from "react";
import {Mutation} from 'react-apollo';
import queries from './queries.js';
import {Card} from 'react-bootstrap';
class BinImage extends React.Component{
  constructor(props){
    super(props);
  }
  render(){
    let image = this.props.image;
    let btn = (
      <Mutation mutation={queries.SAVE_PIC_BIN}
        update = {
        (cache) => {
          let res = cache.readQuery({query:queries.GET_BIN_PICS});
          let {likedImages} = res;
          if(res)
            cache.writeQuery({query:queries.GET_BIN_PICS,data:{likedImages:likedImages.filter(e=>e.id!==image.id )}});
        }}
      >
        {
          (updateImage,{data}) =>(
            <form onSubmit={e => {
              e.preventDefault();
              updateImage({
                variables:{
                  id:image.id,
                  url:image.url,
                  author:image.poster_name,
                  description:image.description,
                  user_posted:false,
                  binned:false,
                }});
              alert("Removed");
            }}>
              <button className="btn btn-primary" type="submit" >Remove from Bin</button>
            </form>
          )
        }
      </Mutation>
    );
    return(
      <div>
        <Card style={{ width: '18rem' }}>
          <Card.Img variant="top" src={image.url} />
          <Card.Body>
            <Card.Title>Author: {image.poster_name}</Card.Title>
            <Card.Text>
              {image.description}
            </Card.Text>
            {btn}
          </Card.Body>
        </Card>
      </div>
    );
  }
}
export default BinImage;
