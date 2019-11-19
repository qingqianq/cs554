import React from 'react';
import {Route, Switch} from 'react-router-dom';
import ImageList from './ImageList';
import Bin from './Bin';
import NewPost from './NewPost';
import Post from './Post';
function routeContainer(){
    let Nowhere = ()=>{
        return(<div>404 Nowhere</div>);
    };
    return(
        <div>
          <Switch>
            <Route path="/" exact component={ImageList} />
            <Route path="/my-bin" exact component={Bin} />
            <Route path="/new-post" component={NewPost} />
            <Route path="/my-posts" component={Post} />
            <Route path="*" component={Nowhere} />
          </Switch>
        </div>
    );
}
export default routeContainer;
