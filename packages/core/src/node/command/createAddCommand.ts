import {CAC} from 'cac'
import { spinner, chalk } from '@revili/shared/node'
import { consoleUtil } from '../utils/index.js'
import { PATHS } from '../alias.js'
import { execPromise } from '../utils/childProcess.js'
import { initConfigFolder, getReviliConfig, setReviliConfig, type ReviliConfig } from '../utils/reviliData.js'
import { initKitData } from '../utils/kitData.js'

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

          if (reviliConfig.kitList.includes(kit)) {
            spinner.warn(chalk.yellow('[revili] ') + `${kit} has been added!`);
          } else {
            reviliConfig.kitList.push(kit)
            reviliConfig.activeKit = kit
            setReviliConfig(reviliConfig)

            // Initialize kit data
            await initKitData(kit)

            spinner.succeed(chalk.green('[revili] ') + `${targetKit} loaded successfully!`)
          }
        }
      } catch (error) {
        spinner.fail(chalk.red('[revili] ') + `${targetKit} was not found!`)
      }

      spinner.stop();
    })
}
