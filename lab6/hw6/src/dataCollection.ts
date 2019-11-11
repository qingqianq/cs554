import {DbClient} from './DbClient';
import { v4 as uuid } from 'uuid';
export class dataCollection{
    constructor(){
        this.client = new DbClient();
    }
    public client: DbClient;
    private async getCollectionFn(collection: string){
        let _col = undefined;
        if(!_col){
            const db = await this.client.connect();
            _col = db.collection(collection);
        }
        return _col;
    }

    public async getTasks(skip: any, take: any){
        if(skip == undefined) skip = 0;
        if(take == undefined) take = 20;
        skip = Number(skip);
        take = Number(take);
        if(!Number.isInteger(skip))
            throw `${skip} is not an integer`;
        if(!Number.isInteger(take))
            throw `${take} is not an integer`;
        if(skip < 0 || take <= 0)
            throw `need positive number`;
        if(take > 100) take = 100;
        const tasksCollection = await this.getCollectionFn("tasks");
        let allTasks = await tasksCollection.find({},{projection:{_id:0}}).skip(skip).limit(take).toArray();
        return allTasks;
    }

    public async createTask(title: any, description: any, hoursEstimated: any, completed: any){
        if(typeof title !== 'string') throw 'title type error';
        if(typeof description !== 'string') throw 'description type error';
        if(typeof hoursEstimated == 'string') hoursEstimated = Number(hoursEstimated);
        if(isNaN(hoursEstimated)) throw 'hoursEstimated type error';
        if(hoursEstimated <= 0) throw `hoursEstimated should be positive`;
        if(completed == undefined) completed = false;
        if(typeof completed == 'string'){
            if(completed === 'true') completed = true;
            else if(completed === 'false') completed = false;
            else throw 'completed type error';
        }else if(typeof completed != 'boolean')
            throw 'completed type error';
        const id: string = uuid();
        let task: object = {
            id: id,
            title: title,
            description: description,
            hoursEstimated: hoursEstimated,
            completed: completed,
            comments:[]
        }
        let tasksCollection = await this.getCollectionFn("tasks");
        let info = await tasksCollection.insertOne(task);
        if(info.insertedCount === 0)
            throw `insert ${task} err`;
        return task;
    }

    public async getTaskById(id: any){
        if(typeof id !== `string`)
            throw `${id} is not string`;
        let tasksCollection = await this.getCollectionFn("tasks");
        let task = await tasksCollection.find({id:id},{projection:{_id:0}}).limit(1).next();
        if(task == null)
            throw `not found ${id}`;
        return task;
    }

    public async updateAll(...args: any[]) {
        for(let arg of args){
            if(arg == undefined)
                throw `need all details of task`;
        }
        let task = await this.updateAtr(args);
        return task;
    };

    /*
      This function have to use args a array as arguments, anonymous function can not use arguments[0] directly.
      args: 0 for id, 1 for title, 2 for description, 3 for hoursEstimated, 4 for completed
    */
    public async updateAtr(args: any[]) {
        await this.getTaskById(args[0]);
        //todo type check
        for(let i = 1; i < args.length; ++i){
            if(args[i]){
                switch(i){
                    case 1:
                        if(typeof args[i] != `string`)
                            throw `id, title or description is not string`;
                        break;
                    case 2:
                        if(typeof args[i] != `string`)
                            throw `id, title or description is not string`;
                        break;
                    case 3:
                        args[i] = Number(args[i]);
                        if(isNaN(args[i]) || args[i] <= 0)
                            throw `hoursEstimated should be positive number`;
                        break;
                    case 4:
                        if(args[i] == "true") args[i] = true;
                        else if(args[i] == "false") args[i] = false;
                        else if(typeof args[i] != 'boolean')
                            throw `completed should be true or false`;
                        break;
                }
            }
        }
        //todo update
        let keyNames: Array<string> = ["id", "title", "description", "hoursEstimated", "completed"];
        let tasksColletion = await this.getCollectionFn("tasks");
        for(let i = 1;i < args.length; ++i){
            let key: string = keyNames[i];
            let newValue: object = {};
            newValue[key] = args[i];
            if(arguments[i] != undefined)
                await tasksColletion.update({id:args[0]},{$set:newValue});
        }
        return this.getTaskById(args[0]);
    }

    public async addComment(id: any, comment: any){
        let newComment: object = {};
        for(let key in comment){
            if(comment.hasOwnProperty(key) && key != "_id")
                newComment[key] = comment[key];
        }
        if(comment == undefined) throw `comment does not exits`;
        let tasksColletion = await this.getCollectionFn("tasks");
        await tasksColletion.updateOne({id:id},{$addToSet:{comments:newComment}});
        let task = await this.getTaskById(id);
        return task;
    }

    public async deleteCommentInTask(taskId: any, commentId: any){
        if(!taskId || typeof taskId != `string`)
            throw `need a correct tasksId`;
        if(!commentId || typeof commentId != `string`)
            throw `need a correct commentId`;
        let tasksColletion = await this.getCollectionFn("tasks");
        let {result} = await tasksColletion.updateOne({id:taskId},{$pull:{"comments":{"id":commentId}}});
        if(!result.n)
            throw `not found task ${taskId}`;
        if(!result.nModified)
            throw `not found comment ${commentId}`;
        return this.getTaskById(taskId);
    }

    public async createComment(name: any, comment: any){
        if(typeof name != 'string')
            throw `name ${name} is not string`;
        if(typeof comment != `string`)
            throw `comment ${comment} is not string`;
        const commentsCollection = await this.getCollectionFn("comments");
        let id: string = uuid();
        let commentObj:object = {
            id: id,
            name: name,
            comment: comment
        };
        let info = await commentsCollection.insertOne(commentObj);
        if(info.insertedCount == 0)
            throw `insert ${commentObj} error`;
        return commentObj;
    }

    public async deleteComment(commentId: any){
        if(!commentId || typeof commentId != `string`)
            throw `need correct comment id`;
        const commentsCollection = await this.getCollectionFn("comments");
        let {deletedCount} = await commentsCollection.deleteOne({id:commentId});
        if(!deletedCount)
            throw `not found ${commentId} in comment`;
    }
}
