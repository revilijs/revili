import { exec } from 'node:child_process'
import { promisify } from 'node:util'

const execPromise = promisify(exec);

export { execPromise }
