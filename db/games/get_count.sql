select count(*)  
from invites i
join games g on g.game_id = i.game_id
where g.game_id = ${game_id} and (status = 'confirmed' or status = 'pre')