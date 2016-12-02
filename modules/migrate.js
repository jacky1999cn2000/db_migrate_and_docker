'use strict';

var DBMigrate = require('db-migrate'),
    dbmigrate = DBMigrate.getInstance(true);

dbmigrate.up();
