const mongoCollections = require("../config/mongoCollections");
const tasks = mongoCollections.tasks;
const uuid = require("uuid/v4");
getTasks = async (skip,take)=>{
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
    try {
        const tasksCollection = await tasks();
        let allTasks = await tasksCollection.find({}).skip(skip).limit(take).toArray();
        return allTasks;
    } catch (err) {
        throw `get tasks error`;
    } finally {

    }
};
create = async (title, description, hoursEstimated, completed) =>{
    //todo type check
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
    //todo insert task object
    let task = {};
    task.id = uuid();
    task.title = title;
    task.description = description;
    task.hoursEstimated = hoursEstimated;
    task.completed = completed;
    task.comments = [];
    const tasksColletion = await tasks();
    let info = await tasksColletion.insertOne(task);
    if(info.insertedCount == 0)
        throw `insert ${task} error`;
    return task;
};
getById = async(id) =>{
    if(typeof id !== `string`)
        throw `${id} is not string`;
    const tasksColletion = await tasks();
    let task = await tasksColletion.find({id:id}).limit(1).next();
    if(task == null)
        throw `not found ${id}`;
    return task;
};
updateAll = async (...args) =>{
    for(let arg of args){
        if(!arg)
            throw `need all details of task`;
    }
    let task = await updateAtr(args);
    return task;
};
/*
  This function have to use args a array as arguments, anonymous function can not use arguments[0] directly.
  args: 0 for id, 1 for title, 2 for description, 3 for hoursEstimated, 4 for completed
*/
updateAtr = async (args)=> {
    let task = await getById(args[0]);
    //todo type check
    for(let i = 1; i < args.length; ++i){
        if(args[i]){
            switch(i){
            case 0,1,2:
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
    let keyNames = ["id", "title", "description", "hoursEstimated", "completed"];
    let tasksColletion = await tasks();
    for(let i = 1;i < arguments.length; ++i){
        let key = keyNames[i];
        let newValue = {};
        newValue[key] = args[i];
        if(arguments[i])
            await tasksColletion.update({id:args[0]},{$set:newValue});
    }
    return getById(args[0]);
};
/*
  $addToSet do not add the item to the given field if it already contains it,
  on the other hand $push will add the given object to field whether it exists or not.
*/
addComment = async(id,comment) =>{
    let newComment = {};
    for(let key in comment){
        if(comment.hasOwnProperty(key) && key != "_id")
            newComment[key] = comment[key];
    }
    if(comment == undefined) throw `comment does not exits`;
    let tasksColletion = await tasks();
    await tasksColletion.updateOne({id:id},{$addToSet:{comments:newComment}});
    let task = await getById(id);
    return task;
};
deleteComment = async(taskId, commentId) =>{
    if(!taskId || typeof taskId != `string`)
        throw `need a correct tasksId`;
    if(!commentId || typeof commentId != `string`)
        throw `need a correct commentId`;
    let tasksColletion = await tasks();
    // await getById(taskId);
    let {result} = await tasksColletion.updateOne({id:taskId},{$pull:{"comments":{"id":commentId}}});
    if(!result.n)
        throw `not found task ${taskId}`;
    if(!result.nModified)
        throw `not found comment ${commentId}`;
    return getById(taskId);
};
module.exports ={
    getTasks,
    create,
    getById,
    updateAll,
    updateAtr,
    addComment,
    deleteComment
};
