const mongoCollections = require("../config/mongoCollections");
const comments = mongoCollections.comments;
const uuid = require("uuid/v4");
create = async(name, comment) => {
    if(typeof name != 'string')
        throw `${name} is not string`;
    if(typeof comment != `string`)
        throw `${comment} is not string`;
        const commentsCollection = await comments();
        let commentObj = {};
        commentObj.name = name;
        commentObj.comment = comment;
        commentObj.id = uuid();
        let info = await commentsCollection.insertOne(commentObj);
        if(info.insertedCount == 0)
            throw `insert ${commentObj} error`;
        return commentObj;
};
module.exports = {
    create
};
