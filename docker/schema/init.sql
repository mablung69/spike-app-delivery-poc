CREATE TABLE distance_query (
	distance_query_id serial PRIMARY KEY,
	origin_query TEXT,
	destination_query TEXT,
	distance NUMERIC,
	origin_latitude NUMERIC,
	origin_longitude NUMERIC,
	destination_latitude NUMERIC, 
    destination_longitude NUMERIC,
    query_time TIMESTAMP default current_timestamp
);
