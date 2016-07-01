#!/usr/bin/env bash

dbName="eval-event-db"

#dropping the whole database (dev).
mongo $dbName --eval "db.dropDatabase()"

#loading fixture in the database (dev).
mongoimport -d $dbName -c users --type json --file ./test/_helpers/fixtures/users.json
mongoimport -d $dbName -c events --type json --file ./test/_helpers/fixtures/events.json
mongoimport -d $dbName -c tokens --type json --file ./test/_helpers/fixtures/tokens.json
