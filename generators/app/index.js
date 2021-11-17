'use strict';
const Generator = require('yeoman-generator');
const chalk = require('chalk');
const yosay = require('yosay');
const glob = require('glob');
const { resolve } = require('path');
const remote = require('yeoman-remote');
const yoHelper = require('@jswork/yeoman-generator-helper');
const replace = require('replace-in-file');

module.exports = class extends Generator {
  prompting() {
    // Have Yeoman greet the user.
    this.log(yosay(`Welcome to the stunning ${chalk.red('generator-nodejs')} generator!`));

    const prompts = [
      {
        type: 'input',
        name: 'scope',
        message: 'Your project_name scope (eg: `@babel(scope is babel)`)?',
        default: 'jswork'
      },
      {
        type: 'input',
        name: 'project_name',
        message: 'Your project_name (eg: like this `the-node-project` )?',
        default: yoHelper.discoverRoot
      },
      {
        type: 'input',
        name: 'description',
        message: 'Your description?'
      }
    ];

    return this.prompt(prompts).then(
      function(props) {
        this.props = props;
        yoHelper.rewriteProps(props);
      }.bind(this)
    );
  }

  writing() {
    const done = this.async();
    remote(
      'afeiship',
      'boilerplate-nodejs',
      function(err, cachePath) {
        // copy files:
        this.fs.copy(glob.sync(resolve(cachePath, '{**,.*}')), this.destinationPath());
        done();
      }.bind(this)
    );
  }

  end() {
    const { scope, project_name, description } = this.props;
    const files = glob.sync(resolve(this.destinationPath(), '{**,.*}'));

    replace.sync({
      files,
      from: [/boilerplate-scope/g, /boilerplate-nodejs-description/g, /boilerplate-nodejs/g],
      to: [scope, description, project_name]
    });
  }
};
