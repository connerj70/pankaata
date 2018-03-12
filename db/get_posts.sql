select * from posts  where category not in ('relationship') or category isNull order by post_id desc limit 4 offset $1

