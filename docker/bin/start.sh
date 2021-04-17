#!/bin/bash

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
