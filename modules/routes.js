'use strict';

var fs = require('fs'),
    db = require('./db'),
    co = require('co');

exports.available = function (req, res) {

    res.type('text/plain');
    var data = db.query('SELECT * FROM pets').spread(function(rows){
        res.send("OK");
    }).catch(function(err){
        res.status(600).send("NOT OK");
    });

};

exports.version = function (req, res) {
    fs.stat('BUILD-VERSION.txt', function(err, stat) {
      if(err == null) {
          res.type('text/plain');
          res.send( fs.readFileSync('BUILD-VERSION.txt', 'utf8') );
      } else if(err.code == 'ENOENT') {
          res.type('text/plain');
          res.send('File \'BUILD-VERSION.txt\' does not exist.');
      }
    });
};

exports.getOwners = function (req, res){
  co(function* (){
    let rows = yield db.query('SELECT owner_id, owner_name FROM owners');
    res.send(rows[0]);
  })
  .catch(function(err){
    console.log('err ',err);
    res.send('error')
  })
};

exports.getPets = function (req, res){
  co(function* (){
    let rows = yield db.query('SELECT pet_id, pet_name, petOwner_id FROM pets WHERE petOwner_id = (SELECT owner_id FROM owners WHERE owner_name = ?)', ['owner1']);
    res.send(rows[0]);
  })
  .catch(function(err){
    console.log('err ',err);
    res.send('error')
  })
};
