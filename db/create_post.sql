insert into posts(title, type, url, category, creation_date, time)
values($1, $2, $3, $4, $5, $6)
RETURNING *;