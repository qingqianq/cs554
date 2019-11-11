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
        });
    }
    getTaskById(id) {
        return __awaiter(this, void 0, void 0, function* () {
            if (typeof id !== `string`)
                throw `${id} is not string`;
            let tasksCollection = yield this.getCollectionFn("tasks");
            let task = yield tasksCollection.find({ id: id }, { projection: { _id: 0 } }).limit(1).next();
            if (task == null)
                throw `not found ${id}`;
            return task;
        });
    }
    updateAll(...args) {
        return __awaiter(this, void 0, void 0, function* () {
            for (let arg of args) {
                if (arg == undefined)
                    throw `need all details of task`;
            }
            let task = yield this.updateAtr(args);
            return task;
        });
    }
    ;
    /*
      This function have to use args a array as arguments, anonymous function can not use arguments[0] directly.
      args: 0 for id, 1 for title, 2 for description, 3 for hoursEstimated, 4 for completed
    */
    updateAtr(args) {
        return __awaiter(this, arguments, void 0, function* () {
            yield this.getTaskById(args[0]);
            //todo type check
            for (let i = 1; i < args.length; ++i) {
                if (args[i]) {
                    switch (i) {
                        case 1:
                            if (typeof args[i] != `string`)
                                throw `id, title or description is not string`;
                            break;
                        case 2:
                            if (typeof args[i] != `string`)
                                throw `id, title or description is not string`;
                            break;
                        case 3:
                            args[i] = Number(args[i]);
                            if (isNaN(args[i]) || args[i] <= 0)
                                throw `hoursEstimated should be positive number`;
                            break;
                        case 4:
                            if (args[i] == "true")
                                args[i] = true;
                            else if (args[i] == "false")
                                args[i] = false;
                            else if (typeof args[i] != 'boolean')
                                throw `completed should be true or false`;
                            break;
                    }
                }
            }
            //todo update
            let keyNames = ["id", "title", "description", "hoursEstimated", "completed"];
            let tasksColletion = yield this.getCollectionFn("tasks");
            for (let i = 1; i < args.length; ++i) {
                let key = keyNames[i];
                let newValue = {};
                newValue[key] = args[i];
                if (arguments[i] != undefined)
                    yield tasksColletion.update({ id: args[0] }, { $set: newValue });
            }
            return this.getTaskById(args[0]);
        });
    }
    addComment(id, comment) {
        return __awaiter(this, void 0, void 0, function* () {
            let newComment = {};
            for (let key in comment) {
                if (comment.hasOwnProperty(key) && key != "_id")
                    newComment[key] = comment[key];
            }
            if (comment == undefined)
                throw `comment does not exits`;
            let tasksColletion = yield this.getCollectionFn("tasks");
            yield tasksColletion.updateOne({ id: id }, { $addToSet: { comments: newComment } });
            let task = yield this.getTaskById(id);
            return task;
        });
    }
    deleteCommentInTask(taskId, commentId) {
        return __awaiter(this, void 0, void 0, function* () {
            if (!taskId || typeof taskId != `string`)
                throw `need a correct tasksId`;
            if (!commentId || typeof commentId != `string`)
                throw `need a correct commentId`;
            let tasksColletion = yield this.getCollectionFn("tasks");
            let { result } = yield tasksColletion.updateOne({ id: taskId }, { $pull: { "comments": { "id": commentId } } });
            if (!result.n)
                throw `not found task ${taskId}`;
            if (!result.nModified)
                throw `not found comment ${commentId}`;
            return this.getTaskById(taskId);
        });
    }
    createComment(name, comment) {
        return __awaiter(this, void 0, void 0, function* () {
            if (typeof name != 'string')
                throw `name ${name} is not string`;
            if (typeof comment != `string`)
                throw `comment ${comment} is not string`;
            const commentsCollection = yield this.getCollectionFn("comments");
            let id = uuid_1.v4();
            let commentObj = {
                id: id,
                name: name,
                comment: comment
            };
            let info = yield commentsCollection.insertOne(commentObj);
            if (info.insertedCount == 0)
                throw `insert ${commentObj} error`;
            return commentObj;
        });
    }
    deleteComment(commentId) {
        return __awaiter(this, void 0, void 0, function* () {
            if (!commentId || typeof commentId != `string`)
                throw `need correct comment id`;
            const commentsCollection = yield this.getCollectionFn("comments");
            let { deletedCount } = yield commentsCollection.deleteOne({ id: commentId });
            if (!deletedCount)
                throw `not found ${commentId} in comment`;
        });
    }
}
exports.dataCollection = dataCollection;
