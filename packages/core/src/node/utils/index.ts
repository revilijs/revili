import { chalk } from "@revili/helpers/node";

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
  log: (msg: string) => {
    console.log(chalk.blue('[revili] ') + msg)
  },
  success: (msg: string) => {
    console.log(chalk.green('[revili] ') + msg)
  },
  warn: (msg: string) => {
    console.log(chalk.yellow('[revili] ') + msg)
  },
  error: (msg: string) => {
    console.error(chalk.red('[revili] ') + msg)
  }
}
