select u.id, first_name, last_name, picture, birth_year, location, rating, rating_type, about, singles, mixed, gender, open, phone, email from users u
join user_auth a on a.id = u.id
where a.id = ${id}