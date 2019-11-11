import * as express from 'express';
import {Request, Response} from 'express';
import {dataCollection} from './dataCollection';
// TODO import database setting
export class apiRouter{
    constructor(){
        this.router = express.Router();
        this.apiRoutes();
    }
    public collections: dataCollection = new dataCollection();
    public router: express.Router;
    public routes(app: express.Application):void{
        app.use("/api", this.router);
        app.use("*",(req: express.Request, res: express.Response)=>{
            let errMsg: string = "Not found ".concat(req.originalUrl);
            res.status(400).json({err:errMsg})
        });
    }
    private apiRoutes(): void{
        this.router.get("/tasks", async(req: Request, res: Response) =>{
            try {
                let tasks = await this.collections.getTasks(req.query.skip,req.query.take);
                res.json(tasks);
            } catch (err) {
                res.status(400).json({error:err});
            }
        });
        this.router.get("/tasks/:id", async(req: Request,res: Response) =>{
            try {
                let task = await this.collections.getTaskById(req.params.id);
                res.json(task);
            } catch (err) {
                console.log("get tasks err");
                res.status(404).json({err:err});
            }
        });
        this.router.post("/tasks",async(req: Request, res: Response)=>{
            try {
                let task = await this.collections.createTask(req.body.title,req.body.description,
                                                             req.body.hoursEstimated, req.body.completed);
                res.json(task);
            } catch (err) {
                res.status(400).json({err:err});
            }
        });
        this.router.put("/tasks/:id",async(req: Request, res: Response)=>{
            // try {
            //     let task = await tasksData.updateAll(req.params.id, req.body.title, req.body.description,
            //                                          req.body.hoursEstimated,req.body.completed);
            //     res.json(task);
            // } catch (err) {
            //     res.status(400).json({err:err});
            // }
            res.send("ok");
        });
        this.router.patch("/tasks/:id", async(req: Request, res: Response) =>{
            // try {
            //     let args = [req.params.id,req.body.title, req.body.description,
            //                 req.body.hoursEstimated, req.body.completed];
            //     let task = await tasksData.updateAtr(args);
            //     res.json(task);
            // } catch (err) {
            //     res.status(400).json({err:err});
            // }
            res.send("ok");
        });
        this.router.post("/tasks/:id/comments", async(req: Request, res: Response) =>{
            // try {
            //     let task = await tasksData.getById(req.params.id);
            // } catch (err) {
            //     res.status(400).json({err:err});
            //     return;
            // }
            // try {
            //     let comment = await commentsData.create(req.body.name,req.body.comment);
            //     let task = await tasksData.addComment(req.params.id, comment);
            //     res.json(task);
            // } catch (err) {
            //     res.status(400).json({err:err});
            // }
            res.send("ok");
        });
        this.router.delete("/tasks/:taskId/:commentId", async(req: Request, res: Response) =>{
            // try {
            //     let task = await tasksData.deleteComment(req.params.taskId,req.params.commentId);
            //     await commentsData.deleteComment(req.params.commentId);
            //     res.json(task);
            // } catch (err) {
            //     res.status(404).json({err:err});
            //     return;
            // }
            res.send("ok");

        });
    }
}
