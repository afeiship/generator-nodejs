'use strict';
var chalk = require('chalk');
var yosay = require('yosay');
var yoHelper = require('yeoman-generator-helper');
var Generator = require('yeoman-generator');

module.exports = class extends Generator {
  prompting(){
    // Have Yeoman greet the user.
    this.log(yosay(
      'Welcome to the striking ' + chalk.red('generator-fei-nodejs') + ' generator!'
    ));

    var prompts = [{
      type: 'input',
      name: 'project_name',
      message: 'Your project_name?',
      default: yoHelper.discoverRoot
    },{
      type:'input',
      name:'description',
      message:'Your project description?'
    }];

    return this.prompt(prompts).then(function (props) {
      // To access props later use this.props.someAnswer;
      this.props = props;
    }.bind(this));
  }

  writing () {
    this._writingTplFiles();
  }

  _writingTplFiles () {
    this.fs.copyTpl(
      this.templatePath('{.*,*,src/*}'),
      this.destinationPath('.'),
      this.props
    );
  }

  install () {
    console.log('Use `yarn install`');
  }
};
