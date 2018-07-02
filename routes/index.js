var express = require('express');
var router = express.Router();

console.log('\n\nindex.js\n\n');

exports.index = function(req, res){
  res.render('index');
};

exports.users = function(req, res){
  res.render('index');
};

module.exports = router;
