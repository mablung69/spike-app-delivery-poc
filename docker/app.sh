#!/bin/bash

# https://github.com/docker/compose/issues/2380
# export UID of the current user, the services inside the container will be using this UID for the local environment
export UID

[ ! -f "common.env" ] && echo "common.env not found" && exit 1
[ ! -L ".env" ] && ln -s common.env .env

docker-compose "$@"
