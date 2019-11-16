const { createApolloFetch } = require('apollo-fetch');
// import queries from './queries.js';
// const queries = require('./queries.js');
let img = {
    "id": "vBxbZokRL10",
    "url": "https://images.unsplash.com/photo-1573019606806-9695d0a9739d?ixlib=rb-1.2.1&q=80&fm=jpg&crop=entropy&cs=tinysrgb&w=400&fit=max&ixid=eyJhcHBfaWQiOjEwMTE1N30",
    "poster_name": "Daniel Herron",
    "description": "Nope Hand Lettering On Wood and Glass",
    "user_posted": false,
    "binned": false
};
const BASE_URL = "http://localhost:4000";
    const q =  `mutation SaveImage($id:String!, $url:String!, $poster_name:String!, $description: String, $user_posted:Boolean!, $binned: Boolean!){
    saveImage(id:$id, url:url, poster_name:$poster_name, description:$description, user_posted:$user_posted,binned:$binned){
        id url poster_name description user_posted binned
    }}`;
let fetch = createApolloFetch({
    uri:BASE_URL
});
const saveToBin = async(image) =>{
    let res = await fetch({
        query: q,
        variables:image
    });
    console.log(res.data);
};
saveToBin(img);
