select name from tags join post_tags on post_tags.tag_id = tags.tag_id where post_id = $1
