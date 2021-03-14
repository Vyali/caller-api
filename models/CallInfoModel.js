
async function insertRecord(context,data){
    let client = context.dbClient;
    var queryStr = insertQuery(data);
    //const queryStr = "INSERT INTO call_info(from_coordinate,to_coordinate,call_UUID) VALUES('1234123412','412341243','41234fsdsfs')"
    client.query(queryStr, (error, results) => {
        if (error) {
         console.log("eror",error);
            // throw error
            throw new Error(error);
        }
        return results;
      })
}
function updateRecord(context, data){
    let client = context.dbClient;
    let updateQueryStr = updateQuery(data);
    client.query(updateQueryStr, (error, results) => {
        if (error) {
         console.log("eror",error);
            // throw error
            throw new Error(error);
        }
        return results;
      })
}


function modelColumns(){
    return ' from_coordinate, to_coordinate, request_UUID, api_UUID,status_message,call_duration,aLegReq_UUID,call_UUID,'
    +'direction,aleg_UUID,event_name,call_status,session_start,_created_at,_updated_at ';
}

function insertQuery(data){

   const q = `INSERT INTO call_info( ${modelColumns()}) VALUES(  '${data.From}'
    , '${data.To}', '${data.RequestUUID}','${data.ApiUUID}', '${data.message}', '${data.DurationMin}' ,'${data.ALegRequestUUID}' , '${data.CallUUID}' 
    , '${data.Direction}', '${data.ALegUUID}', '${data.Event}'
    , '${data.CallStatus}', '${data.SessionStart}', '${JSON.stringify(new Date())}', '${JSON.stringify(new Date())}'
    )`
    
    console.log("query",q);
    return q;
}

function updateQuery(data){
    var q =  `UPDATE call_info SET 
        aLegReq_UUID = '${data.ALegRequestUUID}', call_UUID = '${data.CallUUID}', direction= '${data.Direction}',
        aleg_UUID = '${data.ALegUUID}', event_name = '${data.Event}', call_status = '${data.CallStatus}', 
        session_start = '${data.SessionStart}',_updated_at ='${JSON.stringify(new Date())}'
        WHERE request_UUID='${data.RequestUUID}'`;
        
    console.log("query",q);    
    return q;
    
}


module.exports={
    insertRecord:insertRecord,
    updateRecord:updateRecord
}
