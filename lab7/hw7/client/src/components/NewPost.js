import React from "react";
import {Mutation} from 'react-apollo';
import queries from './queries.js';
import {Query} from 'react-apollo';
import { useQuery, useMutation } from '@apollo/react-hooks';

class NewPost extends React.Component{
  constructor(props){
    super(props);
  }

  render(){
    let body = null;
    let url;
    let author;
    let description;
    const [uploadImage] = useMutation
    (queries.SAVE_POST,
      {
        update(cache,{data:{uploadImage}}){
          const {userPostedImages} = cache.readQuery({query:queries.GET_POST_PICS});
          cache.writeQuery({query:queries.GET_POST_PICS, data:{userPostedImages:userPostedImages.concat([uploadImage])}});
        }
      }
    );
    return(
      <div>
        <form
          onSubmit={e => {
            e.preventDefault();
            uploadImage({ variables: { url: url.value, author: author.value, description: description.value } });
            url.value = "";
            author.value="";
            description.value="";
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
          <button type="submit">Add Todo</button>
        </form>
      </div>
    );
  }
}
export default NewPost;
