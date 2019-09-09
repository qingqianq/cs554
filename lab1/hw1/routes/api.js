const express = require("express");
const data = require("../data");
const tasksData = data.tasksData;
const commentsData = data.commentsData;
const router = express.Router();
router.get("/tasks", async(req,res)=>{
    try {
        let tasks = await tasksData.getTasks(req.query.skip,req.query.take);
        res.json(tasks);
    } catch (err) {
        res.status(500).json({error:err});
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
    try {
        let task = await tasksData.create(req.body.title,req.body.description,
                                          req.body.hoursEstimated, req.body.completed);
        res.json(task);
    } catch (err) {
        res.status(500).json({err:err});
    } finally {

    }
});
router.put("/tasks/:id",async(req,res)=>{
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
        let args = [req.params.id,req.body.title, req.body.description,
                    req.body.hoursEstimated, req.body.completed];
        let task = await tasksData.updateAtr(args);
        res.json(task);
    } catch (err) {
        res.status(400).json({err:err});
    } finally {
        
    }
});
router.post("/tasks/:id/comments", async(req,res) =>{
    try {
        let task = await tasksData.getById(req.params.id);
    } catch (err) {
        res.status(400).json({err:err});
        return;
    } finally {
      
    }
    try {
        let comment = await commentsData.create(req.body.name,req.body.comment);
        let task = await tasksData.addComment(req.params.id, comment);
        res.json(task);
    } catch (err) {
        res.status(500).json({err:err});
    } finally {
        
    }
});
router.delete("/tasks/:taskId/:commentId", async(req,res) =>{
    try {
        let task = await tasksData.deleteComment(req.params.taskId,req.params.commentId);
        await commentsData.deleteComment(req.params.commentId);
        res.json(task);
    } catch (err) {
        res.status(404).json({err:err});
        return;
    } finally {
        
    }
 
});

router.use("*",(req,res)=>{
    let msg = "Not found ".concat(req.originalUrl);
    res.status(400).json({err:msg});
});
module.exports = router;
