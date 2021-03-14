CREATE TABLE call_info(

   to_coordinate VARCHAR(20) NOT NULL,
   from_coordinate VARCHAR(20) NOT NULL,
   request_UUID VARCHAR(256), 
   call_UUID VARCHAR(256), 
   api_UUID VARCHAR(256),
   direction VARCHAR(20),
   aLegReq_UUID VARCHAR(256),
   aleg_UUID VARCHAR(256),
   event_name  VARCHAR(20),
   call_status VARCHAR(20),
   session_start VARCHAR(256), 
   call_duration VARCHAR(5),
   status_message VARCHAR(256),
   _created_at TIMESTAMPTZ,
   _updated_at TIMESTAMPTZ,
   PRIMARY KEY(request_UUID)
)

