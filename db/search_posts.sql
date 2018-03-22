select distinct posts.post_id, title, url, type, category, creation_date from posts
join post_tags on posts.post_id = post_tags.post_id
join tags on tags.tag_id = post_tags.tag_id
where title ilike '%' || $1 || '%' or name ilike '%' || $1 || '%'
order by post_id desc