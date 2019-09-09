const express = require("express");
const bodyParser = require('body-parser');
const app = express();
const configRoutes = require("./routes");
//these bodyParser like middleware should be set before configRoutes.
app.use(bodyParser.urlencoded({extended:false}));
app.use(bodyParser.json());
configRoutes(app);
app.listen(3000,()=>{
    console.log("routes running on http://localhost:3000");
});
