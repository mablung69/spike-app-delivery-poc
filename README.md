# spike-app-delivery-poc
spike app delivery


### <strong>PLEASE READ FIRST</strong>

Create folder named db to be used by docker compose.
Note this is related for a bug in docker with user:group permission needed to use this folder in volume.
If you don't make the folder before running docker compose, the basic squema in docker/squema/init.sql <strong>don't be executed</strong>.
