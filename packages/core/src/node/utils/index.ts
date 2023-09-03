import { chalk } from "@revili/shared/node";

export * from './childProcess.js'

export function toLowerCamelCase(str: string): string {
  let arr: string[] = str.split('-');

  arr = arr.reduce((acc: string[], curr: string) => {
    if (curr.length > 0) {
      acc.push(curr[0].toUpperCase() + curr.slice(1).toLowerCase());
    }
    return acc;
  }, []);

  str = arr.join('');

  return str;
}

export const consoleUtil = {
  log(info: any) {
    console.log(chalk.blue('[revili] ') + info)
  },
  success(info: any) {
    console.log(chalk.green('[revili] ') + info)
  },
  warn(info: any) {
    console.warn(chalk.yellow('[revili] ') + info)
  },
  error(info: any) {
    console.error(chalk.red('[revili] ') + info)
  }
}
