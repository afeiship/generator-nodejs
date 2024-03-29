'use strict';
const Generator = require('@jswork/yeoman-generator');
const getp = require('@jswork/generator-prompts');
const prompts = getp(['scope', 'registry', 'project_name', 'description']);

module.exports = class extends Generator {
  async prompting() {
    // Have Yeoman greet the user.
    this.log('Welcome to the praiseworthy "nodejs:bundt" generator!');
    this.props = await this.prompt(prompts);
  }

  writing() {
    this.fs.copyTpl(this.srcFiles, this.destinationPath(), this.props);
  }
};
