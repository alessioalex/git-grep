"use strict";

var gitGrep = require('./');
var path = require('path');
var repoPath = path.resolve(process.env.REPO || (__dirname + '/.git'));

gitGrep(repoPath, {
  rev: 'HEAD',
  term: process.env.SEARCH_TERM || 'timestamped_migrations'
}).on('data', function(data) {
  // console.log(data);
}).on('error', function(err) {
  throw err;
}).on('end', function() {
  console.log("\n±±±±±±±±±±±±±±±±±±");
  console.log("That's all, folks!");
});
