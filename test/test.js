"use strict";

var proxyquire = require('proxyquire');
var should = require('should');
var fs = require('fs');

var streamingParser = require('../lib/parser');

describe('git-tree', function() {
  it('should parse the output', function(done) {
    var inputStream = fs.createReadStream(__dirname + '/fixture.txt', 'utf8');
    var results = [];

    streamingParser(inputStream).on('data', function(chunk) {
      results.push(chunk);
    }).on('end', function() {
      results.should.eql(require('./output.json'));

      done();
    });
  });

  it('should create the command correctly', function(done) {
    var repoPath = '/home/node.git';
    var opts = {
      term: 'search_term',
      rev: 'master'
    };

    var gitGrep = proxyquire('../', {
      './lib/parser': function(inputStream) {
        inputStream.should.eql('git-spawned-stream');
      },
      'git-spawned-stream': function(path, args) {
        path.should.eql(repoPath);
        args.should.eql(['grep', '-n', '-z', '-E', '-i', opts.term, opts.rev]);

        return 'git-spawned-stream';
      }
    });

    gitGrep(repoPath, opts);

    done();
  });
});
