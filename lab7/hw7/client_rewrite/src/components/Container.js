import React from 'react';
import {Route, Switch} from 'react-router-dom';
import ImageList from './ImageList';
import PostList from './PostList.js';
import UploadPost from './UploadPost';
import Bin from './Bin';
import Popularity from './Popularity';
function Container() {
    let Nowhere = ()=>{
        return(<div>404 Nowhere</div>);
    };
    return(
        <div>
          <Switch>
            <Route path="/" exact component={ImageList} />
            <Route path="/my-bin" exact component={Bin} />
            <Route path='/my-posts' exact component={PostList} />
            <Route path='/new-post' exact component={UploadPost}/>
            <Route path="/popularity" exact component={Popularity} />
            <Route path="*" component={Nowhere} />

          </Switch>

        </div>
    );
}

export default Container;
