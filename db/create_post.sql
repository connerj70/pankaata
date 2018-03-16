insert into posts(title, type, url, category, creation_date, time, description)
values($1, $2, $3, $4, $5, $6, $7)
RETURNING *;