const path = require("path");
const constructorMethod = app =>{
    app.get("/", (req,res)=>{
        //path.join
        res.sendFile(path.resolve("index.html"));
    });
    app.use("*",(req,res)=>{
        res.status(404).json({err:"Not define"});
    });
};
module.exports = constructorMethod;
