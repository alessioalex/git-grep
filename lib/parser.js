"use strict";

var splitStream = require('split-transform-stream');

module.exports = function(inputStream) {

  function write(line, enc, cb) {
    var row = {};

    if (!line) {
      cb();
      return;
    }

    line = line.split('\u0000');

    if (line.length === 1) {
      var binaryMatch = line[0].match(/^binary file (.*) matches$/i);

      if (binaryMatch && binaryMatch.length === 2) {
        row.file = binaryMatch[1].split(':')[1];
        row.line = -1;
        row.text = 'binary file matches';
      }
    } else {
      row.file = line[0].split(':')[1];
      row.line = line[1];
      row.text = line[2].trim();
    }

    this.push(row, 'utf8');

    cb();
  }

  return splitStream(inputStream, write);
};
