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
        
    }
}
