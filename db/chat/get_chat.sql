select c._id, c.room, c.text, c.createdat as "createdAt", c.user_id, (
select row_to_json(u)
from (
select users.first_name as name, users.id as _id, users.picture as avatar from users where c.user_id = users.id
) u
) as user

from chat c where c.room = ${room}
