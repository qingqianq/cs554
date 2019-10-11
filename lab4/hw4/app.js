const express = require("express");
const app = express();
const redis = require("redis");
const bluebird = require("bluebird");
const flatten = require("flat");
const axios = require("axios");
const unflatten = flatten.unflatten;
bluebird.promisifyAll(redis.RedisClient.prototype);
bluebird.promisifyAll(redis.Multi.prototype);
const client = redis.createClient();
client.on("error", function (err) {
    console.log("Error " + err);
});
const DATA_URL = "https://gist.githubusercontent.com/philbarresi/5cf15393d245b38a2d86ce8207d5076c/raw/d529fb474c1af347702ca4d7b992256237fa2819/lab5.json";
const mySleep = async (ms) =>{
    return new Promise(resolve => setTimeout(resolve,ms));
};
/*
  Data:
  1. use hashSet $id key to check whether the people is in cache.
  2. use List "HISTROY"  to store the nearest 20 people visit
*/
const getById = async (id) => {
    if(isNaN(parseInt(id)))
        throw `Invalid id: ${id}`;
    id = id.toString();
    let flatPeople;
    // hmget arg must be an array.
    flatPeople = await client.hgetallAsync(id);
    if(flatPeople){
        console.log("exits");
        let people = unflatten(flatPeople);
        await client.lpushAsync("HISTORY", JSON.stringify(flatPeople));
        return people;
    }else{
        console.log("no cache");
        let {data} = await axios.get(DATA_URL);
        let people = data.find((people)=>{
            return people.id === parseInt(id);
        });
        if(!people)
            return null;
        let flatPeople = flatten(people);
        await client.hmsetAsync(id,flatPeople);
        await client.lpushAsync("HISTORY", JSON.stringify(flatPeople));
        return people;
    }
};
const getHistroy = async() =>{
    const BEGIN = 0, END = 19;
    let stringHistory = await client.lrangeAsync("HISTORY", BEGIN, END);
    let history = stringHistory.map(elment => JSON.parse(elment));
    console.log(history);
    return history;
};
/*
  Router
*/
app.get("/api/people/history",async(req,res) => {
    try {
        let history = await getHistroy();
        if(history.length === 0)
            res.send("no histroy");
        else
            res.json(history);
    } catch (err) {
        res.status(500).json({err:"History err"});
    } finally {

    }

});
app.get("/api/people/:id",async(req,res) => {
    await mySleep(5000);
    try{
        let result = await getById(req.params.id);
        if(result)
            res.json(result);
        else
            res.status(404).json({err:"not found"});
    }catch(err){
        res.status(400).json({err:err});
    }
});

app.use("*",(req,res) => {
    res.status(404).json({err:"not implement"});
});
app.listen(3000,()=>{
    console.log("routes running on http://localhost:3000");
});
