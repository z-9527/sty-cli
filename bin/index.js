#!/usr/bin/env node
const progrom = require('commander')
const chalk = require('chalk')
// const inquirer = require('inquirer')
const fs = require('fs')
const shell = require('shelljs')
const download = require('download-git-repo')
const ora = require('ora')

progrom
  .version(require('../package.json').version)
  .usage('<command> [<args>]')
  .arguments('<command>')

progrom
  .command('init <projectName>')
  .description('初始化项目')
  .action(projectName => {
    const exists = fs.existsSync(projectName)
    if (exists) {
      console.log(chalk.yellow('目录已经存在'))
      shell.exec('ls')
    } else {
      let spinner = ora('downloading template ...');
      spinner.start();
      download('github:z-9527/sty-react-template#master', projectName, (err) => {
        if (err) {
          spinner.fail();
          console.log(chalk.red('下载模板失败'))
        } else {
          spinner.succeed();
          console.log(chalk.green('\n 下载模板成功'))
        }
      })
    }
  })


progrom.parse(process.argv)

//一定要放在progrom.parse(process.argv)语句后面，program的args才拿的到
if (!progrom.args.length) {
  progrom.help()
}