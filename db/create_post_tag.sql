insert into post_tags(post_id,tag_id)
values($1, $2)
RETURNING *;