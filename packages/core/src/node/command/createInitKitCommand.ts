import {CAC} from 'cac'
import fs from 'node:fs'
import path from 'node:path'
import { default as gitly } from 'gitly'
import { inquirer, spinner, chalk } from '@revili/shared/node'

import { CWD } from '../alias.js'
import { consoleUtil } from '../utils/index.js'

export function createInitKitCommand(program: CAC) {
  program
    .command('create:kit', 'Use kit')
    .action(async kit => {
      const { kitName, webFramework } = await handleInquirer()
      const gitScope = 'revilijs'
      const gitRepo = `revili-kit-demo-${webFramework}`

      spinner.start(chalk.blue(`[revili] Load file from https://github.com/${gitScope}/${gitRepo}`))

      try {
        const targetDir = kitName ?? gitRepo
        // @ts-ignore
        await gitly.default(`${gitScope}/${gitRepo}`, path.join(CWD, targetDir))
        spinner.succeed(`[revili] Load file from https://github.com/${gitScope}/${gitRepo}`)


        await changePackage(kitName, targetDir)

        spinner.stop()

        console.log()
        consoleUtil.success('[revili] Load successful, enjoy it!')
        console.log()
      } catch(error) {
        spinner.fail(chalk.redBright(`[revili] Load file from git`))
        consoleUtil.error(error)
        spinner.stop()
      }
    })
}

interface Answers {
  kitName: string
  webFramework: 'vue' | 'react'
}

function handleInquirer(): Promise<Answers> {
  const questions = [
    {
      name: 'kitName',
      type: 'input',
      message: `What's the name of your kit? (.e.g revili-kit-xxx)`
    },
    {
      name: 'webFramework',
      type: 'list',
      message: `What framework do you want to use in web client?`,
      choices: ['vue'],
      filter: function (val: any) {
        return val.toLowerCase()
      }
    }
  ]

  return new Promise((resolve, reject) => {
    inquirer
      .prompt(questions)
      .then((answers: any) => {
        resolve(answers)
      })
      .catch((err: any) => {
        reject(err)
      })
  })
}

function changePackage (kitName: string, targetDir: string) {
  spinner.start(chalk.blue(`[revili] Edit kit name`))

  return new Promise((resolve) => {
    const packageJsonPath = `${CWD}/${targetDir}/package.json`
    fs.readFile(packageJsonPath, (err, data) => {
      if (err) throw err
      const _data = JSON.parse(data.toString())
      _data.name = kitName
      const content = JSON.stringify(_data, null, 2)
      fs.writeFile(packageJsonPath, content, (err) => {
        if (!err) {
          spinner.succeed(chalk.blue(`[revili] Edit kit name`))
          resolve('')
        } else {
          spinner.fail(chalk.blue(`[revili] Edit kit name`))
          throw err
        }
      })
    })
  })
}
