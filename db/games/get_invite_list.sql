update games
set spots_left = ${spots_left}
where game_id = ${id};

select * from games g
join invites i on i.game_id = g.game_id
where i.invitee_id = ${id}
order by g.game_date;