const express = require("express");
require("dotenv").config();
require("./api/data/db");


const app = express();

const routes = require("./api/routes")

// app.use(function(req, res, next){
//     console.log(req.method, req.url);
//     next();
// });
app.use("/api", function(req,res,next){
    res.header('Access-Control-Allow-Origin',
    'http://localhost:4200');
    res.header('Access-Control-Allow-Headers', 'Origin, XRequested-With, Content-Type, Accept');
    res.header('Access-Control-Allow-Methods',"GET, POST, DELETE, PUT, PATCH");
    
next();
});
app.use(express.urlencoded({extended:true}));
app.use(express.json());
app.use("/api",routes);

const server =app.listen(process.env.PORT, function(){
    console.log(process.env.MSG_SERVER_STARTING,server.address().port);
});
