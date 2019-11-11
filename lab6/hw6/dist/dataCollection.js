"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
const DbClient_1 = require("./DbClient");
const uuid_1 = require("uuid");
class dataCollection {
    constructor() {
        this.client = new DbClient_1.DbClient();
    }
    getCollectionFn(collection) {
        return __awaiter(this, void 0, void 0, function* () {
            let _col = undefined;
            if (!_col) {
                const db = yield this.client.connect();
                _col = db.collection(collection);
            }
            return _col;
        });
    }
    getTasks(skip, take) {
        return __awaiter(this, void 0, void 0, function* () {
            if (skip == undefined)
                skip = 0;
            if (take == undefined)
                take = 20;
            skip = Number(skip);
            take = Number(take);
            if (!Number.isInteger(skip))
                throw `${skip} is not an integer`;
            if (!Number.isInteger(take))
                throw `${take} is not an integer`;
            if (skip < 0 || take <= 0)
                throw `need positive number`;
            if (take > 100)
                take = 100;
            const tasksCollection = yield this.getCollectionFn("tasks");
            let allTasks = yield tasksCollection.find({}, { projection: { _id: 0 } }).skip(skip).limit(take).toArray();
            console.log("allTasks");
            console.log(allTasks);
            return allTasks;
        });
    }
    createTask(title, description, hoursEstimated, completed) {
        return __awaiter(this, void 0, void 0, function* () {
            if (typeof title !== 'string')
                throw 'title type error';
            if (typeof description !== 'string')
                throw 'description type error';
            if (typeof hoursEstimated == 'string')
                hoursEstimated = Number(hoursEstimated);
            if (isNaN(hoursEstimated))
                throw 'hoursEstimated type error';
            if (hoursEstimated <= 0)
                throw `hoursEstimated should be positive`;
            if (completed == undefined)
                completed = false;
            if (typeof completed == 'string') {
                if (completed === 'true')
                    completed = true;
                else if (completed === 'false')
                    completed = false;
                else
                    throw 'completed type error';
            }
            else if (typeof completed != 'boolean')
                throw 'completed type error';
            const id = uuid_1.v4();
            let task = {
                id: id,
                title: title,
                description: description,
                hoursEstimated: hoursEstimated,
                completed: completed,
                comments: []
            };
            let tasksCollection = yield this.getCollectionFn("tasks");
            let info = yield tasksCollection.insertOne(task);
            if (info.insertedCount === 0)
                throw `insert ${task} err`;
            return task;
            // db.collection('tasks',async (err, collection) =>{
            //     if(err)
            //         throw 'get tasks err';
            //     let info = await collection.insertOne(task);
            // });
        });
    }
    getTaskById(id) {
        return __awaiter(this, void 0, void 0, function* () {
            if (typeof id !== `string`)
                throw `${id} is not string`;
            const db = yield this.client.connect();
            try {
                db.collection('tasks', (err, collection) => __awaiter(this, void 0, void 0, function* () {
                    if (err)
                        throw 'get tasks err';
                    let task = yield collection.find({ id: id }, { projection: { _id: 0 } }).limit(1).next();
                    if (task == null)
                        throw `not found ${id}`;
                    return task;
                }));
            }
            catch (err) {
                console.log(err);
            }
        });
    }
}
exports.dataCollection = dataCollection;
