import { CAC, getActiveKit } from '@revili/helpers/node'

export async function createKitCommands(program: CAC, customKitDir: string) {
  const { activeKit } = await getActiveKit(customKitDir)

  if (activeKit) {
    activeKit.registerCommand({ program })
  }
}
