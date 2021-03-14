# caller-api
Tech stack used 
  
  * node v12.18.4 
 
 * postgres 12.4

Use devkit folder to create the db and the tables
  * for creating the call_info table 
    * $node createCallInfo.js


Pilvo has been used as a service provider for making outbound calls

Get your AUTH_ID and AUTH_TOKEN from here
https://console.plivo.com/dashboard/

$npm i 

$vi startup.js

export AUTH_ID={MY_AUTH_ID}

export AUTH_TOKEN={MY_AUTH_TOEKN}

Change database configuration in AppConfig.json

Below is content of AppConfig.json

Here ### callback url is for sending to pilvo during outbound call creation on which it will make a call 
with call_UUID and other infos and expects a XML respones of the text needs to be played, it will point to caller-api's 
*/answerCall endpoint.

`
{   "port":8081,
    "datasource": 
        {
            "name": "postgres",
            "user": "postgres",
            "host": "localhost",
            "database": "notification",
            "password": "postgres",
            "port": 5432
      },
  "pilvoConfig":{
    "callbackUrl":"http://s3.amazonaws.com/static.plivo.com/answer.xml", //This is dummy callback given by pilvo
    "callbackMethod":"GET"
  }
  }
`

finally

$./startup.sh to start the application


