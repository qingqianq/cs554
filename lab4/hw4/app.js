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
  2. use List "HISTORY"  to store the histroy people visit

  Because the type of id is String, and the hmget will auto change data type to string, use set and get with string.
*/
const getById = async (id) => {
    if(isNaN(Number(id)))
        throw `Invalid id: ${id}`;
    await mySleep(5000);
    id = parseInt(id).toString();
    let strFlatPeople;
    // hmget arg must be an array.
    // flatPeople = await client.hgetallAsync(id);
    strFlatPeople = await client.getAsync(id);
    if(strFlatPeople){
        let people = unflatten(JSON.parse(strFlatPeople));
        await client.lpushAsync("HISTORY", id);
        return people;
    }else{
        let {data} = await axios.get(DATA_URL);
        let people = data.find((people)=>{
            return people.id === parseInt(id);
        });
        if(!people)
            return null;
        let flatPeople = flatten(people);
        let strFlatPeople = JSON.stringify(flatPeople);
        await client.setAsync(id,strFlatPeople);
        await client.lpushAsync("HISTORY", id);
        return people;
    }
};
const getHistroy = async() =>{
    const BEGIN = 0, END = 19;
    let history = await client.lrangeAsync("HISTORY", BEGIN, END);
    let list = [];
    for(let id of history)
        list.push(unflatten(JSON.parse(await client.getAsync(id))));
    return list;
};
/*
  Router
*/
app.get("/api/people/history",async(req,res) => {
    try {
        let history = await getHistroy();
        if(history.length === 0)
            res.send("no history");
        else
            res.json(history);
    } catch (err) {
        res.status(500).json({err:"History server err"});
    } finally {

    }
});
app.get("/api/people/:id",async(req,res) => {
    try{
        let result = await getById(req.params.id);
        if(result)
            res.json(result);
        else
            res.status(404).json({err:`not found ${req.params.id}`});
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
