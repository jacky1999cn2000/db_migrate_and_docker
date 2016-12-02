'use strict';

var dbm;
var type;
var seed;

var db = require('../modules/db'),
    co = require('co');

/**
  * We receive the dbmigrate dependency from dbmigrate initially.
  * This enables us to not have to rely on NODE_PATH.
  */
exports.setup = function(options, seedLink) {
  dbm = options.dbmigrate;
  type = dbm.dataType;
  seed = seedLink;
};

exports.up = function(dbMigrate, callback) {
  co(function* () {

      yield db.query('CREATE TABLE pets (' +
        'pet_id INT NOT NULL AUTO_INCREMENT,' +
        'pet_name text NOT NULL,' +
        'PRIMARY KEY (pet_id))');

      yield db.query('CREATE TABLE owners (' +
        'owner_id INT NOT NULL AUTO_INCREMENT,' +
        'owner_name text NOT NULL,' +
        'PRIMARY KEY (owner_id))');

    }).then(()=>{
    	callback();
    })
};

exports.down = function(dbMigrate, callback) {
  co(function* () {

      yield db.query('DROP TABLE pets');
      yield db.query('DROP TABLE owners');

    }).then(()=>{
    	callback();
    })
};
