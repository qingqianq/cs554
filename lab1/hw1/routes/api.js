const express = require("express");
const data = require("../data");
const tasksData = data.tasksData;
const commentsData = data.commentsData;
const router = express.Router();
router.get("/tasks", async(req,res)=>{
    console.log("id");
    try {
        let tasks = await tasksData.getTasks(req.query.skip,req.query.take);
        res.json(tasks);
    } catch (err) {
        console.log(err);
        res.status(500).json({error: "server database error"});
    }
});
router.get("/tasks/:id", async(req,res) =>{
    try {

        let task = await tasksData.getById(req.params.id);
        res.json(task);
    } catch (err) {
        res.status(404).json({err:err});
    } finally {

    }
});
router.post("/tasks",async(req,res)=>{
    // console.log(req.body);
    try {
        let task = await tasksData.create(req.body.title,req.body.description,
                                          req.body.hoursEstimated, req.body.completed);
        res.json(task);
    } catch (err) {
        res.status(500).json({err:err});
    } finally {

    }
});
router.put("tasks/:id",async(req,res)=>{
    try {
        let task = await tasksData.updateAll(req.params.id, req.body.title, req.body.description,
                                             req.body.hoursEstimated,req.body.completed);
        res.json(task);
    } catch (err) {
        res.status(400).json({err:err});
    } finally {
        
    }
});
router.patch("/tasks/:id", async(req,res) =>{
    try {
        let task = await tasksData.updateAtr(req.params.id,req.body.title, req.body.description,
                                             req.body.hoursEstimated, req.body.completed);
        res.json(task);
    } catch (err) {
        res.status(400).json({err:err});
    } finally {
        
    }
});
router.post("/tasks/:id/comments", async(req,res) =>{
    try {
        let comment = await commentsData.create(req.body.name,req.body.comment);
        let task = await tasksData.addComment(comment);
    } catch (err) {
        
    } finally {
        
    }
});
module.exports = router;
