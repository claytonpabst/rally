select u.id, first_name, last_name, location, rating, picture, friend_request, request_confirmed  from users u
join friends f on f.friend_id = u.id 
where u.id != ${id} and f.id = ${id}