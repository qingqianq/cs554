const redis = require("redis");
const bluebird = require("bluebird");
bluebird.promisifyAll(redis.RedisClient.prototype);
bluebird.promisifyAll(redis.Multi.prototype);
const client = redis.createClient();
client.on("error", function (err) {
    console.log("Error " + err);
});
(async()=>{
    let keys = await client.keysAsync("*");
    console.log(keys);
})();

// const Unsplash = require('unsplash-js').default;
// const toJson = require("unsplash-js").toJson;
// const APP_ACCESS_KEY = '20ecdb8d27e65ab5bbca2778c7e2fde393135293b22ad2978b97f021a2104bb7';
// const unsplash = new Unsplash({accessKey:`${APP_ACCESS_KEY}`});
// const fetch = require('node-fetch');
// const redis = require("redis");
// const bluebird = require("bluebird");
// bluebird.promisifyAll(redis.RedisClient.prototype);
// bluebird.promisifyAll(redis.Multi.prototype);
// const client = redis.createClient();
// client.on("error", function (err) {
//     console.log("Error " + err);
// });
// const uuid = require("uuid/v4");
// global.fetch = fetch;
// async function getUnsplashPics(num){
// let res = await unsplash.photos.getRandomPhoto({count:num});
// let data = await toJson(res);
// let images = [];
// for(let image of data){
//     // console.log(image);
//     let img = {
//         id: image.id,
    //         url: image.urls.small, // raw | full | regular | small
    //         poster_name: image.user.name,
    //         description: image.description,
    //         user_posted: false,
    //         binned: false,
    //     };
    //     images.push(img);
    // }
    // return images;
    // e6i5JIHJDMU
//     let res = await unsplash.photos.getPhoto("e6i5JIfHJDMU");
//     let {likes} = await toJson(res);
//     console.log(typeof likes);
// }
// (async()=>{
//     getUnsplashPics(1);
// })();
// console.log(0 == undefined);
