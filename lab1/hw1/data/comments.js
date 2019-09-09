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
deleteComment = async(commentId)=>{
    if(!commentId || typeof commentId != `string`)
        throw `need correct comment id`;
    let commentsCollection = await comments();
    let {deletedCount} = await commentsCollection.deleteOne({id:commentId});
    if(!deletedCount)
        throw `not found ${commentId} in commennt`;
};
// getCommentById = async(commentId)=>{
//     if(!commentId || typeof commentId != `string`)
//         throw `need correct comment id`;
//     let commentsCollection = await comments();
//     let comment = await commentsCollection.find({id:id}).limit(1).next();
//     if(comment == null)
//         throw `not find ${commentId}`;
//     return comment;
// };
module.exports = {
    create,
    deleteComment
};
