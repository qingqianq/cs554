import React from 'react';
import { useMutation } from '@apollo/react-hooks';
import queries from './queries.js';
function UploadPost() {
    let url, author, description;
    const[uploadImage] = useMutation(queries.SAVE_POST,{
        refetchQueries: [{query:queries.GET_POST_PICS}],
    });
    return(
        <div>
          <form
            onSubmit={e => {
                e.preventDefault();
                uploadImage({ variables: { url: url.value, author: author.value, description: description.value } });
                alert("Uploaded");
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
            <button className="btn btn-primary" type="submit">Upload</button>
          </form>
        </div>
    );
}

export default UploadPost;
