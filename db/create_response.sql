INSERT INTO ann_responses (response, letter_id) 
VALUES ($1, $2)
ON CONFLICT (letter_id) DO UPDATE 
  SET response = excluded.response;