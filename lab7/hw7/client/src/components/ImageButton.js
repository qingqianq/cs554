import React from "react";
import {Mutation} from 'react-apollo';
import {Query} from 'react-apollo';
import queries from './queries.js';
import {Card} from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
class ImageButton extends React.Component{
  constructor(props){
    super(props);
    this.state = {addToBin:true};
  }
  render(){
    let info = this.state.addToBin ? "Add to Bin" : "Remove from Bin";
    let image = this.props.image;
    let btn = null;
    if(this.state.addToBin === true){
      btn=(
        <Query query={queries.GET_BIN_PICS}>
          {({data})=>{
            if(!data) return null;
            let {likedImages} = data;
            for(let img of likedImages){
              if(img.id === image.id)
                //handle go other component with already add it to Bin

                return (
                  <Mutation
                    mutation={queries.SAVE_PIC_BIN}
                    update={
                    (cache) => {
                      let res = cache.readQuery({query:queries.GET_BIN_PICS});
                      let {likedImages} = res;
                      if(res)
                        cache.writeQuery({query:queries.GET_BIN_PICS,data:{likedImages:likedImages.filter(e=>e.id!==image.id )}});
                    }}
                  >
                    {
                      (updateImage, {data}) =>
                        (
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
                            this.setState({addToBin:true});
                          }}>
                            <button className="btn btn-primary" type="submit" >Remove from Bin</button>
                          </form>
                        )
                    }
                  </Mutation>
                )
              // end handle component change
            }
            return (
              <Mutation
                mutation={queries.SAVE_PIC_BIN}
                update={
                (cache) => {
                  let res = cache.readQuery({query:queries.GET_BIN_PICS});
                  let {likedImages} = res;
                  if(res)
                    cache.writeQuery({query:queries.GET_BIN_PICS,data:{likedImages:likedImages.concat([image])}});
                }}
              >
                {
                  (updateImage, {data}) =>(
                    <form onSubmit={e => {
                      e.preventDefault();
                      updateImage({
                        variables:{
                          id:image.id,
                          url:image.url,
                          author:image.poster_name,
                          description:image.description,
                          user_posted:false,
                          binned:true,
                        }});
                      alert("Added");
                      this.setState({addToBin:false})
                    }}>
                      <button className="btn btn-primary" type="submit">{info}</button>
                    </form>
                  )
                }
              </Mutation>
            )
          }}
        </Query>
      )}else if(this.state.addToBin === false){
        btn = (
          <Query query={queries.GET_BIN_PICS}>
            {({data})=>{
              if(!data) return null;
              return (
                <Mutation
                  mutation={queries.SAVE_PIC_BIN}
                  update={
                  (cache) => {
                    let res = cache.readQuery({query:queries.GET_BIN_PICS});
                    let {likedImages} = res;
                    if(res)
                      cache.writeQuery({query:queries.GET_BIN_PICS,data:{likedImages:likedImages.filter(e=>e.id!==image.id )}});
                  }}
                >
                  {
                    (updateImage, {data}) =>
                      (
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
                          this.setState({addToBin:true});
                        }}>
                          <button className="btn btn-primary" type="submit" >{info}</button>
                        </form>
                      )
                  }
                </Mutation>
              )
            }}
          </Query>
        )
      }
    return(
      <div>
        {btn}
      </div>
    );
  }
}
export default ImageButton;
