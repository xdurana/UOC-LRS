#!bin/sh

export NODE_PATH=/usr/local/lib/node_modules:/usr/local/lib/node &&
export NODE_CONFIG=/home/xdurana/github.uoc.es/lrs/config/config-pre.json &&
export NODE_ENV=pre &&
export PORT=3030 &&
nodemon app.js