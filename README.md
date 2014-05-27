# git-grep

Easily search a git repo in a Node streamy way (by shelling out to [git-grep(1)](https://www.kernel.org/pub/software/scm/git/docs/git-grep.html)).

## Usage

```js
gitGrep(repoPath, options);
```

Where options can contain the following properties:
- rev: revision
- term: search term

Example:

```js
var gitGrep = require('git-grep');
var path = require('path');
var repoPath = path.resolve(process.env.REPO || (__dirname + '/.git'));

gitGrep(repoPath, {
  rev: 'HEAD',
  term: process.env.SEARCH_TERM || 'timestamped_migrations'
}).on('data', function(data) {
  console.log(data);
}).on('error', function(err) {
  throw err;
}).on('end', function() {
  console.log("±±±±±±±±±±±±±±±±±±");
  console.log("That's all, folks!");
});
```

Sample output:

```bash
$ REPO=../rails/.git node example.js
{ file: 'activerecord/lib/active_record/core.rb',
  line: '69',
  text: 'mattr_accessor :timestamped_migrations, instance_writer: false' }
{ file: 'activerecord/lib/active_record/core.rb',
  line: '70',
  text: 'self.timestamped_migrations = true' }
{ file: 'activerecord/lib/active_record/migration.rb',
  line: '297',
  text: '#    config.active_record.timestamped_migrations = false' }
{ file: 'activerecord/lib/active_record/migration.rb',
  line: '672',
  text: 'if ActiveRecord::Base.timestamped_migrations' }
{ file: 'activerecord/test/cases/migration_test.rb',
  line: '631',
  text: 'ActiveRecord::Base.timestamped_migrations = true' }
```

## Tests

```
npm test
```

## License

MIT
