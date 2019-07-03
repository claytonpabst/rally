insert into games (organizer_id,  creation_timestamp, time_limit, priority_scheduling, spots_left, last_invitee_priority_num,
    game_date,	           
    game_time,	            
    location,	            
    info,	              
    play_type,
    game_datetime ,
    utc_datetime              )
VALUES 
(${organizer_id}, now(), ${time_limit}, ${priority_scheduling}, ${spots_left}, ${last_invitee_priority_num},
    ${game_date},	           
    ${game_time},	            
    ${location},	            
    ${info},	              
    ${play_type} ,
    ${game_datetime} ,
    ${utc_datetime}         )

returning games.game_id