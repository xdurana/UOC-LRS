#!bin/sh

export NODE_PATH=/usr/local/lib/node_modules:/usr/local/lib/node &&
export NODE_CONFIG=/home/campus/nodejsHome/lrs/config/config-test.json &&
export PORT=3030 &&
nodemon app.js