var express = require('express');
var router  = express.Router();
global.router = router;
var fs=require('fs');
var path = require('path');

var postgres     = require('../postgres/postgres');
var postgres  = new postgres();

router.get('/getUsers', function(req, res, next) {
  postgres.getUsers(req.query, function(result){
      res.send(result);
    }
  );
});

router.put('/saveUser', function(req, res, next) {
  postgres.addUser(req.body, function(response){
      console.log('response=' + response);
      res.send(response);
    }
  );
});

router.post('/updateUser', function(req, res, next) {
  postgres.updateUser(req.body, function(response){
      console.log('response=' + response);
      res.send(response);
    }
  );
});

router.post('/deleteUser', function(req, res, next) {
  console.log('\n\n delete user \\');
  postgres.deleteUser(req.body, function(response){
      console.log('response=' + response);
      res.send(response);
    }
  );
});

module.exports = router;

