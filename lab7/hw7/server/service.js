const Unsplash = require('unsplash-js').default;
const toJson = require("unsplash-js").toJson;
const APP_ACCESS_KEY = '20ecdb8d27e65ab5bbca2778c7e2fde393135293b22ad2978b97f021a2104bb7';
const unsplash = new Unsplash({accessKey:`${APP_ACCESS_KEY}`});
const fetch = require('node-fetch');
const redis = require("redis");
const bluebird = require("bluebird");
// Data is flatten this lab.
// const flatten = require("flat");
// const unflatten = flatten.unflatten;
bluebird.promisifyAll(redis.RedisClient.prototype);
bluebird.promisifyAll(redis.Multi.prototype);
const client = redis.createClient();
client.on("error", function (err) {
    console.log("Error " + err);
});
const uuid = require("uuid/v4");
global.fetch = fetch;
async function getUnsplashPics(num){
    let res = await unsplash.photos.getRandomPhoto({count:num});
    let data = await toJson(res);
    let images = [];
    for(let image of data){
        // console.log(image);
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

/*
  Remove from Bin: if it is posted by user, only change the binned to false,
  if it is removed from the unsplash, remove the img object from the set.
  As per Redis 4.0.0, HMSET is considered deprecated, use hset for multi times.
*/
async function updateImage(id, url, poster_name, description, user_posted, binned){
    if(!id) throw `Lack id`;
    if(user_posted == undefined) user_posted = true;
    if(binned == undefined) binned = false;
    if(typeof user_posted == `string`) user_posted = (user_posted == 'true');
    if(typeof binned == `string`) binned = (binned == 'true');
    let img = {
        id: id,
        url: url,
        poster_name: poster_name,
        description: description,
        user_posted: user_posted,
        binned: binned
    };
    let exists = await client.existsAsync(id);
    // console.log(exists);
    if(binned){
        console.log("Binned");
        if(exists)
            return img;
        try{
            for(let key in img)
                await client.hsetAsync(img.id,key,img[key]);
            await client.lpushAsync("images",img.id);
        }catch(err){
            console.log(err);
            throw 'Save image err';
        }
    }else{
        try{
            console.log("Not binned");
            if(user_posted) // here only handle remove from bin, not the upload
                await client.hsetAsync(img.id,"binned",false);
            else{
                await client.delAsync(img.id);
                await client.lremAsync("images",1,img.id);
            }
        }catch(err){
            console.log(err);
            throw "Remove from Bin err";
        }
    }
    // console.log(img);
    return img;
}
async function likedImages(){
    let imageList = [];
    let idList = await client.lrangeAsync("images",0,-1);
    try{
        for(let id of idList){
            let img = await client.hgetallAsync(id);
            if(img.binned) img.binned = (img.binned == "true");
            if(img.user_posted) img.user_posted = (img.user_posted == "true");
            if(img.binned){
                if(img.description == 'null')
                    img.description = undefined;
                imageList.push(img);
            }
        }
    }catch(err){
        console.log(err);
        throw "Get Bin error";
    }
    return imageList;
}
async function userPostedImages(){
    let imageList = [];
    let idList = await client.lrangeAsync("images",0,-1);
    try{
        for(let id of idList){
            let img = await client.hgetallAsync(id);
            if(img.binned) img.binned = (img.binned == "true");
            if(img.user_posted) img.user_posted = (img.user_posted == "true");
            if(img.user_posted){
                for(let key in img){
                    if(img[key] == 'null')
                        img[key] = undefined;
                }
                imageList.push(img);
            }
        }
    }catch(err){
        console.log(err);
        throw "Get Bin error";
    }
    return imageList;
}
async function deleteImage(id){
    if(!id) throw "Lack id";
    let img = await client.hgetallAsync(id);
    if(img.binned) img.binned = (img.binned == "true");
    if(img.user_posted) img.user_posted = (img.user_posted == "true");
    try{
        if(img.binned)
            await client.hsetAsync(img.id,"user_posted",false);
        else{
            await client.delAsync(img.id);
            await client.lremAsync("images",1,img.id);
        }
    }catch(err){
        console.log(err);
        throw "Delete user_post image error";
    }
    return img;
}
async function uploadImage(url, description, poster_name){
    if(!url) throw "lack url";
    let img = {
        id: uuid(),
        url:url,
        poster_name: poster_name,
        description: description,
        user_posted:true,
        binned: false,
    };
    try{
        for(let key in img)
            await client.hsetAsync(img.id,key,img[key]);
        await client.lpushAsync("images",img.id);
    }
    catch(err){
        console.log(err);
        throw "Upload image error";
    }
    return img;
}
module.exports = {
    getUnsplashPics,
    updateImage,
    likedImages,
    userPostedImages,
    uploadImage
};
