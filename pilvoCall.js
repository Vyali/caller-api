var plivo = require('plivo');
var o2x = require('object-to-xml');
const CallInfoModel = require('./models/CallInfoModel');
    'use strict';
    const AUTH_ID = process.env.AUTH_ID;
    const AUTH_TOKEN=process.env.AUTH_TOKEN;
   
    var client = new plivo.Client(AUTH_ID, AUTH_TOKEN);

   

async function createCall(context,data){
     return new Promise((resolve,reject)=>{
        client.calls.create(
            data.from, // from
            data.to, // to
            context.appConfig.pilvoConfig.callbackUrl, // answer url
            {
                answerMethod: context.appConfig.pilvoConfig.callbackMethod,
                timeLimit:data.durationMin
            },
        ).then(function (response) {
            console.log(response);
            var ApiData = require('./models/ApiModel')
            ApiData = {
                RequestUUID : response.requestUuid,
                ApiUUID:response.apiId,
                message: response.message,
                To:data.to,
                From:data.from,
                DurationMin:data.durationMin

            }
        
               CallInfoModel.insertRecord(context,ApiData);

            // client.calls.speakText(response.requestUuid,"THIS is rock")
            // .then(function(speckRes){
            //     console("speakResp",speakResp);
            // },function(err){
            //     console.log("Speak resp errr",err);
            // })
            resolve("Successfully initiated the call to "+data.to);
        }).catch(error=>{
            console.error(error);
            reject("Unable to initiate the call"+error);
        });
    
     })
     
    }
 
function answerCall(context,data){
       
        // <Response>
        // <Speak>Congratulations! You've made your first outbound call!</Speak>
        // </Response>
        try{
            //CallInfoModel.insertRecord(data);
            CallInfoModel.updateRecord(context,data);
            return o2x({
                
                Response: {
                    Speak: "Hello from the other side"
                }});
            
        }catch(error){
            console.log("error",error);
            //return error; 
            throw new Error("Unable to answer call");

        }
 
    }

module.exports ={
    createCall:createCall,
    answerCall:answerCall
} 