var pilvoCall = require('./pilvoCall');
var express = require('express');
const cors = require('cors')

var fs = require('fs');
const configPath = 'AppConfig.json'
var context={
    appConfig:{},
    dbClient:''
};
var app = express();
app.use(express.json())
app.use(cors())



app.get('/', function (req, res) {

 res.end('success');  
});

app.post('/createCall',(request,response)=>{
    
    response.setHeader('Access-Control-Allow-Origin', request.header('origin') 
    || request.header('x-forwarded-host') || request.header('referer') || request.header('host'));
    response.setHeader('Access-Control-Allow-Methods', 'POST, OPTIONS, GET');
       
     pilvoCall.createCall(context,request.body)
                .then(result=>{
                        console.log("this is request ",result);
                        let resObj={
                            "message":result,
                            "status":"SUCCESS"
                        }
                        response.send(resObj);
                }).catch(error=>{
                        console.log("error",error);
                        response.status(400).send(error);
                });                                              
       
    
});

app.post('/answerCall',(request,response)=>{
    try{
    console.log("answering the call",request.body);
    response.set("'Content-Type', 'text/xml'");
    
    response.send(pilvoCall.answerCall(context,request.body));
    }catch(error){
        console.log("in the error");
        response.status(400).send("error has occured");
    }
});



try{
    console.log("This is orchestraot");
    context.appConfig = loadConfiguration(configPath);
    const {Client} = require('pg')
    const client = new Client({
    user: context.appConfig.datasource['user'],
    host: context.appConfig.datasource['host'],
    database: context.appConfig.datasource['database'],
    password: context.appConfig.datasource['password'],
    port: context.appConfig.datasource['port'],
    })
    client.connect();
    context.dbClient = client;
   

    var server = app.listen(context.appConfig.port, function () {
        var host = server.address().address
        var port = server.address().port
        
        console.log(" app listening at http://%s:%s", host, port)
     })
   
}catch(error){
  console.log("unable to load the configuration/dbConnection",error);
}


function loadConfiguration(){
  
    let appConfig = JSON.parse(fs.readFileSync(configPath));
    return appConfig;
 
 
}
module.exports ={
    loadConfiguration: loadConfiguration
}