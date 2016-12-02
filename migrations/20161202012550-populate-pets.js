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

      for(let i=1; i<11; i++){
        for(let j=1; j<11; j++){
          let pet_name = 'pet'+(10*i+j);
          yield db.query('INSERT INTO pets(pet_name,petOwner_id) VALUES (?,?)', [pet_name,i]);
        }
      }

    }).then(()=>{
      callback();
    })
};

exports.down = function(dbMigrate, callback) {
  co(function* () {


    }).then(()=>{
      callback();
    })
};
