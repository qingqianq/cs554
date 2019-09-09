const apiRoutes = require("./api");

const constructorMethod = app =>{
    //todo log middleware
    let loggingMap = new Map();
    app.use("*", (req,res,next)=>{
        let logData = {};
        logData.body = req.body;
        logData.url = req.protocol + '://' + req.get('host') + req.originalUrl;
        logData.method = req.method;
        console.log(logData);
        next();
    });
    //todo middleware for url request times
    app.use("*",(req,res,next) =>{
        if(!loggingMap.get(req.originalUrl))
            loggingMap.set(req.originalUrl,1);
        else{
            let times = loggingMap.get(req.originalUrl)+1;
            loggingMap.set(req.originalUrl,times);
        }
        console.log(req.originalUrl + ` visit times: ` + loggingMap.get(req.originalUrl));
        next();
    });
    app.use("/api",apiRoutes);
    app.use("*",(req,res)=>{
        res.status(404).json({error:"not define except api"});
    });
};
module.exports = constructorMethod;
