#!/bin/bash

# https://forums.docker.com/t/systemd-coredump-taking-ownership-of-tmp-db-directory-and-contents-in-rails-app/93609
# GID is defined in ~/.bashrc => export GID=$(id -g)
export UID
export GID

[ ! -f "common.env" ] && echo "common.env not found" && exit 1
[ ! -L ".env" ] && ln -s common.env .env

docker-compose "$@"
