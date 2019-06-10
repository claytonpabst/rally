select g.game_id, invitee_id, first_name, last_name, status, organizer_id, spots_left, game_date, game_time, g.location, info, play_type, u.picture
from invites i
join users u on u.id = i.invitee_id
join games g on g.game_id = i.game_id
where i.game_id = ${game_id};
