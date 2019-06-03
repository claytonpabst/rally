insert into invites (game_id, invitee_id, sent_timestamp, priority_num, status)
VALUES (${match_id}, ${id}, now(), ${priority_num}, ${status})