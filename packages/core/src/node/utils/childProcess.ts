import { promisify } from 'node:util'
import { exec } from 'node:child_process'

const execPromise = promisify(exec);

export { execPromise }
