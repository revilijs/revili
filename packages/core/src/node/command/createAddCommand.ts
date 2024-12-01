import {CAC} from 'cac'
import { spinner, chalk } from '@revili/shared/node'

import { PATHS } from '../alias.js'
import { execPromise } from '../utils/childProcess.js'
import { initConfigFolder, getReviliConfig, setReviliConfig, type ReviliConfig } from './handleConfig.js'

const kitRegExp = /^(@[\d_-\w\W]+\/)?([\d_-\w]+)(@.+)?$/

export function createAddCommand(program: CAC) {
  program
    .command('add <kit>', 'Install kit')
    .action(async targetKit => {
      initConfigFolder()

      if (!kitRegExp.test(targetKit)) {
        console.error(`[revili] ${targetKit} not found`)
        return
      }

      const [, scope = '', name] = targetKit.match(kitRegExp)

      const kit = `${scope}${name}`


      // 子命令执行安装 npm 包的操作
      try {
        spinner.start(chalk.blue('[revili] ') + `${targetKit} is loading!`)

        const { stdout } = await execPromise(`cd ${PATHS.DATA_DIRS.kits} && npm install ${targetKit} --save`);

        if (!/^\nup to date/.test(stdout) && !/^\nadded/.test(stdout)) {
          spinner.fail(chalk.red('[revili] ') + `${targetKit} failed to load!`)
        } else {
          const reviliConfig: ReviliConfig = await getReviliConfig()

          reviliConfig.activeKit = kit
          reviliConfig.kitList.push(kit)

          setReviliConfig(reviliConfig)

          spinner.succeed(chalk.green('[revili] ') + `${targetKit} loaded successfully!`)
        }
      } catch (error) {
        console.log(222, error)
        spinner.fail(chalk.red('[revili] ') + `${targetKit} was not found!`)
      }

      spinner.stop();
    })
}
