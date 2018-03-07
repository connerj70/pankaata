insert into posts(title, type, url, category)
values($1, $2, $3, $4)
RETURNING *;