update users
set birth_year = ${birth_year},	
location	= ${location},
rating	= ${rating},
rating_type	= ${rating_type},
about	= ${about},
singles = ${singles},
mixed	= ${mixed},
gender	= ${gender},
open	= ${open}
where id = ${id};

update user_auth
set 
phone	= ${phone},
email = ${email}
where id = ${id};