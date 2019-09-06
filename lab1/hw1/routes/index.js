const apiRoutes = require("./api");

const constructorMethod = app =>{
    //todo log middleware for body.
    app.use("*", (req,res,next)=>{
        // console.log(req.params);
        // console.log(req.query);
        next();
    });
    //todo middleware for url request times
    app.use("*",(req,res,next) =>{

        next();
    });
    app.use("/api",apiRoutes);
    app.use("*",(req,res)=>{
        res.status(404).json({error:"not define except api"});
    });
};
module.exports = constructorMethod;
