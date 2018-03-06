insert into tags(name)
values($1)
ON CONFLICT("name") DO UPDATE SET name=EXCLUDED.name RETURNING tag_id;