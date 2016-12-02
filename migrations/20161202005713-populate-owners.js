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
        let owner_name = 'owner'+i;
        yield db.query('INSERT INTO owners(owner_name) VALUES (?)', [owner_name]);
      }

    }).then(()=>{
      callback();
    })
};

exports.down = function(dbMigrate, callback) {
  co(function* () {

      // let result = yield db.query('SHOW TABLES LIKE ?', ['owners']);
      //
      // if(result[0].length > 0){
      //   db.query('DELETE from owners');
      // }

    }).then(()=>{
      callback();
    })
};
