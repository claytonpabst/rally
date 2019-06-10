select * from games g
join invites i on i.game_id = g.game_id
where i.invitee_id = ${id}