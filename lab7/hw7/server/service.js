const Unsplash = require('unsplash-js').default;
const toJson = require("unsplash-js").toJson;
const APP_ACCESS_KEY = '20ecdb8d27e65ab5bbca2778c7e2fde393135293b22ad2978b97f021a2104bb7';
const unsplash = new Unsplash({accessKey:`${APP_ACCESS_KEY}`});
const fetch = require('node-fetch');
global.fetch = fetch;
let img = {
    "id": "vBxbZokRL10",
    "url": "https://images.unsplash.com/photo-1573019606806-9695d0a9739d?ixlib=rb-1.2.1&q=80&fm=jpg&crop=entropy&cs=tinysrgb&w=400&fit=max&ixid=eyJhcHBfaWQiOjEwMTE1N30",
    "poster_name": "Daniel Herron",
    "description": "Nope Hand Lettering On Wood and Glass",
    "user_posted": false,
    "binned": false
};
async function getUnsplashPics(num){
    let res = await unsplash.photos.getRandomPhoto({count:num});
    let data = await toJson(res);
    let images = [];
    for(let image of data){
        console.log(image);
        let img = {
            id: image.id,
            url: image.urls.small, // raw | full | regular | small
            poster_name: image.user.name,
            description: image.description,
            user_posted: false,
            binned: false,
        };
        images.push(img);
    }
    return images;
}
async function saveImage(args){
    // console.log(args);
    // console.log("abc");
    return img;
}
module.exports = {
    getUnsplashPics,
    saveImage,
};
