#!/bin/bash

DB="lrs"
COLLECTION="statements"
OUT="lrs.json"
OID="`node export.js $4`"
Q="{\"_id\":{\"\$gt\":ObjectId(\"$OID\")}}"

echo "Export LRS data to JSON file"

if [ $# -eq 4 ]; then
    mongoexport --host $1 --username $2 --password $3 --db $DB --collection $COLLECTION --out $OUT -q $Q
else
    echo "USAGE: sh export.sh [HOSTNAME] [USERNAME] [PASSWORD] [DAYS]"
fi