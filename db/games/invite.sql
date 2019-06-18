insert into invites (game_id, invitee_id, sent_timestamp, priority_num, status)
VALUES (${match_id}, ${id}, now(), ${priority_num}, ${status});

select user_auth.phone from user_auth where user_auth.id = ${id}