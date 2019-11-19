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
(async()=>{
    // await client.hsetAsync("user","a",falslle);
    // await client.hsetAsync("user","b","b hello");
    await client.lpushAsync("test", "a");
    await client.lpushAsync("test", "b");
    await client.lpushAsync("test", "c");
    await client.lpushAsync("test", "a");
    console.log(await client.lrangeAsync("test",0,-1));
    await client.lremAsync("test",1,"a");
    console.log(await client.lrangeAsync("test",0,-1));
    // console.log(await client.hgetallAsync("user"));
    // await client.delAsync("user");
    // console.log(await client.hgetallAsync("user"));
})();


/*
  add to bin
  remove from bin
 */
