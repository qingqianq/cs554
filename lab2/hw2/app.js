const express = require("express");
const app = express();
const configRoute = require("./routes");
app.use("/public", express.static(__dirname + "/public"));
configRoute(app);
app.listen(3000,()=>{
    console.log("routes running on http://localhost:3000");
});
