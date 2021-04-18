#!/bin/bash

#To define env DATABASE_URL used in heroku
export DATABASE_URL="postgres://$POSTGRES_USER:$POSTGRES_PASSWORD@$DB_HOST:5432/$POSTGRES_DB"

cd /app
npm install

cd ./src

if [ "x$1" == "x" ] ; then
  echo "*** starting node"
  npm run ${APP_ENV}
elif [ "x$1" == "xrestart" ] ; then
  echo "*** restarting node"
  npm restart ${APP_ENV}
fi
