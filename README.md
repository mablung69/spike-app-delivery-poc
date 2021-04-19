# spike-app-delivery-poc
spike app delivery


### <strong>PLEASE READ FIRST</strong>

Create folder named db to be used by docker compose.
```console
...spike-app-delivery-poc$ mkdir db
```
Note this is related for a bug in docker with user:group permission needed to use this folder in volume.
If you don't make the folder before running docker compose, the basic squema in docker/squema/init.sql <strong>don't be executed</strong>.

# Initial configurations

## docker-compose
```
sudo curl -L https://github.com/docker/compose/releases/download/1.18.0/docker-compose-`uname -s`-`uname -m` -o /usr/local/bin/docker-compose
sudo chmod +x /usr/local/bin/docker-compose
```

# Environment usage

Enter in docker folder

```
cd docker
```

Make helper executable

```
chmod 755 app.sh
```

## Build images

```
./app.sh build
```

## Run containers

```
./app.sh up -d
```

## Connect to shell inside a container

Sometime you want to see stuff inside the container. You can initialize a bash term using the follow command

```
docker exec -it <container name> bash
```

## How To see containers output logs

To see logs
```
./app.sh logs -f
```
