"use strict";

var gitSpawnedStream = require('git-spawned-stream');
var streamingParser = require('./lib/parser');

function searchContent(repoPath, opts) {
  var rev = opts.rev || 'HEAD';
  var term = opts.term.replace(/'/g, '').replace(/"/g, '');
  var args = ['grep', '-n', '-z'];

  if (opts.regex === false) {
    args.push('-F');
  } else {
    args.push('-E', '-i');
  }

  args.push(term, rev);

  return streamingParser(gitSpawnedStream(repoPath, args));
}

module.exports = searchContent;
