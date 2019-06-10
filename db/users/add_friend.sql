insert into friends (id, friend_id, friend_request, request_confirmed)
select ${id}, ${friend_id}, 'approved', 'pending'
where not exists (Select * from friends where id = ${id} and friend_id = ${friend_id});