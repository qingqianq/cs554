import React from "react";
import {Mutation} from 'react-apollo';
import queries from './queries.js';
import {Query} from 'react-apollo';
class AddPost extends React.Component{
  constructor(props){
    super(props);
    this.state = {
    };
  }
  render(){
    let url;
    let author;
    let description;
    return(
      <div>
        <Query query={queries.GET_POST_PICS}>
          {({data})=>{
            return(
              <Mutation mutation={queries.SAVE_POST}
                update={
                (cache,{data:{uploadImage}})=>{
                  let res = cache.readQuery({query:queries.GET_POST_PICS});
                  let {userPostedImages} = res;
                  if(res)
                    cache.writeQuery({query:queries.GET_POST_PICS,data:{userPostedImages:userPostedImages.concat(uploadImage)}});
                }
                }
              >
                {
                  (uploadImage,{data}) =>(
                    <form
                      onSubmit={e => {
                        e.preventDefault();
                        uploadImage({ variables: { url: url.value, author: author.value, description: description.value } });
                        url.value = "";
                        author.value="";
                        description.value="";
                        alert("Uploaded");
                      }}
                    >
                      <div className="form-group">
                        <label>
                          Url :
                          <br />
                          <input
                            ref={node => {
                              url = node;
                            }}
                            required
                            autoFocus={true}
                          />
                        </label>
                      </div>
                      <br />
                      <div className="form-group">
                        <label>
                          Description :
                          <br />
                          <input
                            ref={node => {
                              description = node;
                            }}
                            required
                          />
                        </label>
                      </div>
                      <br />
                      <div className="form-group">
                        <label>
                          Author :
                          <br />
                          <input
                            ref={node => {
                              author = node;
                            }}
                            required
                          />
                        </label>
                      </div>
                      <button className="btn btn-primary" type="submit">Upload</button>
                    </form>
                  )
                }
              </Mutation>
            )
          }
          }
        </Query>
      </div>
    );
  }
}
export default AddPost;
