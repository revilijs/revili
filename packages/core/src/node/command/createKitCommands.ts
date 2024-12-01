import {CAC} from 'cac'

import { getActiveKit } from '../utils/getActiveKit.js'

export async function createKitCommands(program: CAC, customKitDir: string) {
  const { activeKit } = await getActiveKit(customKitDir)

  if (activeKit) {
    activeKit.registerCommand({ program })
  }
}
