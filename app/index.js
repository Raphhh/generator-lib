'use strict';
var util = require('util');
var path = require('path');
var yeoman = require('yeoman-generator');


var LibGenerator = module.exports = function LibGenerator(args, options, config) {
  yeoman.generators.Base.apply(this, arguments);

  this.on('end', function () {
    this.installDependencies({ skipInstall: options['skip-install'] });
  });

  this.pkg = JSON.parse(this.readFileAsString(path.join(__dirname, '../package.json')));
};

util.inherits(LibGenerator, yeoman.generators.Base);

LibGenerator.prototype.askFor = function askFor() {
  var cb = this.async();

  // have Yeoman greet the user.
  console.log(this.yeoman);

  var prompts = [{
    name: 'libName',
    message: 'What do you want to call your lib?'
  },{
    name: 'libDesc',
    message: 'Describe your lib:'
  },{
    name: 'githubUser',
    message: 'What is your GitHub username?'
  },{
    name: 'authorName',
    message: 'What is your full name?'
  },{
    name: 'copyrightYear',
    message: 'What year for the copyright?'
  }];

  this.prompt(prompts, function (props) {

    this.libName = props.libName;
    this.libDesc = props.libDesc;
    this.githubUser = props.githubUser;
    this.authorName = props.authorName;
    this.copyrightYear = props.copyrightYear;

    this.libNameNoJs = this.libName.replace('.js', '');

    this.githubRoot = 'https://github.com'
    this.githubUrl = [this.githubRoot, this.githubUser, this.libName].join('/');

    this.githubPagesRoot = 'http://'+this.githubUser+'.github.io';
    this.githubPagesUrl = [this.githubPagesRoot, this.libName].join('/');

    cb();
  }.bind(this));
};

LibGenerator.prototype.app = function app() {
  this.mkdir('dist');
  this.mkdir('docs');
  this.mkdir('demo');
  this.mkdir('demo/assets');
  this.mkdir('src');
  this.mkdir('test');
  this.mkdir('test/lib');

  this.template('_bower.json', 'bower.json');
  this.template('_Gruntfile.js', 'Gruntfile.js');
  this.template('_package.json', 'package.json');
  this.template('_README.md', 'README.md');
  
  this.template('index.html', 'index.html');
  this.template('LICENSE.txt', 'LICENSE.txt');

  this.copy('editorconfig', '.editorconfig');
  this.copy('gitattributes', '.gitattributes');
  this.copy('gitignore', '.gitignore');
  this.copy('jshintrc', '.jshintrc');

  this.write('dist/'+this.libNameNoJs+'.js', '');
  this.write('dist/'+this.libNameNoJs+'.min.js', '');

  this.write('docs/MAIN.md', '');

  this.template('demo/index.html', 'demo/index.html');
  this.copy('demo/assets/normalize.css', 'demo/assets/normalize.css');
  this.copy('demo/assets/main.css', 'demo/assets/main.css');

  this.template('src/_intro.js', 'src/_intro.js');
  this.template('src/_outro.js', 'src/_outro.js');
  this.copy('src/main.js', 'src/main.js');

  this.copy('test/lib/qunit.css', 'test/lib/qunit.css');
  this.copy('test/lib/qunit.js', 'test/lib/qunit.js');
  this.template('test/all.js', 'test/all.js');
  this.template('test/all.html', 'test/all.html');

};
