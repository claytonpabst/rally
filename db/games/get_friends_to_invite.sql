select u.first_name, u.last_name, u.rating, u.location, u.picture
from users u 
join friends f on f.friend_id = u.id 
where f.id = ${id} and f.request_confirmed = 'confirmed'