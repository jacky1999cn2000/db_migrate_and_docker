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

      yield db.query('ALTER TABLE pets ADD petOwner_id INT NOT NULL DEFAULT 0');
      yield db.query('ALTER TABLE pets ' +
        'ADD CONSTRAINT fk_petOwner ' +
        'FOREIGN KEY (petOwner_id) ' +
        'REFERENCES owners(owner_id)');

    }).then(()=>{
      callback();
    })
};

exports.down = function(dbMigrate, callback) {
  co(function* () {

      yield db.query('ALTER TABLE pets ' +
        'DROP CONSTRAINT fk_petOwner ' +
        'FOREIGN KEY (petOwner_id)');
      yield db.query('ALTER TABLE pets DROP COLUMN petOwner_id');
      
    }).then(()=>{
      callback();
    })
};

exports._meta = {
  "version": 1
};
